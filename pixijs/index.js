const app = new PIXI.Application({
    width: 1200, height: 670, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio/1.1 || 1,
});

document.body.appendChild(app.view);
const sprite = new PIXI.Sprite.from('assets/map1.png');
sprite.interactive = true;
sprite.buttonMode = true;
app.stage.addChild(sprite);
//---------------------- player  --------------------------------
let mask = new PIXI.Graphics();
mask.beginFill(0xffffff);
mask.interactive = true;
mask.drawRect(110, 0, 63, 100);
mask.endFill();
//-------------------- supermarkec ---------------------------
let supermarkec1 = new PIXI.Graphics();
supermarkec1.lineStyle({ color: 0xffffff, width: 4, alignment: 0 });
supermarkec1.drawRect(224, 130, 35, 60);//x,y,width,height

let supermarkec2 = new PIXI.Graphics();
supermarkec2.lineStyle({ color: 0xffffff, width: 4, alignment: 0 });
supermarkec2.drawRect(259, 130, 35, 60);//x,y,width,height
supermarkec1.endFill();
supermarkec2.endFill();

const superrot1 = new PIXI.Sprite.from('./assets/supermarket1.png');
const superrot2 = new PIXI.Sprite.from('./assets/supermarket2.png');
const container_super1 =  new PIXI.Container();
const container_super2 =  new PIXI.Container();
container_super2.addChild(superrot2);
container_super1.addChild(superrot1);
app.stage.addChild(container_super2,container_super1)
container_super2.x = 259;
container_super2.y = 137;
container_super1.x = 230;
container_super1.y = 137;
//-------------------------------------------------------

let maskContainer = new PIXI.Container();
maskContainer.mask = mask;
maskContainer.addChild(mask);
let {x,y} = maskContainer.position.set(50,120);
const bunny = new PIXI.Sprite.from('assets/player.png');
maskContainer.addChild(bunny);
app.stage.addChild(maskContainer);
// bunny.anchor.x = 0.25;// 0.22 5  
// bunny.anchor.y = 0.0;
// bunny.x = 0;
// bunny.y = 0;
maskContainer.width = maskContainer.width *0.6;
let xevnt = bunny.anchor.x;
//-------------------------------------------------------
const eventa = (a,b,...c)=>{
    setTimeout(() => {
        if(bunny.anchor.x >= 0.48)
        {
            xevnt = bunny.anchor.x;
            bunny.anchor.x += -c[0];
        }else if(bunny.anchor.x >= 0.24 && xevnt >= 0.48 ){
            xevnt = bunny.anchor.x;
            bunny.anchor.x += -c[0];
        }else {
            xevnt = bunny.anchor.x;
            bunny.anchor.x += c[0];
        }

        bunny.anchor.y = 0;
        bunny.x = c[2];
        bunny.y = c[3];
        maskContainer.position.set(a,b);//x,y
    }, 400);
    return xevnt;
}

const steps = (...kod)=>{
    eventa(...kod,xevnt);
}

const onKeyDown = (e)=>{
    if(e.keyCode === 87 || e.keyCode === 38)//
    {
        steps(x, y-=5, 0.24, 0, 0, -330);

    }else if (e.keyCode === 83 || e.keyCode === 40){//down----------

        steps(x,y+=5,0.24, 0, 0, 0);
    }else if (e.keyCode === 68 || e.keyCode === 39){//right---------

        steps(x+=5,y, 0.24, 0, 15, -225);//93 + 150 +124, 110+110, 65, 100);
        
    }else if (e.keyCode === 65 || e.keyCode === 37){//left ---------

        steps(x-=5, y,0.24, 0, -6, -110);//116+130+150, 110, 65, 100)

    }else if (e.keyCode === 27){
        return;
    }
    funcsuper();
}

sprite.on('pointerdown', (evnt)=>
{
    document.addEventListener('keydown', onKeyDown);
    sprite.on('pointerout', (event) => {
        console.log("event");
        return ;
    });
});
function opendor(func){
    setTimeout(()=>{
        func();
    },200);
}
function funcsuper(){
   const {x,y} = maskContainer.position;
   if (x > 160 && x < 190 && y < 115 && y > 70){
    opendor(()=>{
        console.log('Cliced',container_super2.localTransform);
        container_super2.x = 289;
        container_super1.x = 200;
    })
   }else{
    container_super2.x = 259;
    container_super1.x = 230;
   }
}