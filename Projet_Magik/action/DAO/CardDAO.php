
<?php
    require_once("action/DAO/Connection.php");

    class CardDAO {
        public static function addCardCount($id, $count) {
            $connection = Connection::getConnection();

            //verifier d`abord si la carte est dans la db
            $statement = $connection->prepare("SELECT nbrJouer FROM cartes WHERE id = ?");
            $statement->bindParam(1, $id);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
            $result = $statement->fetch();

            if($result == null){
                $statement = $connection->prepare("INSERT INTO cartes (id, nbrjouer) VALUES (?, ?)");
                $statement->bindParam(1, $id);
                $statement->bindParam(2, $count);
            }
            else{
                $statement = $connection->prepare("UPDATE cartes SET nbrjouer = ? WHERE id = ?");

                $int_value = intval( $count );
                $int_value2 = intval( $result[array_keys($result)[0]] );
                $var2 = strval($int_value + $int_value2);

                $statement->bindParam(1, $var2);
                $statement->bindParam(2, $id);
            }

            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
        }

        public static function getCardCount() {

            $connection = Connection::getConnection();
            $statement = $connection->prepare("SELECT * FROM cartes");
            $statement->setFetchMode(PDO::FETCH_ASSOC); // Permet de faire des selects et retourner les données en dictionnaire
            $statement->execute();
            $result = $statement->fetchall();

            return $result;
        }
    }