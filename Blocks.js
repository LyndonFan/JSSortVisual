class Blocks{

  constructor(vals){
    this.vals = vals;
    const listMin = min(this.vals);
    const listMax = max(this.vals);
    this.active = [];
    for (var i = 0; i<vals.length; i++){
      this.active.push(true);
    }
    // for (var i=0; i<this.vals.length; i++){
    //   let v = this.vals[i];
    //   print(300*(v-listMin)/(listMax-listMin));
    //   print(valToColor((v-listMin)/(listMax-listMin),1));
    // }
  }
  
  len(){
    return this.vals.length;
  }
  
  maxHeight(){return height - 100;}
  startY(){return height - 50;}
  maxWidth(){return width*3/4;}
  startX(){return width/8;}

  updateActive(a){
    this.active = a.genActiveList(this.len());
  }
  resetActive(){
    for (var i = 0; i<this.len(); i++){
      this.active[i] = true;
    }
  }
  
  show(){
    const listMin = min(this.vals);
    const listMax = max(this.vals);
    const widthUnit = this.maxWidth() / this.vals.length;
    for (var i = 0; i < this.vals.length; i++){
      var v = this.vals[i];
      const thisHeight = this.maxHeight() * v / listMax;
      const blockStartX = this.startX() + i*widthUnit;
      const prop = (v-listMin)/(listMax-listMin);
      const s = 0.2 + 0.8*this.active[i];
      stroke((0,0,0,255*(1-s)));
      fill(valToColor(prop,s));
      rect(blockStartX, this.startY() - thisHeight, widthUnit, thisHeight);
      fill((255,255,255,255*(1-s)));
      var ts = widthUnit / (str(v).length);
      textSize(ts);
      if (ts >= thisHeight + 5){text(v,blockStartX+widthUnit/2,this.startY() - thisHeight - 5);}
      else {text(v,blockStartX+widthUnit/2,this.startY() - (height-100)/listMax - 5);}
    }
  }
}
