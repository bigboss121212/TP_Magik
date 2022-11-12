<?php
    require_once("action/AjaxEndTurnAction.php");

    $action = new AjaxEndTurnAction();
    $data = $action->execute();

    // echo $data["result2"];

    echo json_encode($data["result3"]); //converti les data php en json