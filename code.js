"use strict";

let length;
let h;
function setElementPosition(element, xx, yy, zz) {
    element.position.x = xx;
    element.position.y = yy;
    element.position.z = zz;
}

// функция для создания источника света
function createLight(scene, color, force) {
    let pointLight = new THREE.PointLight(color, force);
    scene.add(pointLight);
    return pointLight;
}
// функция для определения случайного числа
function rnd(n) {
    return parseInt(parseInt(Math.random() * 100000) % n);
    }

//функция, которая создаёт врага, если логическая переменная enemy=false и помещяет его в конец массива EnemyArr
/*function createEnemy(scene){  
    let x=rnd(4);
    if(enemy===false){     
    let cube = createCube(scene,3,3,3,"#FF0000");
    if(x===0){
        let d=setElementPosition(cube,60,3,0);
    }
    if(x===1){
        let d=setElementPosition(cube,0,3,-60);
    }
    if(x===2){
        let d=setElementPosition(cube,-60,3,0);
    }
    if(x===3){
        let d=setElementPosition(cube,0,3,60);
    } 
    enemy=true;
    EnemyArr.push(cube);
    return cube;
}
}*/

 function createEnemy2(scene,x,z){
    let cube = createCube(scene,3,3,3,"#FF0000");
    setElementPosition(cube,x,3,z);
    EnemyArr.push(cube);
 }

// эта функция осуществляет передвижение врагов, если они находятся не под игровой зоной, то есть если в них не попали
function MoveAllEnemy(){
    let speed=0.5;
    let speed2=0.68;
    let speed3=0.33;
    let speed4=0.42;
  for(let i=0;i<EnemyArr.length;i++){ 
      let E=EnemyArr[i];
      if(E.position.x>55 && E.position.y>0){
        if(E.position.z>45){
            h=false;
        }  if(E.position.z<-45){
            h=true;
        }
        if(h===true ){
            E.position.z+=speed;
        } else {
            E.position.z-=speed;
        }
    } else if(E.position.x<-55 && E.position.y>0){
        if(E.position.z>45){
            h=false;
        }  if(E.position.z<-45){
            h=true;
        }
        if(h===true ){
            E.position.z+=speed2;
        } else {
            E.position.z-=speed2;
        }
    } else if(E.position.z<-55 && E.position.y>0){
        if(E.position.x>45){
            h=false;
        }  if(E.position.x<-45){
            h=true;
        }
        if(h===true ){
            E.position.x+=speed3;
        } else {
            E.position.x-=speed3;
        }
    } else if(E.position.z>55 && E.position.y>0){
        if(E.position.x>45){
            h=false;
        }  if(E.position.x<-45){
            h=true;
        }
        if(h===true ){
            E.position.x+=speed4;
        } else {
           E.position.x-=speed4;
        }
}}
}

// функция для создания куба
function createCube(scene, width, height, length, color) {
    let cubeGeometry = new THREE.CubeGeometry(width, height, length);
    let cubeMaterial = new THREE.MeshLambertMaterial({color: color});
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);
    return cube;
}

// функция для создания цилиндра
function createCylinder(scene, radius, height, segments, color) {
    let geometry = new THREE.CylinderGeometry(radius, radius, height, segments);
    let material = new THREE.MeshBasicMaterial({color: color});
    let cylinder = new THREE.Mesh( geometry, material );
    scene.add(cylinder);
    return cylinder;
}



//функция для создания линий между центрами героя и объектов
/*function createline(scene,x1,z1,x2,z2){
    let material = new THREE.LineBasicMaterial({color: 0x0000ff });
    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(x1, 3, z1));
    geometry.vertices.push(new THREE.Vector3(x2, 3, z2));
    let line = new THREE.Line(geometry, material);
}*/

