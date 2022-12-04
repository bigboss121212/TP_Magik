
window.addEventListener("load", () => { //necessaire en js pour lancer cette fonction une fois que la page est load
    let clear = document.getElementById("clear");

    //pour le clear la db
    clear.onclick = ClearDb;
    
    function ClearDb(){
    
        let formdata = new FormData();
        formdata.append("db", "delete");

        fetch("ajax-db.php", {
            method: "post",
            body: formdata
        })
        .then(response => response.json())
        .then(data => {
    
            console.log(data);
            let stats = document.getElementById("tableauStats");
            if(stats != null){
                stats.remove();
            }
                
        })
    };
})
