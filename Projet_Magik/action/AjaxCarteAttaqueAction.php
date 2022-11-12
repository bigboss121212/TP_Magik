<?php
    require_once("action/CommonAction.php");

    class AjaxCarteAttaqueAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data = [];
            $data["key"] = $_SESSION["key"];
            $data["type"] = "ATTACK";
            
            if(isset($_POST["uidAdv"])){
                $data["targetuid"] = $_POST["uidAdv"];
                $data["uid"] = $_POST["uidPlay"];
            }

            $result3 = parent::callAPI("games/action", $data);
             
            return compact("result3");
        }
    }