//функция для контроля столкновения героя и объекта
function controlcrash(x1,x2,z1,z2){
    let speedX=speedModule * Math.sin(angle);
    let speedZ=speedModule * Math.cos(angle);
    let a = x1+speedX;
    let b =z1+speedZ;
    if((a+30)*(a+30)+b*b>=150){
        v=true;
    }  if((a+30)*(a+30)+b*b<150){
        v=false;
    }
 
}
//функция для контроля столкновения героя и объекта
function controlcrash2(x1,x2,z1,z2){
    let speedX=speedModule * Math.sin(angle);
    let speedZ=speedModule * Math.cos(angle);
    let a = x1+speedX;
    let b =z1+speedZ;
    if((a-30)*(a-30)+(b-20)*(b-20)>=150){
        m=true;
    }  if((a-30)*(a-30)+(b-20)*(b-20)<150){
        m=false;
    }
 
}
//функция для контроля столкновения героя и объекта
function controlcrash3(x1,x2,z1,z2){
    let speedX=speedModule * Math.sin(angle);
    let speedZ=speedModule * Math.cos(angle);
    let a = x1+speedX;
    let b =z1+speedZ;
    if((a-30)*(a-30)+(b+30)*(b+30)>=150){
        n=true;
    }  if((a-30)*(a-30)+(b+30)*(b+30)<150){
        n=false;
    }
 
}

// размеры холста
let ww = 800;
let hh = 600;

// переменные для управления героем с клавиатуры
let w = false;
let a = false;
let s = false;
let d = false;

//счётчик попаданий по врагам;
let U=0;
//логические переменные для контроля столкновений героя с препятствиями
let v=true;
let m=true;
let n=true;

//let enemy=false;

// переменные для работы со скоростями героя
let angle = 0;
let angleSpeed = 0.04;
let speedModule = 1.5;

// функция для управления героем
function controlHero(heroElement) {
    if(a === true) {angle += angleSpeed};
    if(d === true) {angle -= angleSpeed};
    heroElement.rotation.y = angle;

    let speedX = speedModule * Math.sin(angle);
    let speedZ = speedModule * Math.cos(angle);
    if(w === true) {
        heroElement.position.x += speedX;
        heroElement.position.z += speedZ;
    }
}

//функция, контролирующая попадание пульки во врага. если пулька попадает, то враг и эта пулька исчезают под землю
function controlcrashBullet(){
    for(let i=0;i<bulletsArr.length;i++){
         let b=bulletsArr[i];
        for( let t=0;t<EnemyArr.length;t++){
            let e=EnemyArr[t];
            if(Math.sqrt(Math.abs(b.position.x- e.position.x)*Math.abs(b.position.x- e.position.x)+Math.abs(b.position.z- e.position.z)*Math.abs(b.position.z- e.position.z))<2.5){
                e.position.y=-30;
                e.position.x=0;
                e.position.z=0;
                b.position.y=-20;
                U++;
                //enemy=false;
            }
            
        }
    }
}

// функция для перемещения камеры за героем
function moveCameraForHero(cameraElement, heroElement) {
    let distance = -40;
    cameraElement.position.x = heroElement.position.x + distance * Math.sin(angle);
    cameraElement.position.y = 15;
    cameraElement.position.z = heroElement.position.z + distance * Math.cos(angle);
    cameraElement.lookAt(heroElement.position);
}

// массив с пулями
let bulletsArr = [];
let EnemyArr=[];
let crash=false;

// функция для движения пулек
function moveBullets() {
    let speed = 3;
    for(let i = 0; i < bulletsArr.length; i++) {
        let b = bulletsArr[i];
        if(Math.abs(b.position.z) <= 70 && Math.abs(b.position.x) <= 70) {
            b.position.z = b.position.z + speed * Math.cos(b.rotation.y);
            b.position.x = b.position.x + speed * Math.sin(b.rotation.y);
        }    
    }
}

