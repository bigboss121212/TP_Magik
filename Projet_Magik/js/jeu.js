let boardPl = 0;
let sizePlay = 0;
// let dataG = null
let attaquer = false;
let carteActionUID = null;
let chatAfficher = false;
let finPartie = true;
let spriteList = [];
let myLife = 35;
let dict = {};


const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method : "POST"        // l’API (games/state)
    })
    .then(response => response.json())
    .then(data => {
        
        if(data == "LAST_GAME_WON" || data == "LAST_GAME_LOST"){
            if (finPartie){
                delCarteAdv();
                delCartePlay();
                let partieTerm = document.getElementById("partieTermine");
                let text = document.getElementById("text");
                partieTerm.style.display = "block";
                partieTerm.style.fontSize = "x-large";

                if(data == "LAST_GAME_WON"){
                    text.innerHTML = "VOUS AVEZ GAGNE!"
                }
                else if(data == "LAST_GAME_LOST"){
                    
                    text.innerHTML =("VOUS AVEZ PERDU!!"); 
                } 
                finPartie = false;

            }

        }
        if (typeof data !== "object") {
            if(data != null){  
                spriteList.push(new Shenron(data)); 
            }  
        }
        console.log(data); // contient les cartes/état du jeu.
        gameUpdate(data);
        
        setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

window.addEventListener("load", () => {

setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
tick();

});

const gameUpdate = data => {

    if(data.hand != null){
        let classH = document.getElementById("classH");
        let vie = document.getElementById("vie");
        let temps = document.getElementById("temps");
        let magie = document.getElementById("magie");
        let nbCarte = document.getElementById("nbCarte");
        let endturn = document.getElementById("boutonA");
        let endPartie = document.getElementById("boutonB");
        let bchat = document.getElementById("boutonChat");
        
        //pour l'animation de feu si le joueur se fait attaquer
        if(data.hp < myLife){
            let position = classH.getBoundingClientRect();
            let x = position.left;
            let y = position.top;
            spriteList.push(new Feu(x,y -15))
        }
        myLife = data.hp;

        if(data.yourTurn == true){
            data.hand.forEach(element => {
                dict[element.id] = element.hp;
            })
            boardPl = data.board.length;
        }
        if(data.yourTurn == false){
            if(data.board.length < boardPl){
                let x = window.innerWidth * 0.5 - (window.innerWidth * 0.024);
                let y = window.innerHeight * 0.5 - (window.innerHeight * 0.12) ; 
                window.innerWidth;
                console.log(x);
                spriteList.push(new Feu(x, y));
            }
            else{
                data.board.forEach(element => {
                    if(dict[element.id] != element.hp){
                        let x = window.innerWidth * 0.5 - (window.innerWidth * 0.024);
                        let y = window.innerHeight * 0.5 - (window.innerHeight * 0.12) ; 
                        window.innerWidth;
                        console.log(x);
                        spriteList.push(new Feu(x, y));
                    }
                })
            }

        }
   
        if(data.yourTurn == true){
            classH.style.backgroundImage = "url('./images/goku_turn.png')";
            if (data.heroPowerAlreadyUsed == false && data.mp >= 2){
                classH.style.boxShadow = "0 0 60px 30px #fcffa4"
            }
            else{
                classH.style.boxShadow = "none";
            }
        }
        else{
            classH.style.backgroundImage = "url('./images/goku.png')";
            classH.style.boxShadow = "none";
        }
        
        vie.firstChild.innerHTML = data.hp;
        temps.firstChild.innerHTML = data.remainingTurnTime;
        magie.firstChild.innerHTML = data.mp;
        nbCarte.firstChild.innerHTML = data.remainingCardsCount;
        nbCarte.style.verticalAlign = "center";
        /*tutoriel sur https://www.youtube.com/watch?v=YDgw6HjMCoQ */
        let progress_circle = document.getElementById("circular-progress");
        progress_circle.style.background = `conic-gradient(rgb(243, 203, 93) ${data.remainingTurnTime * 7.2}deg, #ffffff00 0deg)`;

        let progress_circle2 = document.getElementById("circular-progress2");
        progress_circle2.style.background = `conic-gradient(red ${data.hp * (360 / data.maxHp)}deg, #ffffff00 0deg)`;
        //pour le hero power

        classH.onclick = heroPower
        
        function heroPower(){
            fetch("ajax-heroPower.php", {})
            .then(response => response.json())
            .then(data => {
                if (typeof data !== "object") {
                    if(data != null){  
                        spriteList.push(new Shenron(data)); 
                    }  
                }
                console.log(data);
            })
        };

        //pour terminer un tour
        endturn.onclick = terminerTour;
        
        function terminerTour(){   
            fetch("ajax-end-turn.php", {})
            .then(response => response.json())
            .then(data => {
                if (typeof data !== "object") {
                    if(data != null){
                        spriteList.push(new Shenron(data));  
                    }  
                }
                console.log(data);
            })
        };

        //pour abandonner une partie
        endPartie.onclick = abandonnePartie;

        function abandonnePartie(){
            fetch("ajax-end-game.php", {})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location="loby.php";
            })
        };

        //pour le chat
        bchat.onclick = chatOn;
        
        function chatOn(){
            let chat = document.getElementById("chatGame");
            if(!chatAfficher){
                chat.style.opacity = 1;
                chatAfficher = true;
            }
            else if(chatAfficher){
                chat.style.opacity = 0;
                chatAfficher = false;
            }
        };


        //afficher les cates du joueur
        let carte = document.getElementById("grid-container");
        while (carte.hasChildNodes()) { //enlever tous les enfants
            carte.removeChild(carte.lastChild);
        }

        data.hand.forEach(element => {

            let newDiv = document.createElement("div");
            newDiv.className = "grid-item";

            let newImage = document.createElement("div");
            newImage.className = "imageCarte";

            newImage.style.backgroundSize = "cover";
            newImage.style.backgroundRepeat = "no-repeat";
            newImage.style.backgroundPosition = "center center";
            newImage.style.backgroundImage = "url('./images/image_carte/" + element.id + ".png')";
            
            newDiv.appendChild(newImage);

            let newP = document.createElement("p");
            newP.className = "infoCarte";
            newP.textContent = element.atk;
            newP.style.textAlign = "center";
            newP.style.height = "20px";
            newP.style.width = "20px";
            newP.style.position = "fixed";
            newP.style.top = 20+"%";
            newP.style.backgroundImage = "url('./images/sword.png')";
            newP.style.backgroundSize = "contain";
            newP.style.backgroundRepeat = "no-repeat";

            let newP1 = document.createElement("p");
            newP1.className = "infoCarte";
            newP1.textContent = element.cost;
            newP1.style.textAlign = "center";
            newP1.style.height = "20px";
            newP1.style.width = "20px";
            newP1.style.position = "fixed";
            newP1.style.top = 30+"%";
            newP1.style.backgroundImage = "url('./images/coin.png')";
            newP1.style.backgroundSize = "contain";
            newP1.style.backgroundRepeat = "no-repeat";
            
            let newP2 = document.createElement("p");
            newP2.className = "infoCarte";
            newP2.textContent = element.hp;
            newP2.style.textAlign = "center";
            newP2.style.height = "20px";
            newP2.style.width = "20px";
            newP2.style.position = "fixed";
            newP2.style.top = 40+"%";
            newP2.style.backgroundImage = "url('./images/coeur.png')";
            newP2.style.backgroundSize = "contain";
            newP2.style.backgroundRepeat = "no-repeat";

            let newP3 = document.createElement("p");
            newP3.className = "infoCarte";
            newP3.textContent = "mechanics: " + element.mechanics;
            

            newDiv.append(newP, newP1, newP2, newP3);

            if(element.mechanics.includes("Taunt")){
                newDiv.style.boxShadow = "0 0 60px 30px #fcffa4"
            }
            else if(element.mechanics.includes("Stealth")){
                newDiv.style.boxShadow = "0 0 60px 30px #1385ee"
            }
            else if(element.mechanics.includes("Charge")){
                newDiv.style.boxShadow = "0 0 60px 30px #f00"
            }
            //pour afficher les carte que l'on peut jouer
            if (element.cost > data.mp){
                newDiv.style.opacity = 0.5;
            }
            else{
                newDiv.style.opacity = 1;
            }
            //function pour jouer une carte lorsque c'est notre tour
            newDiv.onclick = jouerCarte;
            
            function jouerCarte(){
                let formdata = new FormData();
                formdata.append("uid", element.uid)
                fetch("ajax-carte.php", {
                    method: "post",
                    body: formdata
                })
                .then(response => response.json())
                .then(data => {
                    if (typeof data !== "object") {
                        if(data != null){ 
                            spriteList.push(new Shenron(data));  
                        }
                    }
                    else{
                        data.mp -= element.cost;
                        console.log("Carte joue");
                        //pour comptabiliser le nbr de fois qu'une carte est joue, pour les stats
                            let formdata = new FormData();
                            formdata.append("id", element.id);
                            formdata.append("count", 1);
                            fetch("ajax-carte-count.php", {
                                method: "post",
                                body: formdata
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                            })
                        refreshCartePlay();
                    }
                })          
            };

            carte.prepend(newDiv);                
        });

        // afficher les infos adverses
        let infoAN = document.getElementById("infoAN");
        let infoAHp = document.getElementById("infoAHp");
        let infoACa = document.getElementById("infoACa");
        let infoAMp = document.getElementById("infoAMp");

        infoAN.textContent = data.opponent.username;
        infoAHp.textContent = data.opponent.hp;
        infoACa.textContent = data.opponent.remainingCardsCount;
        infoAMp.textContent = data.opponent.mp;

        let progress_circle3 = document.getElementById("circular-progress3");
        progress_circle3.style.background = `conic-gradient(red ${data.opponent.hp * (360 / data.opponent.maxHp)}deg, #ffffff00 0deg)`;

        infoAN.onclick = attaquerAdv;
        
        function attaquerAdv(){ //faire verification si les cartes ADV on taunt
          
            let formdata = new FormData();
            formdata.append("uidAdv", 0);
            formdata.append("uidPlay", carteActionUID);

            fetch("ajax-attaque.php", {
                method: "post",
                body: formdata
            })
            .then(response => response.json())
            .then(data => {
                if (typeof data !== "object") {
                    spriteList.push(new Shenron(data)); 
                }
                else{
                    let position = infoAN.getBoundingClientRect();
                    let x = position.left;
                    let y = position.top;
                    spriteList.push(new Feu(x, y -15))
                    
                    attaquer = false;
                    carteActionUID = null;
                }
                console.log(data);
            })  
           
        };

        let mainAdv = document.getElementById("carteAdv");
        while (mainAdv.hasChildNodes()) { //enlever tous les enfants
            mainAdv.removeChild(mainAdv.lastChild);
        }

        for(let i = 0; i < data.opponent.handSize; i++){
            
            let newDiv = document.createElement("div");
            newDiv.className = "carteA";
            mainAdv.prepend(newDiv);
        }

        refreshCarteAdv(); 
 
        refreshCartePlay();
    }



    function refreshCartePlay() {
        
        let boardJ = document.getElementById("jeuPlayer");
        while (boardJ.hasChildNodes()) { //enlever tous les enfants
            boardJ.removeChild(boardJ.lastChild);
        }

        data.board.forEach(element => {

            let newDiv = document.createElement("div");
            newDiv.className = "carteABoard";

            let newImage = document.createElement("div");
            newImage.className = "imageCarte";
            newImage.style.backgroundSize = "cover";
            newImage.style.backgroundRepeat = "no-repeat";
            newImage.style.backgroundPosition = "center center";
            newImage.style.backgroundImage = "url('./images/image_carte/" + element.id + ".png')";
            
            newDiv.appendChild(newImage);

            let newP = document.createElement("p");
            newP.className = "infoCarte";
            newP.textContent = element.atk;
            newP.style.textAlign = "center";
            newP.style.height = "20px";
            newP.style.width = "20px";
            newP.style.backgroundImage = "url('./images/sword.png')";
            newP.style.backgroundSize = "contain";
            newP.style.backgroundRepeat = "no-repeat";

            let newP1 = document.createElement("p");
            newP1.className = "infoCarte";
            newP1.textContent = element.cost;
            newP1.style.textAlign = "center";
            newP1.style.height = "20px";
            newP1.style.width = "20px";
            newP1.style.backgroundImage = "url('./images/coin.png')";
            newP1.style.backgroundSize = "contain";
            newP1.style.backgroundRepeat = "no-repeat";

            let newP2 = document.createElement("p");
            newP2.className = "infoCarte";
            newP2.textContent = element.hp;
            newP2.style.textAlign = "center";
            newP2.style.height = "20px";
            newP2.style.width = "20px";
            newP2.style.backgroundImage = "url('./images/coeur.png')";
            newP2.style.backgroundSize = "contain";
            newP2.style.backgroundRepeat = "no-repeat";

            let newP3 = document.createElement("p");
            newP3.className = "infoCarte";
            newP3.textContent = "mechanics: " + element.mechanics;

            let grid = document.createElement("div");
            grid.style.display = "grid";
            grid.style.gridTemplateColumns = "auto auto auto";
            grid.style.gridTemplateRows = "auto";
            grid.style.position = "absolute";
            grid.style.top = 10+"%";
            grid.append(newP2, newP1, newP)

            newDiv.append(grid, newP3);

            if(element.state == "IDLE"){
                newDiv.style.opacity = 1;
            }
            else if(element.state == "SLEEP"){
                newDiv.style.opacity = 0.5;
            }

            if(element.mechanics.includes("Taunt")){
                newDiv.style.boxShadow = "0 0 60px 30px #fcffa4"
            }
            else if(element.mechanics.includes("Stealth")){
                newDiv.style.boxShadow = "0 0 60px 30px #1385ee"
            }
            else if(element.mechanics.includes("Charge")){
                newDiv.style.boxShadow = "0 0 60px 30px #f00"
            }

            //pour attaquer hero adv
            newDiv.onclick = attaqueHero;
            
            function attaqueHero(){
                data.mp -= element.cost;
                if(element.state != "SLEEP"){
                    attaquer = true;  
                    carteActionUID = element.uid;          
                }
            };

            boardJ.prepend(newDiv);                
        });
    }

    function refreshCarteAdv() {
 
        let boardA = document.getElementById("jeuAdv");
        while (boardA.hasChildNodes()) { //enlever tous les enfants
            boardA.removeChild(boardA.lastChild);
        }
        //faire boucle wile, creer les cartes
        data.opponent.board.forEach(element => {

            let newDivAB = document.createElement("div");
            newDivAB.className = "carteABoard";

            let newImage = document.createElement("div");
            newImage.className = "imageCarte";
            newImage.style.backgroundSize = "cover";
            newImage.style.backgroundRepeat = "no-repeat";
            newImage.style.backgroundPosition = "center center";
            newImage.style.backgroundImage = "url('./images/image_carte/" + element.id + ".png')";
            
            newDivAB.appendChild(newImage);

            let newP = document.createElement("p");
            newP.className = "infoCarte";
            newP.textContent = element.atk;
            newP.style.textAlign = "center";
            newP.style.height = "20px";
            newP.style.width = "20px";
            newP.style.backgroundImage = "url('./images/sword.png')";
            newP.style.backgroundSize = "contain";
            newP.style.backgroundRepeat = "no-repeat";

            let newP1 = document.createElement("p");
            newP1.className = "infoCarte";
            newP1.textContent = element.cost;
            newP1.style.textAlign = "center";
            newP1.style.height = "20px";
            newP1.style.width = "20px";
            newP1.style.backgroundImage = "url('./images/coin.png')";
            newP1.style.backgroundSize = "contain";
            newP1.style.backgroundRepeat = "no-repeat";

            let newP2 = document.createElement("p");
            newP2.className = "infoCarte";
            newP2.textContent = element.hp;
            newP2.style.textAlign = "center";
            newP2.style.height = "20px";
            newP2.style.width = "20px";
            newP2.style.backgroundImage = "url('./images/coeur.png')";
            newP2.style.backgroundSize = "contain";
            newP2.style.backgroundRepeat = "no-repeat";

            let newP3 = document.createElement("p");
            newP3.className = "infoCarte";
            newP3.textContent = "mechanics: " + element.mechanics;
    
            let grid = document.createElement("div");
            grid.style.display = "grid";
            grid.style.gridTemplateColumns = "auto auto auto";
            grid.style.gridTemplateRows = "auto";
            grid.style.position = "absolute";
            grid.style.top = 10+"%";
            grid.append(newP2, newP1, newP)

            newDivAB.append(grid, newP3);

            if(element.state == "IDLE"){
                newDivAB.style.opacity = 1;
            }
            else if(element.state == "SLEEP"){
                newDivAB.style.opacity = 0.5;
            }

            if(element.mechanics.includes("Taunt")){
                newDivAB.style.boxShadow = "0 0 60px 30px #fcffa4"
            }
            else if(element.mechanics.includes("Stealth")){
                newDivAB.style.boxShadow = "0 0 60px 30px #1385ee"
            }
            else if(element.mechanics.includes("Charge")){
                newDivAB.style.boxShadow = "0 0 60px 30px #f00"
            }

            boardA.prepend(newDivAB); 
            //selectionner une carte pour faire une action      
            newDivAB.onclick = choisirCarte;
            function choisirCarte(){
                let formdata = new FormData();
                formdata.append("uidAdv", element.uid);
                formdata.append("uidPlay", carteActionUID);

                fetch("ajax-attaque.php", {
                    method: "post",
                    body: formdata
                })
                .then(response => response.json())
                .then(data => {
                    if (typeof data !== "object") {
                        if(data != null){ 
                            spriteList.push(new Shenron(data)); 
                        }  
                    }
                    else{
                        let x = window.innerWidth * 0.5 - (window.innerWidth * 0.02);
                        let y = window.innerHeight * 0.5 - (window.innerHeight * 0.12) ; 
                        window.innerWidth
                        spriteList.push(new Feu(x, y))
                        attaquer = false;
                        carteActionUID = null;
                    }
                    console.log(data);
                })
                refreshCarteAdv();
            };               
        });
    }
}

