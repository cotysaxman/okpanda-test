<?php
  header("Access-Control-Allow-Origin: *");
  if(isset($_GET["name"]) && isset($_GET["data"]))
    {
        $name = $_GET["name"];
        $data = $_GET["data"];
    }
  if (file_exists($name . ".txt")){
    file_put_contents($name . ".txt", $data);
    echo file_get_contents($name . ".txt");
    echo "success";
  } else {
    echo "failure";
  }
  echo "XXendXdataXX";
?>			