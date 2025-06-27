import * as THREE from "three";
import { Vector3 } from "three";
import animation from "three/addons/renderers/common/Animation.js";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

const group = new THREE.Group();
group.position.y = 1;
group.scale.y = 0.5;
group.rotation.y = 1;

scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "blue" }),
);
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green" }),
);
cube2.position.x = -2;
cube3.position.y = -2;

group.add(cube1, cube2, cube3);

//Axis Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

// camera.lookAt(mesh.position);

scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