function delCarteAdv(){
    let boardA = document.getElementById("jeuAdv");
    if (boardA != null){
        while (boardA.hasChildNodes()) { //enlever tous les enfants
            boardA.removeChild(boardA.lastChild);
        }
    }
    boardA.remove();
}

function delCartePlay(){
    let boardJ = document.getElementById("jeuPlayer");
    while (boardJ.hasChildNodes()) { //enlever tous les enfants
        boardJ.removeChild(boardJ.lastChild);
    }
    boardJ.remove()
}

// class Feu {
//     constructor(x, y){
//         this.x = x;
//         this.y = y;
//         this.opacity = 1;
//         this.newDiv = document.createElement("div");
//         this.newDiv.className = "feu";
//         this.newDiv.style.left = this.x +'px';
//         this.newDiv.style.top = this.y +'px';
//         this.spriteList = [];
//         document.body.appendChild(this.newDiv);
//     }

//     tick(){
//         let alive = true;
//         if (this.opacity > 0){
//             this.opacity -= 0.02;
//         }
//         if(this.opacity == 0.98 ){
//             this.spriteList.push(new FeuEtendu(this.x, this.y - 25, 80, 70));
//             this.spriteList.push(new FeuEtendu(this.x + 50, this.y, 80, 70));
//             this.spriteList.push(new FeuEtendu(this.x + 50, this.y + 50, 80, 70));
//             this.spriteList.push(new FeuEtendu(this.x, this.y + 75, 80, 70));
//             this.spriteList.push(new FeuEtendu(this.x -50, this.y +50, 80, 70));
//             this.spriteList.push(new FeuEtendu(this.x -50, this.y, 80, 70));
           
