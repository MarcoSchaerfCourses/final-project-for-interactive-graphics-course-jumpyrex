// Set the scene size.
const WIDTH = 1024;
const HEIGHT = 512;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;
// Get the DOM element to attach to
var container;
var renderer;
var camera;
var scene;

var jumpingUp = false;
var jumpingDown = false;
var headAnimation = false;

var allPaused = false;
var ptsInterval;
// var obstaclesInterval;
var headAnimationTimeInMs = 5000;

var obstacle_list = [];

// function initObstacleTimer(){
//     obstaclesInterval = setInterval(function(){console.log("niente")}, 1000);
// }

// function removeObstacleTimer(){
//     clearInterval(obstaclesInterval);
// }

function initSun(){
    // Set up the bosom vars
    const RADIUS = 15;
    const SEGMENTS = 16;
    const HEIGHT = 60;

    // Create a new mesh with
    // bosom geometry - we will cover
    // the bosomMaterial next!
    var cactus = new THREE.Mesh(

        new THREE.SphereGeometry(
            RADIUS,
            HEIGHT,
            SEGMENTS),

        sunMaterial);

    // Move the Sphere back in Z so we
    // can see it.
    cactus.position.z = -600;
    cactus.position.x = -300;
    cactus.position.y = 200;
    // scene.add(cactus);
    scene.add(cactus)
    // collidableMeshList = [cactus];
}

var cloud1;
var cloud4;
var cloud7;
var cloud10;
function initCloud(){
    // Set up the bosom vars
    const RADIUS = 30;
    const SEGMENTS = 16;
    const HEIGHT = 60;

    cloud1 = new THREE.Mesh(

        new THREE.SphereGeometry(
            RADIUS,
            HEIGHT,
            SEGMENTS),

        cloudMaterial);

    cloud1.position.z = -500;
    cloud1.position.x = 300;
    cloud1.position.y = 150;

    scene.add(cloud1);

    var cloud2 = new THREE.Mesh(

        new THREE.SphereGeometry(
            25,
            HEIGHT,
            SEGMENTS),

        cloudMaterial);

    cloud2.position.x = -30;
    cloud2.position.y = +20;
    // scene.add(cactus);
    cloud1.add(cloud2);

    var cloud3 = new THREE.Mesh(

        new THREE.SphereGeometry(
            20,
            HEIGHT,
            SEGMENTS),

        cloudMaterial);

    cloud3.position.x = +30;
    cloud3.position.y = +10;
    // scene.add(cactus);
    cloud1.add(cloud3);

    cloud4 = new THREE.Mesh(

        new THREE.SphereGeometry(
            RADIUS-5,
            HEIGHT,
            SEGMENTS),

        cloudMaterial);

    cloud4.position.z = -600;
    cloud4.position.x = 60;
    cloud4.position.y = 120;

    scene.add(cloud4);

    var cloud6 = new THREE.Mesh(

        new THREE.SphereGeometry(
            RADIUS-5,
            HEIGHT,
            SEGMENTS),

        cloudMaterial);

    cloud6.position.x = +30;

    cloud4.add(cloud6);

    cloud7 = new THREE.Mesh(

        new THREE.SphereGeometry(
            25,
            HEIGHT,
            SEGMENTS),

        cloudMaterial);

    cloud7.position.z = -500;
    cloud7.position.x = -300;
    cloud7.position.y = 110;

    scene.add(cloud7);

    var cloud8 = new THREE.Mesh(

        new THREE.SphereGeometry(
            20,
            HEIGHT,
            SEGMENTS),

        cloudMaterial);

    cloud8.position.x = -30;
    cloud8.position.y = -2;
    // scene.add(cactus);
    cloud7.add(cloud8);

    var cloud9 = new THREE.Mesh(

        new THREE.SphereGeometry(
            30,
            HEIGHT,
            SEGMENTS),

        cloudMaterial);

    cloud9.position.x = +30;
    cloud9.position.y = +5;
    // scene.add(cactus);
    cloud7.add(cloud9);


    cloud10 = new THREE.Mesh(

        new THREE.SphereGeometry(
            RADIUS,
            HEIGHT,
            SEGMENTS),

        cloudMaterial);

    cloud10.position.z = -600;
    cloud10.position.x = 300;
    cloud10.position.y = -5;

    scene.add(cloud10);

    var cloud11 = new THREE.Mesh(

        new THREE.SphereGeometry(
            25,
            HEIGHT,
            SEGMENTS),

        cloudMaterial);

    cloud11.position.x = -30;
    cloud11.position.y = -10;
    // scene.add(cactus);
    cloud10.add(cloud11);

    var cloud12 = new THREE.Mesh(

        new THREE.SphereGeometry(
            20,
            HEIGHT,
            SEGMENTS),

        cloudMaterial);

    cloud12.position.x = +30;
    cloud12.position.y = -10;
    // scene.add(cactus);
    cloud10.add(cloud12);
}

