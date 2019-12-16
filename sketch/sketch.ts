
let player1Position = 0;
let player2Position = 180;
let ballSpeedX = 5;
let ballSpeedY = 5;
let ballXPosition = innerWidth/2;
let ballYPosition = innerHeight/2;
let padLength = 20;

 function preload() {
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    noCursor();
    fullscreen();
    angleMode(DEGREES);
    ballSpeedX = random(ballSpeedX * -1, ballSpeedX);
    ballSpeedY = random(ballSpeedY * -1, ballSpeedY);
}



function draw() {
    background('#777b7e');
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
    handleBall(player1Position, player1Position);
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