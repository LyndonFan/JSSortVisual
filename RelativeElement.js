class RelativeElement{

    constructor(elem,relX,relY,widthProp,heightProp){
        this.elem = elem;
        this.elem.style('background-color','#cccccc');
        this.elem.style('font-family','Helvetica');
        this.relX = relX;
        this.relY = relY;
        this.widthProp = widthProp;
        this.heightProp = heightProp;
        this.value = null;
    }

    update(){
        this.elem.position(width*this.relX, height*this.relY);
        this.elem.size(width*this.widthProp,height*this.heightProp);
        this.value = this.elem.value()?this.elem.value():(this.elem.value?this.elem.value:this.value);
    }
}

function relativeText(input, relX, relY, maxX, maxY){
    maxX = maxX?maxX:1/2;
    maxY = maxY?maxY:1/16;
    var maxSeg = 1;
    for (const s of input.split("\n")){maxSeg = max(maxSeg,s.length);}
    textSize(Math.max(10,100*maxX, 300/maxSeg));
    rectMode(CENTER);
    // for debugging
    // fill(100);
    // rect(width*relX,height*relY,width*maxX,height*maxY);
    // fill(0);
    text(input,width*relX,height*relY,width*maxX,height*maxY);
    rectMode(CORNER);
}