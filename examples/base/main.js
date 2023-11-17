import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

const canvas = document.querySelector('#c')
const renderer = new THREE.WebGLRenderer({canvas,antialias:true})
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,5)
camera.position.z = 2

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1,1,1)

const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // 绿蓝色

const cube = new THREE.Mesh(geometry,material)

scene.add(cube)

{
  const color = 0xFFFFFF;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
}

const cubes = [
  makeInstance(geometry, 0x44aa88,  0),
  makeInstance(geometry, 0x8844aa, -2),
  makeInstance(geometry, 0xaa8844,  2),
];

function render(time){
  time *= 0.001

  const canvas = renderer.domElement
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * .1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });
  cube.rotation.x = time
  cube.rotation.y = time
  renderer.render(scene,camera)
  requestAnimationFrame(render)
}

render()


function makeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({color});
 
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
 
  cube.position.x = x;
 
  return cube;
}