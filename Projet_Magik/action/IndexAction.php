<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/UserDAO.php");

    class IndexAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $result = [];
            $hasConnectionError = false;

            if(!empty($_POST["champCourriel"]) && !empty($_POST["champMotDePasse"])) {

                $data["username"] = $_POST["champCourriel"];
                $data["password"] = $_POST["champMotDePasse"];
                
                $resultat = parent::callAPI("signin", $data);

                if ($resultat == "INVALID_USERNAME_PASSWORD") {

                    $hasConnectionError = true;
                    return compact("hasConnectionError");
                }
                else {

                    $result["visibility"] = 1;
                    $_SESSION["visibility"] = $result["visibility"];
                    // Pour voir les informations retournées : var_dump($result);exit;
                    $_SESSION['key'] = $resultat->key;
                }

                header("location:loby.php");
                exit;
                    
            }
            
            
        }
    }