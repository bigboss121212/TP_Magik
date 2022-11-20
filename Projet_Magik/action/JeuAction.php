<?php
    require_once("action/CommonAction.php");

    class JeuAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {

            $data = [];
            $data["key"] = $_SESSION["key"];

            if (!empty($_GET["pvp"])) {
                if($_GET["pvp"] == "false"){
                    $data["type"] = "TRAINING";
                }
                if($_GET["pvp"] == "true"){
                    $data["type"] = "PVP";
                }   
            }
    
            $service = "games/auto-match"; 

            $resultat = parent::callAPI($service, $data);
            
            return [];
        }
    }