<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/UserDAO.php");

    class IndexAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {

            $hasConnectionError = false;
            $data = [];

            if(!empty($_POST["champCourriel"]) && !empty($_POST["champMotDePasse"])) {

                $result = UserDAO::authenticate($_POST["champCourriel"], $_POST["champMotDePasse"]);
                
                if($result["visibility"] == 1) {

                    $data["username"] = $_POST["champCourriel"];
                    $data["password"] = $_POST["champMotDePasse"];
                    $_SESSION["visibility"] = $result["visibility"];


                    $resultat = parent::callAPI("signin", $data);

                    if ($resultat == "INVALID_USERNAME_PASSWORD") {
                        // err
                    }
                    else {
                        // Pour voir les informations retournées : var_dump($result);exit;
                        $_SESSION['key'] = $resultat->key;
                    }
                    
                    // $_SESSION["champCourriel"] = $_POST["champCourriel"];
					// $_SESSION["visibility"] = $result["visibility"];
                    header("location:loby.php");

                    exit;
                    
                }
                else {
                    $hasConnectionError = true;
                }
            }
            
            return $hasConnectionError;
        }
    }