# Blokify

[Live](https://mzril.github.io/Blokify/)

Blokify is a browser game built in JS/HTML/CSS based on the popular N-puzzle. Play with either a 3x3 or a 4x4 game using the provided images, OR activate the webcam and enjoy solving Blokified selfies!

## Instructions

-Click on 3x3 or 4x4 to start a game!

-Use WASD or the Arrow Keys to slide tiles on the board.

-Reset to Reset.

-Cycle through the images using Change Image.

-Take a selfie using the webcam with Take Photo.



## Technologies Used

-JavaScript

-HTML 5

-CSS 3 

-[Camvas](https://github.com/cbrandolino/camvas) by cbrandolino

## How it works

### Drawing the Bloks

The instance of Game that draws the canvas holds a reference to a virtual Board that handles the game logic. 
According to the position of the tiles in that virtual board, and number that tile points to, the program uses the 9-input variant of the canvas's drawImage() function to treat the puzzle image as a giant sprite sheet, cutting the image accordingly.
Below is the function that handles the drawing of the bloks.

```javascript
drawBloks(){
    this.ctx.clearRect(0,0, this.dim ,this.dim);
    //Each tilesize is the canvasDim/N where the game is a NxN grid
    const blokDim = this.dim/this.size;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        //Find the 2D coordinates of the tile value
        const position = [Math.floor((this.board.rows[i][j]-1)/this.size), (this.board.rows[i][j]-1)%this.size];
        //Draw that tile in respect to its position on the virtual board
        this.ctx.drawImage(this.img, position[1]*blokDim, position[0]*blokDim, blokDim, blokDim, j*blokDim, i*blokDim, blokDim, blokDim);
      }
    }
 }
```

### Ensuring a Solvable Board

According to [Wolfram Math](http://mathworld.wolfram.com/15Puzzle.html) for all nxn board states with the empty tile starting at the bottom right corner, half of all board permutation states are unsolvable.
In order for a board state to be solvable, the combined tile inversion sum must be even. 

For example, the inversion sum of a [1,4,3,2] array has 4 before 3 and 2, and 3 before 2. Thus, the total sum is 2+1 or 3.

The bottom is a function that checks a given shuffle's inversion sum.
```javascript
validBoard(arr){
    let sum = 0; //The inversion sum
    let visitedNumbers = []; //Keeps track of already logged numbers to calculate each number's inversion
    arr.forEach((el1)=>{
      let count = el1-1;
      visitedNumbers.forEach(el2=>{
        if(el2 < el1){
          count = count-1; //Calulates the inversion number of each element
        }
      });
      visitedNumbers.push(el1);
      if(count<0){
        count = 0;
      }
      sum = sum + count; //Adds the number to the sum.
    });
    return 0 === sum%2; //if false, reshuffle the array
  }
```

## Future work

Current plans are to implement an Auto-Solver and a vs AI mode utilizing the A* algorithm.
