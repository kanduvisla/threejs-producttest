var ProductPresentation = function () {
    "use strict";

    // Variables:
    var _this = this;
    var canvas = document.getElementById('canvas');

    // ThreeJS declarations:
    var renderer = new THREE.WebGLRenderer( { antialias: true } );
    var camera = new THREE.PerspectiveCamera(45, 1.0, 0.1, 10000);
    var scene = new THREE.Scene();

    /**
     * Update the camera
     */
    this.updateCamera = function () {
/*
        var rect = canvas.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height);
        camera.aspect = rect.width / rect.height;
*/
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();    
        renderer.setSize( window.innerWidth, window.innerHeight );
    };

    /**
     * Setup the canvas
     */
    this.setupCanvas = function () {
        scene.add(camera);
        camera.position.z = 1000;
        camera.position.y = 250;
        canvas.appendChild(renderer.domElement);
        
        var plane = new THREE.PlaneGeometry(10000, 10000, 10, 10);
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff });
        var mesh = new THREE.Mesh( plane, material );
        scene.add(mesh);
        mesh.rotation.set(-Math.PI / 2, 0, 0);
        mesh.receiveShadow = true;
        
        renderer.shadowMapEnabled = true;
        renderer.shadowMapType = THREE.PCFSoftShadowMap;
    };

    /**
     * Load the model and add it to the stage:
     */
    this.loadModel = function () {
        var loader = new THREE.JSONLoader(); // init the loader util

        // init loading
/*
        loader.load('js/chair.js', function (geometry) {
            // create a new material
*/
/*
            var material = new THREE.MeshLambertMaterial({
                // map: THREE.ImageUtils.loadTexture('path_to_texture'),  // specify and load the texture
                colorAmbient:[0.5, 0.0, 1] //,
//                colorDiffuse:[0.8, 0.2, 0.3],
//                colorSpecular:[0.7, 0.6, 0.5]
            });
*//*

            // material.shading = THREE.NoShading;
            
            var material = new THREE.MeshLambertMaterial( { color: 0x00FF00, shading: THREE.SmoothShading } );
//            var material2 = new THREE.MeshLambertMaterial( { color: 0xFF0000, shading: THREE.SmoothShading } );
            
//            var materials = [ material, material2 ];
            
            // 20980            
//            for(var i=0; i < 10000; i ++)
//            {
//                geometry.faces[i].materialIndex = 1;
//            }
            
//            console.log(geometry);
            
            // create a mesh with models geometry and material
            var mesh = new THREE.Mesh(
                geometry,
//                new THREE.MeshFaceMaterial( materials )
                material
            );
            
            mesh.geometry.computeVertexNormals();
            mesh.scale.set(0.25, 0.25, 0.25);
            
            scene.add(mesh);
        });
*/
        
        loader.load('js/chair-pillows.js', function (geometry) {
            var material = new THREE.MeshPhongMaterial( { 
                color: 0x53362A,
                shading: THREE.SmoothShading,
                ambient: 0x030303, 
                 specular: 0x030303, 
                 shininess: 200
            } );
            var mesh = new THREE.Mesh(
                geometry,
                material
            );
            mesh.geometry.computeFaceNormals();
            mesh.geometry.computeVertexNormals();
            mesh.scale.set(0.25, 0.25, 0.25);
            mesh.castShadow = true;
            scene.add(mesh);
        });
        
        loader.load('js/chair-frame.js', function (geometry) {
            var material = new THREE.MeshPhongMaterial( {
                color: 0x666666,
                shading: THREE.SmoothShading,
                ambient: 0x030303, 
                 specular: 0x666666, 
                 shininess: 200
            } );
            var mesh = new THREE.Mesh(
                geometry,
                material
            );
            mesh.geometry.computeVertexNormals();
            mesh.castShadow = true;
            mesh.scale.set(0.25, 0.25, 0.25);
            scene.add(mesh);
        });
        

        var pointLight =
            new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 2000;
        pointLight.position.y = 5000;
        pointLight.position.z = 1300;
        // pointLight.castShadow = true;
        
        // add to the scene
        scene.add(pointLight);
        
        var pointLight2 =
            new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight2.position.x = -12000;
        pointLight2.position.y = 1000;
        pointLight2.position.z = -13000;
        // pointLight.castShadow = true;
        
        // add to the scene
        scene.add(pointLight2);
        
    };

    /**
     * Render the scene
     */
    this.render = function () {
        requestAnimationFrame(_this.render);
        renderer.render(scene, camera);
        
        _this.step += 0.01;
        camera.position.set(
            Math.sin(_this.step) * 600, 
            300, 
            Math.cos(_this.step) * 600
        );
        
        camera.lookAt(scene.position);
    };

    this.step = 0;
    
    // Event listeners:
    window.addEventListener('resize', this.updateCamera);

    // Constructor:
    this.updateCamera();
    this.setupCanvas();
    this.loadModel();
    this.render();
};

var productPresentation = new ProductPresentation();