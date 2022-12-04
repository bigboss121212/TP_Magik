<?php
	require_once("action/JeuAction.php");

	$action = new JeuAction();
	$data = $action->execute();

	$pageTitre = "PVP";
	require_once("partial/header.php");

?>
		<div id="background_3"></div>
		<div id="partieTermine" style="display:none;">
			<div id="text"></div>
			<a href="loby.php"><input id="back" type=button value='RETOUR'></a>
		</div>

		<div id="jeuAdversaire">
			<div id="carteAdv"></div>
			<div id="infoAdv">
				<p id="infoACa"></p>
				<p id="infoAN"></p>
				<div class="container3">
					<div id="circular-progress3">
						<p id="infoAHp"></p>
					</div>
				</div>
				<p id="infoAMp"></p>
			</div>
		</div>

		

		<div id="jeuAdv"></div>
		<div id="jeuPlayer"></div>
		
		<div id="grid-container"></div>

		<div id="boutonChat">CHAT</div>
		<iframe id="chatGame" style="width:400px;height:240px;z-index:1;position:absolute;bottom:12%;left:3%;opacity:0;" 
        src="https://magix.apps-de-cours.com/server/#/chat/<?=$_SESSION['key'] ?>">
		</iframe>

		<div class="container">
			<div id="circular-progress">
				<div id="temps"><p></p></div>
			</div>
		</div>

		
		<!-- <div class="erreur">UPDATE...</div> -->

		<div id="infoPerso">
			<div id="nbCarte"><p></p></div>
			<div id="classH"><p>
				<?= $_SESSION["username"]  ?></p>
			</div>
			<div class="container2">
				<div id="circular-progress2">
					<div id="vie"><p></p></div>
				</div>
			</div>
			
			<div id="magie"><p></p></div>
		</div>

		<div id="jeuPersonnel"></div>


		<div id="abandonne">
			<div id="boutonA">
				<p>END TURN</p>	
			</div>	
			<div id="boutonB">
				<p>SURRENDER</p>
			</div>
		</div>

	</body>
</html>