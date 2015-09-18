    </div>
        <?php
            $ideaList = showIdeas();
        ?>
        <nav class="navbar navbar-default navbar-fixed-bottom" id="footer-navbar" role="navigation">
            <div class="container">            
                <ul class="navbar-footer navbar-right">
                    <div class="btn-group">
                        <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
                            Ideas
                        </button>
                        <ul class="dropdown-menu drop-up" role="menu">
                            <?php 
                                echo $ideaList;
                            ?>
                        </ul>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
                            Chat
                        </button>
                        <ul class="dropdown-menu drop-up" role="menu">
                            <?php 
                                
                            ?>
                        </ul>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
                            Rewards
                        </button>
                        <ul class="dropdown-menu drop-up" role="menu">
                            <?php 
                                
                            ?>
                        </ul>
                    </div>
                </ul>
            </div>
        </nav>
        
    </body>
</html>