function randomObstacle(){
    var index = Math.floor(Math.random() * ((obstacle_list.length-1) + 1));
    console.log("SPAWNING OBJCET N: "+index);
    spawnObstacle(obstacle_list[index]);
}

function spawnObstacle(obs) {
    currObstacle = obs;
    scene.add(currObstacle);
}

function initObstacles(){
    obstacle_list = [initCactus(80, -70, "big", 10), initCactus(50, -85, "small", 7), initBird()];
    // initObstacleTimer();
}

function showMenu(){
    document.getElementById("menuOverlay").style.display = "block";
}

function showColor(){
    document.getElementById("colorOverlay").style.display = "block";
}

function go2Menu(){
    destroyScene();
    showMenu();
    document.getElementById("overlay").style.display = "none";
}

function hideMenu(){
    document.getElementById("menuOverlay").style.display = "none";
    document.getElementById("colorOverlay").style.display = "none";
}

function startGame(){
    hideMenu();
    initAll();
    requestAnimationFrame(update);
}

var rexColors = ["reptile_skin_2.jpg", "reptile_skin_2_orange.jpg", "reptile_skin_2_purple.jpg", "reptile_skin_2_blue.jpg"];
var selected_rex_color = rexColors[0];
function setRexColor(index){
    selected_rex_color = rexColors[index];
    console.log(selected_rex_color);
}

function on() {
    allPaused = true;
    clearInterval(ptsInterval);
    // removeObstacleTimer();
    document.getElementById("overlay").style.display = "block";
}

function destroyScene(){
    // clearInterval(ptsInterval);
    erasePts();
    renderer.domElement.addEventListener('dblclick', null, false); //remove listener to render
    scene = null;
    camera = null;
    empty(container);
}

function off() {
    destroyScene();
    initAll();
    document.getElementById("overlay").style.display = "none";
}

function empty(elem) {
    while (elem.lastChild) elem.removeChild(elem.lastChild);
}

function initBooleans(){
    jumpingUp = false;
    jumpingDown = false;
    headAnimation = false;
    move_right_arm_forward = true;
    move_left_arm_forward = true;
    left_arm_can_move = false;
    moving_right_leg = true;
    moving_right_leg_forward = true;
    moving_left_leg = false;
    moving_left_leg_forward = true;
    allPaused = false;
}

function initAll(){
    initBooleans();
    initScene();
    initRex();
    initSun();
    initCloud();
    // initCactus();
    initLight();
    initPtsCount();
    initObstacles();
    randomObstacle();
}

var pts = 0;
function initPtsCount(){
    ptsInterval = setInterval(function(){pts += 1; document.getElementById("pts").innerHTML = ""+pts}, 1000);
}

function erasePts(){
    pts = 0;
    document.getElementById("pts").innerHTML = ""+pts;
}

function initScene(){
    // Create a WebGL renderer, camera
    // and a scene
    container = document.getElementById('container');
    renderer = new THREE.WebGLRenderer();
    camera =
        new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        );

    // var texture = new THREE.TextureLoader().load( "textures/deserthd.jpg" );
    var texture = new THREE.TextureLoader().load( "textures/sfondosimple.png" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set( 1, 1 );
    texture.anisotropy = renderer.getMaxAnisotropy();
    scene = new THREE.Scene();
    scene.background = texture;

    // Add the camera to the scene.
    scene.add(camera);

    // Start the renderer.
    renderer.setSize(WIDTH, HEIGHT);

    // Attach the renderer-supplied
    // DOM element.
    container.appendChild(renderer.domElement);
}

var bosom;
var group;
var chest;
var back;
var head;
var geometry;
var tailGroup;
var tailSubGroup;
var tail2;
var zAxis = new THREE.Vector3(0,0,1);
var xAxis = new THREE.Vector3(1,0,0);
var yAxis = new THREE.Vector3(0,1,0);
var currObstacle = null;
// create the bosom's material

var texture_skin = new THREE.TextureLoader().load('textures/reptile_skin_2.jpg');
texture_skin.repeat.set(1,1);

var texture_cactus = new THREE.TextureLoader().load('textures/cactus.jpg');
texture_skin.repeat.set(1,1);

var texture_feather = new THREE.TextureLoader().load('textures/feather2.jpg');
texture_skin.repeat.set(1,1);

var bosomMaterial =
    new THREE.MeshLambertMaterial({map: texture_skin});

const eyeMaterial =
    new THREE.MeshLambertMaterial({color: 0x000000});

const sunMaterial =
    new THREE.MeshLambertMaterial({color: "yellow"});

const cactusMaterial =
    new THREE.MeshLambertMaterial({map:texture_cactus});

const birdMaterial =
    new THREE.MeshLambertMaterial({map:texture_feather});

const cloudMaterial =
    new THREE.MeshLambertMaterial({color: "white"});

const peckerMaterial =
    new THREE.MeshLambertMaterial({color: "orange"});

function deg2rad(deg){
    return deg*(Math.PI/180);
}

