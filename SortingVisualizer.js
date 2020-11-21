var list;
var events = [];
var prevEvents = [];
var isSorting = false;

function setup() {
  createCanvas(windowWidth,windowHeight);
  textAlign(CENTER);
  var listLength = 8//random(4,10);
  var tempList = [];
  for (var i = 0; i < listLength; i++){
    var v = round(random(1,100));
    tempList.push(v);
    print(tempList[i]);
  }
  list = new Blocks(tempList);
}

function valToColor(prop, s){
  var h = 300*prop;
  var v = 1;
  var c = v*s;
  var x = c*(1 - abs(((h/60)%2) - 1));
  var tup;
  if (h<60){tup = [c,x,0];}
  else if (h<120){tup = [x,c,0];}
  else if (h<180){tup = [0,c,x];}
  else if (h<240){tup = [0,x,c];}
  else {tup = [x,0,c];}
  return [255*(tup[0]+v-c),255*(tup[1]+v-c),255*(tup[2]+v-c)];
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
    print(tup);
    swap(list.vals,tup[0],tup[1]);
    prevEvents.push(tup);
    setTimeout(updateList,1000);
  }
}

function keyPressed() {
  if (!isSorting && keyCode === 32) {
    var sorter = new Sorter(selectionSort);
    sorter.sort();
  }
}

function draw() {
  createCanvas(windowWidth,windowHeight);
  background(255);
  stroke(0);
  strokeWeight(5);
  list.show();
}
