# Project1
JavascriptGame
<!-- # **Space Invaders** -->
<img src="" width="auto" height="170">
### JavaScript game built for the browser

## Table of Contents
* [Brief](#brief)
* [Tech Used](#tech)
* [Process](#process)
* [Challenges](#challenges)
* [Wins](#wins)
* [Next Up](#next)
* [Game Instructions](#instructions)

* [Click]( http://seanrennie.com/two-person-shooter-game-ga-wdi-prj1/) to play game

## <a name="brief"></a>Brief

Technical Requirements:
-Build a game using Vanilla Javascript
-Render a game in the browser
-Design logic for winning & visually display which player won
-Include separate HTML / CSS / JavaScript files
-Use Javascript for DOM manipulation
-Deploy the game online
-Use semantic markup for HTML and CSS


Deliverables:
- A working game, built by you, hosted somewhere on the internet
- A link to your hosted working game in the URL section of your Github repo
- A git repository hosted on Github, with a link to your hosted game, and frequent commits dating back to the very beginning of the project

<hr>

## <a name="tech"></a>Technologies Used:

`Javascript`
`SASS (SCSS)`
`CSS3`
`HTML5`
`Git`
`jQuery`
`Atom`
`GitHub`
`Trello`

<hr>

## <a name="process"></a>The Process
### Planning
The initial planning phase centred around determining an MVP for the game. For Space Invaders, it was to have two elements, one of which could 'shoot' elements at each other, recognise that they had been hit and to reduce the life of the impacted element.

After fleshing out MVP I used [Trello](https://trello.com/b/cXEbOHhc)  to list out and track all the tasks that need doing to reach it.

 <img src="styles/images/battle-command-trello-board.png" width="auto" height="170">

 I also thought out additional features that could be added to the game once MVP had been reached which were also added to Trello.

### The Build
My plan was to start with the smallest possible piece and work upwards towards a fully functioning game. For Space Invaders this was being able to move an element around the game board using the arrow keys.

Understanding how to do this then allowed me to take on the challenge of collision detection, bullet propulsion, bullet collision management and ultimately obstacle management.

I primarily made use of ES6 `class` syntax, to create the game board elements. This proved to be particularly useful for managing the many bullets on the board and later on the variable number of obstacles.

After reaching MVP the focus shifted to making the game fun to play by jazzing up the styling and adding some graphics . Finally I added some additional features to the games like randomly placed obstacle with differing effects on the game and even a speed power up.

<hr>

## <a name="challenges"></a>Challenges

The initial challenge that I needed to solve was how to detect collisions between elements on the board and to be able to move an element on the board using the arrow keys. Stack overflow provided some workable solutions to do the collision detection which I moulded into the various collision use cases needed for the game.

Managing all the active aliends was another challenge which was accomplished by having `gameItems[]` array which held any active instances of bullets, tanks, objects and or power-ups. This array was used to check all possible collisions and bullets would be removed from the array once they left the perimeter of the board or collided with tanks or obstacles.

See the *wins* below fo more on the challenge of managing the different types of collisions on the board and their various outcomes.


<hr>

## <a name="wins"></a>Wins
While collision detection and management of multiple bullets and bullet collisions was certainly a big challenge, as I did not know how to do this initially, resulting in major wins, my favourite bits of code and the pieces I am most proud of are the interaction between the game elements and obstacles.

The `move()` method below is the heart of the game and my favourite piece of code. The method is responsible for taking in a direction of a tank or a bullet and moving it across the game board at the elements specific speed. It checks for collisions every time it updates the elements position and will determine a different results depending on what has collided with what. Admittedly the method is rather verbose and could be re-factored considerably. See whats next to understand more on this.

``` JavaScript
  move(direction) {
    const newPosition = {
      left: this.left,
      top: this.top,
      width: this.width,
      height: this.height
    };

    const speed = this.movementSpeed;

    switch(direction){
      case 'left':
        newPosition.left -= speed;
        this.direction = 'left';
        break;...
        // Three additional conditions for top, bottom & left
      }

      if(!positionIsOnBoard(newPosition.top, newPosition.left, this.width,  this.height)){
        return false;
      }

      const overlappingObjects = objectOverlapsObjects(this, newPosition,   gameItems);

      if(overlappingObjects){
        const collidedWith = overlappingObjects[0].object.name;
        const collidingItemType = this.type;

        if(collidedWith === 'Water' && collidingItemType === 'tank'){
          gameEndWater(this.name);

        }else if((collidedWith === 'Water' || collidedWith === 'Marsh' ||   collidedWith === 'SpeedUp') && collidingItemType === 'bullet'){
          //const nothing = 'do nothing';
        }else if(collidedWith === 'SpeedUp' && collidingItemType === 'tank'){
          this.movementSpeed = 30;
          setTimeout(()=>{
            this.movementSpeed = 10;
          }, 7000);

        }else if(collidedWith === 'Marsh' && collidingItemType === 'tank'){
          const stickFactor = overlappingObjects[0].object.movementSpeed;
          switch(direction){
            case 'left':
            newPosition.left += speed - stickFactor;
            this.direction = 'left';
            break;...
            // Three other conditions for `right`, `up` and `down`  
          }
        }else{
          return overlappingObjects;
        }
      }

    this.left = newPosition.left;
    this.top = newPosition.top;
    this.domElement.setAttribute('class', direction);
    return true;
  }

```

<hr>

## <a name="next"></a>Next up
  As this project was the first project completed during the course, I would begin by refactoring the JavaScript significantly and breaking all the different aspects into various modules. Watch this space for a forked version of the game.

  Future features would include:

  - Ensure obstacles are not placed in the direct path of the tanks when game is initialised.
  - Additional power ups such as which are stored and used at the players discretion
  - Gun turret direction is independent from the direction of the tank
  - Limit the number of rounds. Addition rounds collected as power ups
  - Limit the range of tanks (fuel)

<hr>

## <a name="instructions"></a>Game Instructions:

**Aim:** Two players go head to head, controlling battle tanks in an attempt to destroy each other.


<img src="styles/images/game-instructions.png" width="auto" height="450">

> ### Player one controls
> - `^`       up
> - `v`       down
> - `<`       left
> - `>`       right
> - `Space`   fire cannon


> ### Player Two controls
> - `W`       up
> - `S`       down
> - `A`       left
> - `D`       right
> - `Shift`   fire cannon