function initRex(){
    // Set up the bosom vars

    texture_skin = new THREE.TextureLoader().load('textures/'+selected_rex_color);
    texture_skin.repeat.set(1,1);

    bosomMaterial =
        new THREE.MeshLambertMaterial({map: texture_skin});

    const RADIUS = 25;
    const SEGMENTS = 16;
    const RINGS = 16;

    // Create a new mesh with
    // bosom geometry - we will cover
    // the bosomMaterial next!
    bosom = new THREE.Mesh(

        new THREE.SphereGeometry(
            RADIUS,
            SEGMENTS,
            RINGS),

        bosomMaterial);

    // Move the Sphere back in Z so we
    // can see it.
    bosom.position.z = -300;
    bosom.position.x = -100;
    bosom.position.y = -35;
    scene.add(bosom);

    geometry = new THREE.CylinderGeometry( 7, 17, 27, 32 );
    chest = new THREE.Mesh( geometry, bosomMaterial );
    // chest.position.z = -300;
    chest.position.x = RADIUS*1.05;
    chest.position.y = -(bosom.position.y + RADIUS-7);
    rotateAroundWorldAxis(chest, zAxis, deg2rad(-55));

    bosom.add(chest);

    // var pivotPoint = new THREE.Object3D();
    // chest.add(pivotPoint);

    geometry = new THREE.BoxGeometry( 35, 19, 25 );
    head = new THREE.Mesh( geometry, bosomMaterial );
    // head.position.z = -300;
    head.position.x = 10;
    head.position.y = 25;
    // rotateAroundObjectAxis(head, yAxis, deg2rad(180));
    // chest.add(head);
    // pivotPoint.add(head);

    chest.add(head);

    geometry = new THREE.SphereGeometry( 3, 16, 16 );
    var right_eye = new THREE.Mesh( geometry, eyeMaterial );
    // right_eye.position.z = head.position.z+5;
    right_eye.position.x = -7;
    right_eye.position.y = +2;

    head.add(right_eye);
    right_eye.position.z = head.position.z + 20;
    // console.log(right_eye.position.z);

    geometry = new THREE.CylinderGeometry( 10, 17, 27, 32 );
    back = new THREE.Mesh( geometry, bosomMaterial );
    // back.position.z = -300;
    back.position.x =  - RADIUS;
    back.position.y =  - 4;
    rotateAroundWorldAxis(back, zAxis, deg2rad(95));

    bosom.add(back);

    group = new THREE.Object3D();//create an empty container
    // group.add( bosom );//add a mesh with geometry to it
    // group.add( chest );//add a mesh with geometry to it
    // group.add( head );
    // // group.add( back );
    // group.add( right_eye );

    bosom.add( createRightLegGroup() );
    bosom.add( createLeftLegGroup() );
    chest.add( createRightArmGroup() );
    chest.add( createLeftArmGroup() );
    // tailGroup = createTailGroup(RADIUS);
    // tailGroup.add(back);
    back.add( createTailGroup(RADIUS) );

    collidableMeshList = [bosom, chest, head, back, tail1, tail2, left_upper_arm, left_lower_arm, right_upper_arm, right_lower_arm, left_lower_leg, left_mean_leg, left_upper_leg, right_lower_leg, right_mean_leg, right_upper_leg, left_foot, right_foot];

    // bosom.add(group);


    // rotateAroundWorldAxis(group_right_leg, yAxis, 40*(Math.PI / 180));
    // scene.add( group );//when done, add the group to the scene

    initHeadAnimationTimer(headAnimationTimeInMs);
}

function initHeadAnimationTimer(timeInMs){
    window.setInterval(initHeadAnimation, timeInMs);
}

function initHeadAnimation(){
    // console.log("FACCIO PARTIRE ANIMAZIONE HEAD");
    headAnimation = true;
}

var tail1;
function createTailGroup(RADIUS){
    geometry = new THREE.CylinderGeometry( 7, 10, 29, 32 );
    tail1 = new THREE.Mesh( geometry, bosomMaterial );
    // tail1.position.z = -300;
    // tail1.position.x = - 7;
    tail1.position.y = 27;
    // rotateAroundWorldAxis(tail1, zAxis, deg2rad(120));

    geometry = new THREE.CylinderGeometry( 2, 7, 29, 32 );
    tail2 = new THREE.Mesh( geometry, bosomMaterial );
    // tail2.position.z = -300;
    // tail2.position.x = - RADIUS*1.02;
    tail2.position.y = 27;
    // rotateAroundWorldAxis(tail2, zAxis, deg2rad(100));

    tail1.add(tail2);

    // var tail_group = new THREE.Object3D();
    // // tail_group.add(tail1);
    // // tail_group.add(tail2);
    //
    // tailSubGroup = new THREE.Object3D();
    // tailSubGroup.add(tail1);
    // tailSubGroup.add(tail2);
    //
    // tail_group.add(tailSubGroup);

    return tail1;
}

