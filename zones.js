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
        t.position.set((Math.random()-0.5)*z.w*0.8, 0.6, (Math.random()-0.5)*z.d*0.8); t.cast