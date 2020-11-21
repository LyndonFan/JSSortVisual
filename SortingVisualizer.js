var list;
var events = [];
var prevEvents = [];
var isSorting = false;

function setup() {
  createCanvas(windowWidth,windowHeight);
  textAlign(CENTER);
  var listLength = random(4,10);
  var tempList = [];
  for (var i = 0; i < listLength; i++){
    var v = round(random(1,20));
    tempList.push(v);
    print(tempList[i]);
  }
  list = new Blocks(tempList);
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
    setTimeout(updateList,1000);
  } else {
    list.resetActive();
  }
}

function keyPressed() {
  if (!isSorting && keyCode === 32) {
    var sorter = new Sorter(quickSort);
    sorter.sort();
  }
  if (!isSorting && keyCode === 83) {
    var sorter = new Sorter(shuffleList);
    sorter.sort();
  }
}

function draw() {
  createCanvas(windowWidth,windowHeight);
  background(255);
  stroke(0);
  strokeWeight(2);
  list.show();
}
