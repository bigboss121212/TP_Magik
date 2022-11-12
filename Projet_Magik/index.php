<?php

    require_once("action/IndexAction.php");

    $action = new IndexAction();
	$data = $action->execute();

    $pageTitre = "Magik_acceuil";
    require_once("partial/header.php");
?>

        <?php
            if(isset($data["hasConnectionError"])){
           
                if ($data["hasConnectionError"] == true) {
                    ?>
                    <div id="error">
                        Erreur d'authentification
                    </div>
                    <?php
                }
            }   
        ?>

        <form id="login" action="" method="post">
            <div class="formLabel"><label for="courriel"> Nom d'usager : </label></div>
            <div class="formInput"><input class="form" type="text" name="champCourriel" require/></div>
            <div class="formSeparator"></div>
            
            <div class="formLabel"><label for="pwd"> Mot de passe : </label> </div>
            <div class="formInput"><input class="form" type="password" name="champMotDePasse" require/></div>
            <div class="formSeparator"></div>
            
            <div class="formLabel">&nbsp;</div>
            <div class="formInput"><input type="image" src="images/download.png" /></div>
            <div class="formSeparator"></div>
        </form>

        <div class="container" style="position:relative">
            <canvas id="canvas"></canvas>
        </div>

    </body>
</html>