<?php

	require_once("action/StatsAction.php");

	$action = new StatsAction();
	$data = $action->execute();


	$pageTitre = "Stats";
	require_once("partial/header.php");


?>		


		<?php
			if(!empty($data)){
				foreach ($data as $c){
					if (isset($c["nbrjouer"])){

						?>
							<div class="carteStat">
								<div class="idCarte">
									<?= $c["id"] ?>
								</div>
								<div class="countCarte">
									<?= $c["nbrjouer"] ?>
								</div>
							</div>

						<?php

					}
				}
			}
		?>







	</body>
</html>