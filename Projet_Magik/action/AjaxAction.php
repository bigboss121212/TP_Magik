<?php
    
    require_once("action/CommonAction.php");

    class AjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data = [];
            $data["key"] = $_SESSION["key"];
            $resultat;

            $result2 = parent::callAPI("games/state", $data);

            //echo(json_decode($result2));

            // return json_encode($result2);
            return compact("result2");
            // return $resultat;
        }

    }