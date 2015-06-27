<?php
  header("Access-Control-Allow-Origin: *");
  if (!file_exists("teachers.txt")){
    fopen("teachers.txt", 'w');
  }
  echo file_get_contents("teachers.txt");
  echo "XXendXdataXX";
?>	