var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaimg
var rock,rockimg
var bananagroup,rockgroup
var gameover,gameoverimg
var score=0

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaimg=loadImage("banana.png")
rockimg=loadImage("stone.png")
gameoverimg=loadImage("gameOver.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameover=createSprite(400,200,20,20)
  gameover.addImage(gameoverimg)
  gameover.visible=false
  bananagroup=new Group()
  rockgroup=new Group()
  
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space")) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    if(score>1){
      player.scale-=0.001
    }
    
//console.log(player.y)
spawnFruits()
  spawnObsticales()
  if(player.isTouching(bananagroup)){
    score=score+1
    bananagroup.destroyEach()
    player.scale+=0.1
  }
  if(player.isTouching(rockgroup)){
    gameState=END
  }
  }
  if(gameState===END){
    bananagroup.destroyEach()
    rockgroup.destroyEach()
    bananagroup.velocityX=0
    rockgroup.velocityX=0
    backgr.velocityX=0
    gameover.visible=true

  }

 // player.debug=true
  
  

  drawSprites();
  fill("blue")
  textSize(20)
  text("Score:"+score,700,100)
}
function spawnFruits(){
  if (frameCount%90===0){
    var rand=random(120,200)
    banana=createSprite(600,rand,20,20)
    banana.addImage(bananaimg)
    banana.scale=0.09
    //banana.debug=true
    banana.velocityX=-10
    bananagroup.add(banana)
  }
}
function spawnObsticales(){
  if(frameCount%120===0){
rock=createSprite(750,350,10,10)
rock.addImage(rockimg)
rock.scale=0.3
rock.velocityX=-8
//rock.debug=true
rock.setCollider("circle",0,0,200)
rockgroup.add(rock)
  }
}