window.DNA = window.DNA || {};
var D = DNA;
D.createWorkshop = function() {
  const w = new THREE.Group(); const c = D.HABITAT;
  const wx = 9; const wz = -14; const angle = 0;
  const cont = new THREE.Mesh(new THREE.BoxGeometry(c.c20.l, c.c20.h, c.c20.w), D.materials.foam); cont.position.set(wx, c.c20.h/2, wz); cont.rotation.y = angle; cont.castShadow = true; cont.receiveShadow = true; w.add(cont);
  const door = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.0, 0.08), D.materials.steel); door.position.set(wx - c.c20.l/2 + 1.4, 1.0, wz); door.rotation.y = angle; w.add(door);
  const bench = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.8, 0.6), D.materials.wood); bench.position.set(wx - 0.5, 0.4, wz + 0.6); bench.rotation.y = angle; w.add(bench);
  const shelf = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.6, 0.4), D.materials.steel); shelf.position.set(wx + 1, 0.8, wz - 0.6); shelf.rotation.y = angle; w.add(shelf);
  const gh = new THREE.Group(); const ghW = 5.6, ghD = 2.2, ghH = 1.5;
  [[-ghW/2,-ghD/2],[ghW/2,-ghD/2],[-ghW/2,ghD/2],[ghW/2,ghD/2]].forEach(([dx,dz]) => { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,ghH,8), D.materials.steel); p.position.set(dx, ghH/2, dz); gh.add(p); });
  const slope1 = new THREE.Mesh(new THREE.BoxGeometry(ghW, 0.06, ghD/2 + 0.3), D.materials.polycarbonate); slope1.position.set(0, ghH + 0.15, -ghD/4 + 0.05); slope1.rotation.x = -Math.PI/6; gh.add(slope1);
  const slope2 = new THREE.Mesh(new THREE.BoxGeometry(ghW, 0.06, ghD/2 + 0.3), D.materials.polycarbonate); slope2.position.set(0, ghH + 0.15, ghD/4 - 0.05); slope2.rotation.x = Math.PI/6; gh.add(slope2);
  const ridge = new THREE.Mesh(new THREE.BoxGeometry(ghW, 0.08, 0.15), D.materials.steel); ridge.position.set(0, ghH + 0.35, 0); gh.add(ridge);
  const g1 = new THREE.Mesh(new THREE.BoxGeometry(ghW, 0.08, 0.08), D.materials.steel); g1.position.set(0, ghH, -ghD/2); gh.add(g1);
  const g2 = new THREE.Mesh(new THREE.BoxGeometry(ghW, 0.08, 0.08), D.materials.steel); g2.position.set(0, ghH, ghD/2); gh.add(g2);
  gh.position.set(wx, c.c20.h + 0.05, wz); gh.rotation.y = angle; w.add(gh);
  D.scene.add(w); D.register(w, 4); D.label('Atelier + serre', wx, 3.5, wz, 0.8);
};
