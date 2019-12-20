
let player1Position = 0;
let player2Position = 180;
let ballSpeedX = 5;
let ballSpeedY = 5;
let ballXPosition = innerWidth/2;
let ballYPosition = innerHeight/2;
let padLength = 20;
let hitboxRadius = 7;

 function preload() {
}

function setup() {
    //size of the screen
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    noCursor();
    fullscreen();

    //puts the angles inte degrees rather than PI
    angleMode(DEGREES);

    //generate at random way for the ball to go
    ballSpeedX = random(ballSpeedX * -1, ballSpeedX);
    ballSpeedY = random(ballSpeedY * -1, ballSpeedY);
}

//Draws this every 60 frames(see frameRate(60))
function draw() {
    background('#777b7e');

    let ballXPositionOld = ballXPosition;
    let ballYPositionOld = ballYPosition;


    //Pushes the ball in its direction by adding the "speed" every frame
    ballXPosition += ballSpeedX;
    ballYPosition += ballSpeedY;
    
    let angleDeg = Math.atan2(ballYPositionOld - ballYPosition, ballXPositionOld- ballXPosition) * 180 / Math.PI;

    console.log(angleDeg);

    // Makes the gameArea-circle(dont remeber the name) by checking so its always 40 less than width/height
    let circleSize;
    if(windowWidth >= windowHeight){
        circleSize = windowHeight - 40;
    } else {
        circleSize = windowWidth - 40;
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
              < ballRadius + hitboxRadius) {
                console.log('lé boing');

      }
    }


    
    var dx = ballXPosition - circleSize/2;
    var dy = ballYPosition - circleSize/2;

    //Detects if the ball is outside the GameArea [Have to be limited by the players Area somehow so not all players lose at the same time]
    //if (Math.sqrt(dx * dx + dy * dy) >= circleSize/2 - ballRadius) {


    if(dist(ballXPosition, ballYPosition, width/2, height/2) > -ballRadius + circleSize/2){


      const velocity = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
      
      let angleToCollisionPoint = Math.atan2(-dy, dx);
      console.log("v",angleToCollisionPoint);
      var oldAngle = Math.atan2(-ballSpeedY, ballSpeedX);
      var newAngle = 2 * angleToCollisionPoint - oldAngle;

      ballSpeedX = -velocity * Math.cos(newAngle);
      ballSpeedY = velocity * Math.sin(newAngle);

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

  // wall bounce - [will be removed but this is basicly how bounce works]
  if (ballYPosition > height || ballYPosition < 0){
    ballSpeedY *= -1; 
  } else if (ballXPosition > width || ballXPosition < 0){
    ballSpeedX *= -1; 
  }


  //Putting detection-hitbox-spheres[what do we call them?] They will be invisible in the future
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


