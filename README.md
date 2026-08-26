# Flohmarkt Waldorfschule Gütersloh – Landingpage

Statische Landingpage (HTML/CSS/JS, kein Build-Schritt) für den Flohmarkt der
Waldorfschule Gütersloh am 25./26. September 2026. Gehostet über GitHub Pages.

## Struktur

- `index.html` – Startseite (Hero, Verkäufer/Käufer-CTAs, Infos, Tutorials, Fotokarussell, Kontakt)
- `impressum.html`, `datenschutz.html` – rechtliche Seiten
- `assets/css/styles.css` – gesamtes Styling
- `assets/js/main.js` – Fotokarussell-Logik
- `assets/img/flyer.jpg`, `assets/flyer.pdf` – Flyer
- `assets/img/carousel/` – hier später die echten Fotos ablegen

## Lokale Vorschau

Einfach `index.html` im Browser öffnen, oder z. B.:

```bash
python3 -m http.server 8000
```

und dann `http://localhost:8000` aufrufen.

## Deployment (GitHub Pages)

1. Repo auf GitHub anlegen und diesen Ordner pushen
2. In den Repo-Settings unter **Pages** als Quelle den Branch `main` (Root) wählen
3. Seite ist danach unter `https://<username>.github.io/<repo-name>/` erreichbar

## Offene TODOs

- [ ] **Fotokarussell**: echte Fotos vom letzten Flohmarkt in `assets/img/carousel/` ablegen
      und die drei Platzhalter-Slides in `index.html` (`#fotos`) durch `<img>`-Tags ersetzen
- [ ] **Tutorials**: sobald die 3 Instagram-Videos online sind, Links in den drei
      Tutorial-Karten in `index.html` (`#tutorials`) ergänzen
- [ ] **Impressum** (`impressum.html`): Name, Anschrift und ggf. Vertretungsberechtigte einsetzen
      (gelb markierte Platzhalter)
- [ ] **Datenschutzerklärung** (`datenschutz.html`): Foto-Einwilligungshinweis prüfen/ergänzen
- [ ] Farben/Logo/Design nach Wunsch anpassen (aktuell Platzhalter-Farbschema in
      `assets/css/styles.css`, Variablen unter `:root`)
- [ ] Optional: eigene Domain statt `github.io`-Adresse
