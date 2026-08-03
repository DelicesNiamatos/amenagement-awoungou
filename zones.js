window.DNA = window.DNA || {};
var D = DNA;
D.createZones = function() {
  Object.entries(D.ZONES).forEach(([key, z]) => {
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: z.color, transparent: true, opacity: 0.22, roughness: 0.9 });
    const box = new THREE.Mesh(new THREE.BoxGeometry(z.w, D.H_TERRAIN, z.d), mat);
    box.position.set(z.x, D.H_TERRAIN/2, z.z); box.receiveShadow = true;
    group.add(box);
    D.clickableZone(key, z, box);
    if (key === 'banana') {
      for (let i = 0; i < 20; i++) {
        const t = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 1.8, 8), new THREE.MeshStandardMaterial({ color: D.COLORS.banana }));
        t.position.set((Math.random()-0.5)*z.w*0.8, 0.9, (Math.random()-0.5)*z.d*0.8); t.castShadow = true; group.add(t);
      }
    } else if (key === 'manioc') {
      for (let i = 0; i < 30; i++) {
        const t = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 1.2, 8), new THREE.MeshStandardMaterial({ color: D.COLORS.manioc }));
        t.position.set((Math.random()-0.5)*z.w*0.8, 0.6, (Math.random()-0.5)*z.d*0.8); t.castShadow = true; group.add(t);
      }
    } else if (key === 'papaya') {
      for (let i = 0; i < 12; i++) {
        const t = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 2.2, 8), new THREE.MeshStandardMaterial({ color: D.COLORS.papaya }));
        t.position.set((Math.random()-0.5)*z.w*0.7, 1.1, (Math.random()-0.5)*z.d*0.7); t.castShadow = true; group.add(t);
      }
      for (let i = 0; i < 40; i++) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.3, 0.15), new THREE.MeshStandardMaterial({ color: D.COLORS.vegetable }));
        b.position.set((Math.random()-0.5)*z.w*0.8, 0.15, (Math.random()-0.5)*z.d*0.8); group.add(b);
      }
    } else if (key === 'service') {
      const shade = new THREE.Mesh(new THREE.BoxGeometry(6, 0.08, 8), D.materials.shade);
      shade.position.set(z.x, 2.5, z.z); shade.castShadow = true; group.add(shade);
      [[-2.8, -3.8], [2.8, -3.8], [-2.8, 3.8], [2.8, 3.8]].forEach(([dx, dz]) => {
        const p = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.5, 8), D.materials.steel);
        p.position.set(z.x + dx, 1.25, z.z + dz); p.castShadow = true; group.add(p);
      });
      for (let k = 0; k < 3; k++) {
        const bin = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 1.2), D.materials.wood);
        bin.position.set(z.x + 2.5, 0.45, z.z + 1.5 + k * 1.6); bin.castShadow = true; group.add(bin);
      }
      const well = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.1, 1.2, 24), D.materials.concrete);
      well.position.set(z.x - 2, 0.6, z.z - 3); well.castShadow = true; group.add(well);
      const wellInner = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 1.25, 24), D.materials.water);
      wellInner.position.set(z.x - 2, 0.6, z.z - 3); group.add(wellInner);
      const frame = new THREE.Group();
      const beam1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.8, 8), D.materials.wood);
      beam1.position.set(-0.5, 1.4, 0); beam1.rotation.z = Math.PI / 6;
      const beam2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.8, 8), D.materials.wood);
      beam2.position.set(0.5, 1.4, 0); beam2.rotation.z = -Math.PI / 6;
      frame.add(beam1, beam2); frame.position.set(z.x - 2, 0, z.z - 3); group.add(frame);
    } else if (key === 'preserved') {
      const tree = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 4, 12), new THREE.MeshStandardMaterial({ color: D.COLORS.preservedTree }));
      tree.position.set(z.x, 2, z.z - 1); tree.castShadow = true; group.add(tree);
      const crown = new THREE.Mesh(new THREE.SphereGeometry(2.2, 16, 12), new THREE.MeshStandardMaterial({ color: D.COLORS.preservedTree }));
      crown.position.set(z.x, 4.5, z.z - 1); crown.castShadow = true; group.add(crown);
      for (let k = 0; k < 8; k++) {
        const b = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 2.5, 8), new THREE.MeshStandardMaterial({ color: D.COLORS.bamboo }));
        b.position.set(z.x + (Math.random()-0.5)*3, 1.25, z.z + 2 + (Math.random()-0.5)*2); b.castShadow = true; group.add(b);
      }
    }
    D.scene.add(group); D.register(group, z.phase); D.label(z.name, z.x, 0.6, z.z, 0.8);
  });
};
