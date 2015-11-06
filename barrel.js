var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var barrel = {"h": 80, "w": 92, "desX": -60, "desY": 575, "jump": function() {
		// Checks if the barrel is jumping and not falling as well as whether or not it's reached
		// it's jumpHieght destination
		if (barrel.jumping == true && barrel.falling == false && barrel.desY > barrel.jumpHeight)
		{
			barrel.desY -= 60;
		}
		// If barrel is at top of jump, wait there for 15 frames and begin descent
		else if (barrel.jumpHeight == barrel.desY && barrel.jumpTimer == 15)
		{
			barrel.falling = true;
			barrel.desY += 40;
		}
		// Make the y of the barrel move down
		else if (barrel.falling == true && barrel.desY < barrel.jumpHeight + 120)
		{
			barrel.desY += 40;
		}
		// Once the barrel is down where it started, you can jump again
		else if (barrel.jumpHeight +120 == barrel.desY)
		{
			barrel.jumping = false;
			barrel.falling = false;
		}
}, "jumping": false, "falling": false, "jumpHeight": 0, "jumpTimer": 0};

var spikes = {"h": 65, "w": 145, "desX": canvas.width, "desY": 590, "timeout": 0};

// Initializing all the images needed for the canvas
var barrelImg = new Image();
var groundImg = new Image();
var backgroundImg = new Image();
var spikesImg = new Image();

barrelImg.src = 'animatedBarrel.png';
groundImg.src = 'properGround.png';
backgroundImg.src = 'backGround.png';
spikesImg.src = 'spikes.png'

// i and j are used to animate the barrel and spike objects
var i = 0;
var j = 0;

// Variables used for making stuff move
var fps = 20;
var score = 0;
var x = -canvas.width;
var xv = 20;

// Drawing is a boolean used to stop windowAnimationFrame
var drawing = true;

// Initializer used to make sure the game can only call draw() once
var initializer = 0;

// Shows the initial game screen for player
init();

// ____________ Initial function for game ____________________________________________
function init() {

	// Resets all the important variables to their defaults. Was meant for restart button
	/* ctx.clearRect(0, 0, canvas.width, canvas.height);

	i = 0;
	j = 0;
	xv = 20;
	fps = 20;
	score = 0;
	x = -canvas.width;

	barrel.desY = 575;
	barrel.jumpHeight = 0;
	barrel.jumpTimer = 0;
	barrel.jumping = false;
	barrel.falling = false;
	barrel.desX = 0;

	spikes.desX = canvas.width;
	spikes.timeout = 0; */

	// Window.onload function loading the initial screen for the game. This was meant to be
	// called again for reset button but alas, I could'nt figure it out
	window.addEventListener("load", function(evt) {
		ctx.drawImage(groundImg, 0, 600, groundImg.width, groundImg.height);
		ctx.drawImage(backgroundImg, 0, 0, backgroundImg.width, backgroundImg.height);

		ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
		ctx.rect(0,0, canvas.width, canvas.height);
		ctx.fill();

        ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.font = "24px serif";
		ctx.fillText("Press any key to start the game", 315, canvas.height/2); 
	});
}

// Window event listener for keydown function. It's job is to initialize the game at the
// very beginning and then to handle the arrow up being pressed to make the barrel jump
window.addEventListener("keydown", function(event) { 
		if (initializer == 0)
		{
			draw();
			initializer = 1;
		}

		// Checks if the barrel is already jumping and whether the game has started
		// before making the barrel jump
		if (barrel.jumping == false && event.keyCode == 38 && initializer == 1)
		{
			barrel.jumpHeight = barrel.desY - 120;
			barrel.jumping = true;
			barrel.jumpTimer = 0;
		}

	});

