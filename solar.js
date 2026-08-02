window.DNA = window.DNA || {};
const D = DNA;
D.createSolarAndWater = function() {
  const g = new THREE.Group(); const sx = 8, sz = 18;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.05, 1.6), D.materials.solar);
      panel.position.set(sx + r * 1.2, 0.6, sz + c * 1.8); panel.rotation.x = -Math.PI / 8; panel.castShadow = true; g.add(panel);
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.6, 0.05), D.materials.steel); leg.position.set(sx + r * 1.2, 0.3, sz + c * 1.8 - 0.6); g.add(leg);
    }
  }
  const cabinet = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.4, 0.8), D.materials.steel); cabinet.position.set(sx + 2, 0.7, sz - 1.5); cabinet.castShadow = true; g.add(cabinet);
  const pumpPanel = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.05), D.materials.solar); pumpPanel.position.set(7, 0.5, 5); pumpPanel.rotation.x = -Math.PI/10; g.add(pumpPanel);
  const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 1.6, 24), new THREE.MeshStandardMaterial({color:0xffffff})); tank.position.set(9, 0.8, 8); tank.castShadow = true; g.add(tank);
  const pipeMat = new THREE.LineBasicMaterial({color:D.COLORS.water});
  const pipes = [[[7,0.05,5],[9,0.05,8]], [[9,0.05,8],[-2,0.05,8]], [[9,0.05,8],[-10,0.05,-18]], [[9,0.05,8],[-4,0.05,18]]];
  pipes.forEach(([a,b]) => { const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a), new THREE.Vector3(...b)]); g.add(new THREE.Line(geo, pipeMat)); });
  D.scene.add(g); D.register(g, 4); D.label('Centrale solaire + eau', sx + 2, 2.5, sz - 2, 0.8);
};
