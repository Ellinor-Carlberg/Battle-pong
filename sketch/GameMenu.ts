/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */

let img: any;

/* commented out because it is a duplicate from sketch.ts */
// function preload() {
//     img = loadImage('./assets/images/battle_pong.svg')
//     // Tyvärr har jag inte fått till den globala typningen för
//     // inladdningen av ljud men fungerar bra enligt nedan..
//     // sound = (window as any).loadSound('../assets/mySound.wav');
// }

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function below
 */
/* commented out because it is a duplicate from sketch.ts */
// function setup() {
//     createCanvas(windowWidth, windowHeight)
//     frameRate(60)
//     fullscreen()

// }

/**
 * Built in draw function in P5
 * This is a good place to call public funcions of the object
 * you created in the setup function above
 */
function draw() {

    /** Background, (grey and brown) */

    /** grey background */
    background('#777b7e')

    /** big brown rect. in the middle*/ 
    noStroke()
    fill('#999966');
    rect((width * .5) -350, 0, 700, height) 

    /** top vertical brown line*/
    strokeWeight(60)
    stroke('#999966');
    line(0, 150, width, 500);

    /** middle vertical brown line*/
    strokeWeight(140)
    stroke('#999966');
    line(0, 280, width, 630);

    /** bottom vertical brown line*/
    strokeWeight(40)
    stroke('#999966');
    line(0, 400, width, 750);
    
    /**Player 1 */ 
    /** assigned color player one */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#4363d8');
    rect((width * .5) -300, 200, 55, 45, 15)

    /** text player one*/
    let playerOne = 'Player 1'
    textSize(30);
    fill('#000000');
    text(playerOne, (width * .5) -200, 232)

    /** assigned left-key player one */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#ffffff');
    rect((width * .5) +180, 200, 50, 45, 15)
    
    /** text left-key player one */
    fill('#000000');
    triangle((width * .5) +195, 230, (width * .5) +215, 230, (width * .5) +205, 210)
    
    /** assigned right-key player one */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#ffffff');
    rect((width * .5) +250, 200, 50, 45, 15)

    /** text right-key player one */
    fill('#000000');
    triangle((width * .5) +265, 212, (width * .5) +285, 212, (width * .5) +275, 232)
    
    /**Player 2 */
    /** assigned color player two */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#cc0000');
    rect((width * .5) -300, 260, 55, 45, 15)

    /** text player two*/
    let playerTwo = 'Player 2'
    textSize(30);
    fill('#000000');
    text(playerTwo, (width * .5) -200, 292)

    /** assigned left-key player two */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#ffffff');
    rect((width * .5) +180, 260, 50, 45, 15)

    /** text left-key player two */
    let p2LeftKey = 'a'
    textSize(30);
    fill('#000000');
    text(p2LeftKey, (width * .5) +197, 290)

    /** assigned right-key player two */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#ffffff');
    rect((width * .5) +250, 260, 50, 45, 15)

    /** text right-key player two */
    let p2RightKey = 'z'
    textSize(30);
    fill('#000000');
    text(p2RightKey, (width * .5) +267, 290)

    /**Player 3 */
    /** assigned color player three */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#911eb4');
    rect((width * .5) -300, 320, 55, 45, 15)

    /** text player three*/
    let playerThree = 'Player 3'
    textSize(30);
    fill('#000000');
    text(playerThree, (width * .5) -200, 352)

    /** assigned left-key player three */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#ffffff');
    rect((width * .5) +180, 320, 50, 45, 15)

    /** text left-key player three */
    let p3LeftKey = 'l'
    textSize(30);
    fill('#000000');
    text(p3LeftKey, (width * .5) +202, 352)

    /** assigned right-key player three */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#ffffff');
    rect((width * .5) +250, 320, 50, 45, 15)

    /** text right-key player three */
    let p3RightKey = 'p'
    textSize(30);
    fill('#000000');
    text(p3RightKey, (width * .5) +267, 350)
  
    /**Player 4 */
    /** assigned color player four */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#FFe119');
    rect((width * .5) -300, 380, 55, 45, 15)

    /** text player four*/
    let playerFour = 'Player 4'
    textSize(30);
    fill('#000000');
    text(playerFour, (width * .5) -200, 412)

    /** assigned left-key player four */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#ffffff');
    rect((width * .5) +180, 380, 50, 45, 15)

     /** text left-key player four */
     let p4LeftKey = '3'
     textSize(30);
     fill('#000000');
     text(p4LeftKey, (width * .5) +198, 412)

    /** assigned right-key player four */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#ffffff');
    rect((width * .5) +250, 380, 50, 45, 15)

     /** text right-key player four */
     let p4RightKey = 'e'
     textSize(30);
     fill('#000000');
     text(p4RightKey, (width * .5) +267, 410)
 
    /**Player 5 */
    /** assigned color player five */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#3cb44b');
    rect((width * .5) -300, 440, 55, 45, 15)

    /** text player five */
    let playerFive = 'Player 5'
    textSize(30);
    fill('#000000');
    text(playerFive, (width * .5) -200, 472)

    /** assigned left-key player five */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#ffffff');
    rect((width * .5) +180, 440, 50, 45, 15)

    /** text left-key player five */
    let p5LeftKey = '9'
    textSize(30);
    fill('#000000');
    text(p5LeftKey, (width * .5) +198, 472)

    /** assigned right-key player five */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#ffffff');
    rect((width * .5) +250, 440, 50, 45, 15)

    /** text right-key player five */
    let p5RightKey = '0'
    textSize(30);
    fill('#000000');
    text(p5RightKey, (width * .5) +267, 472)
  
    /**Player 6 */
    /** assigned color player six */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#00ffff');
    rect((width * .5) -300, 500, 55, 45, 15)

    /** text player six */
    let playerSix = 'Player 6'
    textSize(30);
    fill('#000000');
    text(playerSix, (width * .5) -200, 532)

    /** assigned left-key player six */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#ffffff');
    rect((width * .5) +180, 500, 50, 45, 15)

    /** text left-key player six */
    let p6LeftKey = '5'
    textSize(30);
    fill('#000000');
    text(p6LeftKey, (width * .5) +198, 532)


    /** assigned right-key player six */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#ffffff');
    rect((width * .5) +250, 500, 50, 45, 15)

    /** text right-key player six */
    let p6RightKey = '6'
    textSize(30);
    fill('#000000');
    text(p6RightKey, (width * .5) +267, 532)
  
 
    /** add more players button, need to have a mouseClicked event */ 
    strokeWeight(3)
    stroke('#000000')
    fill('#ffffff');
    rect((width * .5) +190, 700, 100, 45, 15)
            
    /** "+"-sign in add more player button */
    let s = '+'
    textSize(30);
    fill('#000000');
    text(s,(width * .5) +230, 730)
             
    /** line behind headline */
    /** yellow line behind headline */
    strokeWeight(60)
    stroke('#F4ed47');
    line(0, 60, width, 60);

    /** black lines over yellow line */
    strokeWeight(1)
    stroke('#000000');
    line(0, 30, width, 30);

    strokeWeight(3)
    stroke('#000000');
    line(0, 45, width, 45);

    strokeWeight(1)
    stroke('#000000');
    line(0, 55, width, 55);

    strokeWeight(2)
    stroke('#000000');
    line(0, 60, width, 60);

    strokeWeight(2)
    stroke('#000000');
    line(0, 80, width, 80);

    strokeWeight(2)
    stroke('#000000');
    line(0, 90, width, 90);

    /** sound button in top left corner, need to have a mouseClicked event 
     * get it overlined when clicked  */

    /** the round button */
    strokeWeight(3)
    stroke('#000000')
    fill('#F4ed47');
    circle(60, 60, 80)

    /** speaker sign in button */
    fill('#000000');
    triangle(75, 80, 75, 40, 40, 60)

    fill('#F4ed47');
    stroke('#F4ed47')
    rect(47, 50, 5, 30)

    fill('#000000');
    stroke('#000000')
    rect(38, 54, 8, 13)

    /** overline when clicked */
    strokeWeight(10)
    stroke('#000000');
    line(40, 90, 80, 30);

    /**headline Battle-Pong svg */
    image (img, width * .5 -(img.width * 0.5), 20)

    /** start button in right bottom corner, need to have a mouseClicked event */
    /** black shadow for start button */
    strokeWeight(3)
    stroke('#000000')
    fill('#000000');
    rect(1290, 660, 150, 70, 20)
 
    /** yellow start button */
    strokeWeight(3)
    stroke('#000000')
    fill('#F4ed47');
    rect(1300, 650, 150, 70, 20)
 
    /** text in start button */
    let startButton = 'START'
    textSize(30);
    fill('#000000');
    text(startButton, 1325, 695)
    
}

/**
 *  Built in windowResize listener function in P5
 */
/* commented out because it is a duplicate from sketch.ts */
// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// }