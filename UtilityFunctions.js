function genList(n,mode,range=[]){
    var res = [];
    if (mode=="sorted"){
        for (var i = 1; i<=n; i++){res.push(i);}
    } else if (mode=="reverse"){
        for (var i = n; i>0; i--){res.push(i);}
    } else if (mode=="random"){
        range = range.length>0?range:[1,n];
        for (var i = 0; i<n; i++){res.push(round(random(range[0],range[1])));}
    } else if (mode=="repeats"){
        var v = round(Math.log2(n));
        for (var i = 0; i<n; i++){res.push(v + round(random(0,v)));}
    }
    return res;
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

genOptions = [
    {name: "Sorted", mode: "sorted"},
    {name: "Reverse", mode: "reverse"},
    {name: "Random", mode: "random"},
    {name: "Many Repeats", mode: "repeats"},
];