var right_upper_arm;
var right_lower_arm;
var right_hand;
var move_right_arm_forward = true;
function createRightArmGroup(){
    geometry = new THREE.CylinderGeometry( 3, 3, 18, 32 );
    right_upper_arm = new THREE.Mesh( geometry, bosomMaterial );
    right_upper_arm.position.z = 20;
    right_upper_arm.position.x = 17;
    right_upper_arm.position.y = -8;
    right_upper_arm.rotation.z = deg2rad(75);

    geometry = new THREE.CylinderGeometry( 3, 3, 15, 32 );
    right_lower_arm = new THREE.Mesh( geometry, bosomMaterial );
    right_lower_arm.position.x = 4;
    right_lower_arm.position.y = -13;
    right_lower_arm.rotation.z = deg2rad(40);

    right_upper_arm.add(right_lower_arm);

    geometry = new THREE.CylinderGeometry( 3, 5, 5, 32 );
    right_hand = new THREE.Mesh( geometry, bosomMaterial );
    right_hand.position.x = 1;
    right_hand.position.y = -10;
    right_hand.rotation.z = deg2rad(20);

    right_lower_arm.add(right_hand);

    geometry = new THREE.CylinderGeometry( 1, 1, 8, 32 );
    var right_finger1 = new THREE.Mesh( geometry, bosomMaterial );
    right_finger1.position.x = 3;
    right_finger1.position.y = -3;
    right_finger1.rotation.z = deg2rad(10);

    right_hand.add(right_finger1);

    geometry = new THREE.CylinderGeometry( 1, 1, 7, 32 );
    var right_finger2 = new THREE.Mesh( geometry, bosomMaterial );
    right_finger2.position.x = -2;
    right_finger2.position.y = -3;
    right_finger2.rotation.z = deg2rad(10);

    right_hand.add(right_finger2);
    return right_upper_arm;
}

var left_upper_arm;
var left_lower_arm;
var left_hand;
var move_left_arm_forward = true;
var left_arm_can_move = false;
function createLeftArmGroup(){
    geometry = new THREE.CylinderGeometry( 3, 3, 18, 32 );
    left_upper_arm = new THREE.Mesh( geometry, bosomMaterial );
    left_upper_arm.position.z = -20;
    left_upper_arm.position.x = 17;
    left_upper_arm.position.y = -8;
    left_upper_arm.rotation.z = deg2rad(75);

    geometry = new THREE.CylinderGeometry( 3, 3, 15, 32 );
    left_lower_arm = new THREE.Mesh( geometry, bosomMaterial );
    left_lower_arm.position.x = 4;
    left_lower_arm.position.y = -13;
    left_lower_arm.rotation.z = deg2rad(40);

    left_upper_arm.add(left_lower_arm);

    geometry = new THREE.CylinderGeometry( 3, 5, 5, 32 );
    left_hand = new THREE.Mesh( geometry, bosomMaterial );
    left_hand.position.x = 1;
    left_hand.position.y = -10;
    left_hand.rotation.z = deg2rad(20);

    left_lower_arm.add(left_hand);

    geometry = new THREE.CylinderGeometry( 1, 1, 8, 32 );
    var left_finger1 = new THREE.Mesh( geometry, bosomMaterial );
    left_finger1.position.x = 3;
    left_finger1.position.y = -3;
    left_finger1.rotation.z = deg2rad(10);

    left_hand.add(left_finger1);

    geometry = new THREE.CylinderGeometry( 1, 1, 7, 32 );
    var left_finger2 = new THREE.Mesh( geometry, bosomMaterial );
    left_finger2.position.x = -2;
    left_finger2.position.y = -3;
    left_finger2.rotation.z = deg2rad(10);

    left_hand.add(left_finger2);
    return left_upper_arm;
}

var right_upper_leg;
var right_mean_leg;
var right_lower_leg;
var right_foot;
var moving_right_leg = true;
var moving_right_leg_forward = true;

var speed_var = 3;
function move_right_leg_phase2(){
    if(moving_right_leg){
        if(right_upper_leg.rotation.z < deg2rad(70) && moving_right_leg_forward){
            right_upper_leg.rotation.z += deg2rad(0.4)*speed_var;
            right_mean_leg.rotation.z -= deg2rad(0.8)*speed_var;
            right_mean_leg.position.x -= 0.1*speed_var;
            right_mean_leg.position.y += 0.2*speed_var;
            right_lower_leg.rotation.z += deg2rad(0.4)*speed_var;
            right_lower_leg.position.x += 0.07*speed_var;
            right_foot.rotation.z -= deg2rad(0.3)*speed_var;
            right_lower_leg.position.y += 0.0001*speed_var;
        }
        if(right_upper_leg.rotation.z >= deg2rad(70)){
            moving_right_leg_forward = false;
            moving_left_leg = true;
        }
        if(!moving_right_leg_forward && right_upper_leg.rotation.z > deg2rad(20)){
            right_upper_leg.rotation.z -= deg2rad(0.4)*speed_var;
            right_mean_leg.rotation.z += deg2rad(0.8)*speed_var;
            right_mean_leg.position.x += 0.1*speed_var;
            right_mean_leg.position.y -= 0.2*speed_var;
            right_lower_leg.rotation.z -= deg2rad(0.4)*speed_var;
            right_lower_leg.position.x -= 0.07*speed_var;
            right_foot.rotation.z += deg2rad(0.3)*speed_var;
            right_lower_leg.position.y -= 0.0001*speed_var;
        }
        if(right_upper_leg.rotation.z <= deg2rad(20)){
            moving_right_leg_forward = true;
        }
    }
}

