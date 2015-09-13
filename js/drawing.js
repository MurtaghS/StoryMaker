var mousePressed = false;
var lastX, lastY;
var ctx;
var drawingArray = new Array();
var stepNumber = 0;
//Counters for previewing the story page
var leftcounter = 0;
var rightcounter = 1;

function AlgorithmStep(description)
{
	var descrption;
	var editArray;
	var editStep; 
	
	this.description = description;
	this.editArray = new Array();
	this.editStep = -1;
}

$(function(){
	ctx = document.getElementById('canvas-recipe').getContext('2d');
	ctx.lineJoin = 'round';

	$('.btn-next').css('visibility', 'hidden');
	$('.btn-prev').css('visibility', 'hidden');

	$('#drawing-color').css('background-color', '#000000');

	//Begin to draw
	$('#canvas-recipe').mousedown(function(e){
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

	//Draws when the mouse is moved if mouse is held down
    $('#canvas-recipe').mousemove(function(e){
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

	//User let go of mouse so we stop drawing
    $('#canvas-recipe').mouseup(function(e){
        if (mousePressed) {
            mousePressed = false;
            canvasPush();
        }
    });

    for (var i=0; i<16; i++){
		$('<div class="brush-size"></div>').appendTo('#brush-box');
	}

	var counter = 1;
	$('#brush-box').children('div').each(function(){
		$(this).text(counter); // "this" is the current element in the loop
		counter += 2;
		});
	
	//Check to see what brush size was clicked and set the canvas line width to the value
	$('.brush-size').click(function(){
		ctx.lineWidth = $(this).html();
		$('#brush-box').children('div').each(function(){
			$(this).css('background-color','#5aac56');	//Change background colour to other values to override any changes
		});
		$(this).css('background-color','#8dcf8a');	//Change background colour to value we have
	});

    //Undo an action the user made
	$('.btn-undo').click(function(){
		canvasUndo();
	});

	//Revert back to before clicking undo
	$('.btn-redo').click(function(){
		canvasRedo();
	});

	$('.btn-fill').click(function(){
		ctx.fillStyle=$('#drawing-color').css('background-color');
		ctx.fillRect(0, 0, 400, 400);
		canvasPush();
	});

	//Adds a new step to the program
	$('.btn-new').click(function(){
		stepNumber = drawingArray.length;	//We want to jump to the newest step
		document.getElementById('text-recipe').value = '';	//Adjust step text below drawing area
		blankFrame();
		initialPush();	//Need to push the white frame so the user can revert back to a blank canvas
		changeStepText();
		updateChart();
	});

	$('.btn-next').click(function(){
		if (stepNumber < (drawingArray.length - 1))
		{
			stepNumber++;
			displayStep();
			changeStepText();
		}
	});
	
	//Go to previous step in the algorithm and display it if not at the first step
	$('.btn-prev').click(function(){
		if (stepNumber > 0)
		{
			stepNumber--;
			displayStep();
			changeStepText();
		}
	});

	$('.btn-delete').click(function(){
		if (stepNumber != 0)
		{
			deleteStep();
		}
	});

	$('.btn-preview').click(function(){
		previewAlgorithm();
	});

	//When the user types something, save it to the current step description text
	$('#text-recipe').focusout(function()
	{
		drawingArray[stepNumber].description = document.getElementById('text-recipe').value;
	});


	$(document).on('click', "div.overlay", function(){
		$('#preview-row').addClass('hidden');
		$(this).addClass('hidden');
		leftcounter=0;
		rightcounter=1;
	});

	$(document).on('click', ".btn-preview-next", function() {
		var arraysize = drawingArray.length;
		if (rightcounter <= arraysize){
			leftcounter += 2;
			rightcounter += 2;	//Need to know what images to show
			updatePreview();
		}
	});

	$(document).on('click', ".btn-preview-prev", function() {
		var arraysize = drawingArray.length;
		if (leftcounter > 0){
			leftcounter -= 2;
			rightcounter -= 2;	
			updatePreview();
		}
	});

	blankFrame();
	initialPush();
	changeStepText();
	updateChart();
	flowchartUpdate();

});

function initialPush(){
	var step = new AlgorithmStep(
	document.getElementById('text-recipe').value
	);	//Change undo-btn to recipe description when added
	
	drawingArray.push(step);
	canvasPush();
}

function blankFrame(){
	ctx.fillStyle="#ffffff";
    ctx.fillRect(0, 0, 450, 450);
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
		ctx.strokeStyle = $('.color').css('background-color');
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;
}

function displayStep(){
	var canvasPic = new Image();
        canvasPic.src = drawingArray[stepNumber].editArray[drawingArray[stepNumber].editStep];	//Image source is last edit in the object array
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }	//Draw the image to the canvas
	document.getElementById('text-recipe').value = drawingArray[stepNumber].description;		//Load the description
}

function changeStepText(){
	$('.step-counter').text('Step: ' + (stepNumber + 1));	//Show current step number above drawing area
	
	if (stepNumber == 0)
	{
		$('.btn-prev').css('visibility', 'hidden');
	}
	else
	{
		$('.btn-prev').css('visibility','visible')	//View/hide previous button
	}
	if (stepNumber == drawingArray.length - 1)
	{
		$('.btn-next').css('visibility', 'hidden');
	}
	else
	{
		$('.btn-next').css('visibility','visible')	//View/hide next button
	}
}

function canvasPush() {
	drawingArray[stepNumber].editStep++;
    if (drawingArray[stepNumber].editStep < drawingArray[stepNumber].editArray.length)
	{ 
		drawingArray[stepNumber].editArray.length = drawingArray[stepNumber].editStep; 
	}
	
	drawingArray[stepNumber].editArray.push(document.getElementById('canvas-recipe').toDataURL());
}

function canvasUndo() {
    if (drawingArray[stepNumber].editStep > 0) 
	{
        drawingArray[stepNumber].editStep--;
        var canvasPic = new Image();
        canvasPic.src = drawingArray[stepNumber].editArray[drawingArray[stepNumber].editStep];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
		console.log(drawingArray[stepNumber].editStep);
    }
}

//Goes to the next image in the array and draws it to the canvas
function canvasRedo() {
    if (drawingArray[stepNumber].editStep < drawingArray[stepNumber].editArray.length-1) //Only redo if we are not at the end of the algorithm
	{
        drawingArray[stepNumber].editStep++;	//Look at next edit image
        var canvasPic = new Image();
        canvasPic.src = drawingArray[stepNumber].editArray[drawingArray[stepNumber].editStep];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }	//Load edit step image and display it in the canvas
    }
}

function previewAlgorithm(){
	$('.overlay').removeClass('hidden');
	$('#preview-row').removeClass('hidden');
	updatePreview();
}

function deleteStep(){
	drawingArray.splice(stepNumber, 1);
	stepNumber--;
	displayStep();
	$('#flow-chart').empty();	//Clear out the flow chart box
	refreshChart();					//Redraw all step boxes in the flow chart box
	changeStepText();
}

//Function that displays the steps created as a book-like format
function updatePreview(){
	var ctxleft = document.getElementById('preview-canvas-left').getContext("2d");	
	var ctxright = document.getElementById('preview-canvas-right').getContext("2d");	//2 canvas represent the steps on left/right of page
	var lefttext;
	var righttext;
	var leftimage = new Image();
	var rightimage = new Image();
	var endimage = "images/end.jpg"
	
	if (leftcounter == drawingArray.length)	//Left counter is the end so display the end image
	{
		leftimage.src = endimage;
		leftimage.onload = function(){ctxleft.drawImage(leftimage, 0, 0);}
	}
	else
	{
		leftimage.src = drawingArray[leftcounter].editArray[drawingArray[leftcounter].editStep];	//Load last edit made of this step
		leftimage.onload = function () { ctxleft.drawImage(leftimage, 0, 0); }
		lefttext = drawingArray[leftcounter].description;
		$('.preview-left-text').text(lefttext);	//Adjust text
	}
	if (leftcounter == 0)	//Hide previous button if at the start of the algorithm
	{
		$('.btn-preview-prev').css('visibility', 'hidden');
	}
	else
	{
		$('.btn-preview-prev').css('visibility', 'visible');
	}
	
	if (rightcounter == drawingArray.length)	//At the end so show the the end image
	{
		$('#preview-right').show();
		rightimage.src = endimage;
		rightimage.onload = function () { ctxright.drawImage(rightimage, 0, 0); }
		$('.btn-preview-next').css('visibility', 'hidden');
	}
	else if (rightcounter < drawingArray.length)
	{
		$('#preview-right').show();
		rightimage.src = drawingArray[rightcounter].editArray[drawingArray[rightcounter].editStep];
		rightimage.onload = function () { ctxright.drawImage(rightimage, 0, 0); }
		righttext = drawingArray[rightcounter].description;
		$('.preview-right-text').text(righttext);
		$('.btn-preview-next').css('visibility', 'visible');
	}
	else{
		$('#preview-right').hide();
	}
}

//Adds a new div to the flow chart box representing the new step
function updateChart(){
	var stepcount = 'Step ' + (stepNumber + 1);
	$('<div></div>')
		.text(stepcount)
		.appendTo('#flow-chart')
		.addClass('btn')
		.addClass('flow-step-box');
}

//Loop through algorithm array and add the divs back to the flowchart area after one is deleted
function refreshChart(){
	for (i=0; i<algorithmArray.length; i++)	//Iterate through all array objects
	{
		$('<div></div>')
			.text('Step ' + (i + 1))
			.appendTo('#flow-chart')
			.addClass('btn')
			.addClass('flow-step-box');
	}
}

//Function for handling mouse overs/clicks on step boxes in the flow chart area
function flowchartUpdate(){
	$(document).on('click', "div.flow-step-box", function() 
	{
		stepNumber = $(this).index();	//We can use the index value as no other child elements of the flow chart area exist
		displayStep();
		changeStepText();
	});
	
	//Block of code that displays the preview of a step in the algorithm
	$(document).on('mousemove', "div.flow-step-box", function(e) 
	{
		var eleft  = e.clientX + 10  + "px";
		var etop  = e.clientY + 10  + "px";	//Current mouse position with offset
		var index = $(this).index();
   //      $('.steppreview')
			// .css(
			// {
			// 	top: etop, 
			// 	left: eleft
			// })
			// .show();
    });	
	
	$(document).on('mouseout', "div.flow-step-box", function(e) 
	{
		//$('.steppreview').hide();	//Hide step preview when we mouse out
	});
}