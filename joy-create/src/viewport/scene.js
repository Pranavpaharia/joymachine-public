const { shell, ipcRenderer } = require('electron');
const path = require('path')
const THREE = require('three');
const _ = require('lodash');

import viewport from './viewport';

var ambientLight,
directionalLight,
geometry,
sun,
material,
geometry,
torus;

export const scene = {
  //import Lsystem, { LinkedListToString } from './pcg/lsystem.js'
  //import City from './pcg/city.js'
  //import ShapeGrammar from './pcg/grammar.js'

  //    window.addEventListener('load', () => {
  //    var init = () => {
  //  function init( ) {
  //    var init = () => {
  //    const init = () => {

  init: function () {
    ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    geometry = new THREE.BoxGeometry(10, 10, 10);
    var material = new THREE.MeshBasicMaterial({ color: 0xf8e997 });
    sun = new THREE.Mesh(geometry, material);

    // Let's toss a torus on there too.
    material = new THREE.MeshStandardMaterial({
      map: null,
      color: 0xffffff,
      metalness: 1.0
    });

    var torusGeometry = new THREE.TorusKnotGeometry(18, 8, 150, 20);
    torus = new THREE.Mesh(torusGeometry, material);
    torus.position.x = -18.0;
    torus.castShadow = true;
    torus.receiveShadow = true;

    function renderLight(viewportScene) {
      var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
      var cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);

      directionalLight.color.setHSL(0.1, 1, 0.95);
      directionalLight.position.set(-100, -100, 20);
      directionalLight.castShadow = true;
      directionalLight.shadow.camera.scale.multiplyScalar(2);

      sun.translateX(-100);
      sun.translateY(-100);
      sun.translateZ(20);

      viewportScene.add(directionalLight);
      viewportScene.add(ambientLight);
      viewportScene.add(sun);
      viewportScene.add(torus);
      // viewportadd(directionalLightHelper);
      // viewportadd(cameraHelper);
    };

    function onLoad(viewport) {
      var { camera, renderer, gui, stats1, stats2, stats3 } = viewport;

      function setCamera(camera) {
        camera.position.set(0, -100, 30);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
      };

      function setShadows(renderer, camera) {
        renderer.shadowMap.enabled = true;
        renderer.shadowMapSoft = false;
      };

      renderLight(viewport.scene);
      setCamera(camera);
      setShadows(renderer, camera);

      /*
          var shapeGrammar = new ShapeGrammar(scene);
          var city = new City(scene, shapeGrammar);
          city.renderBase();
          city.renderRings();
          city.renderDivisions();
          city.renderCells();
          city.renderBuildings();
      */
    };

    function onUpdate(onUpdate) {
      var z = new THREE.Vector3(0, 0, 1);

      directionalLight.position.applyAxisAngle(z, Math.PI / 180);
      sun.position.applyAxisAngle(z, Math.PI / 180);
    };

    viewport(onLoad, onUpdate);
  }
};