function createRightLegGroup(){
    geometry = new THREE.CylinderGeometry( 13, 8, 30, 32 );
    right_upper_leg = new THREE.Mesh( geometry, bosomMaterial );
    right_upper_leg.position.z = 17;
    right_upper_leg.position.x = 5;
    right_upper_leg.position.y = -20;
    right_upper_leg.rotation.z = deg2rad(20);

    // rotateAroundWorldAxis(right_upper_leg, zAxis, deg2rad(25));

    geometry = new THREE.CylinderGeometry( 8, 5, 32, 27 );
    right_mean_leg = new THREE.Mesh( geometry, bosomMaterial );
    // right_mean_leg.position.z = right_upper_leg.position.z;
    right_mean_leg.position.x = -7;
    right_mean_leg.position.y = -26;
    right_mean_leg.rotation.z = deg2rad(-30);

    // rotateAroundWorldAxis(right_mean_leg, zAxis, deg2rad(-25));
    right_upper_leg.add(right_mean_leg);

    geometry = new THREE.CylinderGeometry( 5, 5, 17, 27 );
    right_lower_leg = new THREE.Mesh( geometry, bosomMaterial );
    // right_lower_leg.position.z = right_mean_leg.position.z;
    right_lower_leg.position.x = 1;
    right_lower_leg.position.y = -20;
    right_lower_leg.rotation.z = deg2rad(13);

    // rotateAroundWorldAxis(right_lower_leg, zAxis, deg2rad(15));
    right_mean_leg.add(right_lower_leg);

    geometry = new THREE.BoxGeometry( 25, 7, 10 );
    right_foot = new THREE.Mesh( geometry, bosomMaterial );
    // right_foot.position.z = right_lower_leg.position.z;
    right_foot.position.x = +9;
    right_foot.position.y = -7;

    right_lower_leg.add(right_foot);

    // var group_right_leg = new THREE.Object3D();
    //
    // right_lower_leg.add(right_foot);
    // right_mean_leg.add(right_lower_leg);
    // right_upper_leg.add(right_mean_leg);
    //
    // group_right_leg.add(right_upper_leg);
    // group_right_leg.add(right_mean_leg);
    // group_right_leg.add(right_lower_leg);
    // group_right_leg.add(right_foot);

    return right_upper_leg;
}

var left_upper_leg;
var left_mean_leg;
var left_lower_leg;
var left_foot;
var moving_left_leg = false;
var moving_left_leg_forward = true;

function createLeftLegGroup(){
    geometry = new THREE.CylinderGeometry( 13, 8, 30, 32 );
    left_upper_leg = new THREE.Mesh( geometry, bosomMaterial );
    left_upper_leg.position.z = -17;
    left_upper_leg.position.x = 5;
    left_upper_leg.position.y = -20;
    left_upper_leg.rotation.z = deg2rad(20);

    // rotateAroundWorldAxis(right_upper_leg, zAxis, deg2rad(25));

    geometry = new THREE.CylinderGeometry( 8, 5, 32, 27 );
    left_mean_leg = new THREE.Mesh( geometry, bosomMaterial );
    // right_mean_leg.position.z = right_upper_leg.position.z;
    left_mean_leg.position.x = -7;
    left_mean_leg.position.y = -26;
    left_mean_leg.rotation.z = deg2rad(-30);

    // rotateAroundWorldAxis(right_mean_leg, zAxis, deg2rad(-25));
    left_upper_leg.add(left_mean_leg);

    geometry = new THREE.CylinderGeometry( 5, 5, 17, 27 );
    left_lower_leg = new THREE.Mesh( geometry, bosomMaterial );
    // right_lower_leg.position.z = right_mean_leg.position.z;
    left_lower_leg.position.x = 1;
    left_lower_leg.position.y = -20;
    left_lower_leg.rotation.z = deg2rad(13);

    // rotateAroundWorldAxis(right_lower_leg, zAxis, deg2rad(15));
    left_mean_leg.add(left_lower_leg);

    geometry = new THREE.BoxGeometry( 25, 7, 10 );
    left_foot = new THREE.Mesh( geometry, bosomMaterial );
    // right_foot.position.z = right_lower_leg.position.z;
    left_foot.position.x = +9;
    left_foot.position.y = -7;

    left_lower_leg.add(left_foot);

    // var group_right_leg = new THREE.Object3D();
    //
    // right_lower_leg.add(right_foot);
    // right_mean_leg.add(right_lower_leg);
    // right_upper_leg.add(right_mean_leg);
    //
    // group_right_leg.add(right_upper_leg);
    // group_right_leg.add(right_mean_leg);
    // group_right_leg.add(right_lower_leg);
    // group_right_leg.add(right_foot);

    return left_upper_leg;
}

