var PLAY = 1;
var END = 0;
var MarsImg,EarthImg,VenusImg,JupiterImg,planets,planetsGroup;
var AstroImg, Astro, AstrosGroup;
var gameState = "play"

function preload(){
    Astro_running = loadAnimation("Astro.png");
    Astro_collided = loadAnimation("Astro colided.png");
    
    groundImage = loadImage("ground2.png");
    
    
    Mars = loadImage("mars.png");
    Earth = loadImage("earth.png");
    Venus = loadImage("venus.png");
    Jupiter = loadImage("Jupiter.png");
    
    
    
    jumpSound = loadSound("JumpSound.mp3");
    dieSound = loadSound("die.mp3");
    background = loadImage("background.jpg");
    
  
}

function setup() {
    createCanvas(900, 600);

    var message = "Esto es un mensaje";
  
    
    Astro = createSprite(50,160,20,50);
    Astro.addAnimation("running",Astro_running);
    Astro.addAnimation("collided",Astro_collided);
    
  
    Astro.scale = 0.5;
    
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    
    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(300,140);
    restart.addImage(restartImg);
  
    console.log(message)
    
   
    gameOver.scale = 0.5;
    restart.scale = 0.5;
    
    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;
    
    //crear grupos de obstáculos y nubes
    planetsGroup = createGroup();
    
  
    
    Astro.setCollider("rectangle",0,0,Astro.width,Astro.height);
    Astro.debug = false;
    
    score = 0;
}

function draw() {
    background(background);
  
  //mostrar puntuación
  text("Puntuación: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100);
    //puntuación
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //hacer que el trex salte al presionar la barra espaciadora
    if(keyDown("space")&& Astro.y >= 100) {
        Astro.velocityY = -12;
        jumpSound.play();
    }
    
    //agregar gravedad
    Astro.velocityY = Astro.velocityY + 0.8;
  
    
  
    //aparecer obstáculos en el suelo
    spawnPlanets();
    
    if(planetsGroup.isTouching(Astro)){
        //trex.velocityY = -12;
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     //cambiar la animación del trex
      Astro.changeAnimation("collided", Astro_collided);
    
     
     
      ground.velocityX = 0;
      Astro.velocityY = 0
      
     
      //establecer lifetime de los objetos del juego para que no sean destruidos nunca
    planetsGroup.setLifetimeEach(-1);
    
     
     planetsGroup.setVelocityXEach(0);
       
   }
  
 
  //evitar que el trex caiga
  Astro.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
      
    }


  drawSprites();

  function reset(){
    gameState = PLAY;
    gameOver.visible=false;
    restart.visible=false;
  planetsGroup.destroyEach();
  
  score=0;
  Astro.changeAnimation("running",Astro_running);
  collider
  }

}
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var planets = createSprite(600,165,10,40)
   planets.velocityX = -(6 + score/100);
   
    //generar obstáculos al azar
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: planets.addImage(Mars);
              break;
      case 2: planets.addImage(Earth);
              break;
      case 3: planets.addImage(Venus);
              break;
      case 4: planets.addImage(Jupiter);
              break;
      default: break;
    }
    //asignar escala y lifetime al obstáculo           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //agregar cada obstáculo al grupo
    obstaclesGroup.add(obstacle);
 }
}