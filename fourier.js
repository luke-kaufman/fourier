let angle = 0;
let signal = [];
let epicycleEdge = 0; //really need to find this before animation starts
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let canvasWidth = 1000;
let canvasHeight = 600;
let angVelocity = 0.02;
let alpha = 130; 
//Flags
let SQUARE_WAVE = 1; //radio value
let SAWTOOTH_WAVE = 2; // radio value
//Componenets
let NSlider;
let previousNSliderValue;
let angVelocitySlider;
let previousAngVelocitySliderValue;
let wavesRadio;
let values;
let fourierY;


function setup() {
    createCanvas(1000, 600);
    //NSlider
    NSlider = createSlider(1,50,7);
    //angVelocitySlider
    angVelocitySlider = createSlider(5,100,30);
    //Radio
    wavesRadio = createRadio();
    wavesRadio.option(SQUARE_WAVE, 'Square Wave');
    wavesRadio.option(SAWTOOTH_WAVE, 'Sawtooth Wave');
    wavesRadio.selected(2);
    //triangleWaveCheckbox = createCheckbox('Triangle Wave', false);
    //y = [12,57,23,-23,-75,86,-34,-68,56,32,3,46,-68,12,57,23,-23,-75,86,-34,-68,56,32,3,46,-68];
    // dft(y);
  }
  
function draw() {
    background(0);
    translate(width/4,height/2);
    let x=0;
    let y=0;
    let radius=0;
    let v = null;
    

    for(let i=0; i<(NSlider.value()); i++){
      previousx = x;
      previousy = y;
  
      currentWave = wavesRadio.value();
      //make into switch case
      if(currentWave == 1){
        console.log("case 1 begin");
        v = squareWave(x,y,i);
        x = v[0];
        y = v[1];
        radius = v[2];
        console.log("case 1 end"); 
      }
      if(currentWave == 2){
        v = sawtoothWave(x,y,i);
        x = v[0];
        y = v[1];
        radius = v[2];
        console.log("case 2");
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
    angle += angVelocitySlider.value()/1000;
    
    if(angle>TWO_PI){
      angle = 0;
    }

    if(signal.length>(screenWidth-epicycleEdge)){
      signal.pop();
    }

}

function sawtoothWave(x,y,i) {
    //sawtooth wave
    let n = (i+1) * -1; 
    let radius = 200 * (1/(n*PI))
    x += radius * cos(n*angle);
    y += radius * sin(n*angle);

    return [x,y,radius];
}


function squareWave(x,y,i) {

  let n = (2*i + 1) * -1; // n is odd numbers starting from 1
  let radius = 100 * (4/(n*PI))
  x += radius * cos(n*angle);
  y += radius * sin(n*angle); 

  return [x,y,radius];
}