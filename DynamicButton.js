class DynamicButton{

    constructor(text,relX,relY,widthProp,heightProp,onClick){
        this.button = createButton(text);
        this.button.mouseClicked(()=>{print(this);onClick();});
        this.button.style('background-color','#cccccc');
        this.button.style('font-family','Helvetica');
        this.relX = relX;
        this.relY = relY;
        this.widthProp = widthProp;
        this.heightProp = heightProp;
    }

    update(){
        this.button.position(width*this.relX, height*this.relY);
        this.button.size(width*this.widthProp,height*this.heightProp);
    }
}