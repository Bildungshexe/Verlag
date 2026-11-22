/* Gemeinsame Texte und Regeln – Verlagsduell */
window.VD={
 STUFEN:["Hinterhofverlag","Kleinverlag","Mittelständischer Verlag","Großverlag","Verlagshaus"],
 SPERRE:[3,6,10,15,20],            // Sekunden Sperre pro Stufe (Gegendarstellung/Richtigstellung)
 BASIS:[6,8,10,12],                 // richtige Entscheidungen bis zur Beförderung bei 60 Minuten
 FAKTOR:{30:.5,45:.75,60:1,80:1.35},
 schwellen(dauer){return this.BASIS.map(b=>Math.max(3,Math.ceil(b*(this.FAKTOR[dauer]||1))))},
 TEXT:{
  verlegen:"Ihr bekommt einen Klappentext. Stimmt alles? Dann <b>verlegt</b> ihr das Buch. Steckt ein Fehler drin? Dann <b>verwerft</b> ihr es. Nutzt den Ordner.",
  exposes:"Ihr bekommt zwei Klappentexte zum selben Buch. Nur einer stimmt. Tippt auf den richtigen, um das Buch zu verlegen.",
  korrektur:"Ihr bekommt einen Klappentext. Steckt <b>ein</b> Fehler drin, tippt die falsche Stelle an, wählt die richtige Angabe und verlegt. Stecken <b>zwei</b> Fehler drin, wird verworfen. Ihr dürft jede Angabe antippen. Wer eine richtige Angabe ändert, macht damit einen neuen Fehler.",
  zuordnung:"Dieser Klappentext ist falsch zusammengesetzt. Die markierten Angaben gehören zu verschiedenen Büchern. Ordnet jede Angabe dem richtigen Buch zu.",
  gutachten:"Ihr schreibt ein Gutachten: Tippt auf alle Angaben, die ihr für falsch haltet, und wählt die richtigen. Es sind zwei oder drei Fehler. Wer eine richtige Angabe ändert, bekommt einen Abzug. Dann reicht ihr das Gutachten ein.",
  fehlerfrei:"Drei Klappentexte, nur einer ist fehlerfrei. Tippt auf ihn.",
  film:"Ein Filmteam sucht einen Stoff zu einem <b>Motiv</b>. Wählt eine Hauptfigur, die dazu passt, und dann Gegenspieler, Ort, Autor/in und Erscheinungsjahr. Der Ordner bleibt zu. Je mehr dieser vier Angaben zu eurer Hauptfigur passen, desto besser: 4 = Kassenschlager (3 Punkte), 3 = Publikumserfolg (2), 1 oder 2 = Geheimtipp (1), 0 = Flop. Passt die Hauptfigur nicht zum Motiv, gibt es höchstens einen Geheimtipp, und nur wenn alle vier Angaben stimmen. Ein Flop kostet keine Punkte.",
  motiv:"Jedes Werk hat ein Hauptmotiv. Ordnet jedem Werk das passende Motiv zu. Die Erklärungen findet ihr im Ordner bei „Motive und Themen“."},
 /* Urkunde zum Aufstieg: neue Möglichkeiten + warum das für den Verlag wichtig ist */
 URKUNDE:[
  {neu:["Ihr gründet euren Verlag im Hinterhof und entscheidet über eingereichte Bücher."],
   warum:"Ein Verlag lebt von seinem guten Ruf. Wer ein Buch mit falschen Angaben druckt, verliert das Vertrauen der Leserinnen und Leser. Darum prüft ihr zuerst, ob ein Klappentext stimmt, und nutzt dafür das Verlagsarchiv."},
  {neu:["Ihr bekommt jetzt <b>zwei Klappentexte</b> zum selben Buch und wählt den richtigen.","Der Ordner gibt euch noch kleine Hinweise."],
   warum:"Ein größerer Verlag bekommt mehrere Angebote zum selben Buch, zum Beispiel von verschiedenen Autoren oder Lektoren. Wer Fassungen vergleicht, erkennt die zuverlässige und spart sich teure Nacharbeit."},
  {neu:["Ihr habt ein eigenes Lektorat: Ihr dürft <b>Fehler korrigieren</b> und dann verlegen.","Bei zwei Fehlern lohnt sich das Risiko nicht, dann wird das Buch verworfen.","Hinweise im Ordner gibt es nicht mehr."],
   warum:"Ein mittelständischer Verlag veröffentlicht viele Bücher im Jahr und kann nicht jedes Buch zurückschicken. Mit einem Lektorat behebt er kleine Fehler selbst vor dem Druck. Jede unnötige Änderung an etwas Richtigem schadet aber, und ein Rückruf ist teuer."},
  {neu:["Ihr verwaltet ein großes Programm und <b>ordnet Angaben aus einem falsch zusammengesetzten Klappentext</b> den richtigen Büchern zu.","Neu ist auch die Zuordnung von Büchern zu ihren <b>Hauptmotiven</b>."],
   warum:"In einem großen Programm werden Bücher leicht verwechselt, etwa wenn Texte durcheinandergeraten. Motive helfen, Titel einzuordnen, passende Bücher zusammen zu bewerben und kein Thema doppelt zu besetzen."},
  {neu:["Ihr schreibt <b>Gutachten</b> mit zwei oder drei Fehlern, findet den <b>einzigen fehlerfreien Klappentext</b> und ordnet <b>Motive</b> zu.","Ihr habt die höchste Stufe erreicht, jetzt zählen Punkte und Ansehen."],
   warum:"Ein Verlagshaus verantwortet sein ganzes Programm. Ein sorgfältiges Gutachten schützt jedes Buch davor, mit Fehlern in die Läden zu kommen, und der gute Ruf des Hauses entscheidet darüber, welche Autorinnen und Autoren zu euch kommen."}
 ],
 EREIGNIS:{
  erfolg:["bringt ein neues Buch heraus","verlegt einen neuen Titel","schickt ein Buch in den Druck"],
  verwerfen:["lehnt ein Buch ab"],
  rueck:["muss ein Buch zurückrufen","veröffentlicht eine Gegendarstellung","druckt eine Richtigstellung"],
  aufstieg:s=>"zieht in größere Büroräume um: "+VD.STUFEN[s-1]
 }
};
