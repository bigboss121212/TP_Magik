<?php
    require_once("action/AjaxCarteCountAction.php");

    $action = new AjaxCarteCountAction();
    $data = $action->execute();

    echo json_encode($data["cards"]); //converti les data php en json