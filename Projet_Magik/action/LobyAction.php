<?php
    require_once("action/CommonAction.php");

    class LobyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {

            $data = [];


           

                // if($_SESSION["visibility"] = 0){

                //     $resultat = parent::callAPI("signout", $_SESSION['key']);
                //     header("location:index.php");
                //     exit;
                // }
            
            return [];
        }
    }