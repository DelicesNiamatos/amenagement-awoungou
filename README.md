# Aménagement Awoungou — Pilote Culture

Maquette 3D interactive et vision 4K du terrain aménagé du projet **Ferme Niamatos Gabon — Pilote Awoungou**.

## 🌐 Voir en ligne

- **Maquette 3D tous angles** : https://DelicesNiamatos.github.io/amenagement-awoungou/
- **Vision 4K ultra réaliste** : https://DelicesNiamatos.github.io/amenagement-awoungou/awoungou-4k.html

## À propos

- **Superficie réelle de référence** : 1 500 m² — hypothèse 30 m × 50 m
- **Projet** : Délices Niamatos / Ferme Niamatos Gabon SARL
- **Données source** : Plan de culture et d'aménagement phasé du pilote Awoungou (Notion — DN OS)
- **Modèle principal** : Three.js / WebGL, consultable par rotation, zoom et vues prédéfinies
- **Rendu 4K** : page de présentation optimisée pour communiquer la profondeur réelle du terrain, avec repère 30 m × 50 m
- **Déploiement** : GitHub Pages

## Contrôles

### Maquette 3D

- **Clic + drag** : tourner la caméra autour du terrain
- **Molette** : zoomer / dézoomer
- **Clic sur une zone** : ouvrir la fiche technique
- **Boutons de phase** : afficher les zones au fil du chantier
- **Boutons de vue** : vue d'ensemble, vue de dessus, vue habitat

### Vision 4K

- **Zoom + / Zoom −** : agrandir ou réduire la composition
- **Drag** : déplacer la vue
- **Maquette 3D tous angles** : revenir à la version WebGL pour consulter le site sous plusieurs angles

## Ce qui est modélisé

- Terrain de 1 500 m² avec muret existant, clôture et haie vive anti-intrusion
- 5 bandes fonctionnelles (A → E)
- Deux conteneurs maritimes 20′ sur pilotis
- Salon connecteur central et balcon-terrasse
- Atelier conteneur avec serre polycarbonate
- Puits traditionnel, pompe solaire et réservoir
- Centrale photovoltaïque au sol
- Pépinière, compost, bananier plantain, manioc, papayer et maraîchage

## Zones modélisées

| Zone | Surface | Usage | Phase |
|------|---------|-------|-------|
| A | 100 m² | Pépinière, compost, puits | 1 |
| B | 350 m² | Bananier plantain | 2 |
| B' | 350 m² | Manioc intercalaire | 2 |
| C | 400 m² | Papayer & maraîchage | 3 |
| D | 250 m² | Habitat conteneurs + atelier | 4 |
| E | 50 m² | Arbre préservé + bambouseraie | 0 |

## Budget de référence

| Phase | Contenu | Montant |
|-------|---------|---------|
| 0 | Diagnostic, clôture | 460 000 FCFA |
| 1 | Pépinière, compost | 165 000 FCFA |
| 2 | Bananes & manioc | 50 000 FCFA |
| 3 | Papayers & maraîchage | 45 000 FCFA |
| 4 | Habitat, atelier, énergie | 6 250 000 FCFA |
| **Total** | Phases 0–4 | **≈ 7 935 000 FCFA** |

≈ 19 590 CAD (taux indicatif : 1 CAD = 405 FCFA)

## Anti-404 / GitHub Pages

- `404.html` redirige vers la maquette principale si une URL invalide est ouverte.
- `.nojekyll` force GitHub Pages à servir les fichiers statiques tels quels.
- La vision 4K n'utilise pas de lien temporaire Notion comme image source afin d'éviter les expirations et erreurs 404.

## Dépendances

La maquette 3D utilise **Three.js r128** chargé depuis jsDelivr :

- `https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js`
- `https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js`

## Structure

```
.
├── index.html              # Maquette 3D principale
├── awoungou-4k.html         # Vision 4K ultra réaliste / page de présentation
├── 404.html                # Redirection anti-404 GitHub Pages
├── .nojekyll               # Configuration GitHub Pages statique
├── data.js                 # Données des zones, dimensions et budget
├── core.js                 # Scène Three.js, matériaux, terrain, clôtures
├── zones.js                # Zones cliquables
├── habitat.js              # Habitat conteneurs sur pilotis
├── workshop.js             # Atelier et serre polycarbonate
├── solar.js                # Centrale solaire, puits, eau
├── ui.js                   # Interface, tooltips, sélecteur de phase
└── README.md
```

## Licence

© 2026 Délices Niamatos Inc. / Ferme Niamatos Gabon SARL — Tous droits réservés.
