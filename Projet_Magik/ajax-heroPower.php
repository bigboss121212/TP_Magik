<?php
    require_once("action/AjaxHeroPowerAction.php");

    $action = new AjaxHeroPowerAction();
    $data = $action->execute();

    // echo $data["result2"];

    echo json_encode($data["result3"]); //converti les data php en json