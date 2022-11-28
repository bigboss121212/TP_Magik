<?php
    require_once("action/AjaxDBAction.php");

    $action = new AjaxDBAction();
    $data = $action->execute();

    // echo $data["result2"];

    echo json_encode($data["result3"]); //converti les data php en json