<?php
echo "<div class='row hidden' id='preview-row'>";
	echo "<div id='preview-left' class='col-sm-12 col-md-6'>";
		echo "<p class='btn-preview-prev'>Previous</p>";
		echo "<canvas id='preview-canvas-left' width='400px' height='400px'></canvas>";
		echo "<p class='preview-left-text'>TEXT GOES HERE</p>";
	echo "</div>";
	echo "<div id='preview-right' class='col-sm-12 col-md-6'>";
		echo "<p class='btn-preview-next'>Next</p>";
		echo "<canvas id='preview-canvas-right' width='400px' height='400px'></canvas>";
		echo "<p class='preview-right-text'>TEXT GOES HERE</p>";
	echo "</div>";
echo "</div>";
echo "<div class='row' id='title-row'>";
	echo "<input id='title-story' type='text' placeholder='Enter title here!'></input>";
	echo "</div>";
	echo "<div class='row' id='drawing-app-row'>";
	echo "<div id='step-info'>";
		echo "<p class='btn-prev'>Previous Step</p>";
		echo "<p class='step-counter'>Step: 1</p>";
		echo "<p class='btn-next'>Next Step</p>";
	echo "</div>"; //End of step information div

	echo "<div class='col-xs-12 col-md-1 col-xs-offset-0 col-md-offset-0' id='drawing-buttons'>";
		echo "<ul>";
		echo "<li class='btn-undo'>Undo</li>";
		echo "<li class='btn-redo'>Redo</li>";
		echo "<li class='btn-fill'>Fill</li>";
		echo "<li class='btn-new'>New Step</li>";
		echo "</ul>"; //End of drawing buttons list

		echo "<div id='brush-box'>";
		echo "<p>Brush size</p>";
		echo "</div>"; //End of brush-box 
	echo "</div>";//End of drawing buttons

	echo "<div class='col-md-5 col-xs-12 col-xs-offset-0 col-md-offset-0' id='drawing-canvas-area'>";
	echo "<canvas id='canvas-story' width='400px' height='400px'></canvas>";
		echo "<div id='below-canvas'>";
			echo "<p>Choose Colour:</p>";
			echo "<input id='drawing-color' class='color {required:false}''></input>";
			echo "<textarea id='text-story' type='text' rows='4' placeholder='Enter step text here! 200 char limit' maxlength='200'></textarea>";
		echo "</div>"; //End of colour picker and text div
	echo "</div>"; //End of drawing canvas area div
	

	echo "<div class='col-md-5 col-xs-10 col-xs-offset-1 col-md-offset-1' id='flow-chart-area'>";
		echo "<p class='btn-delete'>Delete Current Step</p>";
		echo "<div id='flow-chart'></div>";
		echo "<div id='below-chart'>";
			echo "<p class='btn-preview'>Preview</p>";
			echo "<p class='btn-upload'>Upload</p>";
		echo "</div>"; //End of below chart program
	echo "</div>"; //End of flow chart area
echo "</div>"//End of first row 

?>