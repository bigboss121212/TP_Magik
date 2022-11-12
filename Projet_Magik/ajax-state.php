<?php
    require_once("action/AjaxAction.php");

    $action = new AjaxAction();
    $data = $action->execute();

    // echo $data["result2"];

    echo json_encode($data["result2"]); //converti les data php en json