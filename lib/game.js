class Game {

  constructor(ctx, board, img){
    this.ctx = ctx;
    this.board = board;
    this.img = img;
    this.size = this.board.size;
    this.winAudio = new Audio('assets/audio/win.wav');
  }

  drawBloks(){
    const blokDim = 600/this.size;
    this.ctx.clearRect(0,0,600,600);
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const position = [Math.floor((this.board.rows[i][j]-1)/this.size), (this.board.rows[i][j]-1)%this.size];
        this.ctx.drawImage(this.img, position[1]*blokDim, position[0]*blokDim, blokDim, blokDim, j*blokDim, i*blokDim, blokDim, blokDim);
      }
    }
    if(this.board.solved()){
      this.ctx.drawImage(this.img, 0, 0);
      setTimeout(()=>alert("A Winrar is You!"), 300);
    }
  }

  reset(){
    this.ctx.clearRect(0,0,600,600);
    this.ctx.drawImage(this.img, 0, 0);
  }
}

export default Game;
