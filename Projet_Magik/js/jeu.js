let sizeAdv = 0;
let boardAdv = 0;
let boardPl = 0;
let sizePlay = 0;
let dataG = null
let attaquer = false;
let carteActionUID = null;

const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method : "POST"        // l’API (games/state)
    })
    .then(response => response.json())
    .then(data => {
        
        console.log(data); // contient les cartes/état du jeu.
        dataG = data;
        gameUpdate(data);
        
        setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

window.addEventListener("load", () => {

setTimeout(state, 1000); // Appel initial (attendre 1 seconde)

});

const gameUpdate = data => {

    if(data.hand != null){
        let classH = document.getElementById("classH");
        let vie = document.getElementById("vie");
        let temps = document.getElementById("temps");
        let magie = document.getElementById("magie");
        let nbCarte = document.getElementById("nbCarte");
        let endturn = document.getElementById("boutonA");

        classH.innerHTML = data.heroClass + "\n";
        classH.innerHTML += "\n";
        classH.innerHTML += "my turn:" + data.yourTurn;
        vie.innerHTML = "vie: " + data.hp;
        temps.innerHTML = "temps: " + data.remainingTurnTime;
        magie.innerHTML = "mp: " + data.mp;
        nbCarte.innerHTML = "carte: " + data.remainingCardsCount;
        endturn.innerHTML = "END TURN"

        classH.addEventListener('click', function(){
            if(data.yourTurn == true){
                if(!data.heroPowerAlreadyUsed){
                    fetch("ajax-heroPower.php", {})
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    })
                }
            }
        });

        endturn.addEventListener('click', function(){
            if(data.yourTurn == true){
                
                fetch("ajax-end-turn.php", {})
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
            }
        });

        //afficher les cates du joueur
        if(data.hand.length != sizePlay){
            let carte = document.getElementById("grid-container");
            while (carte.hasChildNodes()) { //enlever tous les enfants
                carte.removeChild(carte.lastChild);
            }

            data.hand.forEach(element => {

                let newDiv = document.createElement("div");
                newDiv.className = "grid-item";

                let newImage = document.createElement("div");
                newImage.className = "imageCarte";
                
                newDiv.appendChild(newImage);

                let newP = document.createElement("p");
                newP.className = "infoCarte";
                newP.textContent = "atk: " + element.atk;
                newP.style.position = "fixed";
                newP.style.top = 15+"%";

                let newP1 = document.createElement("p");
                newP1.className = "infoCarte";
                newP1.textContent = "cost: " + element.cost;
                newP1.style.position = "fixed";
                newP1.style.top = 25+"%";
                
                let newP2 = document.createElement("p");
                newP2.className = "infoCarte";
                newP2.textContent = "hp: " + element.hp;
                newP2.style.position = "fixed";
                newP2.style.top = 35+"%";

                let newP3 = document.createElement("p");
                newP3.className = "infoCarte";
                newP3.textContent = "mechanics: " + element.mechanics;

                newDiv.append(newP, newP1, newP2, newP3);
                //function pour jouer une carte lorsque c'est notre tour
                newDiv.addEventListener('click', function(){
                    if(data.yourTurn == true){
                        if(data.mp >= element.cost){
                            data.mp -= element.cost;
                            
                            let formdata = new FormData();
                            formdata.append("uid", element.uid)
                            fetch("ajax-carte.php", {
                                method: "post",
                                body: formdata
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                            })
                            
                        }
                        
                    }
                });

                carte.prepend(newDiv);                
            });

        }
        sizePlay = data.hand.length;

        // afficher les infos adverses
        let infoAdv = document.getElementById("infoACl");
        let infoAN = document.getElementById("infoAN");
        let infoAHp = document.getElementById("infoAHp");
        let infoACa = document.getElementById("infoACa");
        let infoAMp = document.getElementById("infoAMp");

        infoAdv.textContent = "Class: " + data.opponent.heroClass;
        infoAN.textContent = "Name: " + data.opponent.username;
        infoAHp.textContent = "Hp: " + data.opponent.hp;
        infoACa.textContent = "Remaining Card: " + data.opponent.remainingCardsCount;
        infoAMp.textContent = "Mp: " + data.opponent.mp;

        // console.log(data.opponent);

        if(data.opponent.handSize != sizeAdv){

            let mainAdv = document.getElementById("carteAdv");
            while (mainAdv.hasChildNodes()) { //enlever tous les enfants
                mainAdv.removeChild(mainAdv.lastChild);
            }

            for(let i = 0; i < data.opponent.handSize; i++){
                
                let newDiv = document.createElement("div");
                newDiv.className = "carteA";
                mainAdv.prepend(newDiv);
            }
        }
        sizeAdv = data.opponent.handSize;

        //pour l'affichage du board de l'adversaire
        if(data.opponent.board.length != boardAdv){
            refreshCarteAdv(); 
        }

        boardAdv = data.opponent.board.length;


        //pour afficher les donnees du joueur

        if(data.board.length != boardPl){
            refreshCartePlay();
        }

        boardPl = data.opponent.board.length;
    }



    function refreshCartePlay() {
        
        let boardJ = document.getElementById("jeuPlayer");
        while (boardJ.hasChildNodes()) { //enlever tous les enfants
            boardJ.removeChild(boardJ.lastChild);
        }
        //faire boucle wile, creer les cartes

        data.board.forEach(element => {

            let newDiv = document.createElement("div");
            newDiv.className = "carteABoard";

            let newImage = document.createElement("div");
            newImage.className = "imageCarte";
            
            newDiv.appendChild(newImage);

            let newP = document.createElement("p");
            newP.className = "infoCarte";
            newP.textContent = "atk: " + element.atk;
            newP.style.position = "relative";
            newP.style.top = 0+"%";

            let newP1 = document.createElement("p");
            newP1.className = "infoCarte";
            newP1.textContent = "cost: " + element.cost;
            newP1.style.position = "relative";
            newP1.style.top = 0+"%";

            let newP2 = document.createElement("p");
            newP2.className = "infoCarte";
            newP2.textContent = "hp: " + element.hp;
            newP2.style.position = "relative";
            newP2.style.top = 0+"%";

            let newP3 = document.createElement("p");
            newP3.className = "infoCarte";
            newP3.textContent = "mechanics: " + element.mechanics;
    
            newDiv.append(newP, newP1, newP2, newP3);

            newDiv.addEventListener('click', function(){
                if(data.yourTurn == true){
                    if(data.mp >= element.cost){
                        data.mp -= element.cost;
                        if(element.state != "SLEEP"){
                            attaquer = true;
                            data.mp -= element.cost;  
                            carteActionUID = element.uid;          
                        }
                    } 
                }
            });

            boardJ.prepend(newDiv);                
        });

        boardPl = data.opponent.board.length;
    }

    function refreshCarteAdv() {
 
        let boardA = document.getElementById("jeuAdv");
        while (boardA.hasChildNodes()) { //enlever tous les enfants
            boardA.removeChild(boardA.lastChild);
        }
        //faire boucle wile, creer les cartes

        data.opponent.board.forEach(element => {

            let newDiv = document.createElement("div");
            newDiv.className = "carteABoard";

            let newImage = document.createElement("div");
            newImage.className = "imageCarte";
            
            newDiv.appendChild(newImage);

            let newP = document.createElement("p");
            newP.className = "infoCarte";
            newP.textContent = "atk: " + element.atk;
            newP.style.position = "relative";
            newP.style.top = 0+"%";

            let newP1 = document.createElement("p");
            newP1.className = "infoCarte";
            newP1.textContent = "cost: " + element.cost;
            newP1.style.position = "relative";
            newP1.style.top = 0+"%";

            let newP2 = document.createElement("p");
            newP2.className = "infoCarte";
            newP2.textContent = "hp: " + element.hp;
            newP2.style.position = "relative";
            newP2.style.top = 0+"%";

            let newP3 = document.createElement("p");
            newP3.className = "infoCarte";
            newP3.textContent = "mechanics: " + element.mechanics;
    
            newDiv.append(newP, newP1, newP2, newP3);

            newDiv.addEventListener('click', function(){
                if(!(element.mechanics.includes("stealth"))){
                    if(attaquer){
                        
                        let formdata = new FormData();
                        formdata.append("uidAdv", element.uid);
                        formdata.append("uidPlay", carteActionUID);

                        fetch("ajax-attaque.php", {
                            method: "post",
                            body: formdata
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                        })

                        attaquer = false;
                        carteActionUID = null;
                    }
                }
            });
            boardA.prepend(newDiv);                
        });
        boardAdv = data.opponent.board.length;
    }

}














