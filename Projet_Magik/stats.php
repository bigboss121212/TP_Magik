<?php

	require_once("action/StatsAction.php");

	$action = new StatsAction();
	$data = $action->execute();


	$pageTitre = "Stats";
	require_once("partial/header.php");


?>
	</body>
</html>