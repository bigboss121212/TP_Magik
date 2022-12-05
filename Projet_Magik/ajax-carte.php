<?php
    require_once("action/AjaxCarteAction.php");

    $action = new AjaxCarteAction();
    $data = $action->execute();

    echo json_encode($data["result3"]); //converti les data php en json