//         }
//         if (this.opacity == 0.96) {
//             this.spriteList.push(new FeuEtendu(this.x, this.y - 50, 50, 40));
//             this.spriteList.push(new FeuEtendu(this.x + 100, this.y, 50, 40));
//             this.spriteList.push(new FeuEtendu(this.x + 100, this.y + 100, 50, 40));
//             this.spriteList.push(new FeuEtendu(this.x, this.y + 150, 50, 40));
//             this.spriteList.push(new FeuEtendu(this.x -100, this.y +100, 50, 40));
//             this.spriteList.push(new FeuEtendu(this.x -100, this.y, 50, 40));
            
//         }
//         if(this.opacity == 0.94){
//             this.spriteList.push(new FeuEtendu(this.x, this.y - 75, 50, 40));
//             this.spriteList.push(new FeuEtendu(this.x + 150, this.y, 50, 40));
//             this.spriteList.push(new FeuEtendu(this.x + 150, this.y + 150, 50, 40));
//             this.spriteList.push(new FeuEtendu(this.x, this.y + 225, 50, 40));
//             this.spriteList.push(new FeuEtendu(this.x -150, this.y +150, 50, 40));
//             this.spriteList.push(new FeuEtendu(this.x -150, this.y, 50, 40));
//         }

//         else if(this.opacity <= 0){
//             if(this.spriteList.length == 0){
//                 alive = false;
//             }
           
