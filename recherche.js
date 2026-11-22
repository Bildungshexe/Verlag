/* Recherche (Verlagsarchiv) – Anzeige, steigt mit der Stufe */
(function(){
const TH={
1:{f:"'Courier New',Courier,monospace",ink:'#2b2b2b',card:'rgba(235,234,228,.55)',bd:'1.5px dashed #666',pen:2,h:'font-weight:bold;text-transform:uppercase;letter-spacing:1px'},
2:{f:"'Courier New',Courier,monospace",ink:'#262626',card:'rgba(240,239,230,.55)',bd:'1.5px solid #777',pen:2,h:'font-weight:bold;text-transform:uppercase;letter-spacing:1px'},
3:{f:"'Courier New',Courier,monospace",ink:'#222',card:'rgba(247,242,227,.5)',bd:'1.5px solid #666',pen:1,h:'font-weight:bold;border-bottom:1px solid #777'},
4:{f:"Georgia,'Palatino Linotype',serif",ink:'#1f1f1f',card:'rgba(255,253,246,.45)',bd:'1.5px solid #5a4a32',pen:0,h:'font-weight:bold;border-bottom:1px solid #5a4a32'},
5:{f:"'Palatino Linotype',Palatino,Georgia,serif",ink:'#2a1f10',card:'rgba(255,250,240,.45)',bd:'3px double #a8812c',pen:0,h:'font-variant:small-caps;letter-spacing:1.5px;color:#6b4b10;text-align:center;border-bottom:1px solid #a8812c'}};
const e=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function cardHTML(b,st,zoom){
 const th=TH[st],M=MOTIVE[b.motiv][0],nb=b.neben.map(n=>MOTIVE[n][0]).join(', ');
 const pen=th.pen===2||(th.pen===1&&b.t.length%3===0);
 const mt=pen?`<span class="rpen">${e(M)}</span>${nb?` <span class="rpen2">(weitere: ${e(nb)})</span>`:''}`:`<b>${e(M)}</b>${nb?` (weitere Motive: ${e(nb)})`:''}`;
 const rows=[['Autor/in',e(b.a)]];if(b.j)rows.push(['Erstveröffentlichung',b.j]);
 if(b.figs.length)rows.push(['Figuren',e(b.figs.join('; '))]);if(b.orte.length)rows.push(['Schauplätze',e(b.orte.join('; '))]);
 rows.push(['Gegenspieler',e(b.geg)],['Hauptmotiv',mt],['Kurz gesagt',e(b.lang)]);if(b.wissen)rows.push(['Wissenswert',e(b.wissen)]);
 return `<div class="rcard${zoom?' zoom':''}" style="font-family:${th.f};color:${th.ink};background:${th.card};border:${th.bd}"><h3 style="${th.h}">${e(b.t)}</h3><table>${rows.map(r=>`<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join('')}</table></div>`}
const CSS=`
.rwrap{display:flex;flex-direction:column;height:100%;padding:12px 14px}
.rhead{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.rhead b{font-size:17px;letter-spacing:2px}.rhead .sp{flex:1}
.rbtn{background:rgba(0,0,0,.12);border:1.5px solid #555;border-radius:5px;padding:6px 10px;font:inherit;font-size:15px;cursor:pointer;color:inherit}
.rsearch{border:0;border-bottom:2px solid #555;background:transparent;font:inherit;font-size:16px;padding:6px 2px;margin-bottom:6px;width:100%;color:inherit}
.rlist{flex:1;overflow:auto;column-count:1}
.rlist button{display:block;width:100%;text-align:left;border:0;border-bottom:1px dotted #777;background:transparent;font:inherit;font-size:15.5px;padding:7px 2px;cursor:pointer;color:inherit}
.rlist button small{opacity:.65}
.rbody{flex:1;overflow:auto}
.rcard{padding:10px 12px;font-size:15px;line-height:1.4}.rcard h3{margin:0 0 6px;font-size:18px;padding-bottom:3px}
.rcard table{border-collapse:collapse;width:100%}.rcard th{text-align:left;vertical-align:top;width:34%;padding:3px 8px 3px 0;font-size:14px}.rcard td{vertical-align:top;padding:3px 0}
.rcard.zoom{font-size:23px;line-height:1.45;padding:22px 26px}.rcard.zoom h3{font-size:30px}.rcard.zoom th{font-size:21px}
.rpen{font-family:'Hand','Bradley Hand','Marker Felt',cursive;font-weight:bold;color:#c0151b;display:inline-block;transform:rotate(-1.5deg)}
.rpen2{font-family:'Hand','Bradley Hand','Marker Felt',cursive;color:#c0151b;font-size:.9em}
.rzoomov{position:fixed;inset:0;background:rgba(10,6,2,.85);z-index:60;display:flex;align-items:center;justify-content:center;padding:14px}
.rzoomov .sheet{max-width:900px;width:100%;max-height:96vh;overflow:auto;background-size:cover;padding:10px;box-shadow:0 10px 30px #000}
.glos td,.glos th{padding:4px 8px 4px 0;vertical-align:top;font-size:14.5px;text-align:left}
`;
function mount(root,stufe,opt){
 opt=opt||{};let st=stufe,sel=null,q='',glos=false;
 if(!document.getElementById('rechcss')){const s=document.createElement('style');s.id='rechcss';s.textContent=CSS+"@font-face{font-family:'Hand';src:url(assets/hand.ttf)}@font-face{font-family:'Hand';font-weight:bold;src:url(assets/hand-bold.ttf)}";document.head.appendChild(s)}
 function filt(){const s=q.toLowerCase().trim();return ORDNER.filter(b=>!s||(b.t+' '+b.a+' '+b.figs.join(' ')).toLowerCase().includes(s))}
 function draw(){
  const th=TH[st];root.style.fontFamily=th.f;root.style.color=th.ink;
  let h=`<div class="rwrap"><div class="rhead"><b>RECHERCHE</b><span style="opacity:.7">Verlagsarchiv</span><span class="sp"></span>`;
  if(sel||glos)h+=`<button class="rbtn" id="rback">← Liste</button>`;
  if(sel)h+=`<button class="rbtn" id="rzoom">🔍 Vergrößern</button>`;
  if(!sel&&!glos)h+=`<button class="rbtn" id="rglos">Motive</button>`;
  if(opt.onClose)h+=`<button class="rbtn" id="rclose">✕</button>`;
  h+=`</div>`;
  if(glos){h+=`<div class="rbody"><p style="font-size:14.5px;margin:0 0 6px">Ein Motiv ist ein Grundthema, das sich durch die Geschichte zieht. Viele Bücher haben mehrere, ein Motiv steht im Mittelpunkt.</p><table class="glos">${Object.values(MOTIVE).map(m=>`<tr><th>${e(m[0])}</th><td>${e(m[1])}</td></tr>`).join('')}</table></div>`}
  else if(sel){h+=`<div class="rbody">${cardHTML(sel,st,false)}</div>`}
  else{h+=`<input class="rsearch" id="rq" placeholder="Suchen: Titel, Autor/in oder Figur" value="${e(q)}"><div class="rlist">${filt().map(b=>`<button data-k="${b.k}">${e(b.t)} <small>· ${e(b.a)}</small></button>`).join('')}</div>`}
  root.innerHTML=h+'</div>';
  const $=s=>root.querySelector(s);
  if($('#rq')){$('#rq').oninput=ev=>{q=ev.target.value;const pos=ev.target.selectionStart;draw();const n=root.querySelector('#rq');n.focus();n.setSelectionRange(pos,pos)}}
  root.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{sel=ORDNER.find(x=>x.k===b.dataset.k);draw()});
  if($('#rback'))$('#rback').onclick=()=>{sel=null;glos=false;draw()};
  if($('#rglos'))$('#rglos').onclick=()=>{glos=true;draw()};
  if($('#rclose'))$('#rclose').onclick=opt.onClose;
  const z=()=>zoom();if($('#rzoom'))$('#rzoom').onclick=z;
  const rc=root.querySelector('.rcard');if(rc)rc.onclick=z}
 function zoom(){const o=document.createElement('div');o.className='rzoomov';
  o.innerHTML=`<div class="sheet" style="background-image:url(assets/papier_${st}.jpg)">${cardHTML(sel,st,true)}</div>`;o.onclick=()=>o.remove();document.body.appendChild(o)}
 draw();
 return {setStufe(s){st=s;draw()},open(k){sel=ORDNER.find(x=>x.k===k)||null;glos=false;draw()}}}
window.Recherche={mount};
})();
