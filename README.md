# BarrelRoll
A graphical programming project for GaCo (Ian)

## To-do
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

## Some insight into how it all works
Launch the **index.html** file diretly in your browser and it should recieve information from **barrel.js** and **barrel.css** files to make the game run.

**animatedBarrel**.png was a file I created on photoshop for the barrel object which consists of 2 different states of the same picture to make it possible to animate.

**spikes.png** were the obstacle I drew up to add a losing condition for the game which again has 4 different states to make it animated.

**backGround.png** and **properGround.png** were pictures I drew for the "map" itself which are large panorama like pictures that are constantly looped in the game.

**logo.png** and **rules.png** were just png files used in the html file to make it look nice.

## Finally done
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

## Summary
I hope you're as satisfied with the game as I am GaCo. It wasn't as easy as it looks. I had to research and learn many new things, including creating pixel art and animating it.
