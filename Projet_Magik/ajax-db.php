<?php
    require_once("action/AjaxDBAction.php");

    $action = new AjaxDBAction();
    $data = $action->execute();

    echo json_encode($data["result3"]); //converti les data php en json