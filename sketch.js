var canvas1,Trex,Treximg,collidedTrex,ground,groundimg,invisibleground,cloudsgroup,cloudsimg,obsticlesgroup,obsticleimg1,
obsticleimg2,obsticleimg3,obsticleimg4,obsticleimg5,
obsticleimg6,score,flyingdinogroup,flyingdinoing,duck,gameover,gameoverimg,
restart,restartimg;
var PLAY=1;
var END=0;
var gameState=PLAY;



function preload (){
  Treximg=loadAnimation("trex1.png","trex3.png","trex4.png");
  duck=loadImage("ducktrex.png");
  collidedTrex=loadImage("trex_collided.png");
  groundimg=loadImage("ground2.png");
  cloudsimg=loadImage("cloud.png");
  obsticleimg1=loadImage("obstacle1.png");
  obsticleimg2=loadImage("obstacle2.png");
  obsticleimg3=loadImage("obstacle3.png");
  obsticleimg4=loadImage("obstacle4.png");
  obsticleimg5=loadImage("obstacle5.png");
  obsticleimg6=loadImage("obstacle6.png");
  flyingdinoimg=loadImage("flying dino.png");
  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
}


function setup() {
  canvas1= createCanvas(600, 200);
  canvas1.position(370,250);
  Trex=createSprite(100,120,15,15);
  Trex.addAnimation("Running",Treximg);
  Trex.addAnimation("cloided",collidedTrex);
  Trex.scale=0.5;
  Trex.addAnimation('ducking',duck)
  Trex.velocityX=2;
  ground=createSprite(300,140,600,15);
  ground.addImage("land",groundimg);
  invisibleground=createSprite(300,155,600,15);
  invisibleground.visible=false;
  cloudsgroup=new Group();
  cactusgroup=new Group();
  flyingdinogroup=new Group();
  score=0;
   restart = createSprite(Trex.position.x+300,Trex.position.y);
   restart.addAnimation("restart",restartimg);
   restart.scale=0.5;
   
   gameover = createSprite(Trex.position.x+300,Trex.position.y-15);
   gameover.addAnimation("gameOver",gameoverimg);
restart.visible=false;
gameover.visible=false;
}

function draw() {
  background(0);
   camera.position.x = Trex.position.x;
   camera.position.y = Trex.position.y
  if(gameState===PLAY){
  if((keyDown("space")||keyDown("up"))&&Trex.collide(invisibleground)){
     Trex.velocityY=-15;
     }
  Trex.velocityY+=0.8;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(keyDown("down")){
    Trex.changeAnimation("ducking",duck);
    Trex.scale=0.15;
  }if (keyWentUp("down")){
    Trex.changeAnimation("Running",Treximg);
    Trex.scale=0.5;
  }
     ground.velocityX = -(6+score/100);
  score=score+Math.round(getFrameRate()/30);
  spawnclouds();
  spwanobsticles();
  spwanflyingdino();
   if (Trex.isTouching(cactusgroup)||Trex.isTouching(flyingdinogroup)) {
      gameState=END; 
  }
  }else if (gameState===END){
     //stopping the grund velocity
   ground.velocityX = 0;
   Trex.velocityX = 0;
   
   //stopping the obsticles
   cactusgroup.setVelocityXEach(0);
   flyingdinogroup.setVelocityXEach(0);
   cloudsgroup.setVelocityXEach(0);
   
   //makeing the life of obsticles infinite
   cloudsgroup.setLifetimeEach(-1);
   cactusgroup.setLifetimeEach(-1);
   flyingdinogroup.setLifetimeEach(-1);
   
   //makeing the trex stop
   Trex.velocityY=0;
   
   //adding the trex animation after collided
   Trex.changeAnimation("cloided",collidedTrex);
   Trex.scale=0.5;
   restart.visible=true;
   gameover.visible=true;
   
    
  }
  Trex.collide(invisibleground);
  
  textSize(20);
  text("score:"+score,camera.position.x+150,camera.position.y+50);
  if (mousePressedOver(restart)) {
    reset();
  }
  drawSprites();
}
function spawnclouds(){
 if(frameCount%60===0){ 
   var cloud = createSprite(600,25,15,15);
   cloud.y=random(15,50);
  cloud.velocityX=-4;
   cloud.addImage("cloud",cloudsimg);
   cloud.scale=0.7;
   cloud.depth=Trex.depth;
   Trex.depth=Trex.depth+1;
   cloud.lifetime=160;
   cloudsgroup.add(cloud);
}}
function spwanobsticles(){
  if (frameCount%90===0){
    var obsticle = createSprite(600,125,14,14);
    obsticle.velocityX = -(6+score/100);
    var rand =Math.round( random(1,6));
    switch(rand){
      case 1:obsticle.addImage("obsticle1",obsticleimg1);
      break;
      case 2:obsticle.addImage("obsticle2",obsticleimg2);
      break;
      case 3:obsticle.addImage("obsticle3",obsticleimg3);
      break;
      case 4:obsticle.addImage("obsticle4",obsticleimg4);
      break;
      case 5:obsticle.addImage("obsticle5",obsticleimg5);
      break;
      case 6:obsticle.addImage("obsticle6",obsticleimg6);
      break;
      default:break;   
    }
    obsticle.scale=0.7;
    obsticle.lifetime=160;
    cactusgroup.add(obsticle);
  }}
function spwanflyingdino(){
 if(frameCount%150===0){
   var flyingdino = createSprite(600,40,15,15);
  flyingdino.velocityX=-4;
   flyingdino.addImage("flying",flyingdinoimg);
   flyingdino.scale=0.3;
   flyingdinogroup.add(flyingdino);
}}
function reset (){
gameState=PLAY;
cactusgroup.destroyEach();
flyingdinogroup.destroyEach();
cloudsgroup.destroyEach();
score = 0;
restart.visible=false;
gameover.visible=false;
Trex.changeAnimation("Running",Treximg);
}





