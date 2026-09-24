// PWA Manifest generator
const webManifest = {
    "name": "moBiLet",
    "short_name": "moBiLet",
    "description": "Humorystyczna wersja aplikacji moBiLet",
    "start_url": "./index.html",
    "display": "standalone",
    "background_color": "#1976D2",
    "theme_color": "#1976D2",
    "icons": [
        {
            "src": "images/logo.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "images/logo.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
};

const manifestElem = document.createElement('link');
manifestElem.setAttribute('rel', 'manifest');
manifestElem.setAttribute('href', 'data:application/manifest+json;base64,' + btoa(JSON.stringify(webManifest)));
document.head.appendChild(manifestElem);

// Apple meta tags dla PWA
const appleMeta = document.createElement('meta');
appleMeta.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
appleMeta.setAttribute('content', 'black-translucent');
document.head.appendChild(appleMeta);
