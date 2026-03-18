# L'Oasis Florale – Site Web Statique

## Structure du projet

```
loasis-florale/
├── index.html          ← Page principale (SPA - 4 sections)
├── style.css           ← Tous les styles CSS3
├── script.js           ← JavaScript (navigation, slider, filtres)
├── assets/
│   ├── logo.png        ← Logo L'Oasis Florale
│   ├── IMG_E4241.JPG   ← Euphorbia Trigona
│   ├── IMG_E4242.JPG   ← Sansevieria Cylindrica
│   ├── IMG_E4243.JPG   ← Sansevieria Trifasciata
│   ├── IMG_E4244.JPG   ← Cyperus Alternifolius
│   └── IMG_E4245.JPG   ← Huernia Zebrina
└── README.md
```

## Pages incluses

1. **Accueil** – Slider (carrousel) automatique + section intro + statistiques + section "Pourquoi nous choisir"
2. **Nos Services** – 5 cartes de services + carte CTA avec lien téléphone
3. **Nos Fleurs** – Boutique vitrine avec filtres par catégorie + boutons WhatsApp pré-remplis
4. **Contact** – Formulaire de contact + coordonnées + bouton WhatsApp

## Personnalisation

### Numéro WhatsApp
Remplacez `22890000000` par votre vrai numéro dans `index.html` :
```html
href="https://wa.me/VOTRE_NUMERO?text=..."
```

### Téléphone
Remplacez `+228 90 00 00 00` par votre numéro réel.

### Email
Remplacez `contact@loasisflorale.tg` par votre email.

### Couleurs (CSS Variables dans style.css)
```css
--green-deep:  #1a3d2b  ← Vert foncé principal
--green-mid:   #2d6a4f  ← Vert moyen
--green-light: #52b788  ← Vert accent
--gold:        #c9a84c  ← Doré
```

### Ajouter une nouvelle plante
Copiez un bloc `<div class="flower-card">` dans index.html et modifiez :
- `data-category` : succulente | tropicale | interieur | rare
- L'image, le nom, la description
- Le lien WhatsApp avec le nom de la plante

### Slider – Ajouter une image
Copiez un bloc `<div class="slide">` dans la section `.slider` et changez l'URL Unsplash.

## Déploiement

Le site est 100% statique — aucun serveur requis.
- Déposez tous les fichiers sur : GitHub Pages, Netlify, Vercel, ou hébergement FTP classique.
- Ouvrez directement `index.html` dans un navigateur pour tester en local.

## Fonctionnalités techniques

- ✅ Responsive (mobile, tablette, desktop)
- ✅ Slider automatique avec swipe tactile
- ✅ Navigation SPA fluide (sans rechargement)
- ✅ Filtres boutique animés
- ✅ Bouton WhatsApp flottant
- ✅ Animations au défilement (IntersectionObserver)
- ✅ Navigation clavier (← →) pour le slider
- ✅ Vos vraies photos de plantes intégrées
