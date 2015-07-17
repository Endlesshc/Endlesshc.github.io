   <head>
     <meta charset="utf-8" />
     <meta http-equiv="X-UA-Compatible" content="IE=edge,requiresActiveX=true" />

     <!-- Explicit prefetches - remove if not needed -->
     <link rel="dns-prefetch" href="//ajax.googleapis.com" />

     <title>François Bertrand</title>

     <meta http-equiv="content-type" content="text/html; charset=utf-8" />

     <meta name="description" content="François Bertrand Boucher Cuisinier" />

     <meta name="viewport" content="width=device-width, initial-scale=1.0" />

     <meta name="robots" content="index,follow,noodp,noydir" />

  <style>
 .form-success{
    background-size:100%;
    background-repeat:no-repeat;
    height:100%;
    width:100%;
    text-align:center;
    font-family:'Roboto Condensed';
    font-weight:300;
    padding-top:200px;
    color:white;
    font-size:18px;
  }
  .form-success span{
    color:white;
    font-size:20px;
    margin-bottom: 55px;
    display: block;
  }
  .form-success a{
    border: 1px solid white;
    border-radius: 4px;
    padding: 18px 20px;
    margin-top: 40px;
    display: block;
    width: 185px;
    margin: 0 auto;
    color:white;
    text-decoration:none;
  }
  .form-success a:hover{
    background:white;
    color:black;
  }
  </style>
 </head>
 
<!-- include your own success html here -->
<div class="form-success">
<?php
 
if(isset($_POST['email'])) {
 
     
 
    // EDIT THE 2 LINES BELOW AS REQUIRED
 
    $email_to = "fbertrand@mail.com";
 
    $email_subject = "Vous avez reçu un courriel de votre site web";
 
     
 
     
 
    function died($error) {
 
        // your error code can go here
 
        echo "Quelques erreurs semblent avoir été rencontrés.";
 
        echo "Les voici.<br /><br />";
 
        echo $error."<br /><br />";
 
        echo "S.V.P veuillez corriger ces erreurs afin de poursuivre l'envoi.<br /><br />";

        echo "<a href='javascript:history.go(-1)'>Retour à la page d'accueil</a>";

 
        die();
 
    }
 
     
 
    // validation expected data exists
 
    if(!isset($_POST['first_name']) ||
 
        !isset($_POST['email']) ||
 
        !isset($_POST['telephone']) ||
 
        !isset($_POST['comments'])) {
 
        died('Quelques erreurs semblent avoir été rencontrés.');       
 
    }
 
     
 
    $first_name = $_POST['first_name']; // required
 
    $email_from = $_POST['email']; // required
 
    $telephone = $_POST['telephone']; // not required
 
    $comments = $_POST['comments']; // required
 
     
 
    $error_message = "";
 
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
  if(!preg_match($email_exp,$email_from)) {
 
    $error_message .= 'Adresse courriel non valide.<br />';
 
  }
 
    $string_exp = "/^[A-Za-z .'-]+$/";
 
  if(!preg_match($string_exp,$first_name)) {
 
    $error_message .= 'Prénom non valide.<br />';
 
  }
 
  if(strlen($comments) < 2) {
 
    $error_message .= 'Le commentaire semble non valide.<br />';
 
  }
 
  if(strlen($error_message) > 0) {
 
    died($error_message);
 
  }
 
    $email_message = "Vous avez un nouveau courriel.\n\n";
 
     
 
    function clean_string($string) {
 
      $bad = array("content-type","bcc:","to:","cc:","href");
 
      return str_replace($bad,"",$string);
 
    }
 
     
 
    $email_message .= "Prénom: ".clean_string($first_name)."\n";
 
    $email_message .= "Courriel: ".clean_string($email_from)."\n";
 
    $email_message .= "Téléphone: ".clean_string($telephone)."\n";
 
    $email_message .= "Message: ".clean_string($comments)."\n";
 
     
 
     
 
// create email headers
 
$headers = 'From: '.$email_from."\r\n".
 
'Reply-To: '.$email_from."\r\n" .
 
'X-Mailer: PHP/' . phpversion();
 
@mail($email_to, $email_subject, $email_message, $headers);  
 
?>
  <span>Merci, votre courriel a bien été envoyé!</span>
  <a href="http://www.boucherfbertrand.com">Retour à la page d'accueil</a>
</div>
 
<?php
 
}
 
?>