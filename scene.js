import * as T from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const DATA = window.D;

const err = (msg) => {
  const e = document.getElementById('error');
  const l = document.getElementById('loading');
  const u = document.getElementById('ui');
  if (e) { e.style.display = 'block'; e.innerHTML = '<strong>Erreur 3D</strong><br>' + msg; }
  if (l) l.style.display = 'none';
  if (u) u.style.display = 'none';
  window._3dError = msg;
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
  if (!DATA) throw new Error('data.js non chargé : window.D est indéfini.');
  if (typeof T === 'undefined' || !T.Scene) throw new Error('Three.js non chargé depuis le CDN.');
  if (typeof OrbitControls === 'undefined') throw new Error('OrbitControls non chargé depuis le CDN.');

  const canvas = document.getElementById('c');
  if (!canvas) throw new Error('Canvas #c introuvable.');

  let renderer;
  try {
    renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: false });
  } catch (glErr) {
    throw new Error('WebGL non disponible sur ce navigateur : ' + (glErr.message || glErr));
  }
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;

  const scene = new T.Scene();
  scene.background = new T.Color(0xe8e6e1);
  scene.fog = new T.Fog(0xe8e6e1, 15, 60);

  const camera = new T.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(18, 14, 18);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2.2;
  controls.minDistance = 5;
  controls.maxDistance = 40;
  controls.target.set(0, 0, 0);

  const light = new T.DirectionalLight(0xffffff, 1.2);
  light.position.set(10, 20, 8);
  light.castShadow = true;
  scene.add(light);
  scene.add(new T.AmbientLight(0xffffff, 0.5));

  const ground = new T.Mesh(new T.PlaneGeometry(30, 30), new T.MeshStandardMaterial({ color: 0xd6d2c8, roughness: 0.9 }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const grid = new T.GridHelper(30, 30, 0x999999, 0xbbbbbb);
  grid.position.y = 0.01;
  scene.add(grid);

  const zones = [];
  function addZone(id, x, z, W, depth, H) {
    const d = DATA[id];
    const group = new T.Group();
    group.position.set(x, H / 2, z);
    const box = new T.Mesh(
      new T.BoxGeometry(W, H, depth),
      new T.MeshStandardMaterial({ color: d.c, transparent: true, opacity: 0.85, roughness: 0.7 })
    );
    box.castShadow = true;
    box.receiveShadow = true;
    box.userData = { id };
    group.add(box);
    zones.push({ group, id, box, H });
    const edges = new T.EdgesGeometry(new T.BoxGeometry(W, H, depth));
    group.add(new T.LineSegments(edges, new T.LineBasicMaterial({ color: 0x333333 })));
    scene.add(group);
  }
  addZone('A', -6, 3, 4, 5, 0.2);
  addZone('B', 3, 2, 8, 6, 0.2);
  addZone('C', -5, -