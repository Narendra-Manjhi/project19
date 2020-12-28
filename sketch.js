var PLAY = 1;
var END = 0;
var gameState = PLAY;

var space ,spaceImage;
var space_ship,space_shipImage;
var petrolImage,boomImage;
var petrolsGroup,boomsGroup;
var score=0;
var gameOver, restart;
localStorage["HighestScore"] = 0;
var gameOverSound;
var spaceSound;
var petrolSound;
function preload(){

  spaceImage=loadImage("space.jpg");
  
  space_shipImage=loadImage("space_ship.png")
  
  petrolImage=loadImage("petrol.png");
  
  boomImage=loadImage("boom1.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
   gameOverSound =loadSound("gameOver.wav");
   
  petrolSound =loadSound("powerup.wav");
  
  
}

function setup() {
 createCanvas(500,600);
   space=createSprite(0,0,500,600);
  space.addImage("space",spaceImage);
  space.x=space.width/2;
  
  space_ship=createSprite(50,200,50,50);
  space_ship.addImage("space_ship",space_shipImage);
  space_ship.scale=0.1; 
  
  gameOver = createSprite(250,100);
  gameOver.addImage(gameOverImg);
  
  
  restart = createSprite(250,140);
  restart.addImage(restartImg);
  
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,500,400,10);
  
  petrolsGroup = createGroup();
  boomsGroup =  createGroup();
  
   score = 0;
}

function draw() {
  
 
  if (gameState===PLAY){
    
    space.velocityX = -(6 + 3*score/10);
  
    if(keyDown("space")) {
      space_ship.velocityY = -12;
    }
  
    space_ship.velocityY = space_ship.velocityY + 0.8
  
    if (space.x < 0){
      space.x = space.width/2;
    }
  
    space_ship.collide(invisibleGround);
    spawnPetrols();
    spawnBooms();
    
    //Increase score if monkey
    if(petrolsGroup.isTouching(space_ship)){
       petrolsGroup.destroyEach();
       score = score+2;
      petrolSound.play();
    }
    
    
    if(boomsGroup.isTouching(space_ship)){
        gameState = END;
       gameOverSound.play();
    }
  }
  else if (gameState === END) {
    
    boomsGroup.destroyEach();
    petrolsGroup.destroyEach();
    
    
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    space.velocityX = 0;
    space_ship.velocityY= 0;
    
    boomsGroup.setVelocityXEach(0);
    petrolsGroup.setVelocityXEach(0);
    //change the space_ship Image
  space_ship.changeAnimation("space_ship",space_shipImage);
    
    //set lifetime of the game objects so that they are never destroyed
    boomsGroup.setLifetimeEach(-1);
    petrolsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
  
     stroke("red");
  textSize(20);
  fill("red");
text("Petrols: " + score,200,50);
  
}

function spawnPetrols(){
  //write code here to spawn the gold_coins
 if(World.frameCount%100===0){
 var petrol = createSprite(600,100,10,20);
    petrol.addImage(petrolImage);
    petrol.velocityX = -(6 + 3*score/10);;
    petrol.scale =0.05;
    petrol.lifetime = 300;
   petrol.y=Math.round(random(50,340));
  
   petrolsGroup.add(petrol);
}
}
function spawnBooms(){
  //write code here to spawn the gold_coins
 if(World.frameCount%300===0){
 var boom = createSprite(600,100,10,20);
    boom.addImage(boomImage);
    boom.velocityX = -(6 + 3*score/10);
    boom.scale =0.05;
    boom.lifetime = 200;
   boom.y=Math.round(random(100,300));
   
   boomsGroup.add(boom);
  
}
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  boomsGroup.destroyEach();
  petrolsGroup.destroyEach();
  
  space_ship.changeImage("space_ship",space_shipImage);
 
  if(localStorage["HighestScore"]<score){
    
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}



