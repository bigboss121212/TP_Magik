
<?php
    require_once("action/DAO/Connection.php");

    class CardDAO {
        public static function addCardCount($id, $count) {
            $connection = Connection::getConnection();

            // $statement = $connection->prepare("INSERT INTO cartes (id, nbrjouer) VALUES (?, ?)");
            $statement = $connection->prepare("INSERT INTO cartes (nbrjouer) WHERE id = ? VALUES (?)");

            $statement->bindParam(1, $id);
            $statement->bindParam(2, $count);

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