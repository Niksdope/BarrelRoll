# BarrelRoll™
#### A graphical programming project for GaCo (Ian)


# To-do
- [x] Create a barrel sprite and animate it on the screen
- [x] Create a ground picture that will be larger than the canvas.width size so that I can use it as a panorama and loop over it to create the illusion of the barrel moving
- [x] Create a background picture and the same thing as with the ground
- [x] Add jump functionality to the barrel
- [x] Add an animated obstacle for the barrel to avoid. *Decided to go with spikes shooting up from the ground and then going back into their hole*
- [x] Add a score counter
- [x] Make the spikes move together with the floor
- [x] Add a start and end screen for user to see
- [x] Add finishing touches, making everything look as perfectly as possible and the game run as smoothly as possible
- [ ] Implement a restart button


# How it works
At the beginning of the game, two objects are created. One for the barrel and one for the spikes. It then calls the init() function which loads the start page of the game.

```
    var barrel = {//Variables & functions for barrel}; 
    var spikes = {//Variables & functions for spikes};
    
    init(); 
```

function init() {} draws the background and floor of the game and then an opaic rectangle over the entire page asking for any user keyboard input, for which an event listener will call the draw() function.

```
    window.addEventListener("keydown", function(event) {});
```

The draw() function has a setTimeout() function inside of it to control the amount of frames that window.requestAnimation frame() will draw each second. The setTimeout() function includes all the function calls and condition checks for the game running as well as wraps the requestAnimFrame inside an if that checks if the game should still be drawing (set to false when game over)

```
    function draw() {
	    setTimeout(function() {
	        if (drawing)
	        {
	            window.requestAnimationFrame(draw);
	        }
	        
	        // Draw functions
	        // Condition checks e.g. everytime score goes up by 100 increase the speed of the game
	        // Check if (colliding()){ //Ends game if barrel and spikes are colliding}
	    }, Math.round(1000/fps));
	}
```

The rest of the JavaScript file just has functions for various different things for the game i.e. the functions for drawing the game in draw() include drawBackground(), drawFloor() and drawSpikes(). drawBackground, drawFloor and drawSpikes create an illusion of the barrel moving across the cave but all they are doing is looping a picture going across the screen to the left.


# The files in the repository
Launch the **index.html** file diretly in your browser and it should recieve information from **barrel.js** and **barrel.css** files to make the game run.

**animatedBarrel**.png was a file I created on photoshop for the barrel object which consists of 2 different states of the same picture to make it possible to animate.

**spikes.png** were the obstacle I drew up to add a losing condition for the game which again has 4 different states to make it animated.

**backGround.png** and **properGround.png** were pictures I drew for the "map" itself which are large panorama like pictures that are constantly looped in the game.

**logo.png** and **rules.png** were just png files used in the html file to make it look nice.


# Fin
I just finished up the project on 06/11/2015.

I've put everything I was testing in test.html into index.html and have made
seperate files for both the .css and .js and called them both barrel.

I've also edited the html page to look more pleasing, adding a logo at the top
and rules at the bottom. 

Some bugs still include the animation frame drawing two frames in the space of one and so sometimes the end screen would pop up and disappear immediately as another frame is drawn over it *(Seems to be when the barrel lands on top of the spikes)*. Another bug was with the restart button and I couldn't get it working.
The problem with the restart button was that I couldn't call 

```
window.onLoad function() {
    // Initialize game
}
```

twice in the same canvas. I tried using a fix I found online which meant replacing the above with, 

```
window.addEventListener("load", function(evt) {
    // Initialize game
}
```

but that didn't work either.


# Summary
I hope you're as satisfied with the game as I am GaCo. It wasn't as easy as it looks. I had to research and learn many new things, including creating pixel art and animating it.
