
<?php

require_once("action/CommonAction.php");

    class UserDAO {
        public static function authenticate($username, $password) {
            $result = null;

            if ($username === "XXXXX" && $password === "Idio1234") {
                $result = [];
                $result["visibility"] = 1;

            }

            return $result;
        }
    }