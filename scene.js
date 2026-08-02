import * as T from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const DATA = window.D;

const err = (msg) => {
  const e = document.getElementById('error');
  const l = document.getElementById('loading');
  if (e) { e.style.display = 'block'; e.innerHTML = '<strong>Erreur 3D</strong><br>' + msg; }
  if (l) l.style.display = 'none';
  window._3dError = msg;
  window._3dLoaded = false;
  console.error(msg);
};

const ok = () => {
  const l = document.getElementById('loading');
  const u = document.getElementById('ui');
  const f = document.getElementById('fallback2d');
  if (l) l.style.display = 'none';
  if (u) u.style.display = 'block';
  if (f) f.style.display = 'none';
  window._3dLoaded = true;
  window._3dError = null;
};

try {
  if (!DATA) throw new Error('data.js non chargé');
  if (typeof T === 'undefined' || !T.Scene) throw new Error('Three.js non chargé');

  const canvas = document.getElementById('c');
  if (!canvas) throw new Error('Canvas introuvable');

  const renderer = new T.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new T.Scene();
  scene.background = new T.Color(0xe8e6e1);

  const camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(15, 12, 15);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 0, 0);

  scene.add(new T.AmbientLight(0xffffff, 0.6));
  const dl = new T.DirectionalLight(0xffffff, 0.8);
  dl.position.set(10, 20, 10);
  scene.add(dl);

  const ground = new T.Mesh(new T.PlaneGeometry(30, 30), new T.MeshStandardMaterial({ color: 0xd6d2c8 }));
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
  scene.add(new T.GridHelper(30, 30, 0x999999, 0xbbbbbb));

  const zones = [];
  const addZone = (id, x, z, w, d, h) => {
    const box = new T.Mesh(
      new T.BoxGeometry(w, h, d),
      new T.MeshStandardMaterial({ color: new T.Color(DATA[id].c), opacity: 0.85, transparent: true })
    );
    box.position.set(x, h / 2, z);
    box.userData = { id };
    scene.add(box);
    zones.push(box);
  };

  addZone('A', -6, 3, 4, 5, 0.2);
  addZone('B', 3, 2, 8, 6, 0.2);
  addZone('C', -5, -5, 5, 6, 0.2);
  addZone('D', 4, -6, 8, 6, 0.2);
  addZone('E', 0, 8, 6, 4, 0.2);

  const setPhase = (p) => {
    zones.forEach(z => { z.visible = p >= DATA[z.userData.id].p; });
    document.querySelectorAll('#ph button').forEach(b => b.classList.toggle('on', +b.dataset.p === p));
  };

  document.querySelectorAll('#ph button').forEach(b => {
    b.addEventListener('click', () => setPhase(+b.dataset.p));
  });
  setPhase(0);

  const showInfo = (id) => {
    const z = DATA[id];
    if (!z) return;
    const html = '<h3 style="color:' + z.c + '">● Zone ' + id + ' — ' + z.n + '</h3>' +
      '<p><b>Surface:</b> ' + z.s + ' | <b>Phase:</b> ' + z.p + '</p>' +
      '<p><b>Items:</b> ' + z.i + '</p>' +
      '<p><b>Budget:</b> ' + z.b + '</p>' +
      '<p><b>Clés:</b> ' + z.k + '</p>' +
      '<p><b>Points à vérifier:</b></p><ul>' + z.w.split(',').map(x => '<li>' + x.trim() + '</li>').join('') + '</ul>';
    document.getElementById('ib').innerHTML = html;
    document.getElementById('info').classList.add('on');
  };

  window.hide = () => document.getElementById('info').classList.remove('on');

  const ray = new T.Raycaster();
  const mouse = new T.Vector2();
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    ray.setFromCamera(mouse, camera);
    const hits = ray.intersectObjects(zones);
    if (hits.length) showInfo(hits[0].object.userData.id);
  });

  window.rv = () => { camera.position.set(15, 12, 15); controls.target.set(0, 0, 0); controls.update(); };
  window.tv = () => { camera.position.set(0, 20, 0); controls.target.set(0, 0, 0); controls.update(); };

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
  ok();
} catch (e) {
  err(e.message || String(e));
}