// Draw function which is called first by init() and continues to be called by requestAnimationFrame
function draw() {
	setTimeout(function() { // Used to control the fps of the game
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		// Keep drawing frames until the variable "drawing" is set to false
		if (drawing == true)
		{
			window.requestAnimationFrame(draw);
		
		}

        drawBackground(); // Draw in the background
        drawFloor(); // Draw in the floor    

        // _____________ Writing score to screen ________________________________________
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.font = "20px arial";
		ctx.fillText("Score: " + score, 780, 30);

		// _____________ Animating the barrel ___________________________________________
		// Keeps drawing between the two different images of the sprite using i
		if (i == 0)
		{
			ctx.drawImage(barrelImg, 0, 0, 
				barrel.w, barrel.h, 
				barrel.desX, barrel.desY, 
				barrel.w, barrel.h);
			i = 1;					
		}

		else if (i == 1)
		{
			ctx.drawImage(barrelImg, 99, 0, 
					barrel.w, barrel.h,
					barrel.desX, barrel.desY,
					barrel.w, barrel.h);
			i = 0;
		}

		drawSpikes(); // Draw in the spikes here so barrel is behind them
		
		// Increasing the difficulty of the game here..
		// Every time score goes up by 100, xv gets +3 so the whole background/ground/spike
		// combo starts to move faster. As well as that, the fps of the whole canvas goes up
		// by 1, from 20 to 30 to give illusion of barrel moving faster
        if (score > 99 && score % 100 == 0)
        {
        	if (fps <= 30)
        	{
        		fps += 1;
        	}

        	xv = xv+3;
        }

        // Having the barrel initially roll in from x: -60 and the stay at 150
		if (barrel.desX < 150)
		{
			barrel.desX += 5;
		}
		
		// If statement to check if the barrel is jumping which calls jump() method
		// inside the barrel and adds 1 to the wait time of barrel at top of jump
		// position which stops once it's been there for 15 frames
		if (barrel.jumping)
		{
			barrel.jumpTimer += 1;
			barrel.jump();
		}

		// Score goes up by 1 every frame, 20 a second intially
		score += 1;

		// Checks if the barrel and spikes are colliding using isColliding Function and
		// ends the game, stopping the animation, printing to console and showing end screen
		if (isColliding())
		{
			drawing = false;
			console.log("Game over");
			endScreen();
		}

	}, Math.floor(1000/fps));
}
// _____________ Drawing the moving floor _________________________________________
function drawFloor() {

	if (groundImg.width >= canvas.width) {
		// If the image has fully passed through screen, reset x to default position and
		// draw again 
		if (x <= -(groundImg.width + canvas.width)) 
		{ 
			x = -canvas.width;
		}
			
		if (x <= -(groundImg.width - canvas.width)) 
		{ 
			// Continuing to draw image if it's width runs out
			ctx.drawImage(groundImg, (x + groundImg.width), 600, 
			groundImg.width, groundImg.height); 
		}
	}

	// Drawing a new image from canvas.width
	ctx.drawImage(groundImg, x, 600, groundImg.width, groundImg.height);

	// Amount for the x on image to move left each frame
	x -= xv;	
}
// _____________ Drawing the moving background ______________________________________

function drawBackground() {
	
	if (backgroundImg.width >= canvas.width) {
		// If the image has fully passed through screen, reset x to default position and
		// draw again 
		if (x <= -(backgroundImg.width + canvas.width)) 
		{ 
			x = -canvas.width;
		}
			
		if (x <= -(backgroundImg.width - canvas.width)) 
		{ 
			// Continuing to draw image if it's width runs out
			ctx.drawImage(backgroundImg, (x + backgroundImg.width), 0, 
			backgroundImg.width, backgroundImg.height); 
		}
	}

	// Drawing a new image from canvas.width
	ctx.drawImage(backgroundImg, x, 0, backgroundImg.width, backgroundImg.height);	

	// Amount for the x on image to move left each frame
	x -= xv;	
}

// _______________ Animating the spikes ___________________________________________
function drawSpikes() {

	// Redrawing the spieks everytime the leave the canvas at x = 0
    if (spikes.desX + spikesImg.width <= 0)
    {
        spikes.desX = canvas.width;
    }
    
    // Making the spikes move smoothly along with the ground and background images
    spikes.desX -= xv;

    // A switch for each part of the sprite animation, j = 0 being sheathed and j = 3 
    // being fully extended. Had to add extra two cases for the spikes going back in
    // otherwise id get stuck in a infinite loop of 3 calling 2 and 2 calling 3
    switch (j)
    {
        case 0: // Wait 5 frames at the bottom
            spikes.timeout += 1;

            ctx.drawImage(spikesImg, 0, 0, 
            spikes.w, spikes.h, 
            spikes.desX, spikes.desY, 
            spikes.w, spikes.h);

            if (spikes.timeout == 5)
            {
                j = 1;
                spikes.timeout = 0;
            }
        break;
        case 1:
            ctx.drawImage(spikesImg, 145, 0, 
            spikes.w, spikes.h,
            spikes.desX, spikes.desY,
            spikes.w, spikes.h);

            j = 2;
        break;
        case 2:
            ctx.drawImage(spikesImg, 290, 0, 
            spikes.w, spikes.h,
            spikes.desX, spikes.desY,
            spikes.w, spikes.h);

            j = 3;
        break;
        case 3: // Wait 5 frames at the top
            spikes.timeout += 1;

            ctx.drawImage(spikesImg, 435, 0, 
            spikes.w, spikes.h,
            spikes.desX, spikes.desY,
            spikes.w, spikes.h);

            if (spikes.timeout == 5)
            {
                j = 4;
                spikes.timeout = 0;
            }
        break;
        case 4:
            ctx.drawImage(spikesImg, 290, 0, 
            spikes.w, spikes.h,
            spikes.desX, spikes.desY,
            spikes.w, spikes.h);

            j = 5;
        break;
        case 5:
            ctx.drawImage(spikesImg, 145, 0, 
            spikes.w, spikes.h,
            spikes.desX, spikes.desY,
            spikes.w, spikes.h);

            j = 0;
        break;
        default:
        	// Default in the case that something goes wrong (It wont)
            console.log("Failed to animate spikes");
        break;
    }
}

