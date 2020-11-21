class Sorter{
  constructor(sortFunction){
    this.sortFunction = sortFunction;
  }

  sort(){
    isSorting = true;
    if (ls.len() <= 1){isSorting = false; return;}
    print("Begin sorting");
    var lis = [];
    for (var i = 0; i<ls.len(); i++){
      lis.push(ls.vals[i]);
    }
    var eventsToAdd = this.sortFunction(lis);
    events += eventsToAdd;
    isSorting = false;
    updateList();
  }
}

function bubbleSort(ls){
  isSorting = true;
  if (ls.len() <= 1){isSorting = false; return;}
  print("Begin sorting");
  var lis = [];
  for (var i = 0; i<ls.len(); i++){
    lis.push(ls.vals[i]);
  }
  var isSorted = false;
  var count = 1;
  while (!isSorted){
    var i = 0;
    isSorted = true;
    while (i<lis.length-count){
      print(i);
      if (lis[i]>lis[i+1]){
        print("Swapping "+i+" and "+(i+1));
        isSorted = false;
        var temp = lis[i];
        lis[i] = lis[i+1];
        lis[i+1] = temp;
        events.push([i,i+1])
      }
      i++;
    }
    count++;
    print(lis);
  }
  isSorting = false;
  updateList();
  return;
}
