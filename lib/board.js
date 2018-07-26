class Board{
  constructor(size, computer = false){
    this.rows = [];
    this.makeTiles(size);
    this.emptyPos = [size-1, size-1];
    this.size = size;
    this.puzzleAudio = new Audio("assets/audio/puzzleslide.wav");
  }

  makeTiles(size){
    let baseArr = [];
    for (let i = 1; i < (size*size); i++) {
      baseArr.push(i);
    }
    this.shuffle(baseArr);
    while(!this.validBoard(baseArr)){
      this.shuffle(baseArr);
    }
    baseArr.push(99);
    // Use 99 cause why not
    for (let i = 0; i < size; i++) {
      this.rows.push(baseArr.splice(0,size));
    }
  }

  shuffle(baseArr){
    let i = 0;
    let j = 0;
    let temp = null;

    for (i = baseArr.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = baseArr[i];
      baseArr[i] = baseArr[j];
      baseArr[j] = temp;
    }
  }

  validBoard(arr){
    let sum = 0;
    let visitedNumbers = [];
    arr.forEach((el1)=>{
      let count = el1-1;
      visitedNumbers.forEach(el2=>{
        if(el2 < el1){
          count = count-1;
        }
      });
      visitedNumbers.push(el1);
      if(count<0){
        count = 0;
      }
      sum = sum + count;
    });
    return 0 === sum%2;
  }

  makeMove(key){
    let temp;
    if(key === "s" || key === "ArrowDown"){
      if(this.rows[this.emptyPos[0]-1] !== undefined){
        temp = this.rows[this.emptyPos[0]-1][this.emptyPos[1]];
        this.rows[this.emptyPos[0]-1][this.emptyPos[1]] = 99;
        this.rows[this.emptyPos[0]][this.emptyPos[1]] = temp;
        this.emptyPos = [this.emptyPos[0]-1, this.emptyPos[1]];
        this.puzzleAudio.play();
      }
    }else if (key=== "d" || key==="ArrowRight") {
      if(this.rows[this.emptyPos[0]][this.emptyPos[1]-1] !== undefined){
        temp = this.rows[this.emptyPos[0]][this.emptyPos[1]-1];
        this.rows[this.emptyPos[0]][this.emptyPos[1]-1] = 99;
        this.rows[this.emptyPos[0]][this.emptyPos[1]] = temp;
        this.emptyPos = [this.emptyPos[0], this.emptyPos[1]-1];
        this.puzzleAudio.play();
      }
    }else if (key=== "w" || key==="ArrowUp") {
      if(this.rows[this.emptyPos[0]+1] !== undefined){
        temp = this.rows[this.emptyPos[0]+1][this.emptyPos[1]];
        this.rows[this.emptyPos[0]+1][this.emptyPos[1]] = 99;
        this.rows[this.emptyPos[0]][this.emptyPos[1]] = temp;
        this.emptyPos = [this.emptyPos[0]+1, this.emptyPos[1]];
        this.puzzleAudio.play();
      }
    }else if (key=== "a" || key==="ArrowLeft") {
      if(this.rows[this.emptyPos[0]][this.emptyPos[1]+1] !== undefined){
        temp = this.rows[this.emptyPos[0]][this.emptyPos[1]+1];
        this.rows[this.emptyPos[0]][this.emptyPos[1]+1] = 99;
        this.rows[this.emptyPos[0]][this.emptyPos[1]] = temp;
        this.emptyPos = [this.emptyPos[0], this.emptyPos[1]+1];
        this.puzzleAudio.play();
      }
    }
  }

  solved(){
    function arraysEqual(a1,a2) {
      return JSON.stringify(a1)==JSON.stringify(a2);
    }
    let flat=[];
    for (let i = 0; i < this.rows.length; i++) {
      flat=flat.concat(this.rows[i]);
    }
    let dup = flat.slice();
    dup.sort(function(a, b) {
      return a - b;
    });
    return arraysEqual(flat, dup);
  }
}

export default Board;
