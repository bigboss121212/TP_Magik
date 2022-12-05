<?php
    require_once("action/AjaxHeroPowerAction.php");

    $action = new AjaxHeroPowerAction();
    $data = $action->execute();


    echo json_encode($data["result3"]); //converti les data php en json