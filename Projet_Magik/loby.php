<?php
	    require_once("action/LobyAction.php");

		$action = new LobyAction();
		$data = $action->execute();
	
		$pageTitre = "Loby";
		require_once("partial/header.php");
		
?>


		<div id="background_2"></div>
		<div id="frame">
			<iframe style="width:800px;height:600px;" onload="applyStyles(this)"
			src="https://magix.apps-de-cours.com/server/#/chat/<?=$_SESSION['key'] ?>/large">
			</iframe>
		</div>


	</body>
</html>