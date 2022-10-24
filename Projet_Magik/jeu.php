<?php
	require_once("action/JeuAction.php");

	$action = new JeuAction();
	$data = $action->execute();

	

	$pageTitre = "Jeu";
	require_once("partial/header.php");


?>
		<div id="jeuAdversaire"></div>

		<div id="background_3"></div>
	

		<div class="grid-container">
		<div class="grid-item">1</div>
		<div class="grid-item">2</div>
		<div class="grid-item">3</div>
		<div class="grid-item">4</div>
		<div class="grid-item">5</div>
		<div class="grid-item">6</div>
		<div class="grid-item">7</div>
		</div>

		<div id="classH"></div>

		<div id="infoPerso">
			<div id="nbCarte"></div>
			<div id="temps"></div>
			<div id="vie"></div>
			<div id="magie"></div>
		</div>

		<div id="jeuPersonnel"></div>


		<div id="abandonne">
			<div id="boutonA"></div>	
		</div>

	</body>
</html>