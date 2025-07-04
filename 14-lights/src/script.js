import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#00fffc", 0.9);
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight("#ff0000", "#0000ff", 0.9);
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight("#ff9000", 1.5, 10, 2);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

const rectAreaLight = new THREE.RectAreaLight(0x4e00f, 2, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());

scene.add(rectAreaLight);

const spotLight = new THREE.SpotLight(
  "yellow",
  4.5,
  10,
  Math.PI * 0.1,
  0.25,
  1,
);
spotLight.position.set(0, 2, 3);
spotLight.target.position.x = -0.75;
scene.add(spotLight);
scene.add(spotLight.target);
//
// directionalLight.position.set(1, 0.25, 0);
// const pointLight = new THREE.PointLight(0xffffff, 50);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);
// gui.add(ambientLight, "intensity").min(0).max(3).step(0.001);
// gui.add(directionalLight.position, "x", -10, 10);
// gui.add(directionalLight.position, "y", -10, 10);
// gui.add(directionalLight.position, "z", -10, 10);
// gui.add(hemisphereLight, "intensity").min(0).max(10).step(0.001);
// gui.addColor(hemisphereLight, "color");
// gui.addColor(hemisphereLight, "groundColor");
// gui.add(pointLight.position, "x", -10, 10);
// gui.add(pointLight.position, "y", -10, 10);
// gui.add(pointLight.position, "z", -10, 10);
// gui.add(pointLight, "intensity").min(0).max(10).step(0.001);
// gui.add(pointLight, "distance").min(0).max(10).step(0.001);
// gui.add(pointLight, "decay").min(0).max(10).step(0.001);
// gui.add(rectAreaLight, "x", -10, 10);
// gui.add(rectAreaLight, "y", -10, 10);
// gui.add(rectAreaLight, "z", -10, 10);
// gui.add(spotLight, "intensity").min(0).max(10).step(0.001);
// gui.add(spotLight, "distance").min(0).max(10).step(0.001);
// gui.add(spotLight.target.position, "x", -10, 10);
// gui.add(spotLight.target.position, "y", -10, 10);
// gui.add(spotLight.target.position, "z", -10, 10);

//Helpers
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(
//   hemisphereLight,
//   0.2,
// );
// scene.add(hemisphereLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2,
);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);

// const spotlightHelper = new THREE.HemisphereLightHelper(spotLight);
// scene.add(spotlightHelper);

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material,
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
