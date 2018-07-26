import Game from './game.js';
import Board from './board.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  const eights = document.getElementById("8");
  const fifteens = document.getElementById("15");
  const reset = document.getElementById("reset");
  const changephoto = document.getElementById("changephoto");
  const userphoto = document.getElementById("userphoto");

  let img1 = new Image();
  img1.src = "assets/images/bigx.png";
  let img2 = new Image();
  img2.src = "assets/images/godiva.jpg";
  let img3 = new Image();
  img3.src = "assets/images/smashing.jpg";
  let imgArray = [img1, img2, img3];
  let puzzleImage = imgArray[Math.floor(Math.random() * imgArray.length)];
  let startAudio = new Audio('assets/audio/shake.wav');

  puzzleImage.onload = ()=>{
    ctx.clearRect(0,0,600,600);
    ctx.drawImage(puzzleImage, 0,0);
  };

  function handleKey (event){
    brd.makeMove(event.key);
    game.drawBloks();
  }

  let brd;
  let game;
  eights.addEventListener("click", ()=>{
    window.removeEventListener('keydown', handleKey);
    brd = new Board(3);
    game = new Game(ctx, brd, puzzleImage);
    game.drawBloks();
    startAudio.play();
    window.addEventListener("keydown", handleKey);
  });

  fifteens.addEventListener("click", ()=>{
    window.removeEventListener('keydown', handleKey);
    brd = new Board(4);
    game = new Game(ctx, brd, puzzleImage);
    game.drawBloks();
    startAudio.play();
    window.addEventListener("keydown", handleKey);
  });

  reset.addEventListener("click", ()=>{
    window.removeEventListener('keydown', handleKey);
    if(game != undefined){
      game.reset();
    }
  });

  changephoto.addEventListener("click", ()=>{
    window.removeEventListener('keydown', handleKey);
    console.log("Changing photo");
    const newImage = imgArray[Math.floor(Math.random() * imgArray.length)];
    ctx.drawImage(newImage, 0 ,0);
    puzzleImage = newImage;
  });

  userphoto.addEventListener("click", ()=>{
    window.removeEventListener('keydown', handleKey);
    console.log("Setting up webcam");
  });

  // game.start();
});
