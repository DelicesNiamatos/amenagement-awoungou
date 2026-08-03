window.DNA = window.DNA || {};
DNA.W = 30;
DNA.L = 50;
DNA.H_TERRAIN = 0.12;
DNA.COLORS = {
  terrain: 0xd6d2c8, path: 0xc2b9a8, wall: 0x8a8a8a, fencePost: 0x8b6f47, fenceWire: 0xb0b0b0, hedge: 0x2a7d46,
  container: 0x4a5568, foam: 0xe8e0d5, steel: 0x555555, wood: 0xa67c52, woodLight: 0xc9a87c, glass: 0x9ecfff,
  polycarbonate: 0xd4eeff, water: 0x2783de, solar: 0x111827, roof: 0x6b7280, concrete: 0x9ca3af,
  nursery: 0x2563eb, banana: 0x2a7d46, manioc: 0xd97706, papaya: 0x7c3aed, vegetable: 0x46a171,
  preservedTree: 0x145a32, bamboo: 0x8b6f47, shade: 0xffffff, suv: 0x3b82f6
};
DNA.ZONES = {
  service: { name: 'Zone de service (A)', sub: 'Pépinière, compost, puits', area: '100 m²', color: DNA.COLORS.nursery, phase: 1, x: -10, z: -18, w: 8, d: 12, info: 'Pépinière sous ombrière, 3 bacs de compost et puits traditionnel maçonné. Alimenté en eau par pompe solaire.', items: 'Ombrière shade-cloth 50%, sachets plants, bacs compost ×3, puits maçonné, réservoir tampon', budget: '165 000 FCFA' },
  banana: { name: 'Bananier plantain (B)', sub: 'Associé au manioc', area: '350 m²', color: DNA.COLORS.banana, phase: 2, x: -2, z: -8, w: 10, d: 14, info: 'Bananier plantain en association avec le manioc. Billons, paillage systématique, goutte-à-goutte.', items: '120–150 rejets de bananier, billons, paillage, arrosage ciblé', budget: '200 000 FCFA' },
  manioc: { name: "Manioc (B')", sub: 'Intercalaire banane', area: '350 m²', color: DNA.COLORS.manioc, phase: 2, x: 8, z: -8, w: 10, d: 14, info: "Manioc bouturé en intercalaire avec la banane. Couverture légumineuse (arachide) pour fixer l'azote.", items: '1 200–1 500 boutures de manioc, couverture arachide', budget: '50 000 FCFA' },
  papaya: { name: 'Papayer & maraîchage (C)', sub: 'Cash-flow rapide', area: '400 m²', color: DNA.COLORS.papaya, phase: 3, x: 0, z: 8, w: 18, d: 12, info: 'Papayer + gombo, arachide et maïs en rotation courte. Trésorerie rapide en 3–4 mois.', items: '≈60 papayers, planches légumes, rotation gombo/arachide/maïs', budget: '285 000 FCFA' },
  habitat: { name: 'Habitat + atelier (D)', sub: 'Conteneurs sur pilotis', area: '250 m²', color: 0x92400e, phase: 4, x: -4, z: 18, w: 16, d: 12, info: "Deux conteneurs 20' sur pilotis (hauteur libre 3 m), connecteur central (salon), module étage + balcon, atelier avec serre de toiture, cuisine, garde-manger et douche invités sous la structure.", items: "2 conteneurs 6×2,44×2,59 m, salon 3,5 m, module étage 8,4 m, balcon, atelier 20', serre, centrale solaire, puits", budget: '6 250 000 FCFA' },
  preserved: { name: 'Arbre préservé + bambouseraie (E)', sub: 'Ombrage & matériau', area: '50 m²', color: DNA.COLORS.preservedTree, phase: 0, x: 10, z: 18, w: 5, d: 10, info: "Arbre mature conservé pour l'ombrage et la régénération naturelle. Bambouseraie d'appoint (Bambusa vulgaris, non traçant) pour le matériau de construction et la clôture.", items: "Arbre préservé, bambouseraie d'appoint, allée d'accès", budget: '45 000 FCFA' }
};
DNA.HABITAT = {
  c20: { l: 6, w: 2.44, h: 2.59 },
  gap: 3.5,
  groundClearance: 3.0,
  upperL: 8.4,
  upperW: 2.44,
  upperH: 2.59,
  terraceW: 3.5,
  terraceL: 8.4
};
