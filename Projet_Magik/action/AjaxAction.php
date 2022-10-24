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

            function debug_to_console($data) {
                $output = $data;
                if (is_array($output))
                    $output = implode(',', $output);
            
                echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
            }
        
            debug_to_console(json_decode($result2));

            $result2 = parent::callAPI("games/state", $data);

            echo(json_decode($result2));

            // return json_encode($result2);
            return compact("result2");
            // return $resultat;
        }

    }