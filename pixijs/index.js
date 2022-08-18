const app = new PIXI.Application({
    width: 1200, height: 670, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio/1.5 || 1,
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

//-------------------------  Theatere  ------------------------------

    const teatr_dor1 = new PIXI.Sprite.from('./assets/teatr_door1.png');
    const teatr_dor2 = new PIXI.Sprite.from('./assets/teatr_door2.png');
    const container_teatr1 =  new PIXI.Container();
    const container_teatr2 =  new PIXI.Container();
    container_teatr1.addChild(teatr_dor1);
    container_teatr2.addChild(teatr_dor2);
    app.stage.addChild(container_teatr1,container_teatr2)
    container_teatr2.x = 654;
    container_teatr2.y = 120;
    container_teatr1.x = 625;
    container_teatr1.y = 120;


//-------------------- Teatr ---------------------------

    let theater_conteiner = new PIXI.Container();
    theater_conteiner.position.set(550, 28);
    const inside_the_theater_image = new PIXI.Sprite.from('assets/teatr.png');

    theater_conteiner.addChild(inside_the_theater_image);
    app.stage.addChild(theater_conteiner);
    theater_conteiner.width = theater_conteiner.width * 0.27;
    theater_conteiner.height = theater_conteiner.height * 0.31;

    app.stage.removeChild(theater_conteiner);
//-----------------------------------------------------------------------

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

//--------------------------    player    -----------------------------
let player = new PIXI.Container();
player.mask = mask;
player.addChild(mask);
// let {x, y} = player.position.set(80, 140);
let {x, y} = player.position.set(10, 140);
const bunny = new PIXI.Sprite.from('assets/player.png');
player.addChild(bunny);
app.stage.addChild(player);
// bunny.anchor.x = 0.25;// 0.22 5  
// bunny.anchor.y = 0.0;
// bunny.x = 0;
// bunny.y = 0;
player.width = player.width * 0.6;
player.height = player.height * 0.7;
let xevnt = bunny.anchor.x;
//------------------------ Player walking -------------------------------
const eventa = (a, b, ...c) => {
    setTimeout(() => {
        if(bunny.anchor.x >= 0.48)
        {
            xevnt = bunny.anchor.x;
            bunny.anchor.x += -c[0];
        } else if(bunny.anchor.x >= 0.24 && xevnt >= 0.48 ){
            xevnt = bunny.anchor.x;
            bunny.anchor.x += -c[0];
        } else {
            xevnt = bunny.anchor.x;
            bunny.anchor.x += c[0];
        }

        bunny.anchor.y = 0;
        bunny.x = c[2];
        bunny.y = c[3];
        player.position.set(a,b);//x,y
    }, 400);
    return xevnt;
}

const steps = (...kod)=>{
    eventa(...kod, xevnt);
}

function where_are_player()
{
    if (x > 150 && x < 210 && y < 140 && y > 70)
        func_supermarket();
    else if (x > 530 && x < 595 && y < 140 && y > 70)
        func_teatr();
    else if (y < 135)
        y += 5;
    else if ((y >= 160 && y <= 165) && (!(x > 95 && x < 130 ) && !(x > 420 && x < 495) && !(x > 760 && x < 810)))
        y -= 5;
    else if (x > 1115)
        x = -85;
    else if (x < -85)
        x = 1115;
    else if ((y >= 425 && y <= 430) && (!(x > 95 && x < 130 ) && !(x > 420 && x < 495) && !(x > 760 && x < 810)))
        y += 5;
    else if ((y >= 470 && y <= 475) && (!(x > 95 && x < 130 ) && !(x > 420 && x < 495) && !(x > 760 && x < 810)))
        y -= 5;
    else if ((x >= 90 && x <= 95) && ((y < 425 && y > 160 ) || (y < 610 && y > 470 )))
        x += 5;
    else if ((x >= 110 && x <= 115) && ((y < 425 && y > 160 ) || (y < 610 && y > 470 )))
        x -= 5;
    else if ((x >= 410 && x <= 415) && ((y < 425 && y > 160 ) || (y < 610 && y > 470 )))
        x += 5;
    else if ((x >= 480 && x <= 485) && ((y < 425 && y > 160 ) || (y < 610 && y > 470 )))
        x -= 5;
    else if ((x >= 760 && x <= 765) && (y < 425 && y > 160 ))
        x += 5;
    else if ((x >= 805 && x <= 805) && (y < 425 && y > 160 ))
        x -= 5;
    else if ((x >= 710 && x <= 895) && (y > 460 ))
        y -= 5;
    else if (y > 600)
        y -= 5;
    else
        all_dor_close();
}

function when_in_the_building()
{
    if (x > 150 && x < 210 && y < 120)
        app.stage.addChild(theater_conteiner);
    else 
        app.stage.removeChild(theater_conteiner);
}

const onKeyDown = (e) => {
    console.log(x, y);
    if (e.keyCode === 87 || e.keyCode === 38)//
    {
        steps(x, y-=5, 0.24, 0, 0, -330);
    } else if (e.keyCode === 83 || e.keyCode === 40){//down---------
        steps(x, y+=5, 0.24, 0, 0, 0);
    } else if (e.keyCode === 68 || e.keyCode === 39){//right--------
        steps(x+=5,y, 0.24, 0, 15, -225);//93 + 150 + 124, 110+110, 65, 100);
    } else if (e.keyCode === 65 || e.keyCode === 37){//left ---------
        steps(x-=5, y, 0.24, 0, -6, -110);//116+130+150, 110, 65, 100)
    } else if (e.keyCode === 27)
        return;
    where_are_player();
    when_in_the_building();
}

sprite.on('pointerdown', (evnt) =>
{
    document.addEventListener('keydown', onKeyDown);
    sprite.on('pointerout', (event) => {
        console.log("event");
        return ;
    });
});
//-----------------------------------  door ------------------------------
function opendor(func){
    setTimeout(()=>{
        func();
    }, 500);
}

function func_supermarket(){
    opendor(()=>{
        // console.log('Cliced',container_super2.localTransform);
        container_super2.x = 289;
        container_super1.x = 200;
    })
}

function func_teatr(){
    opendor(()=>{
        // console.log('Cliced',container_super2.localTransform);
        container_teatr2.x = 680;
        container_teatr1.x = 600;
    })
}

function all_dor_close()
{
    container_super2.x = 259;
    container_super1.x = 230;
    container_teatr2.x = 654;
    container_teatr1.x = 625;
}
//------------------------------------------------------------------------