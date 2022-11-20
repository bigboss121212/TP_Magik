<?php
    require_once("action/AjaxEndGameAction.php");

    $action = new AjaxEndGameAction();
    $data = $action->execute();

    // echo $data["result2"];

    echo json_encode($data["result3"]); //converti les data php en json