var list;
var events = [];
var prevEvents = [];
var isSorting = false;
var autoPlay = true;
const updateTimes = [2000,1000,500,250,100,50];
let timeSlider;
var sortInfo;

function setup() {
  createCanvas(windowWidth,windowHeight);
  textAlign(CENTER);
  var listLength = random(20,40);
  var tempList = [];
  for (var i = 0; i < listLength; i++){
    var v = round(random(1,50));
    tempList.push(v);
    print(tempList[i]);
  }
  list = new Blocks(tempList);
  timeSlider = createSlider(0,updateTimes.length-1,updateTimes.indexOf(500),1);
  timeSlider.position(100, height-25);
  timeSlider.style('width',width-200+'px');

  sortInfo = [
    {name: "Bubble Sort", hotkey: "B", fn: bubbleSort},
    {name: "Selection Sort", hotkey: "S", fn: selectionSort},
    {name: "Insertion Sort", hotkey: "I", fn: insertionSort},
    {name: "Merge Sort", hotkey: "M", fn: mergeSort},
    {name: "Heapsort", hotkey: "S", fn: selectionSort},
    {name: "Quicksort", hotkey: "Q", fn: naiveQuickSort},
    {name: "Quicksort: Smart Pivot", hotkey: "P", fn: quickSort},
    {name: "Bogosort", hotkey: "G", fn: bogoSort},
    {name: "Shuffle", hotkey: "H", fn: shuffleList}
  ];
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

async function updateList(){
  if (events.length > 0){
    var tup = events.shift();
    var indices = tup[0];
    print(tup);
    if (tup.length>1){list.updateActive(tup[1]);}
    if (indices.length==2){swap(list.vals,indices[0],indices[1]);}
    prevEvents.push(tup);
    if (autoPlay) {setTimeout(updateList,updateTimes[timeSlider.value()]);}
  } else {
    list.resetActive();
  }
}

function keyPressed() {
  if (!isSorting && events.length==0){
    for (const s of sortInfo){
      if (keyCode == s.hotkey.charCodeAt(0)){
        sortWith(s.fn);
      }
    }
    // switch (keyCode){
    //   case 81: {sortWith(naiveQuickSort); break;} //"Q" -- naive Quicksort
    //   case 82: {sortWith(shuffleList); break;}    //"R" -- Restart
    //   case 83: {sortWith(selectionSort); break;}  //"S" -- Selectionsort
    //   case 71: {sortWith(bogoSort); break;}       //"G" -- boGosort
    //   case 66: {sortWith(bubbleSort); break;}     //"B" -- Bubblesort
    //   case 72: {sortWith(heapSort); break;}       //"H" -- Heapsort
    //   case 77: {sortWith(mergeSort); break;}      //"M" -- Mergesort
    //   case 73: {sortWith(insertionSort); break;}  //"I" -- Insertionsort
    //   case 80: {sortWith(quickSort); break;}      //"P" -- quicksort with smart Pivot
    //   default: {break;}
    // }
  }
  if (keyCode == 32){                             //" " -- autoPlay on/off
    autoPlay = !autoPlay; print(autoPlay); updateList();
  }
  else if (keyCode == 39){                        //"→" -- autoPlay off, next step
    autoPlay = false; updateList();
  }
}

function draw() {
  createCanvas(windowWidth,windowHeight);
  background(255);
  stroke(0);
  strokeWeight(2);
  list.show();
  timeSlider.position(100, height-30);
  timeSlider.style('width',width-200+'px');
}
