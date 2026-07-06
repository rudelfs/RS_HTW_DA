Survey Tool für Bachelorarbeit über Dark Patterns

Dieses Repository enthält das Umfrage-Tool für meine Bachelorarbeit im Studiengang Internationale Medieninformatik an der HTW Berlin.

Das Tool führt einen empirischen A/B-Test durch. Untersucht wird, wie sich manipulative Cookie-Banner (Dark Patterns) auf datenschutzrechtliche Entscheidungen und das 
anschließende Systemvertrauen auswirken. Dazu werden Interaktionszeiten und Antworten getrackt.


Hierfür benutzt werden:
Frontend: React, Vite, TailwindCSS
Datenbank: Supabase
Hosting: GitHub Pages

Ausführung:
`npm install`
`npm run dev`

Deployment
Build und Push in den gh-pages Branch:
`npm run deploy`

Ebenfalls befindet sich in diesem Repo die Datei "auswertung_graphen.py" was die Auswertungsdatei ist, um die 
generierten .json Datensätze als eine CSV auszuwerten und die für die Arbeit benötigten Graphen zu erstellen.

Bei dem erstellen des Survey Tools sowie der Auswertungsanwendung wurde Claude zur Unterstützung verwendet.

Autor
Rudolfs Spridis  
rudolfs.spridis@student.htw-berlin.de
