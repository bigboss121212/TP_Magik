class Shenron{
    constructor(data){
        this.newDiv = document.createElement("div");
        this.newDiv.className = "shenron";
        this.newDiv2 = document.createElement("div");
        this.newDiv2.className = "erreur";
        this.p = document.createElement("p");
        this.p.innerHTML = data;
        this.newDiv2.appendChild(this.p);
        this.opacity = 1;
        this.opacity2 = 1;
        document.body.appendChild(this.newDiv);
        document.body.appendChild(this.newDiv2);
    }

    tick(){
        let alive = true;
        if (this.opacity > 0){
            this.opacity -= 0.01;
        }
        else if(this.newDiv.style.opacity <= 0){
            this.newDiv2.remove();
            alive = false;
        }
        this.newDiv2.style.opacity = this.opacity - 0.02;

        if(this.newDiv2.style.opacity <= 0){
            if (this.opacity2 > 0){
                this.opacity2 -= 0.01;
            }
            this.newDiv.style.opacity = this.opacity2 - 0.01;
        }
        return alive;

    }
}