<?php

    require_once("action/PageDeckAction.php");

    $action = new PageDeckAction();
    $data = $action->execute();

    

    $pageTitre = "pageDeck";
    require_once("partial/header.php");
?>
        <div>
            
            <iframe src="https://magix.apps-de-cours.com/server/#/deck/<?=$_SESSION['key'] ?>">
            </iframe>  
        </div>

	</body>
</html>