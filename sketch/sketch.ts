let player1Position = 0;
let player2Position = 180;
let ballSpeedX = 5;
let ballSpeedY = 5;
let ballXPosition = innerWidth/2;
let ballYPosition = innerHeight/2;
let padLength = 20;
let isGameRunning: number;
let img: any;
let music: any;

 function preload() {
  img = loadImage('./assets/images/battle_pong.svg');
}

function setup() {
    isGameRunning = 0;

    createCanvas(windowWidth, windowHeight);
    
    textSize(15);
    frameRate(60);
    //noCursor();
    fullscreen();
    angleMode(DEGREES);
    ballSpeedX = random(ballSpeedX * -1, ballSpeedX);
    ballSpeedY = random(ballSpeedY * -1, ballSpeedY);
}



function draw() {
    clear();
    if(isGameRunning == 0){
      background('#777b7e')

 
  stroke('#999966');
  fill('#999966');
  rect((width * .5) -350, 0, 700, height)
 
  strokeWeight(60)
  stroke('#999966');
  line(0, height * .2, width, height * 0.6);
 
  strokeWeight(140)
  stroke('#999966');
  line(0, height * .4, width, height * 0.8);
 
  strokeWeight(40)
  stroke('#999966');
  line(0, height * .55, width, height * 0.95);
 
  strokeWeight(80)
  stroke('#F4ed47');
  line(0, height * .08, width, height * 0.08);
 
  strokeWeight(1)
  stroke('#000000');
  line(0, height * .1, width, height * 0.1);
 
  strokeWeight(1)
  stroke('#000000');
  line(0, height * .04, width, height * 0.04);
 
  strokeWeight(3)
  stroke('#000000');
  line(0, height * .08, width, height * 0.08);
 
  strokeWeight(1)
  stroke('#000000');
  line(0, height * .03, width, height * 0.03);
 
  strokeWeight(2)
  stroke('#000000');
  line(0, height * .13, width, height * 0.13);
 
  image (img, width * .5 -(img.width * 0.5), height * .02);
  fill('#F4ed47');
  rect(1250, 765, 140, 40, 20);
  text('Press enter to start', 1255, 790)
 
 

}
    if(isGameRunning == 1) {
      let circleSize;

    ballXPosition += ballSpeedX;
    ballYPosition += ballSpeedY;
  
    if(windowWidth >= windowHeight){
        circleSize = windowHeight - 40;
    } else {
        circleSize = windowWidth - 40;
    }
    let ballRadius = circleSize/40;;

    //background
    //
    background(119, 123, 126);

    //Ball
    fill(5, 213, 133);
    stroke(179, 124, 34);
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
    handleBall(player1Position, player1Position);
  }
}
function keyPressed(){
  if(keyCode === ENTER){
      isGameRunning = 1;
  }
}

// function isMusicPlaying() {

// }

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



/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function handleBall(player1Position: number, player2Position: number) {
  // wall bounce 
  if (ballYPosition > height || ballYPosition < 0){
    ballSpeedY *= -1; 
  } else if (ballXPosition > width || ballXPosition < 0){
    ballSpeedX *= -1; 
  }

  /*console.log(player1Position);
  console.log(player2Position);
  console.log(ballYPosition);
  console.log(ballXPosition);*/


    for(let i = player1Position; i < (player1Position+padLength); i++){
        if(i == ballYPosition || i == ballXPosition){
            console.log('pad - player 1');
        }
    }

    for(let i = player2Position; i < (player2Position + padLength); i++){
        if(i == ballYPosition || i == ballXPosition){
            console.log('pad - player 2');
        }
    }
}