//         }

//         for(let i = 0; i < this.spriteList.length; i++){
//             const sprit = this.spriteList[i];
//             let alive = sprit.tick();
    
//             if(!alive){
//                 sprit.newDiv.remove();
//                 this.spriteList.splice(i, 1);
//                 i--;
//             }
//         }

//         this.newDiv.style.opacity = this.opacity - 0.02;
//         return alive;

//     }
// }

// class FeuEtendu{
//     constructor(x,y, height, widht){
//         this.x = x;
//         this.y = y;
//         this.height = height;
//         this.widht = widht;
//         this.opacity = 1;
//         this.newDiv = document.createElement("div");
//         this.newDiv.className = "feu";
//         this.newDiv.style.left = this.x +'px';
//         this.newDiv.style.top = this.y +'px';
//         this.newDiv.style.height = this.height  +'px';
//         this.newDiv.style.widht = this.widht  +'px';
        

//         if(this.y < window.innerHeight - 100){
            
//            document.body.appendChild(this.newDiv); 
//         }
        
//     }
    
//     tick(){
//         let alive = true;
//         if (this.opacity > 0){
//             this.opacity -= 0.01;
//         }
//         else if(this.opacity <= 0){
//             this.newDiv.remove();
//             alive = false;
//         }

//         this.newDiv.style.opacity = this.opacity - 0.01;
//         return alive;
//     }
// }

