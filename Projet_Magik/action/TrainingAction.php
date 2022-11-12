<?php
    require_once("action/CommonAction.php");

    class TrainingAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {

            $data = [];
            $data["key"] = $_SESSION["key"];
            $data["type"] = "TRAINING";

            $service = "games/auto-match"; 

            $resultat = parent::callAPI($service, $data);

            echo $resultat;
            
            return [];
        }
    }