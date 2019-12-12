function setup() {
    createCanvas(windowWidth, windowHeight);

}

function draw() {
let circleSize;
    if(windowWidth >= windowHeight){
        circleSize = windowHeight - 30;
    } else {
        circleSize = windowWidth - 30;
    }
    background(100, 100, 100);
    ellipse(width/2, height/2, circleSize, circleSize)
}
  
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}