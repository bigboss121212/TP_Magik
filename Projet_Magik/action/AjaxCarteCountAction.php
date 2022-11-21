<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/CardDAO.php");

    class AjaxCarteCountAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            
            $cards = [];

            if (!empty($_POST["id"]) && !empty($_POST["count"])) {
				CardDAO::addCardCount($_POST["id"],$_POST["count"]);
            }
            
            $cards = CardDAO::getCardCount(); 
            return compact("cards");
        }
    }