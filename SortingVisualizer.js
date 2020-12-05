var list;
var events = [];
var prevEvents = [];
var isSorting = false;
var autoPlay = true;
const updateTimes = [2000,1000,500,250,100,50];
let timeSlider;
let arrInput;
var sortInfo;
var relElements = [];
var title = "Select a sort to start.";

function setup() {
  createCanvas(windowWidth,windowHeight);
  textAlign(CENTER);
  var listLength = random(4,16);
  var tempList = [];
  for (var i = 0; i < listLength; i++){
    var v = round(random(1,2*listLength));
    tempList.push(v);
    print(tempList[i]);
  }
  list = new Blocks(tempList);
  fill(0);
  textSize(32);

  sortInfo = [
    {name: "Bubble Sort", hotkey: "B", fn: bubbleSort},
    {name: "Selection Sort", hotkey: "S", fn: selectionSort},
    {name: "Insertion Sort", hotkey: "I", fn: insertionSort},
    {name: "Merge Sort", hotkey: "M", fn: mergeSort},
    {name: "Heapsort", hotkey: "H", fn: heapSort},
    {name: "Quicksort", hotkey: "Q", fn: naiveQuickSort},
    {name: "Quicksort: Smart Pivot", hotkey: "P", fn: quickSort},
    {name: "Bogosort", hotkey: "G", fn: bogoSort},
    {name: "Shuffle", hotkey: "R", fn: shuffleList}
  ];

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
  arrInput = new RelativeElement(arrInput,27/32,1/4,1/8,1/8);
  relElements.push(arrInput);
  updateButton = createButton("Update list!");
  updateButton.mouseClicked(updateBlocks);
  updateButton = new RelativeElement(updateButton,27/32,3/8,1/8,1/8);
  relElements.push(updateButton);
}

function updateBlocks(){
  let inp = arrInput.value().replace(" ","").split(",");
  let isOkay = inp.length>=2;
  var newVals = []
  for (var i = 0; isOkay && i<inp.length; i++){
    isOkay = !isNaN(parseInt(inp[i]))
    if (isOkay){newVals.push(parseInt(inp[i]));}
  }
  if (isOkay){
    list.vals = newVals;
    list.resetActive();
    isSorting = false;
    prevEvents = [];
    events = [];
    title = "List updated!"
  } else if (inp.length<2) {
    alert("Please ensure the input has at least 2 elements:\n"+arrInput.value().replace(" ",""));
  } else {
    alert("Please ensure the input is an array of integers:\n"+arrInput.value().replace(" ",""));
  }
}

function valToColor(prop, s){
  var h = 300*prop;
  var v = 1;
  var c = 1;
  var x = c*(1 - abs(((h/60)%2) - 1));
  var tup;
  if (h<60){tup = [c,x,0];}
  else if (h<120){tup = [x,c,0];}
  else if (h<180){tup = [0,c,x];}
  else if (h<240){tup = [0,x,c];}
  else {tup = [x,0,c];}
  return [255*(tup[0]+v-c),255*(tup[1]+v-c),255*(tup[2]+v-c),255*s];
}

function swap(ls,i,j){
  if (0<=i && i<ls.length && 0<=j && j<ls.length){
    var temp = ls[i];
    ls[i] = ls[j];
    ls[j] = temp;
  } else {
    throw "Values "+i+" "+j+" not valid as indices for list(length="+ls.length+")";
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
    if (autoPlay) {setTimeout(() => {updateList(isForward);},updateTimes[timeSlider.value()]);}
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
  relativeText(title,1/2,3/32);
}
