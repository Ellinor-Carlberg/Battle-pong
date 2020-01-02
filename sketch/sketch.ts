// global variables
let gameManager: GameManager;
let gameSettings: GameSettings;
let gameArea: GameArea;
let gameMenu: GameMenu;
let gameMusic: GameMusic;
let players: Player[];
let pads: Pad[];
let balls: Ball[];

// ball stuff
let ballXPosition: number;
let ballYPosition: number;
let padLength = 20;
let ballRadius: number;

// etc
let isGameRunning: number;
let circleSize: number;
let nrOfPlayers: number;
let img: p5.Image;

window.addEventListener('load', () => {
    isGameRunning = 0;
})

/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
    img = loadImage('./assets/images/battle_pong.svg');

    // load music
    soundFormats('wav');
    gameMusic = { menuMusic: (window as any).loadSound('./assets/music/menu-music.wav') }
}

function setup() {
    //size of the screen
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    noCursor();
    fullscreen();

    // play menu music on page load
    gameMusic.menuMusic.play();
    // create new game manager instance
    gameManager = new GameManager(gameMusic);
    gameManager.setup();
}

//Draws this every 60 frames(see frameRate(60))
function draw() {
    background('#777b7e');

    // let ballXPositionOld = ballXPosition;
    // let ballYPositionOld = ballYPosition;


    //Pushes the ball in its direction by adding the "speed" every frame
    ballXPosition += ballSpeedX;
    ballYPosition += ballSpeedY;
    
    // let angleDeg = Math.atan2(ballYPositionOld - ballYPosition, ballXPositionOld- ballXPosition) * 180 / Math.PI;


// start game on enter key
function keyPressed(): void {
    if (keyCode === ENTER && isGameRunning == 0) {
        clear();
        gameManager.gameSettings.startGame();
        gameManager.createBall();
    }

    // The balls size is connected to the size of the screen
    let ballRadius = circleSize/40;

    // Takes the playerPosition (a degree) and makes it into a X Y cordinate - array
    //The reason for padLength is that it starts with position an goes all the way through the pads length
    let player1XCoordinates = [];
    let player1YCoordinates = [];
    for(let i = 0; i <= padLength; i++){
      player1XCoordinates[i] = (circleSize/2) * Math.cos(((player1Position + i) * Math.PI / 180)) + (width/2);
    }
    for(let i = 0; i <= padLength; i++){
      player1YCoordinates[i] = (circleSize/2) * Math.sin(((player1Position + i) * Math.PI / 180)) + (height/2);
    }

    //Detects if the ball touches the player 1 pad [FEAL FREE TO EXPERIMENT WITH COLLISION]
    //The reason for padLength is that it starts with position an goes all the way through the pads length


    for(let i = 0; i <= padLength; i++){
      if(dist(ballXPosition, ballYPosition, player1XCoordinates[i], player1YCoordinates[i])
              == ballRadius + hitboxRadius) {
                console.log('lé boing');

      }
    }

    let dx = ballXPosition - width/2;
    let dy = ballYPosition - height/2;

    if(dist(ballXPosition, ballYPosition, width/2, height/2) >= circleSize/2 - ballRadius){
 
      const velocity = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
      
      let angleToCollisionPoint = Math.atan2(-dy, dx);
      // console.log("v",angleToCollisionPoint);
      var oldAngle = Math.atan2(-ballSpeedY, ballSpeedX);
      var newAngle = 2 * angleToCollisionPoint - oldAngle;

      ballSpeedX = -velocity * Math.cos(newAngle);
      ballSpeedY = velocity * Math.sin(newAngle);

      const vector = createVector(dx, dy);
      vector.normalize()
      const scalar = (circleSize / 2 - ballRadius);
      vector.mult(scalar);
   
      ballXPosition = vector.x  + width / 2;
      ballYPosition = vector.y + height / 2;
      
    } 



    //background
    background(119, 123, 126);

    //Ball
    fill(255, 255, 255);
    stroke(0, 0, 0);
    strokeWeight(2);
    ellipse(ballXPosition, ballYPosition, ballRadius*2, ballRadius*2);


    //mainGameArea
    noFill();
    stroke(0, 0, 0);
    strokeWeight(1);
    ellipse(width/2, height/2, circleSize, circleSize);


    //player1
    stroke(0, 0, 0);
    strokeWeight(9);
    arc(width/2, height/2, circleSize, circleSize, player1Position, player1Position + padLength);
    stroke(255, 204, 0);
    strokeWeight(5);
    arc(width/2, height/2, circleSize, circleSize, player1Position, player1Position + padLength);


    //player2
    stroke(0, 0, 0);
    strokeWeight(9);
    arc(width/2, height/2, circleSize, circleSize, player2Position, player2Position + padLength);
    stroke(253,188,180);
    strokeWeight(5);
    arc(width/2, height/2, circleSize, circleSize, player2Position, player2Position + padLength); 

    handlePads();
    handleBall(player1XCoordinates, player1YCoordinates);
}



function handlePads() {
    let player1Velocity = 0;
    let player2Velocity = 0;

    // player one controls
    if (keyIsDown(87)) {
      // move up
  
      player1Velocity -= 5;
    } else if (keyIsDown(83)) {
      // move down
  
      player1Velocity += 5;
    }
  
    // player two controls
    if (keyIsDown(UP_ARROW)) {
      // move up
  
      player2Velocity -= 5;
    } else if (keyIsDown(DOWN_ARROW)) {
      // move down
  
      player2Velocity += 5;
    }
  
      // change position
    player1Position += player1Velocity;
    player2Position += player2Velocity;
  
    // friction
    player1Velocity *= 0.4;
    player2Velocity *= 0.4;

    // constrain pads
    player1Position = constrain(player1Position, 0, 159 );
    player2Position = constrain(player2Position, 180, 339 );
}



function handleBall(player1XCoordinates: Array<number>, player1YCoordinates: Array<number>) {

//   // wall bounce - [will be removed but this is basicly how bounce works]
  if (ballYPosition > height || ballYPosition < 0){
    ballSpeedY *= -1; 
  } else if (ballXPosition > width || ballXPosition < 0){
    ballSpeedX *= -1; 
  }


//   //Putting detection-hitbox-spheres[what do we call them?] They will be invisible in the future
  for (let i = 0; i <= padLength; i++){
    for (let j = 0; j <= padLength; j++){
      fill('purple');
      strokeWeight(2);
      ellipse(player1XCoordinates[i], player1YCoordinates[i], 7, 7);
    }
  }
}

/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


