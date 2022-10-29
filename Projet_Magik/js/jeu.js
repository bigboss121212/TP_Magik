let sizeAdv = 0;
let boardAdv = 0;
let sizePlay = 0;
let dataG = null

const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method : "POST"        // l’API (games/state)
    })
    .then(response => response.json())
    .then(data => {
        

        // console.log(data); // contient les cartes/état du jeu.
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

        classH.innerHTML = data.heroClass + "\n";
        classH.innerHTML += "\n";
        classH.innerHTML += "my turn:" + data.yourTurn;
        vie.innerHTML = "vie: " + data.hp;
        temps.innerHTML = "temps: " + data.remainingTurnTime;
        magie.innerHTML = "mp: " + data.mp;
        nbCarte.innerHTML = "carte: " + data.remainingCardsCount;

        //afficher les cates du joueur
        if(data.hand.length != sizePlay){
            let carte = document.getElementById("grid-container");
            while (carte.hasChildNodes()) { //enlever tous les enfants
                carte.removeChild(carte.lastChild);
            }

            data.hand.forEach(element => {

                let newDiv = document.createElement("div");
                newDiv.className = "grid-item";

                let newP = document.createElement("p");
                newP.className = "infoCarte";
                newP.textContent = "atk: " + element.atk;

                let newP1 = document.createElement("p");
                newP1.className = "infoCarte";
                newP1.textContent = "baseHP: " + element.baseHP;

                let newP2 = document.createElement("p");
                newP2.className = "infoCarte";
                newP2.textContent = "cost: " + element.cost;
                
                let newP3 = document.createElement("p");
                newP3.className = "infoCarte";
                newP3.textContent = "dedicated: " + element.dedicated;

                let newP4 = document.createElement("p");
                newP4.className = "infoCarte";
                newP4.textContent = "hp: " + element.hp;

                let newP5 = document.createElement("p");
                newP5.className = "infoCarte";
                newP5.textContent = "id: " + element.id;

                newDiv.append(newP, newP1, newP2, newP3, newP4, newP5);

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

        console.log(data.opponent);

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

        if(data.opponent.board.length != boardAdv){
            let boardA = document.getElementById("jeuAdv");
            while (boardA.hasChildNodes()) { //enlever tous les enfants
                boardA.removeChild(boardA.lastChild);
            }
            //faire boucle wile, creer les cartes

            data.opponent.board.forEach(element => {

                let newDiv = document.createElement("div");
                newDiv.className = "carteABoard";

                let newP = document.createElement("p");
                newP.className = "infoCarte";
                newP.textContent = "atk: " + element.atk;

                let newP1 = document.createElement("p");
                newP1.className = "infoCarte";
                newP1.textContent = "baseHP: " + element.baseHP;

                let newP2 = document.createElement("p");
                newP2.className = "infoCarte";
                newP2.textContent = "cost: " + element.cost;
                
                let newP3 = document.createElement("p");
                newP3.className = "infoCarte";
                newP3.textContent = "dedicated: " + element.dedicated;

                let newP4 = document.createElement("p");
                newP4.className = "infoCarte";
                newP4.textContent = "hp: " + element.hp;

                let newP5 = document.createElement("p");
                newP5.className = "infoCarte";
                newP5.textContent = "id: " + element.id;

                newDiv.append(newP, newP1, newP2, newP3, newP4, newP5);

                boardA.prepend(newDiv);                
            });
        }

        boardAdv = data.opponent.board.length;


    }
}

function jouerCarte(){


}








