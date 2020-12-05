class Blocks{

  constructor(vals){
    this.vals = vals;
    this.active = [];
    for (var i = 0; i<vals.length; i++){
      this.active.push(true);
    }
  }
  
  len(){
    return this.vals.length;
  }

  setVals(newVals){
    this.vals = newVals;
    this.resetActive();
    isSorting = false;
    prevEvents = [];
    events = [];
    arrInput.value = this.vals.join(",");
  }
  
  maxHeight(){return height*3/4;}
  startY(){return height*15/16;}
  maxWidth(){return width*5/8;}
  startX(){return width*3/16;}

  updateActive(a){
    this.active = a.genActiveList(this.len());
  }
  resetActive(){
    this.active = [];
    for (var i = 0; i<this.len(); i++){
      this.active.push(true);
    }
  }
  
  show(){
    const listMin = min(this.vals);
    const listMax = max(this.vals);
    const widthUnit = this.maxWidth() / this.vals.length;
    for (var i = 0; i < this.vals.length; i++){
      var v = this.vals[i];
      const prop = (v-listMin)/(listMax-listMin);
      const thisHeight = this.maxHeight() * (prop*(this.vals.length-1)+1)/this.vals.length;
      const blockStartX = this.startX() + i*widthUnit;
      const s = 0.2 + 0.8*this.active[i];
      stroke((0,0,0,255*(1-s)));
      fill(valToColor(prop,s));
      rect(blockStartX, this.startY() - thisHeight, widthUnit, thisHeight);
      fill((255,255,255,255*(1-s)));
      var ts = widthUnit / (str(v).length);
      textSize(ts);
      if (ts >= thisHeight + 5){text(v,blockStartX+widthUnit/2,this.startY() - thisHeight - 5);}
      else {text(v,blockStartX+widthUnit/2,this.startY() - 5);}
    }
  }
}
