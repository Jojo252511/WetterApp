## WetterApp
Eine einfache Webanwendung zur Anzeige von Wetterdaten für einen angegebenen Ort.

## Beschreibung
Geben Sie Ihren Ort/Stadt ein und erhalten Sie alle wichtigen Wetterdaten auf einen Blick, ohne langes Googeln. Die App zeigt die aktuelle Temperatur, Luftfeuchtigkeit, Windgeschwindigkeit und mehr.

## Einrichten
1. Registrieren Sie sich auf openweathermap.org und erhalten Sie einen API-KEY.
2. Fügen Sie diesen API-KEY in die Variable `apiKey` in der `config.js`-Datei ein:
```js
    const apiKey = 'YOUR_API_KEY_HERE'; // Ersetzen Sie 'YOUR_API_KEY_HERE' durch Ihren tatsächlichen API-KEY
```

## Verwendung
Geben Sie im Suchfeld einen beliebigen Ortsnamen ein, um das aktuelle Wetter und die Vorhersage für diesen Ort zu erhalten. Stellen Sie sicher, dass Sie eine gültige Stadt oder einen gültigen Ort eingeben.

## Lizenz
Diese WebApp ist unter der MIT-Lizenz lizenziert, was bedeutet, dass sie frei genutzt, verändert und verteilt werden kann.

## Danke an
- openweathermap.org für die Bereitstellung der API und all ihrer Funktionen.
- fontawesome.com für die Wettersymbole

## Version
1.1.0 - Neuste Version

## Changelog
1.1.0 - Neue Funktionen:
    - Infos zum Ort
    - Vorhersagen (3Tage)
    
1.0.0 - Erste Veröffentlichung der WetterApp.
