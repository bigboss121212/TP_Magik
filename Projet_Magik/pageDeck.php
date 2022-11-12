<?php

    require_once("action/PageDeckAction.php");

    $action = new PageDeckAction();
    $data = $action->execute();

    

    $pageTitre = "pageDeck";
    require_once("partial/header.php");
?>
        <div id="deck">
            <iframe style="width:100%;height:100%;margin-top:10%" onload="applyStyles(this)" 
            src="https://magix.apps-de-cours.com/server/#/deck/<?=$_SESSION['key'] ?>">
            </iframe>  
        </div>

	</body>
</html>