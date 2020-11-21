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

async function updateList(){
  print(events);
  if (events.length > 0){
    var tup = events.shift();
    list.swap(tup[0],tup[1]);
    prevEvents.push(tup);
    setTimeout(updateList,1000);
  }
}

function keyPressed() {
  if (!isSorting && keyCode === 32) {
    bubbleSort(list);
  }
}

function draw() {
  createCanvas(windowWidth,windowHeight);
  background(255);
  stroke(0);
  strokeWeight(5);
  list.show();
}