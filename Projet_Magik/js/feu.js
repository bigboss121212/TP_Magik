class Feu {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.opacity = 1;
        this.newDiv = document.createElement("div");
        this.newDiv.className = "feu";
        this.newDiv.style.left = this.x +'px';
        this.newDiv.style.top = this.y +'px';
        this.spriteList = [];
        document.body.appendChild(this.newDiv);
    }

    tick(){
        let alive = true;
        if (this.opacity > 0){
            this.opacity -= 0.02;
        }
        if(this.opacity == 0.98 ){
            this.spriteList.push(new FeuEtendu(this.x, this.y - 25, 80, 70));
            this.spriteList.push(new FeuEtendu(this.x + 50, this.y, 80, 70));
            this.spriteList.push(new FeuEtendu(this.x + 50, this.y + 50, 80, 70));
            this.spriteList.push(new FeuEtendu(this.x, this.y + 75, 80, 70));
            this.spriteList.push(new FeuEtendu(this.x -50, this.y +50, 80, 70));
            this.spriteList.push(new FeuEtendu(this.x -50, this.y, 80, 70));
           
        }
        if (this.opacity == 0.96) {
            this.spriteList.push(new FeuEtendu(this.x, this.y - 50, 50, 40));
            this.spriteList.push(new FeuEtendu(this.x + 100, this.y, 50, 40));
            this.spriteList.push(new FeuEtendu(this.x + 100, this.y + 100, 50, 40));
            this.spriteList.push(new FeuEtendu(this.x, this.y + 150, 50, 40));
            this.spriteList.push(new FeuEtendu(this.x -100, this.y +100, 50, 40));
            this.spriteList.push(new FeuEtendu(this.x -100, this.y, 50, 40));
            
        }
        if(this.opacity == 0.94){
            this.spriteList.push(new FeuEtendu(this.x, this.y - 75, 50, 40));
            this.spriteList.push(new FeuEtendu(this.x + 150, this.y, 50, 40));
            this.spriteList.push(new FeuEtendu(this.x + 150, this.y + 150, 50, 40));
            this.spriteList.push(new FeuEtendu(this.x, this.y + 225, 50, 40));
            this.spriteList.push(new FeuEtendu(this.x -150, this.y +150, 50, 40));
            this.spriteList.push(new FeuEtendu(this.x -150, this.y, 50, 40));
        }

        else if(this.opacity <= 0){
            if(this.spriteList.length == 0){
                alive = false;
            }
        }

        for(let i = 0; i < this.spriteList.length; i++){
            const sprit = this.spriteList[i];
            let alive = sprit.tick();
    
            if(!alive){
                sprit.newDiv.remove();
                this.spriteList.splice(i, 1);
                i--;
            }
        }

        this.newDiv.style.opacity = this.opacity - 0.02;
        return alive;
    }
}

class FeuEtendu{
    constructor(x,y, height, widht){
        this.x = x;
        this.y = y;
        this.height = height;
        this.widht = widht;
        this.opacity = 1;
        this.newDiv = document.createElement("div");
        this.newDiv.className = "feu";
        this.newDiv.style.left = this.x +'px';
        this.newDiv.style.top = this.y +'px';
        this.newDiv.style.height = this.height  +'px';
        this.newDiv.style.widht = this.widht  +'px';
        

        if(this.y < window.innerHeight - 100){
            
           document.body.appendChild(this.newDiv); 
        }
        
    }
    
    tick(){
        let alive = true;
        if (this.opacity > 0){
            this.opacity -= 0.01;
        }
        else if(this.opacity <= 0){
            this.newDiv.remove();
            alive = false;
        }

        this.newDiv.style.opacity = this.opacity - 0.01;
        return alive;
    }
}