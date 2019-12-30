let player1Position = 0;
let player2Position = 180;
let ballSpeedX = 5;
let ballSpeedY = 5;
let ballXPosition = innerWidth/2;
let ballYPosition = innerHeight/2;
let padLength = 20;
let hitboxRadius = 7;

//Draws this every 60 frames(see frameRate(60))
// function draw() {
//     clear();
//     if(isGameRunning == 0) {
//       /** grey background */
//     background('#777b7e')

//     /** big brown rect. in the middle*/ 
//     noStroke()
//     fill('#999966');
//     rect((width * .5) -350, 0, 700, height) 

//     /** top vertical brown line*/
//     strokeWeight(60)
//     stroke('#999966');
//     line(0, 150, width, 500);

//     /** middle vertical brown line*/
//     strokeWeight(140)
//     stroke('#999966');
//     line(0, 280, width, 630);

//     /** bottom vertical brown line*/
//     strokeWeight(40)
//     stroke('#999966');
//     line(0, 400, width, 750);
    
//     /**Player 1 */ 
//     /** assigned color player one */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#4363d8');
//     rect((width * .5) -300, 200, 55, 45, 15)

//     /** text player one*/
//     let playerOne = 'Player 1'
//     textSize(30);
//     fill('#000000');
//     text(playerOne, (width * .5) -200, 232)

//     /** assigned left-key player one */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#ffffff');
//     rect((width * .5) +180, 200, 50, 45, 15)
    
//     /** text left-key player one */
//     fill('#000000');
//     triangle((width * .5) +195, 230, (width * .5) +215, 230, (width * .5) +205, 210)
    
//     /** assigned right-key player one */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#ffffff');
//     rect((width * .5) +250, 200, 50, 45, 15)

//     /** text right-key player one */
//     fill('#000000');
//     triangle((width * .5) +265, 212, (width * .5) +285, 212, (width * .5) +275, 232)
    
//     /**Player 2 */
//     /** assigned color player two */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#cc0000');
//     rect((width * .5) -300, 260, 55, 45, 15)

//     /** text player two*/
//     let playerTwo = 'Player 2'
//     textSize(30);
//     fill('#000000');
//     text(playerTwo, (width * .5) -200, 292)

//     /** assigned left-key player two */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#ffffff');
//     rect((width * .5) +180, 260, 50, 45, 15)

//     /** text left-key player two */
//     let p2LeftKey = 'a'
//     textSize(30);
//     fill('#000000');
//     text(p2LeftKey, (width * .5) +197, 290)

//     /** assigned right-key player two */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#ffffff');
//     rect((width * .5) +250, 260, 50, 45, 15)

//     /** text right-key player two */
//     let p2RightKey = 'z'
//     textSize(30);
//     fill('#000000');
//     text(p2RightKey, (width * .5) +267, 290)

//     /**Player 3 */
//     /** assigned color player three */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#911eb4');
//     rect((width * .5) -300, 320, 55, 45, 15)

//     /** text player three*/
//     let playerThree = 'Player 3'
//     textSize(30);
//     fill('#000000');
//     text(playerThree, (width * .5) -200, 352)

//     /** assigned left-key player three */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#ffffff');
//     rect((width * .5) +180, 320, 50, 45, 15)

//     /** text left-key player three */
//     let p3LeftKey = 'l'
//     textSize(30);
//     fill('#000000');
//     text(p3LeftKey, (width * .5) +202, 352)

//     /** assigned right-key player three */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#ffffff');
//     rect((width * .5) +250, 320, 50, 45, 15)

//     /** text right-key player three */
//     let p3RightKey = 'p'
//     textSize(30);
//     fill('#000000');
//     text(p3RightKey, (width * .5) +267, 350)
  
//     /**Player 4 */
//     /** assigned color player four */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#FFe119');
//     rect((width * .5) -300, 380, 55, 45, 15)

//     /** text player four*/
//     let playerFour = 'Player 4'
//     textSize(30);
//     fill('#000000');
//     text(playerFour, (width * .5) -200, 412)

//     /** assigned left-key player four */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#ffffff');
//     rect((width * .5) +180, 380, 50, 45, 15)

//      /** text left-key player four */
//      let p4LeftKey = '3'
//      textSize(30);
//      fill('#000000');
//      text(p4LeftKey, (width * .5) +198, 412)

