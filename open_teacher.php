<?php
  header("Access-Control-Allow-Origin: *");
  $teacher = $_GET['name'];
  if (file_exists($teacher . ".txt")){
    echo file_get_contents($teacher . ".txt");
  }
  echo "XXendXdataXX";
?>	