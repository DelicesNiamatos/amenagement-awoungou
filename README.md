# Aménagement Awoungou — Pilote Culture

Maquette 3D interactive du terrain aménagé du projet **Ferme Niamatos Gabon — Pilote Awoungou**.

## À propos

- **Superficie** : 1 500 m² (30 m × 50 m, bail familial à Owendo, Gabon)
- **Projet** : Délices Niamatos / Ferme Niamatos Gabon SARL
- **Données source** : Plan de culture et d'aménagement phasé du pilote Awoungou (Notion — DN OS)
- **Modèle** : Conçu avec Three.js (rendu 3D WebGL)
- **Déploiement** : GitHub Pages

## 🌐 Voir la maquette en ligne

**https://DelicesNiamatos.github.io/amenagement-awoungou/**

## Contrôles

- **Clic + drag** : tourner la caméra autour du terrain
- **Molette** : zoomer / dézoomer
- **Clic sur une zone** : ouvrir la fiche technique (surface, phase, budget, description)
- **Boutons de phase** (0 à 4) : faire apparaître les zones au fil du chantier
- **Boutons de vue** : vue d'ensemble, vue de dessus, vue habitat

## Ce qui est modélisé en 3D

- Terrain de 1 500 m² avec muret existant, clôture grillagée sur poteaux de bambou et haie anti-intrusion
- 5 bandes fonctionnelles (A → E) avec cultures et aménagements
- Deux conteneurs maritimes 20′ sur pilotis (hauteur libre 3 m)
- Salon connecteur central de 3,5 m avec grandes baies vitrées
- Module étage (≈ 8,4 m) + balcon-terrasse (3,5 × 8,4 m) avec canopée anti-soleil
- Cuisine extérieure, garde-manger et douche/toilette invités sous la structure
- Atelier conteneur avec serre polycarbonate sur toiture (≈ 5,6 × 2,2 m)
- Puits traditionnel, pompe solaire, réservoir et réseau de distribution
- Centrale photovoltaïque au sol avec batteries/onduleur

## Zones modélisées

| Zone | Surface | Usage | Phase d'apparition |
|------|---------|-------|-------------------|
| A | 100 m² | Pépinière, compost, puits | 1 |
| B | 350 m² | Bananier plantain (associé) | 2 |
| B' | 350 m² | Manioc (intercalaire) | 2 |
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

## Dépendances

Le modèle 3D utilise **Three.js** chargé depuis un CDN public :

- `https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js`
- `https://cdn.jsdelivr.net/npm/three@0.160.0/examples/js/controls/OrbitControls.js`

## Structure

```
.
├── index.html              # Page principale et UI
├── data.js                 # Données des zones, dimensions et budget
├── core.js                 # Scène Three.js, matériaux, terrain, clôtures
├── zones.js                # Création des 5 zones cliquables
├── habitat.js              # Habitat conteneurs sur pilotis
├── workshop.js             # Atelier et serre polycarbonate
├── solar.js                # Centrale solaire, puits, eau
├── ui.js                   # Interface, tooltips, sélecteur de phase
└── README.md               # Ce fichier
```

## Licence

© 2026 Délices Niamatos Inc. / Ferme Niamatos Gabon SARL — Tous droits réservés.
