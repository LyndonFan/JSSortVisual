function bubbleSort(ls){
    var isSorted = false;
    var count = 1;
    var swaps = [];
    while (!isSorted){
        var i = 0;
        isSorted = true;
        while (i<ls.length-count){
            print(i);
            if (ls[i]>ls[i+1]){
                print("Swapping "+i+" and "+(i+1));
                isSorted = false;
                swap(ls,i,i+1);
                swaps.push([[i,i+1], new Active([i,i+1])]);
            } else {swaps.push([[], new Active([i,i+1])]);}
            i++;
        }
        count++;
        print(ls);
    }
    return swaps;
}

function insertionSort(ls){
    var swaps = [];
    for (var j = 1; j<ls.length; j++){
        for (var i = j-1; i>=0 && ls[i]>ls[i+1]; i--){
            swap(ls,i,i+1);
            swaps.push([[i,i+1], new Active([i,i+1])]);
        }
        if (i>0) {swaps.push([[], new Active([i,i+1])]);}
    }
    return swaps;
}

function selectionSort(ls){
    var swaps = [];
    for (var i = 0; i<ls.length-1; i++){
        var holder = i;
        for (var j = i+1; j<ls.length; j++){
            swaps.push([[], new Active([holder,j])]);
            if (ls[holder]>ls[j]){holder = j;}
        }
        if (holder > i){
            swap(ls,i,holder); swaps.push([[i,holder],new Active([i,holder])]);
        }
    }
    return swaps;
}

function mergeSort(ls, returnRes = false){
    print("List to sort: "+ls);
    if (ls.length<=1){return returnRes?[[],ls]:[];}
    var m = Math.floor(ls.length/2);
    print("Middle index: "+m);
    var n = ls.length;
    var front = mergeSort(ls.slice(0,m),true);
    var back = mergeSort(ls.slice(m,n),true);
    for (var i = 0; i<back[0].length; i++){
        for (var j = 0; j<back[0][i][0].length; j++){back[0][i][0][j] += m;}
        back[0][i][1].addConst(m);
    }
    print(front);
    print(back);
    var swaps = [].concat(front[0],back[0]);
    print("Done swaps: ");
    print(swaps);
    ls = front[1].concat(back[1]);
    var i = 0;
    var j = m;
    while (i<n && j<n){
        if (ls[i]<=ls[j]){swaps.push([[],new Active([0,n],true)]);i++;}
        else {
            for (var k = j; k>i; k--){
                swap(ls,k,k-1); swaps.push([[k-1,k],new Active([0,n],true)]);
            }
            i++;
            j++;
        }
        print(swaps);
        print(i,j,ls);
    }
    
    print("Result:       "+ls);
    return returnRes?[swaps,ls]:swaps;
}

function naiveQuickSort(ls){
    return quickSort(ls,true);
}

function quickSort(ls,naivePivot = false){
    if (ls.length<=1){return [];}
    var swaps = [];
    print(ls);
    if (!naivePivot){
        var m = int(ls.length/2);
        swaps.push([[],new Active([0,m,ls.length-1])]);
        var pIndex;
        if ((ls[m]-ls[0])*(ls[ls.length-1]-ls[0]) <= 0){pIndex = 0;}
        else if ((ls[0]-ls[m])*(ls[ls.length-1]-ls[m]) <= 0){pIndex = m;}
        else {pIndex = ls.length-1;}
        swap(ls,0,pIndex);
        swaps.push([[0,pIndex],new Active([0,pIndex])]);
    }
    var i = 1;
    var j = 1;
    var k = ls.length;
    while (j<k){
        swaps.push([[],new Active([0,j])]);
        if (ls[j]==ls[0]){
            j++;
        }
        else if (ls[j]<ls[0]){
            if (i<j){
                swap(ls,i,j);
                swaps.push([[i,j],new Active([0,i,j])]);
            }
            i++; j++;
        } else {
            swap(ls,j,k-1);
            swaps.push([[j,k-1],new Active([0,j,k-1])]);
            k--;
        }
    }
    for (var x = 0; x<i-1; x++){
        swap(ls,x,x+1);
        swaps.push([[x,x+1],new Active([x,x+1])]);
    }
    i--;
    swaps.push([[],new Active([0,ls.length],true)]);
    print(swaps);
    swaps = swaps.concat(quickSort(ls.slice(0,i),naivePivot));
    var backSwaps = quickSort(ls.slice(j,ls.length),naivePivot);
    for (var x = 0; x < backSwaps.length; x++){
        for (var y = 0; y < backSwaps[x][0].length; y++){backSwaps[x][0][y] += j;}
        backSwaps[x][1].addConst(j);
    }
    swaps = swaps.concat(backSwaps);
    print(swaps);
    return swaps;
}

function heapify(ls,end,i){
    var largest = i;
    var swaps = [];
    if (2*i+1<end && ls[2*i+1]>ls[largest]){largest = 2*i+1;}
    if (2*i+2<end && ls[2*i+2]>ls[largest]){largest = 2*i+2;}
    if (largest != i){
        swap(ls,i,largest);
        swaps.push([[i,largest],new Active([i,largest])]);
        swaps = swaps.concat(heapify(ls,end,largest));
    }
    return swaps;
}

function heapSort(ls){
    if (ls.length<=1){return [];}
    var swaps = [];
    const n = ls.length;
    print(ls)
    for (var i = int(n/2)-1; i>-1; i--){
        swaps = swaps.concat(heapify(ls,n,i));
        print(ls);
    }
    for (var i = n-1; i>0; i--){
        swap(ls,0,i);
        swaps.push([[0,i],new Active([0,i])]);
        print(ls)
        swaps = swaps.concat(heapify(ls,i,0));
        print(ls)
    }
    return swaps;
}

function shuffleList(ls){
    var swaps = [];
    for (var i = 0; i<ls.length-1; i++){
        let j = int(random(i,ls.length));
        swap(ls,i,j); swaps.push([[i,j],new Active([i,j])]);
    }
    return swaps;
}

function bogoSort(ls){
    var swaps = [];
    var isSorted = false;
    while(!isSorted){
        isSorted = true;
        for (var i = 0; isSorted && i<ls.length-1; i++){
            isSorted = ls[i]<=ls[i+1];
            swaps.push([[], new Active([i,i+1])]);
        }
        if (!isSorted){
            swaps = swaps.concat(shuffleList(ls));
        }
    }
    return swaps;
}