//     /** assigned right-key player four */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#ffffff');
//     rect((width * .5) +250, 380, 50, 45, 15)

//      /** text right-key player four */
//      let p4RightKey = 'e'
//      textSize(30);
//      fill('#000000');
//      text(p4RightKey, (width * .5) +267, 410)
 
//     /**Player 5 */
//     /** assigned color player five */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#3cb44b');
//     rect((width * .5) -300, 440, 55, 45, 15)

//     /** text player five */
//     let playerFive = 'Player 5'
//     textSize(30);
//     fill('#000000');
//     text(playerFive, (width * .5) -200, 472)

//     /** assigned left-key player five */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#ffffff');
//     rect((width * .5) +180, 440, 50, 45, 15)

//     /** text left-key player five */
//     let p5LeftKey = '9'
//     textSize(30);
//     fill('#000000');
//     text(p5LeftKey, (width * .5) +198, 472)

//     /** assigned right-key player five */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#ffffff');
//     rect((width * .5) +250, 440, 50, 45, 15)

//     /** text right-key player five */
//     let p5RightKey = '0'
//     textSize(30);
//     fill('#000000');
//     text(p5RightKey, (width * .5) +267, 472)
  
//     /**Player 6 */
//     /** assigned color player six */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#00ffff');
//     rect((width * .5) -300, 500, 55, 45, 15)

//     /** text player six */
//     let playerSix = 'Player 6'
//     textSize(30);
//     fill('#000000');
//     text(playerSix, (width * .5) -200, 532)

//     /** assigned left-key player six */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#ffffff');
//     rect((width * .5) +180, 500, 50, 45, 15)

//     /** text left-key player six */
//     let p6LeftKey = '5'
//     textSize(30);
//     fill('#000000');
//     text(p6LeftKey, (width * .5) +198, 532)


//     /** assigned right-key player six */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#ffffff');
//     rect((width * .5) +250, 500, 50, 45, 15)

//     /** text right-key player six */
//     let p6RightKey = '6'
//     textSize(30);
//     fill('#000000');
//     text(p6RightKey, (width * .5) +267, 532)
  
 
//     /** add more players button, need to have a mouseClicked event */ 
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#ffffff');
//     rect((width * .5) +190, 700, 100, 45, 15)
            
//     /** "+"-sign in add more player button */
//     let s = '+'
//     textSize(30);
//     fill('#000000');
//     text(s,(width * .5) +230, 730)
             
//     /** line behind headline */
//     /** yellow line behind headline */
//     strokeWeight(60)
//     stroke('#F4ed47');
//     line(0, 60, width, 60);

//     /** black lines over yellow line */
//     strokeWeight(1)
//     stroke('#000000');
//     line(0, 30, width, 30);

//     strokeWeight(3)
//     stroke('#000000');
//     line(0, 45, width, 45);

//     strokeWeight(1)
//     stroke('#000000');
//     line(0, 55, width, 55);

//     strokeWeight(2)
//     stroke('#000000');
//     line(0, 60, width, 60);

//     strokeWeight(2)
//     stroke('#000000');
//     line(0, 80, width, 80);

//     strokeWeight(2)
//     stroke('#000000');
//     line(0, 90, width, 90);

//     // sound button moved to GameMenu.ts as drawSoundButton()
//     // /** sound button in top left corner, need to have a mouseClicked event 
//     //  * get it overlined when clicked  */

//     // /** the round button */
//     // strokeWeight(3)
//     // stroke('#000000')
//     // fill('#F4ed47');
//     // circle(60, 60, 80)

//     // /** speaker sign in button */
//     // fill('#000000');
//     // triangle(75, 80, 75, 40, 40, 60)

//     // fill('#F4ed47');
//     // stroke('#F4ed47')
//     // rect(47, 50, 5, 30)

//     // fill('#000000');
//     // stroke('#000000')
//     // rect(38, 54, 8, 13)

//     // /** overline when clicked */
//     // strokeWeight(10)
//     // stroke('#000000');
//     // line(40, 90, 80, 30);

//     gameManager.gameMenu.drawSoundButton();

//     /**headline Battle-Pong svg */
//     image (img, width * .5 -(img.width * 0.5), 20)

//     /** start button in right bottom corner, need to have a mouseClicked event */
//     /** black shadow for start button */
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#000000');
//     rect(1290, 660, 150, 70, 20)
 