const tick = () =>{
    for(let i = 0; i < spriteList.length; i++){
        const sprit = spriteList[i];
        let alive = sprit.tick();

        if(!alive){
            sprit.newDiv.remove();
            spriteList.splice(i, 1);
            i--;
        }
    }

    window.requestAnimationFrame(tick);
}

// class Shenron{
//     constructor(data){
//         this.newDiv = document.createElement("div");
//         this.newDiv.className = "shenron";
//         this.newDiv2 = document.createElement("div");
//         this.newDiv2.className = "erreur";
//         this.p = document.createElement("p");
//         this.p.innerHTML = data;
//         this.newDiv2.appendChild(this.p);
//         this.opacity = 1;
//         this.opacity2 = 1;
//         document.body.appendChild(this.newDiv);
//         document.body.appendChild(this.newDiv2);
//     }

//     tick(){
//         let alive = true;
//         if (this.opacity > 0){
//             this.opacity -= 0.01;
//         }
//         else if(this.newDiv.style.opacity <= 0){
//             this.newDiv2.remove();
//             alive = false;
//         }
//         this.newDiv2.style.opacity = this.opacity - 0.02;

//         if(this.newDiv2.style.opacity <= 0){
//             if (this.opacity2 > 0){
//                 this.opacity2 -= 0.01;
//             }
//             this.newDiv.style.opacity = this.opacity2 - 0.01;
//         }
//         return alive;

//     }
// }














