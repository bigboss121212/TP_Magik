<?php

	require_once("action/StatsAction.php");

	$action = new StatsAction();
	$data = $action->execute();


	$pageTitre = "Stats";
	require_once("partial/header.php");
	require_once("action/DAO/CardDAO.php");


?>		
		<div id="background4"></div>

		<div id="clear">CLEAR DB</div>

		<div id="tableauStats">
			<?php
				if(!empty($data)){
					$total = CardDAO::getTotalCount(); 
					foreach ($data as $c){
						if (isset($c["nbrjouer"])){

							?>
								<div class="carteStat">
									<div class="imageCarte" style="background-image: url('./images/image_carte/<?= $c["id"]?>.png');"></div>
									<div class="infoCarte" style="font-size: 20px;">
										<?= "id: " . $c["id"] ?>
									</div>
									<div class="infoCarte" style="font-size: 20px;">
										<?= "count: " . $c["nbrjouer"] ?>
									</div>
									<div class="infoCarte" style="font-size: 20px;">
										<?= "ratio: " . round($c["nbrjouer"] / $total["sum"], 2) . "/" . $total["sum"]?>
									</div>
								</div>

							<?php

						}
					}
				}
			?>

		</div>





	</body>
</html>