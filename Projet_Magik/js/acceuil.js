let canevas = null;
let ctx = null;
let spriteList = [];
let doge = new Image();
doge.src = "images/fond.png";
let n = 0;

window.addEventListener("load", () => {
    // document.querySelector("form").onsubmit = function () {
    //     return register(this);
    // }
// rajouter un caneva dans l'index
    canevas = document.querySelector("#canvas");
    canevas.width = window.innerWidth
    canevas.height = window.innerHeight
    ctx = canevas.getContext("2d");
    spriteList.push(new Fighter());
    tick();
})


class Fighter{
    constructor(){
        let columCount = 8; //pour le sprite
        let rowCount = 6.9;
        let delay = 500;
        let loop = true;
        let scale = 4;
        this.tiledImage = new TiledImage("images/raditz.png", columCount, rowCount, delay, loop, scale);
        this.tiledImage.changeRow(1.5);
        this.tiledImage.changeCol(6.2);
        // this.tiledImage.changeMinMaxInterval(5.23,6.2);
        this.tiledImage.nodeID = n
        // this.y = Math.random() * 700 + 100;
        this.x = 250;
		this.y = 950;
        this.cible_x = 100;
        this.cible_y = 40;
        this.cible_h = true;
    }

    tick(){
        let alive = true;

        if(this.cible_x < this.x){
            this.x = this.x - 2;
        }
        if(this.cible_y < this.y){
            this.y = this.y - 2;
        }
        if(this.cible_x > this.x){
            this.x = this.x + 2;
        }
        if(this.cible_y > this.y){
            this.y = this.y + 2;
        }
        if(this.x == this.cible_x && this.y == this.cible_y){
            
            if(this.cible_h){

                this.cible_y = 300//canevas.height - 200;
                this.cible_x = 200; 
                this.cible_h = false;
            }
            else if (!this.cible_h){
                this.cible_x = 100;
                this.cible_y = 100;
                this.cible_h = true;
            }
        }

        this.tiledImage.tick(this.x, this.y, ctx)
        console.log(alive)
        return alive;  
    }
}

const tick = () => {
    let x = true;

    canevas.width = window.innerWidth;
    canevas.height = window.innerHeight;

    if(doge.complete) {
        ctx.drawImage(doge,0,0,canevas.width,canevas.height); 
    }
    x = Math.random()
    // if(x < 0.01){
        
    //     spriteList.push(new Fighter()); 
    //     console.log(spriteList)
    // }

	for (let i = 0; i < spriteList.length; i++) {
		let alive = spriteList[i].tick();

		if (!alive) {
			spriteList.splice(i, 1);
			i--;
		}
	}
	window.requestAnimationFrame(tick);
}