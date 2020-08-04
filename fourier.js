let angle = 0;
let signal = [];
let epicycleEdge = 0;

function setup() {
    createCanvas(1000, 600);
  }
  
function draw() {
    background(0);
    translate(width/4,height/2);
    let numOfCircles=50;
    let alpha = 130;
    let x=0;
    let y=0;
    for(let i=0; i<numOfCircles; i++){
      previousx = x;
      previousy = y;
      
      //code that determines signal
      let n = 2*i + 1; // n is odd numbers starting from 1
      let radius = 100 * (4/(n*PI))
      x += radius * cos(n*angle);
      y += radius * sin(n*angle); 

      //finds full extent of epicycles for signal placement
      let currentEdge = previousx + radius;
      if(currentEdge>epicycleEdge){
        epicycleEdge=currentEdge;
      }

      //circles
      noFill();
      stroke(255,alpha);
      ellipse(previousx, previousy, radius*2);
      
      //point
      fill(255,alpha);
      ellipse(x,y,10);   
      
      //line to points
      stroke(255);
      line(previousx, previousy, x, y);
      
    }
    signal.unshift(y); //take y value for drawing and add to beginning

    //line to signal
    translate(epicycleEdge, 0);
    stroke(255, alpha);
    line(x-epicycleEdge, y, 0, signal[0])

    //signal
    beginShape();
    noFill();
    stroke(255);
    for(let i = 0; i<signal.length; i++){
      vertex(i,signal[i]);
    }
    endShape();
    
    //update angle
    angle += 0.01;
    
    if(angle>TWO_PI){
      angle = 0;
    }
    if(signal.length>600){
      signal.pop();
    }
  }