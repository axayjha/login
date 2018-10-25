<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if(!isset($_POST)) die();
session_start();
$response = [];

$con = mysqli_connect('localhost', 'root', '' ,'test');


$username = mysqli_real_escape_string($con, $_POST['username']);
$password = mysqli_real_escape_string($con, $_POST['password']);

$query = "SELECT * FROM `users` WHERE username='$username' AND password='$password'";

$result = mysqli_query($con, $query);
if (mysqli_num_rows($result) > 0) {
    $response['status'] = 'loggedin';
    $response['user'] = $username;
    $response['useruniqid'] = md5(uniqid());
    $_SESSION['useruniqid'] = $response['useruniqid'];
} else {
    $response['status'] = 'error';
}
// if(isset($_POST) && isset($_POST['username'])) {
//     if($_POST['username'] == 'admin' && $_POST['password']=='admin') {
//         $response['status'] = 'loggedin';
//         $response['user'] = 'admin';
//         $response['useruniqid'] = md5(uniqid());
//         $_SESSION['useruniqid'] = $response['useruniqid'];
//     } else {
//         $response['status'] = 'error';
//     }
// }
echo json_encode($response);
//print_r($_POST);
?>
 