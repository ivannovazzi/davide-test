import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader();

// init

async function init(): Promise<THREE.Scene> {
  return new Promise((resolve, reject) => {

    function animation(time: number ) {
      renderer.render( scene, camera );
    }  

    const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;

    const scene = new THREE.Scene();

    // const geometry = new THREE.BoxGeometry( 0.2, 0.3, 0.6 );
    // const material = new THREE.MeshNormalMaterial();

    // const mesh = new THREE.Mesh( geometry, material );
    // scene.add( mesh );

    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    scene.add( light );

    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animation );
    
    // @ts-ignore
    document.getElementById("three").appendChild( renderer.domElement );
    resolve(scene);
  });
}

function loadModel(scene: THREE.Scene) {
  const link = "https://cdn.cadcrowd.com/3d-models/21/28/2128bb3c-d673-4031-a08a-1df6d8105930/viewer/50553642-b5b5-44bd-ae12-c60a4799abe7/wolvic_3d_model.glb";
  loader.load(link, function ( gltf ) {
    scene.add( gltf.scene );
    // now it scales the model down a factor of 100
    // gltf.scene.scale.set(0.01, 0.01, 0.01);
    // now starts an animation loop that rotates the model continously
    gltf.scene.rotation.y = 0.5;
    gltf.scene.rotation.x = 0.5;
    
  }, function(progress: ProgressEvent){
    const bar = document.getElementById("bar");
    const perc = progress.loaded / progress.total * 100;
    // @ts-ignore
    bar.style.width = `${perc}%`;

  }, function ( error ) {
  
    console.error( error );
  
  } );
}


export default function ThreeComponent() {
  React.useEffect(() => {
    init().then(loadModel);
  }
  , []);
    return (
        <div>
            <h1>Three</h1>
            <div id="progress" style={{width: "100%", height: "20px"}}>
                <div id="bar" style={{height: "100%", background: "red"}} />
            </div>
            <div id="three"></div>
        </div>
    )
}