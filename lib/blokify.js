import Game from './game.js';
import Board from './board.js';
import {camvas} from './camvas.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  const eights = document.getElementById("8");
  const fifteens = document.getElementById("15");
  const reset = document.getElementById("reset");
  const changephoto = document.getElementById("changephoto");
  const userphoto = document.getElementById("userphoto");
  window.streaming = false;

  let img1 = new Image();
  img1.src = "assets/images/bigx.png";
  let img3 = new Image();
  img3.src = "assets/images/smashing.jpg";
  let img4 = new Image();
  img4.src = "assets/images/Kfc.png";
  let img5 = new Image();
  img5.src = "assets/images/controller.png";
  let imgArray = [img1, img3, img4, img5];
  let puzzleImage = imgArray[Math.floor(Math.random() * imgArray.length)];
  let startAudio = new Audio('assets/audio/shake.wav');
  let swapAudio = new Audio('assets/audio/swap.wav');

  puzzleImage.onload = ()=>{
    ctx.clearRect(0,0,600,600);
    ctx.drawImage(puzzleImage, 0,0);
  };

  function handleKey (event){
    brd.makeMove(event.key);
    game.drawBloks();
    if(brd.solved()){
      window.removeEventListener("keydown", handleKey);
    }
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
    startAudio.play();
  });

  changephoto.addEventListener("click", ()=>{
    window.removeEventListener('keydown', handleKey);
    let newImage = imgArray[Math.floor(Math.random() * imgArray.length)];
    while(imgArray.indexOf(newImage) === imgArray.indexOf(puzzleImage)){
      newImage = imgArray[Math.floor(Math.random() * imgArray.length)];
    }
    ctx.clearRect(0,0,600,600);
    ctx.drawImage(newImage, 0 ,0);
    puzzleImage = newImage;
    swapAudio.play();
  });

  userphoto.addEventListener("click", ()=>{
    window.removeEventListener('keydown', handleKey);
    streaming = true;
    ctx.clearRect(0,0,600,600);
    console.log("Setting up webcam");
    let uservideo;
    let draw = function(video, dt) {
      uservideo = video;
      ctx.drawImage(video, 0, 0, 600, 600);
    };
    let myCamvas = new camvas(ctx, draw);
    function derp(){
      let userImage = new Image();
      userImage.src = canvasEl.toDataURL();
      userImage.height = 600;
      userImage.width = 600;
      puzzleImage = userImage;
      uservideo.pause();
      streaming = false;
      canvasEl.removeEventListener("click", derp);
    }
    canvasEl.addEventListener("click", derp);
  });

});
