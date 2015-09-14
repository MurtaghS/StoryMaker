<!DOCTYPE html>

<html>
    <head>
        <title>Story Maker</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!--CSS FILES-->
        
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"> <!--Bootstrap CSS-->
        <link rel="stylesheet" href="css/reset.css"/> <!-- My CSS file for all pages-->
        <link rel="stylesheet" href="css/style.css"/> <!-- My CSS file for all pages-->
        
        <!--[if lt IE 9]>
            <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
            <script src="scripts/html5shiv-printshiv.js"></script>
        <![endif]-->

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
        <script src="http://code.createjs.com/createjs-2014.12.12.min.js"></script>

        <?php   
        if ($page=="create") { ?>
            <script src = "js/drawing.js"></script>
            <script src = "js/jscolor/jscolor.js"></script>
        <?php }
        
        if ($page=="home") { ?>
            <script src = "scripts/home.js"></script>
        <?php } 
        ?>
    </head>