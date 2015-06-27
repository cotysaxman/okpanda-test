<?php
  header("Access-Control-Allow-Origin: *");
  if(isset($_GET["name"]))
    {
        $name = $_GET["name"];
    }
  if (!file_exists($name . ".txt")){
    $new = fopen($name . ".txt", 'w');
    $f = fopen("teachers.txt", 'a');
    fwrite($f, $name . "\n");
    echo "success";
  } else {
    echo "failure";
  }
  echo "XXendXdataXX";
?>		