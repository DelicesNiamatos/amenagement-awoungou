# Aménagement Awoungou — Pilote Culture

Modèle 3D interactif du terrain aménagé du projet **Ferme Niamatos Gabon — Pilote Awoungou**.

## À propos

- **Superficie** : 1 500 m² (bail familial à Owendo, Gabon)
- **Projet** : Délices Niamatos / Ferme Niamatos Gabon SARL
- **Données source** : Plan de culture et d'aménagement phasé du pilote Awoungou (Notion — DN OS)
- **Modèle original** : Conçu dans Claude Design (Claude IA)
- **Déploiement** : GitHub Pages via GitHub Actions

## Fonctionnalités

- Vue 3D interactive du terrain avec les 5 zones (A → E)
- Sélecteur de phase (0 à 4) pour visualiser l'évolution du chantier
- Fiches techniques au clic sur chaque zone
- Légende, contrôles de caméra (zoom, rotation)
- Mode 2D interactif de secours si WebGL 3D est indisponible

## Dépendances

Le modèle 3D utilise **Three.js** chargé depuis un CDN public :

- `https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js`
- `https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js`

## Zones modélisées

| Zone | Surface | Culture / usage | Phase d'apparition |
|------|---------|-----------------|-------------------|
| A | 100 m² | Pépinière / ombrière | 1 |
| B | 400 m² | Bananier plantain | 2 |
| C | 300 m² | Manioc & associé | 2 |
| D | 400 m² | Papayer & maraîchage | 3 |
| E | 300 m² | Habitat & chai | 4 |

## Phases

1. **Phase 0** — Diagnostic, nettoyage & piquetage (aucune zone visible)
2. **Phase 1** — Pépinière, ombrière & irrigation
3. **Phase 2** — Plantation bananier plantain & manioc
4. **Phase 3** — Plantation papayer & maraîchage intercalaire
5. **Phase 4** — Habitat léger, chai & consolidation

## Hébergement GitHub Pages

Ce dépôt est publié avec **GitHub Pages** : `https://delicesniamatos.github.io/amenagement-awoungou/`

## Structure

```
.
├── index.html              # Page principale et UI
├── scene.js                # Scène 3D Three.js
├── data.js                 # Données des zones et budget
├── style.css               # Styles et responsive
├── CNAME                   # Domaine personnalisé (delicesniamatos.com)
├── README.md               # Ce fichier
└── .github/workflows/      # Déploiement automatique
    └── static.yml
```

## Licence

© 2026 Délices Niamatos Inc. / Ferme Niamatos Gabon SARL — Tous droits réservés.
