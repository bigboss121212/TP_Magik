

const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method : "POST"        // l’API (games/state)
    })
    .then(response => response.json())
    .then(data => {
        

        console.log(data); // contient les cartes/état du jeu.

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

        classH.innerHTML = data.heroClass;
        vie.innerHTML = "vie: " + data.hp;
        temps.innerHTML = "temps: " + data.remainingTurnTime;
        magie.innerHTML = "mp: " + data.mp;
        nbCarte.innerHTML = "carte: " + data.remainingCardsCount;

        console.log(data.hand);
        i = 0;
        data.hand.forEach(element => {
            
            
            let main = document.getElementById("grid-container");
            let carte = document.getElementById("grid-container").childNodes[i+1];

            // let div = document.createElement('div');
            // div.className = "grid-item";

            // main.prepend(div);
            // console.log(document.getElementById("grid-container").childNodes[i]);
            // console.log( element.atk);
            carte.childNodes[1].textContent = "atk: " + element.atk;
            carte.childNodes[3].textContent = "baseHP: " + element.baseHP;
            carte.childNodes[5].textContent = "cost: " + element.cost;
            carte.childNodes[7].textContent = "dedicated: " + element.dedicated;
            carte.childNodes[9].textContent = "hp: " + element.hp;
            carte.childNodes[11].textContent = "id: " + element.id;
            // carte.textContent = element.atk;
            // carte.textContent = element.baseHP;
            // carte.innerHTML = element.cost;
            // carte.innerHTML = element.dedicated;
            // carte.innerHTML = element.hp;
            // carte.innerHTML = element.id;
            
            i = i + 2;

        });
    }


}








