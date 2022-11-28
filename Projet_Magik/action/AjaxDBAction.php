<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/CardDAO.php");

    class AjaxDBAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            
            CardDAO::delDataBase();

            $result3 = "fresh_db";

            return compact("result3");

        }
    }