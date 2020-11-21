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
                swaps.push([i,i+1]);
            }
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
            swaps.push([i,i+1]);
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
        back[0][i][0] += m; back[0][i][1] += m;
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
        if (ls[i]<=ls[j]){i++;}
        else {
            for (var k = j; k>i; k--){
                swap(ls,k,k-1); swaps.push([k-1,k]);
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
  