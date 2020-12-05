class RelativeElement{

    constructor(elem,relX,relY,widthProp,heightProp){
        this.elem = elem;
        this.elem.style('background-color','#cccccc');
        this.elem.style('font-family','Helvetica');
        this.relX = relX;
        this.relY = relY;
        this.widthProp = widthProp;
        this.heightProp = heightProp;
    }

    update(){
        this.elem.position(width*this.relX, height*this.relY);
        this.elem.size(width*this.widthProp,height*this.heightProp);
    }

    value(){
        return this.elem.value();
    }
}

function relativeText(input, relX, relY){
    textSize(Math.min(50,width*5/4/input.length));
    text(input,width*relX,height*relY);
}