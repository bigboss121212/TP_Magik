<?php
    require_once("action/CommonAction.php");

    class AjaxCarteAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data = [];
            $data["key"] = $_SESSION["key"];
            $data["type"] = "PLAY";
            
            // function debug_to_console($data) {
            //     $output = $data;
            //     if (is_array($output))
            //         $output = implode(',', $output);
            
            //     echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
            // }
        
            // debug_to_console(json_encode($_POST["uidCarte"]));

            if(isset($_POST["uid"])){
                $data["uid"] = $_POST["uid"];
            }

            $result3 = parent::callAPI("games/action", $data);
             


            return compact("result3");
        }
    }