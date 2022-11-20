<?php
    require_once("action/CommonAction.php");

    class AjaxEndGameAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data = [];
            $data["key"] = $_SESSION["key"];
            $data["type"] = "SURRENDER";

            $result3 = parent::callAPI("games/action", $data);
             
            return compact("result3");
        }
    }