//     /** yellow start button */
//     strokeWeight(3)
//     stroke('#000000')
//     fill('#F4ed47');
//     rect(1300, 650, 150, 70, 20)
 
//     /** text in start button */
//     let startButton = 'START'
//     textSize(30);
//     fill('#000000');
//     text(startButton, 1325, 695)
//   }
    
//     if(isGameRunning == 1) {

//     let ballXPositionOld = ballXPosition;
//     let ballYPositionOld = ballYPosition;


//     //Pushes the ball in its direction by adding the "speed" every frame
//     ballXPosition += ballSpeedX;
//     ballYPosition += ballSpeedY;
    
//     let angleDeg = Math.atan2(ballYPositionOld - ballYPosition, ballXPositionOld- ballXPosition) * 180 / Math.PI;

//     // console.log(angleDeg);

//     // Makes the gameArea-circle(dont remeber the name) by checking so its always 40 less than width/height
//     let circleSize;
//     if(windowWidth >= windowHeight){
//         circleSize = windowHeight - 40;
//     } else {
//         circleSize = windowWidth - 40;
//     }

//     // The balls size is connected to the size of the screen
//     let ballRadius = circleSize/40;

//     // Takes the playerPosition (a degree) and makes it into a X Y cordinate - array
//     //The reason for padLength is that it starts with position an goes all the way through the pads length
//     let player1XCoordinates = [];
//     let player1YCoordinates = [];
//     for(let i = 0; i <= padLength; i++){
//       player1XCoordinates[i] = (circleSize/2) * Math.cos(((player1Position + i) * Math.PI / 180)) + (width/2);
//     }
//     for(let i = 0; i <= padLength; i++){
//       player1YCoordinates[i] = (circleSize/2) * Math.sin(((player1Position + i) * Math.PI / 180)) + (height/2);
//     }

//     //Detects if the ball touches the player 1 pad [FEAL FREE TO EXPERIMENT WITH COLLISION]
//     //The reason for padLength is that it starts with position an goes all the way through the pads length


//     for(let i = 0; i <= padLength; i++){
//       if(dist(ballXPosition, ballYPosition, player1XCoordinates[i], player1YCoordinates[i])
//               < ballRadius + hitboxRadius) {
//                 // console.log('lé boing');

//       }
//     }

//     let dx = ballXPosition - circleSize/2;
//     let dy = ballYPosition - circleSize/2;

//     if(dist(ballXPosition, ballYPosition, width/2, height/2) > -ballRadius + circleSize/2){


//       const velocity = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);
      
//       let angleToCollisionPoint = Math.atan2(-dy, dx);
//       // console.log("v",angleToCollisionPoint);
//       var oldAngle = Math.atan2(-ballSpeedY, ballSpeedX);
//       var newAngle = 2 * angleToCollisionPoint - oldAngle;

//       ballSpeedX = -velocity * Math.cos(newAngle);
//       ballSpeedY = velocity * Math.sin(newAngle);

//     } 



//     //background
//     background(119, 123, 126);

//     //Ball
//     fill(255, 255, 255);
//     stroke(0, 0, 0);
//     strokeWeight(2);
//     ellipse(ballXPosition, ballYPosition, ballRadius*2, ballRadius*2);


//     //mainGameArea
//     noFill();
//     stroke(0, 0, 0);
//     strokeWeight(1);
//     ellipse(width/2, height/2, circleSize, circleSize);

//     // Original code for players
//     //player1
//     stroke(0, 0, 0);
//     strokeWeight(9);
//     arc(width/2, height/2, circleSize, circleSize, player1Position, player1Position + padLength);
//     stroke(255, 204, 0);
//     strokeWeight(5);
//     arc(width/2, height/2, circleSize, circleSize, player1Position, player1Position + padLength);


//     //player2
//     stroke(0, 0, 0);
//     strokeWeight(9);
//     arc(width/2, height/2, circleSize, circleSize, player2Position, player2Position + padLength);
//     stroke(253,188,180);
//     strokeWeight(5);
//     arc(width/2, height/2, circleSize, circleSize, player2Position, player2Position + padLength); 

//     handlePads();
//     handleBall(player1XCoordinates, player1YCoordinates);

//     push()
//     // these two need to be in main draw(), which is this one
//     gameManager.update();
//     gameManager.draw()
//   }
// }

// function keyPressed() {
//   if(keyCode === ENTER) {
//     isGameRunning = 1;
//   }
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