window.onload = function() {
    // описание сцены и служебных объектов
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, ww / hh, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    let score=document.getElementById("score");
    renderer.setClearColor("#67ddff");
    renderer.setSize(ww,hh);
    document.getElementById("gameBox").append(renderer.domElement);

    // создание сетки
    let sizeOfSetka = 100;
    let divisions = 10;
    let color_1 = "#0000FF";
    let color_2 = "#000000";
    let gridHelper = new THREE.GridHelper(sizeOfSetka, divisions, color_1, color_2);
    scene.add(gridHelper);

    // камера - вид сверху на карту
    camera.position.x = 0;
    camera.position.y = 200;
    camera.position.z = 0;
    camera.lookAt( new THREE.Vector3(0, 0, 0) );

    // источники света
    let lightA = createLight(scene, "#FFFFFF", 1);
    let lightB = createLight(scene, "#FFFFFF", 1);
    let lightC = createLight(scene, "#FFFFFF", 1);
    setElementPosition(lightA, 0, 150, 0);
    setElementPosition(lightB, -200, 150, 80);
    setElementPosition(lightC, 200, 150, -80);

    // земля
    let ground = createCube(scene, 100, 2, 100, "#006400");
    setElementPosition(ground, 0, -1.1, 0);

    // цилиндрические препятствия
    let wallA = createCylinder(scene, 10, 6, 16, "#FF1493");
    setElementPosition(wallA, -30, 3, 0);
    let wallB = createCylinder(scene, 10, 6, 16, "#FF1493");
    setElementPosition(wallB, 30, 3, 20);
    let wallC = createCylinder(scene, 10, 6, 16, "#FF1493");
    setElementPosition(wallC, 30, 3, -30);

    // создание героя - кубика
    let hero = createCube(scene, 6, 6, 6, "#FF0000");
    setElementPosition(hero, 20, 3, 0);

    //создание врагов
    let enemy1=createEnemy2(scene,60,0);
    let enemy2=createEnemy2(scene,-60,0);
    let enemy3=createEnemy2(scene,0,60);
    let enemy4=createEnemy2(scene,0,-60);

    // при нажатии клавиши
    window.onkeydown = function(event) { 
        if(event.keyCode === 87) {w = true}; 
        if(event.keyCode === 65) {a = true};
        if(event.keyCode === 83) {s = true};
        if(event.keyCode === 68) {d = true};
    }

    // при отпускании клавиши
    window.onkeyup = function(event) {
        if(event.keyCode === 87) {w = false};
        if(event.keyCode === 65) {a = false};
        if(event.keyCode === 83) {s = false};
        if(event.keyCode === 68) {d = false};
    }

    // отображаем вид с камеры
    renderer.render(scene, camera);
    
    //создаём линии между центрами героя и объектов и считаем его длину
    //let line1=createline(scene,hero.position.x,hero.position.z,-30,0);
    //let line2=createline(scene,hero.position.x,hero.position.z,30,20);
    //let line3=createline(scene,hero.position.x,hero.position.z,30,-30);

    // стрельба кубиками
    let box = document.getElementById("gameBox");
    box.onclick = function() {
        console.log("Fire");
        let bullet = createCube(scene, 2, 2, 2, "#C71585");
        bullet.position.x = hero.position.x;
        bullet.position.y = hero.position.y;
        bullet.position.z = hero.position.z;
        bullet.rotation.y = angle;
        bulletsArr.push(bullet);
    };
    
     //let cube=createEnemy(scene);

    // выполнение кода циклически через временные промежутки
    setInterval(function() {
        controlcrash(hero.position.x,-30,hero.position.z,0);
        controlcrash2(hero.position.x,30,hero.position.z,20);
        controlcrash3(hero.position.x,30,hero.position.z,-30);
        if(U===4){
            score.innerHTML="Вы выиграли";
        }
        if(v===false){w=false}
        if(m===false){w=false}
        if(n===false){w=false}
        controlHero(hero);
        MoveAllEnemy();
        //createEnemy(scene);
        moveCameraForHero(camera, hero);
        //createline(scene,hero.position.x,hero.position.z,-30,0);
        //createline(scene,hero.position.x,hero.position.z,30,20);
        //createline(scene,hero.position.x,hero.position.z,30,-30);
        moveBullets();
        controlcrashBullet();
        //console.log(enemy);
        renderer.render(scene, camera);
    }, 50);
}