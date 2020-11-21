class Blocks{

  constructor(vals){
    this.vals = vals;
    const listMin = min(this.vals);
    const listMax = max(this.vals);
    for (var i=0; i<this.vals.length; i++){
      let v = this.vals[i];
      print(300*(v-listMin)/(listMax-listMin));
      print(valToColor((v-listMin)/(listMax-listMin),1));
    }
  }
  
  len(){
    return this.vals.length;
  }
  
  maxHeight(){
    return height - 100;
  }
  
  startY(){
    return height - 50;
  }
  
  swap(i,j){
    if (0<=i && i<this.vals.length && 0<=j && j<this.vals.length){
      var temp = this.vals[i];
      this.vals[i] = this.vals[j];
      this.vals[j] = temp;
    } else {
      throw "Values "+i+" "+j+" not valid as indices for list(length="+this.vals.length+")";
    }
  }
  
  show(){
    const listMin = min(this.vals);
    const listMax = max(this.vals);
    const widthUnit = (width - 200) / this.vals.length;
    for (var i = 0; i < this.vals.length; i++){
      var v = this.vals[i];
      const thisHeight = this.maxHeight() * v / listMax;
      const startX = 100 + i*widthUnit;
      fill(valToColor((v-listMin)/(listMax-listMin),1));
      rect(startX, this.startY() - thisHeight, widthUnit, thisHeight);
      fill(255);
      var ts = widthUnit / (str(v).length);
      textSize(ts);
      if (ts >= thisHeight){text(v,startX+widthUnit/2,this.startY() - thisHeight - 5);}
      else {text(v,startX+widthUnit/2,this.startY() - (height-100)/listMax - 5);}
    }
  }
}
