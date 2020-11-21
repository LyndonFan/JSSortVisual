class Sorter{
	constructor(sortFunction){
		this.sortFunction = sortFunction;
	}

	sort(){
		isSorting = true;
		if (list.len() <= 1){isSorting = false; return;}
		print("Begin sorting...");
		var lis = [];
		for (var i = 0; i<list.len(); i++){
			lis.push(list.vals[i]);
		}
		events = this.sortFunction(lis);
		print("Done sorting.");
		isSorting = false;
		updateList();
	}
}