function move_left_leg_phase2(){
    if(moving_left_leg){
        if(left_upper_leg.rotation.z < deg2rad(70) && moving_left_leg_forward){
            left_upper_leg.rotation.z += deg2rad(0.4)*speed_var;
            left_mean_leg.rotation.z -= deg2rad(0.8)*speed_var;
            left_mean_leg.position.x -= 0.1*speed_var;
            left_mean_leg.position.y += 0.2*speed_var;
            left_lower_leg.rotation.z += deg2rad(0.4)*speed_var;
            left_lower_leg.position.x += 0.07*speed_var;
            left_foot.rotation.z -= deg2rad(0.3)*speed_var;
            left_lower_leg.position.y += 0.0001*speed_var;
        }
        if(left_upper_leg.rotation.z >= deg2rad(70)){
            moving_left_leg_forward = false;
        }
        if(!moving_left_leg_forward && left_upper_leg.rotation.z > deg2rad(20)){
            left_upper_leg.rotation.z -= deg2rad(0.4)*speed_var;
            left_mean_leg.rotation.z += deg2rad(0.8)*speed_var;
            left_mean_leg.position.x += 0.1*speed_var;
            left_mean_leg.position.y -= 0.2*speed_var;
            left_lower_leg.rotation.z -= deg2rad(0.4)*speed_var;
            left_lower_leg.position.x -= 0.07*speed_var;
            left_foot.rotation.z += deg2rad(0.3)*speed_var;
            left_lower_leg.position.y -= 0.0001*speed_var;
        }
        if(left_upper_leg.rotation.z <= deg2rad(20)){
            moving_left_leg_forward = true;
        }
    }
}

function updateRexJumpingState () {

    if(jumpingUp){
        if(bosom.position.y < 100){
            bosom.position.y += 7;
        }else{
            jumpingUp = false;
            jumpingDown = true;
        }
    }if(jumpingDown) {
        if (bosom.position.y > -35 && bosom.position.y < 200) {
            bosom.position.y -= 7;
        } else {
            jumpingDown = false;
        }
    }
}

var headGoingUp = true;
function updateRexHeadMovement (){
    if(headAnimation){
        if(headGoingUp && head.rotation.z < deg2rad(17)){
            head.rotation.z += deg2rad(0.4);
        }
        if(head.rotation.z >= deg2rad(10)){
            headGoingUp = false;
        }
        if(!headGoingUp && head.rotation.z > deg2rad(-10)){
            head.rotation.z -= deg2rad(0.4);
        }
        if(head.rotation.z <= deg2rad(-10)){
            headGoingUp = true;
        }
    }
}

var tailGoingDown = true;

function updateRexTailMovement (){
   if(tailGoingDown && back.rotation.z < deg2rad(110)){
       back.rotation.z += deg2rad(0.4);
       tail1.rotation.z += deg2rad(0.2);
       tail2.rotation.z += deg2rad(0.2);
   }
   if(back.rotation.z >= deg2rad(110)){
       tailGoingDown = false;
   }
   if(!tailGoingDown && back.rotation.z > deg2rad(70)){
       back.rotation.z -= deg2rad(0.4);
       tail1.rotation.z -= deg2rad(0.2);
       tail2.rotation.z -= deg2rad(0.2);
   }
   if(back.rotation.z <= deg2rad(70)){
       tailGoingDown = true;
   }
}

function updateRexHorizontalMovement(){
    bosom.position.x += 0.4;
}

function move_right_arm(){
    if(right_upper_arm.rotation.z < deg2rad(70) && move_right_arm_forward){
        right_upper_arm.rotation.z += deg2rad(0.4);
    }
    if(right_upper_arm.rotation.z >= deg2rad(70)){
        move_right_arm_forward = false;
    }
    if(!move_right_arm_forward && right_upper_arm.rotation.z > deg2rad(50)){
        right_upper_arm.rotation.z -= deg2rad(0.4);
    }
    if(right_upper_arm.rotation.z <= deg2rad(50)){
        left_arm_can_move = true;
        move_right_arm_forward = true;
    }
}

function move_left_arm(){
    if(left_arm_can_move){
        if(left_upper_arm.rotation.z < deg2rad(70) && move_left_arm_forward){
            left_upper_arm.rotation.z += deg2rad(0.4);
        }
        if(left_upper_arm.rotation.z >= deg2rad(70)){
            move_left_arm_forward = false;
        }
        if(!move_left_arm_forward && left_upper_arm.rotation.z > deg2rad(50)){
            left_upper_arm.rotation.z -= deg2rad(0.4);
        }
        if(left_upper_arm.rotation.z <= deg2rad(50)){
            move_left_arm_forward = true;
        }
    }
}

function initLight(){
    // create a point light
    const pointLight =
        new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = 0;
    pointLight.position.y = 0;
    pointLight.position.z = 0;

    // add to the scene
    scene.add(pointLight);

    // Draw!
    // renderer.render(scene, camera);
}

