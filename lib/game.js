class Game {

  constructor(ctx, board, img){
    this.dim = ctx.canvas.height;
    this.ctx = ctx;
    this.board = board;
    this.img = img;
    this.size = this.board.size;
    this.winAudio = new Audio('assets/audio/win.wav');
  }

  drawBloks(){
    this.ctx.clearRect(0,0, this.dim ,this.dim);
    const blokDim = this.dim/this.size;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const position = [Math.floor((this.board.rows[i][j]-1)/this.size), (this.board.rows[i][j]-1)%this.size];
        this.ctx.drawImage(this.img, position[1]*blokDim, position[0]*blokDim, blokDim, blokDim, j*blokDim, i*blokDim, blokDim, blokDim);
      }
    }
    this.drawLines();
    if(this.board.solved()){
      this.ctx.clearRect(0, 0, this.dim, this.dim);
      this.ctx.drawImage(this.img, 0, 0);
      this.winAudio.play();
    }
  }

  drawLines(){
    const blokDim = this.dim/this.size;
    for (let i = 1; i < this.size; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(blokDim*i, 0);
      this.ctx.lineWidth = 2;
      this.ctx.lineTo(blokDim*i, this.dim);
      this.ctx.strokeStyle="#f2f2f2";
      this.ctx.stroke();
    }
    for (let j = 1; j < this.size; j++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, blokDim*j);
      this.ctx.lineWidth = 2;
      this.ctx.lineTo(this.dim, blokDim*j);
      this.ctx.strokeStyle="#f2f2f2";
      this.ctx.stroke();
    }
  }

  reset(){
    this.ctx.clearRect(0,0,this.dim,this.dim);
    this.ctx.drawImage(this.img, 0, 0);
  }
}

export default Game;
