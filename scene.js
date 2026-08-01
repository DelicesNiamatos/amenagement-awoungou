import*as T from'three';import{OrbitControls}from'three/addons/controls/OrbitControls.js';
const D=window.D;
const s=new T.Scene();s.background=new T.Color(0xe8e6e1);s.fog=new T.Fog(0xe8e6e1,15,60);
const c=new T.PerspectiveCamera(45,innerWidth/innerHeight,.1,100);c.position.set(18,14,18);
const r=new T.WebGLRenderer({canvas:document.getElementById('c'),antialias:true});r.setSize(innerWidth,innerHeight);r.shadowMap.enabled=true;
const o=new OrbitControls(c,r.domElement);o.enableDamping=true;o.dampingFactor=.05;o.maxPolarAngle=Math.PI/2.2;o.minDistance=5;o.maxDistance=40;o.target.set(0,0,0);
const u=new T.DirectionalLight(0xffffff,1.2);u.position.set(10,20,8);u.castShadow=true;s.add(u);s.add(new T.AmbientLight(0xffffff,.5));
const g=new T.Mesh(new T.PlaneGeometry(30,30),new T.MeshStandardMaterial({color:0xd6d2c8,roughness:.9}));g.rotation.x=-Math.PI/2;g.receiveShadow=true;s.add(g);
const h=new T.GridHelper(30,30,0x999999,0xbbbbbb);h.position.y=.01;s.add(h);
const Z=[];let P=0;
function add(id,x,z,W,D,H){const d=D[id];const G=new T.Group();G.position.set(x,H/2,z);const B=new T.Mesh(new T.BoxGeometry(W,H,D),new T.MeshStandardMaterial({color:d.c,transparent:true,opacity:.85,roughness:.7}));B.castShadow=true;B.receiveShadow=true;B.userData={id};G.add(B);Z.push({G,id,B,H});const e=new T.EdgesGeometry(new T.BoxGeometry(W,H,D));G.add(new T.LineSegments(e,new T.LineBasicMaterial({color:0x333333})));s.add(G);}
add('A',-6,3,4,5,.2);add('B',3,2,8,6,.2);add('C',-5,-5,6,6,.2);add('D',4,-5,7,6,.2);add('E',0,8,6,4,.2);
const Tm={};const cone=new T.ConeGeometry(.25,1,6);const box=new T.BoxGeometry(.4,.4,.4);
function pl(id,n,ht,geom){const a=[];for(let i=0;i<n;i++){const m=new T.Mesh(geom,new T.MeshStandardMaterial({color:0x228b22}));m.castShadow=true;const z=Z.find(z=>z.id===id);m.position.set(z.G.position.x+(Math.random()-.5)*z.B.geometry.parameters.width*.8,ht/2+z.H/2,z.G.position.z+(Math.random()-.5)*z.B.geometry.parameters.depth*.8);m.scale.set(.6,.6,.6);m.visible=false;s.add(m);a.push(m);}Tm[id]=a;}
pl('A',12,.5,cone);pl('B',18,1.2,cone);pl('C',10,.8,cone);pl('D',14,1,cone);pl('E',1,1.5,box);
function sp(p){P=p;document.querySelectorAll('#ph button').forEach(b=>b.classList.toggle('on',+b.dataset.p===p));Object.keys(Tm).forEach(k=>Tm[k].forEach(m=>m.visible=p>=D[k].p));}
sp(0);
const ray=new T.Raycaster(),m=new T.Vector2();
window.addEventListener('pointerdown',e=>{if(e.target.closest('button')||e.target.closest('.p'))return;m.x=(e.clientX/innerWidth)*2-1;m.y=-(e.clientY/innerHeight)*2+1;ray.setFromCamera(m,c);const h=ray.intersectObjects(Z.map(z=>z.B));if(h.length){const z=D[h[0].object.userData.id];let t=`<h3 style="color:${z.c}">● Zone ${h[0].object.userData.id} — ${z.n}</h3>`;t+=`<p><b>Surface:</b> ${z.s} | <b>Phase:</b> ${z.p}</p>`;t+=`<p><b>Items:</b> ${z.i}</p>`;t+=`<p><b>Budget:</b> ${z.b}</p>`;t+=`<p><b>Clés:</b> ${z.k}</p>`;t+=`<p><b>Points à vérifier:</b></p><ul>${z.w.split(',').map(x=>`<li>${x.trim()}</li>`).join('')}</ul>`;document.getElementById('ib').innerHTML=t;document.getElementById('info').classList.add('on');}});
window.hide=function(){document.getElementById('info').classList.remove('on');};
window.rv=function(){c.position.set(18,14,18);o.target.set(0,0,0);o.update();};
window.tv=function(){c.position.set(0,25,0);o.target.set(0,0,0);o.update();};
document.querySelectorAll('#ph button').forEach(b=>b.onclick=()=>sp(+b.dataset.p));
window.addEventListener('resize',()=>{c.aspect=innerWidth/innerHeight;c.updateProjectionMatrix();r.setSize(innerWidth,innerHeight);});
function a(){requestAnimationFrame(a);o.update();r.render(s,c);}a();
