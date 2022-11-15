<?php
	require_once("action/JeuAction.php");

	$action = new JeuAction();
	$data = $action->execute();

	$pageTitre = "PVP";
	require_once("partial/header.php");

?>

		<div id="jeuAdversaire">
			<div id="carteAdv"></div>
			<div id="infoAdv">
				<p id="infoAN"></p>
				<p id="infoAHp"></p>
				<p id="infoACa"></p>
				<p id="infoAMp"></p>
			</div>
		</div>

		<div id="partieTermine" style="display:none;">
			<div id="text"></div>
			<a href="loby.php"><input id="back" type=button value='RETOUR'></a>
		</div>
	
		<div id="background_3"></div>

		<div id="jeuAdv"></div>

		<div id="jeuPlayer"></div>
		
	
		<!-- retravailler les carte les creer avec le dom et les detruire-->
		<div id="grid-container">

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
			<div id="boutonA">
				END TURN
			</div>	
		</div>

	</body>
</html>