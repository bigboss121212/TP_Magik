<?php
	require_once("action/TrainingAction.php");

	$action = new TrainingAction();
	$data = $action->execute();

	$pageTitre = "Training";
	require_once("partial/header.php");

?>
		<div id="jeuAdversaire">
			<div id="carteAdv"></div>
			<div id="infoAdv">
				<p id="infoACl"></p>
				<p id="infoAN"></p>
				<p id="infoAHp"></p>
				<p id="infoACa"></p>
				<p id="infoAMp"></p>
			</div>
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
			<div id="boutonA"></div>	
		</div>

	</body>
</html>