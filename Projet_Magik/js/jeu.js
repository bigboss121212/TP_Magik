

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

    console.log(data.hp);

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

}








