class Active{
    constructor(indices,isRange = false){
        this.indices = indices;
        this.indices.sort();
        this.isRange = isRange && indices.length==2;
    }

    isIn(x){
        if (this.isRange){return this.indices[0]<=x && x<this.indices[1];}
        else {return this.indices.indexOf(x)>-1;}
    }

    addConst(k){
        for (var i = 0; i<this.indices.length; i++){
            this.indices[i] += k;
        }
    }

    genActiveList(n){
        var res = [];
        if (this.isRange){
            for (var i = 0; i<this.indices[0]; i++){res.push(false);}
            for (var i = this.indices[0]; i<this.indices[1]; i++){res.push(true);}
            for (var i = this.indices[0]; i<n; i++){res.push(false);}
        } else {
            for (var i = 0; i<n; i++){res.push(false);}
            for (var v of this.indices){
                if (v<n){res[v] = true;}
            }
        }
        return res;
    }
}