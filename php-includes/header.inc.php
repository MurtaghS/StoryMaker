    <body>
    <div class="overlay hidden"></div>
        <nav class="navbar navbar-default navbar-static-top" id="main-navbar" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a href="index.php?page=home" class="navbar-brand">Story Maker</a>
                </div>
                <div class="collapse navbar-collapse" id="navbar-collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a class="btn-create" href="index.php?page=create">Create</a></li>
                        <li><a class="btn-browse" href="index.php?page=browse">Browse</a></li>
                        <li><a class="btn-profile" href="index.php?page=profile">Profile</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        
        <!--If they are not running JavaScript-->
        <noscript>
            <style>
                .content {
                    display: none;
                }
                header, footer {
                    opacity: 0.75;
                }
            </style>
            <div class="noscript">
                <h1>Javascript is not enabled in your browser</h1>
                <p>This website requires JavaScript to be enabled</p>
            </div>
        </noscript>
        
        <div class="container" id="main_area">