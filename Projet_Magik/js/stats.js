
window.addEventListener("load", () => { //necessaire en js pour lancer cette fonction une fois que la page est load
    let clear = document.getElementById("clear");

    //pour le clear la db
    clear.onclick = ClearDb;
    
    function ClearDb(){
    
        console.log("yo");
    
        fetch("ajax-db.php", {})
        .then(response => response.json())
        .then(data => {
    
            console.log(data);
        })
    };
})
