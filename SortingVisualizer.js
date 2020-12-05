var list;
var events = [];
var prevEvents = [];
var isSorting = false;
var autoPlay = true;
const updateTimes = [2000,1000,500,250,100,50];
let timeSlider;
let arrInput;
var sortInfo;
var genOptions;
var relElements = [];
var title = "Select a sort to start.";

function setup() {
  createCanvas(windowWidth,windowHeight);
  textAlign(CENTER);
  var listLength = random(4,16);
  var tempList = genList(listLength,"random",[1,2*listLength]);
  list = new Blocks(tempList);
  fill(0);
  textSize(32);

  const n = sortInfo.length;
  for (var i = 0; i < n; i++){
    let s = sortInfo[i];
    var buttonText = "("+s.hotkey+") "+s.name;
    let button = createButton(buttonText);
    button.mouseClicked(() => {sortWith(s.fn);title = s.name;})
    relElements.push(new RelativeElement(button,1/32,(2*i+1)/(2*n+2),1/8,1/(n+1)));
  }  

  timeSlider = createSlider(0,updateTimes.length-1,updateTimes.indexOf(500),1);
  timeSlider = new RelativeElement(timeSlider,3/16,61/64,5/8);
  relElements.push(timeSlider);

  arrInput = createInput(list.vals.join(","));
  arrInput.style("background-color","#ffffff");
  arrInput = new RelativeElement(arrInput,27/32,1/8,1/8,1/16);
  relElements.push(arrInput);
  updateButton = createButton("Update list!");
  updateButton.mouseClicked(updateBlocks);
  updateButton = new RelativeElement(updateButton,27/32,3/16,1/8,1/16);
  relElements.push(updateButton);

  for (var i = 0; i < genOptions.length; i++){
    let g = genOptions[i];
    var buttonText = g.name;
    let button = createButton(buttonText);
    button.mouseClicked(() => {list.setVals(genList(list.len(),g.mode));})
    relElements.push(new RelativeElement(button,27/32,(6+i)/16,1/8,1/16));
  }
}

function updateBlocks(){
  print(arrInput);
  let inp = arrInput.value.replace(" ","").split(",");
  let isOkay = inp.length>=2;
  var newVals = []
  for (var i = 0; isOkay && i<inp.length; i++){
    isOkay = !isNaN(parseInt(inp[i]))
    if (isOkay){newVals.push(parseInt(inp[i]));}
  }
  if (isOkay){
    list.setVals(newVals);
    title = "List updated!"
  } else if (inp.length<2) {
    alert("Please ensure the input has at least 2 elements:\n"+arrInput.value.replace(" ",""));
  } else {
    alert("Please ensure the input is an array of integers:\n"+arrInput.value.replace(" ",""));
  }
}

async function updateList(isForward=true){
  if ((isForward && events.length > 0) || (!isForward && prevEvents.length > 0)){
    var tup = isForward?events.shift():prevEvents.pop();
    var indices = tup[0];
    print(tup);
    if (tup.length>1){list.updateActive(tup[1]);}
    if (indices.length==2){swap(list.vals,indices[0],indices[1]);}
    if (isForward){prevEvents.push(tup);} else {events.unshift(tup);}
    if (autoPlay) {setTimeout(() => {updateList(isForward);},updateTimes[timeSlider.value]);}
  } else {
    list.resetActive();
  }
}

function keyPressed() {
  if (!isSorting && events.length==0){
    for (const s of sortInfo){
      if (keyCode == s.hotkey.charCodeAt(0)){
        sortWith(s.fn); title = s.name;
      }
    }
  }
  if (keyCode == 32){                             //" " -- autoPlay on/off
    autoPlay = !autoPlay; print(autoPlay); updateList();
  }
  else if (keyCode == 39){                        //"→" -- autoPlay off, next step
    autoPlay = false; updateList();
  }
  else if (keyCode == 37){                        //"←" -- autoPlay off, prev step
    autoPlay = false; updateList(false);
  }
}

function draw() {
  createCanvas(windowWidth,windowHeight);
  background(255);
  relElements.forEach(e => {e.update();});
  stroke(0);
  strokeWeight(2);
  list.show();
  fill(0);
  strokeWeight(0);
  relativeText(title,1/2,3/32,5/8,1/8);
  relativeText("Enter a comma separated list:\n(e.g. 3,7,5,1,9)",29/32,3/32,1/8,1/16);
  relativeText("Generate a list:",29/32,11/32,1/8,1/16);
}