// var cactus;
function initCactus  (h, y, type, r){
    // Set up the bosom vars
    const RADIUS = r;
    const SEGMENTS = 16;
    const HEIGHT = h;

    // Create a new mesh with
    // bosom geometry - we will cover
    // the bosomMaterial next!
    var cactus = new THREE.Mesh(

        new THREE.CylinderGeometry(
            RADIUS,
            RADIUS,
            HEIGHT,
            SEGMENTS),

        cactusMaterial);

    // Move the Sphere back in Z so we
    // can see it.
    cactus.position.z = -300;
    cactus.position.x = 512;
    cactus.position.y = y;

    if(type === "big"){
        var arm_middle = new THREE.Mesh(

            new THREE.CylinderGeometry(
                8,
                8,
                40,
                SEGMENTS),

            cactusMaterial);
        cactus.add(arm_middle);
        arm_middle.rotation.z = -1.6;
        arm_middle.position.x = -3;

        var arm_right = new THREE.Mesh(

            new THREE.CylinderGeometry(
                8,
                8,
                35,
                SEGMENTS),

            cactusMaterial);
        arm_middle.add(arm_right);
        arm_right.rotation.z = -1.5;
        arm_right.position.y = -22;
        arm_right.position.x = -11;

        var arm_left = new THREE.Mesh(

            new THREE.CylinderGeometry(
                8,
                8,
                35,
                SEGMENTS),

            cactusMaterial);
        arm_middle.add(arm_left);
        arm_left.rotation.z = 1.5;
        arm_left.position.y = 24;
        arm_left.position.x = -11;
    }else{
        var arm_middle = new THREE.Mesh(

            new THREE.CylinderGeometry(
                6,
                6,
                40,
                SEGMENTS),

            cactusMaterial);
        cactus.add(arm_middle);
        arm_middle.rotation.z = -1.6;
        arm_middle.position.x = 0;

        var arm_right = new THREE.Mesh(

            new THREE.CylinderGeometry(
                6,
                6,
                20,
                SEGMENTS),

            cactusMaterial);
        arm_middle.add(arm_right);
        arm_right.rotation.z = -1.4;
        arm_right.position.y = -17;
        arm_right.position.x = -7;

        var arm_left = new THREE.Mesh(

            new THREE.CylinderGeometry(
                6,
                6,
                20,
                SEGMENTS),

            cactusMaterial);
        arm_middle.add(arm_left);
        arm_left.rotation.z = 1.4;
        arm_left.position.y = 17;
        arm_left.position.x = -7;
    }
    // scene.add(cactus);
    return cactus;
    // collidableMeshList = [cactus];
}

var left_wing;
var right_wing;
function initBird(){
    // Set up the bosom vars
    const RADIUS = 15;
    const SEGMENTS = 16;
    const HEIGHT = 60;

    // Create a new mesh with
    // bosom geometry - we will cover
    // the bosomMaterial next!
    var cactus = new THREE.Mesh(

        new THREE.SphereGeometry(
            RADIUS,
            HEIGHT,
            SEGMENTS),

        birdMaterial);

    // Move the Sphere back in Z so we
    // can see it.
    cactus.position.z = -300;
    cactus.position.x = 512;
    cactus.position.y = -35;

    var head = new THREE.Mesh(

        new THREE.SphereGeometry(
            10,
            HEIGHT,
            SEGMENTS),

        birdMaterial);

    // Move the Sphere back in Z so we
    // can see it.
    cactus.add(head);
    head.position.x = -17;
    head.position.y = +2;

    var eye = new THREE.Mesh(

        new THREE.SphereGeometry(
            6,
            HEIGHT,
            SEGMENTS),

        eyeMaterial);

    // Move the Sphere back in Z so we
    // can see it.
    head.add(eye);
    eye.position.x = -4;
    eye.position.y = +2;
    eye.position.z = +5;

    var eye_l = new THREE.Mesh(

        new THREE.SphereGeometry(
            6,
            HEIGHT,
            SEGMENTS),

        eyeMaterial);

    // Move the Sphere back in Z so we
    // can see it.
    head.add(eye_l);
    eye_l.position.x = -4;
    eye_l.position.y = +2;
    eye_l.position.z = -5;

    var pecker = new THREE.Mesh(

        new THREE.BoxGeometry(
            18,
            3,
            10),

        peckerMaterial);

    // Move the Sphere back in Z so we
    // can see it.
    head.add(pecker);
    pecker.position.x = -10;
    pecker.position.y = -3;

    var tail = new THREE.Mesh(

        new THREE.BoxGeometry(
            18,
            3,
            12),

        birdMaterial);

    // Move the Sphere back in Z so we
    // can see it.
    cactus.add(tail);
    tail.position.x = +20;
    tail.position.y = -1;

    right_wing = new THREE.Mesh(

        new THREE.BoxGeometry(
            12,
            4,
            15),

        birdMaterial);

    // Move the Sphere back in Z so we
    // can see it.
    cactus.add(right_wing);
    right_wing.position.x = -1;
    right_wing.position.y = +2;
    right_wing.position.z = +15;

    left_wing = new THREE.Mesh(

        new THREE.BoxGeometry(
            12,
            4,
            15),

        birdMaterial);

    // Move the Sphere back in Z so we
    // can see it.
    cactus.add(left_wing);
    left_wing.position.x = -1;
    left_wing.position.y = +2;
    left_wing.position.z = -15;

    // scene.add(cactus);
    return cactus;
    // collidableMeshList = [cactus];
}

