<!DOCTYPE html>
<html  lang="fr">
    <head>
        <title><?=$pageTitre?></title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/global.css">
        <!-- <script src="js/javascript.js"></script> -->
        <!-- mettre dans des variables dans le header des pages-->
        <?php
            if($pageTitre == "Magik_acceuil"){
                ?>
                    <script src="js/acceuil.js"></script>
                    <script src="js/TiltedImage.js"></script>
                <?php
            }
        ?>
        <?php
            if($pageTitre == "pageDeck"){
                ?>
                    <script src="js/deck.js"></script>
                <?php
            }
        ?>
        <?php
            if($pageTitre == "Loby"){
                ?>
                    <script src="js/javascript.js"></script>
                <?php
            }
        ?>
        <?php
            if($pageTitre == "Training" || $pageTitre == "PVP" ){
                ?>
                    <script src="js/jeu.js"></script>
                <?php
            }
        ?>
    </head>
    <body>
        <?php
            if($data["isConnected"] > 0){
                ?>
                    <div id="menu">
                        <p><?= "BIENVNUE " . $_SESSION["username"]  ?></p>
                        <ul>
                            <li><a href="loby.php">Loby</a></li>
                            <li><a href="pageDeck.php">PageDeck</a></li>
                            <li><a href="stats.php">Stats</a></li>
                            <li><a href="?logout=true">Deconnexion</a></li>
                            <li><a href="training.php">Training</a></li>
                            <li><a href="jeu.php">PVP</a></li>
                        </ul>
                    </div>
                <?php
            }
        ?>
    
  