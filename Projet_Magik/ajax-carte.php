<?php
    require_once("action/AjaxCarteAction.php");

    $action = new AjaxCarteAction();
    $data = $action->execute();

    // echo $data["result2"];

    echo json_encode($data["result3"]); //converti les data php en json