// ____________ Function for checking collision between barrel and spikes _____________
function isColliding() {
	// Checks wether the image of spikes in every position except for 0 (Sheathed spikes) is below barrel
	// and if the y value on the barrel is not touching the spikes at different levels for each case
    if (j == 1 && (spikes.desX < barrel.desX + (barrel.w - 1)) && (spikes.desX + spikes.w > barrel.desX + 2))
    {
    	// 40 is simply how many pixels out of the ground the first part of the animation is
    	if (barrel.desY + barrel.h > (spikes.desY - spikes.h) + 40)
    	{
    		return true;
    	}
    	
    }
    if (j == 2 && (spikes.desX < barrel.desX + (barrel.w - 1)) && (spikes.desX + spikes.w > barrel.desX + 2))
    {
    	// 50 pixels out of ground
    	if (barrel.desY + barrel.h > (spikes.desY - spikes.h) + 50)
    	{
    		return true;
    	}
    }
    if (j == 3 && (spikes.desX < barrel.desX + (barrel.w - 1)) && (spikes.desX + spikes.w > barrel.desX + 2))
    {
    	// 65 pixels out of ground
    	if (barrel.desY + barrel.h > (spikes.desY - spikes.h) + 65)
    	{
    		return true;
    	}
    }
    if (j == 4 && (spikes.desX < barrel.desX + (barrel.w - 1)) && (spikes.desX + spikes.w > barrel.desX + 2))
    {
    	// 50 pixels out of ground
    	if (barrel.desY + barrel.h > (spikes.desY - spikes.h) + 50)
    	{
    		return true;
    	}
    }
    if (j == 5 && (spikes.desX < barrel.desX + (barrel.w - 1)) && (spikes.desX + spikes.w > barrel.desX + 2))
    {
    	// 40 pixels out of ground
    	if (barrel.desY + barrel.h > (spikes.desY - spikes.h) + 40)
    	{
    		return true;
    	}
    }
}

function endScreen() {		
	var hover = 0; // Meant to be used for restart button, but didn't work. See below vvvv

	// Drawing a pale black rect over screen with score count and button
	ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
	ctx.rect(0,0, canvas.width, canvas.height);
	ctx.fill();

	ctx.fillStyle = "rgb(255,255,255)";
	ctx.font = "40px arial";
	ctx.fillText("Final score: " + (score -1), 330, canvas.height/2);

	// _______ My failed attempt to creating a pretty retry button (uncomment and see) ______

	/* ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
	ctx.rect(canvas.width/2 - 140, 120, 300, 100);
	ctx.stroke();

	ctx.fillStyle = "rgba(255,255,255, 0.2)";
	ctx.font = "20px arial";
	ctx.fillText("Try again", 415, 175);
	
	window.addEventListener("mousemove", function(event) { 
		// If the mouse is moved over the "button" area on canvas
		if (event.layerX > 310 && event.layerX < 610 && event.layerY > 110 && event.layerY < 210 && hover == 0)
		{
			// Make it only possible to do this once
			hover = 1;
			
			// Drawing over the button to make it brighter and nicer
			ctx.beginPath();
			ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
			ctx.rect(canvas.width/2 - 140, 120, 300, 100);
			ctx.fill();

            ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
			ctx.rect(canvas.width/2 - 140, 120, 300, 100);
			ctx.stroke();

			ctx.fillStyle = "rgba(255,255,255, 0.4)";
			ctx.font = "20px arial";
			ctx.fillText("Try again", 415, 175);	
			
			// Change cursor style from default to pointer
			document.getElementsByTagName("body")[0].style.cursor = "pointer";					
		}
		// Meant to change the cursor style back to default once it's left the button area, but doesn't
		else if (event.layerX < 310 && event.layerX > 610 && event.layerY < 110 && event.layerY > 210)
		{
			document.getElementsByTagName("body")[0].style.cursor = "default";
		}
	});
	
	// Actual restart button. When you click on the are of the button, the init function will again
	// be called and it's meant to initialize all the variables back to default values however it
	// doesn't work as I found out you can't call window.onload more than once per canvas

	window.addEventListener("mousedown", function(event) { 
	if (event.layerX > 310 && event.layerX < 610 && event.layerY > 110 && event.layerY < 210)
	{
		init();
	}
	}); */
}