function updateCactusPosition() {
    // cactus.position.x -= 3;
    // if(cactus.position.x < -512){
    //     cactus.position.x = 512;
    // }else{
    //     currObstacle = cactus;
    // }
    if(currObstacle !== null){
        currObstacle.position.x -= 3;
        if(currObstacle.position.x < -312){
            console.log("rimuovo");
            currObstacle.position.x = 312;
            scene.remove(currObstacle);
            randomObstacle();
            // currObstacle = null;
        }
    }
}

function updateCloud1Position(){
    cloud1.position.x -= 0.5;
    if(cloud1.position.x < -512){
        console.log("rimuovo");
        cloud1.position.x = 512;
        cloud1.position.y = Math.floor(Math.random() * (160 - 140 + 1)) + 140;
        // currObstacle = null;
    }

    cloud4.position.x -= 0.7;
    if(cloud4.position.x < -612){
        console.log("rimuovo");
        cloud4.position.x = 612;
        cloud4.position.y = Math.floor(Math.random() * (130 - 110 + 1)) + 110;
        // currObstacle = null;
    }

    cloud7.position.x -= 0.5;
    if(cloud7.position.x < -512){
        console.log("rimuovo");
        cloud7.position.x = 512;
        cloud7.position.y = Math.floor(Math.random() * (120 - 100 + 1)) + 100;
        // currObstacle = null;
    }

    cloud10.position.x -= 0.7;
    if(cloud10.position.x < -612){
        console.log("rimuovo");
        cloud10.position.x = 612;
        cloud10.position.y = Math.floor(Math.random() * (5 - (-15) + 1)) + (-15);
        // currObstacle = null;
    }
}

var wingsGoingUp = true;
function updateBirdWingsMovement(){

    if(wingsGoingUp && right_wing.rotation.x < deg2rad(37)){
        right_wing.rotation.x += deg2rad(1);
        left_wing.rotation.x += deg2rad(1);
    }
    if(right_wing.rotation.x >= deg2rad(37)){
        wingsGoingUp = false;
    }
    if(!wingsGoingUp && right_wing.rotation.x > deg2rad(-30)){
        right_wing.rotation.x -= deg2rad(1);
        left_wing.rotation.x -= deg2rad(1);
    }
    if(right_wing.rotation.x <= deg2rad(-30)){
        wingsGoingUp = true;
    }

}

//Handles paddle collision logic
var collidableMeshList = [];
function collision()
{
    if(currObstacle !== null){
        var originPoint = currObstacle.position.clone();
        // console.log("C");
        // for (var vertexIndex = 0; vertexIndex < currObstacle.geometry.vertices.length; vertexIndex++)
        // {
        //     // var ray = new THREE.Raycaster( currObstacle.position, currObstacle.geometry.vertices[vertexIndex] );
        //     var ray = new THREE.Raycaster( currObstacle.position,  new THREE.Vector3(0, -1, 0) );
        //     var collisionResults = ray.intersectObjects( collidableMeshList, true );
        //     // console.log(collisionResults);
        //     if ( collisionResults.length > 0)
        //     {
        //         console.log("HIT");
        //         on();
        //     }
        // }

        var ray = new THREE.Raycaster( currObstacle.position,  new THREE.Vector3(0, 0, 1) );
        var collisionResults = ray.intersectObjects( collidableMeshList, true );
        // console.log(collisionResults);
        if ( collisionResults.length > 0)
        {
            console.log("HIT");
            on();
        }
    }
}

function update () {
    // updateRexHorizontalMovement();
    if(!allPaused){
        updateRexJumpingState();
        updateRexHeadMovement();
        updateRexTailMovement();
        move_right_leg_phase2();
        move_left_leg_phase2();
        move_right_arm();
        move_left_arm();
        updateCactusPosition();
        updateCloud1Position();
        updateBirdWingsMovement();
        collision();
    }
    // Draw!
    renderer.render(scene, camera);

    // Schedule the next frame.
    if(camera !== null){
        requestAnimationFrame(update);
    }
}



window.onkeydown = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    //if user pressed up or spacebar
    if ((key == 38 || key == 32) && !jumpingDown) {
        jumpingUp = true;
    }
};

// Rotate an object around an arbitrary axis in object space
var rotObjectMatrix;
function rotateAroundObjectAxis(object, axis, radians) {
    rotObjectMatrix = new THREE.Matrix4();
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);
    object.matrix.multiply(rotObjectMatrix);
    object.rotation.setFromRotationMatrix(object.matrix);
}

var rotWorldMatrix;
// Rotate an object around an arbitrary axis in world space
function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);
    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
}