/* Verbindung Leitstand <-> Gruppen. PeerJS (Netzwerk) oder BroadcastChannel (nur dieselbe Browser-Sitzung, zum Testen: ?lokal=1) */
window.Net=(function(){
 const lokal=/[?&]lokal=1/.test(location.search)||typeof Peer==='undefined';
 const pid=c=>'vdduell-'+String(c).toLowerCase();
 function host(code,h){
  if(lokal){const ch=new BroadcastChannel('vd-'+code);
   ch.onmessage=e=>{const m=e.data;if(m&&m.to==='host')h.onMsg(m.msg,x=>ch.postMessage({to:m.msg.tok,msg:x}))};
   setTimeout(()=>h.onReady&&h.onReady(),0);return{lokal:true}}
  const p=new Peer(pid(code));
  p.on('open',()=>h.onReady&&h.onReady());
  p.on('error',e=>h.onError&&h.onError(e));
  p.on('connection',c=>{c.on('data',d=>h.onMsg(d,x=>{try{c.send(x)}catch(_){}}));});
  return{peer:p}}
 function join(code,tok,h){
  if(lokal){const ch=new BroadcastChannel('vd-'+code);
   ch.onmessage=e=>{if(e.data&&e.data.to===tok)h.onMsg(e.data.msg)};
   setTimeout(()=>h.onOpen&&h.onOpen(),0);
   return{send:m=>ch.postMessage({to:'host',msg:Object.assign({tok},m)}),lokal:true}}
  let p=new Peer(),c=null,open=false,dead=false;
  const connect=()=>{if(dead)return;c=p.connect(pid(code),{reliable:true});
   c.on('open',()=>{open=true;h.onOpen&&h.onOpen()});
   c.on('data',d=>h.onMsg(d));
   c.on('close',()=>{open=false;h.onClose&&h.onClose();setTimeout(connect,2000)});
   c.on('error',()=>{});};
  p.on('open',connect);
  p.on('error',e=>{h.onError&&h.onError(e);if(e.type==='peer-unavailable'){setTimeout(connect,2500)}});
  return{send:m=>{if(open)c.send(Object.assign({tok},m))},isOpen:()=>open}}
 return{host,join,lokal};
})();
