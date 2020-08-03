let angle = 0;

function setup() {
    createCanvas(1000, 600);
  }
  
function draw() {
    background(0);
    
    //main circle
    let radius = 200;
    noFill();
    stroke(255);
    ellipse(width/4, height/2, radius*2);
    
    //point
    let x = radius * cos(angle);
    let y = radius * sin(angle); 

    angle += 0.1;
  }