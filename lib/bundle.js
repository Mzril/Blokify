/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/blokify.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/blokify.js":
/*!************************!*\
  !*** ./lib/blokify.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./lib/game.js");
/* harmony import */ var _board_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board.js */ "./lib/board.js");
/* harmony import */ var _camvas_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./camvas.js */ "./lib/camvas.js");




document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
  const eights = document.getElementById("8");
  const fifteens = document.getElementById("15");
  const reset = document.getElementById("reset");
  const changephoto = document.getElementById("changephoto");
  const userphoto = document.getElementById("userphoto");
  const modalopen = document.getElementById("modal-open");
  const modalclose = document.getElementById("modal-close");
  const modal = document.getElementById("modal");
  const photo = document.getElementById("photo");
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
  let pictureAudio = new Audio('assets/audio/cameraclick.wav');
  let cameraAudio = new Audio('assets/audio/camerastart.wav');

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
    brd = new _board_js__WEBPACK_IMPORTED_MODULE_1__["default"](3);
    game = new _game_js__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, brd, puzzleImage);
    game.drawBloks();
    startAudio.play();
    window.addEventListener("keydown", handleKey);
  });

  fifteens.addEventListener("click", ()=>{
    window.removeEventListener('keydown', handleKey);
    brd = new _board_js__WEBPACK_IMPORTED_MODULE_1__["default"](4);
    game = new _game_js__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, brd, puzzleImage);
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

  let initialized = false;
  let uservideo;
  let myCamvas;
  userphoto.addEventListener("click", ()=>{
    window.removeEventListener('keydown', handleKey);
    streaming = true;
    ctx.clearRect(0,0,600,600);
    let draw = function(video, dt) {
      uservideo = video;
      ctx.drawImage(video, 0, 0, 600, 600);
    };
    if(initialized === false){
      myCamvas = new _camvas_js__WEBPACK_IMPORTED_MODULE_2__["camvas"](ctx, draw);
      initialized = true;
    }else{
      uservideo.play();
      myCamvas.update();
    }
    cameraAudio.play();
    function derp(){
      let userImage = new Image();
      userImage.src = canvasEl.toDataURL();
      userImage.height = 600;
      userImage.width = 600;
      puzzleImage = userImage;
      uservideo.pause();
      streaming = false;
      pictureAudio.play();
      photo.classList.add("closed");
      photo.removeEventListener("click", derp);
    }
    photo.addEventListener("click", derp);
    photo.classList.remove("closed");
  });

  modalopen.addEventListener("click", ()=>{
    modal.classList.remove("closed");
    modal.classList.add("open");
  });

  modalclose.addEventListener("click", ()=>{
    modal.classList.remove("open");
    modal.classList.add("closed");
  });

});


/***/ }),

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Board);


/***/ }),

/***/ "./lib/camvas.js":
/*!***********************!*\
  !*** ./lib/camvas.js ***!
  \***********************/
/*! exports provided: camvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camvas", function() { return camvas; });
/*
Copyright (c) 2012 Claudio Brandolino
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


// requestAnimationFrame implementation, we just ignore it.
// My policy for experimental software is: if you don't have a
// nightly build, you don't deserve exceptions.
window.URL = window.URL || window.webkitURL;

navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               window.oRequestAnimationFrame;

// Integrate navigator.getUserMedia & navigator.mediaDevices.getUserMedia
function getUserMedia (constraints, successCallback, errorCallback) {
  if (!constraints || !successCallback || !errorCallback) {return;}

  if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia(constraints).then(successCallback, errorCallback);
  } else {
    navigator.getUserMedia(constraints, successCallback, errorCallback);
  }
}

// The function takes a canvas context and a `drawFunc` function.
// `drawFunc` receives two parameters, the video and the time since
// the last time it was called.
function camvas(ctx, drawFunc) {
  var self = this;
  this.ctx = ctx;
  this.draw = drawFunc;

  // We can't `new Video()` yet, so we'll resort to the vintage
  // "hidden div" hack for dynamic loading.
  var streamContainer = document.createElement('div');
  this.video = document.createElement('video');

  // If we don't do this, the stream will not be played.
  // By the way, the play and pause controls work as usual
  // for streamed videos.
  this.video.setAttribute('autoplay', '1');

  // The video should fill out all of the canvas
  this.video.setAttribute('width', this.ctx.canvas.width);
  this.video.setAttribute('height', this.ctx.canvas.height);

  this.video.setAttribute('style', 'display:none');
  streamContainer.appendChild(this.video);
  document.body.appendChild(streamContainer);

  // The callback happens when we are starting to stream the video.
  getUserMedia({video: true}, function(stream) {
    // Yay, now our webcam input is treated as a normal video and
    // we can start having fun
    self.video.srcObject = stream;
    // self.video.src = window.URL.createObjectURL(stream);
    // Let's start drawing the canvas!
    self.update();
  }, function(err){
    throw err;
  });

  // As soon as we can draw a new frame on the canvas, we call the `draw` function
  // we passed as a parameter.
  this.update = function() {
    var self = this;
    var last = Date.now();
    var loop = function() {
      // For some effects, you might want to know how much time is passed
      // since the last frame; that's why we pass along a Delta time `dt`
      // variable (expressed in milliseconds)
      if(window.streaming === false){
        return null;
      }
      var dt = Date.now - last;
      self.draw(self.video, dt);
      last = Date.now();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  };
}




/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map