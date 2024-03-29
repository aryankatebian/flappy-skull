var start_btn = document.getElementById("start");
var start = start_btn.addEventListener("click", function(event) {
  var cvs = document.getElementById("canvas");
  var ctx = cvs.getContext("2d");

  var bird = new Image();
  var bg = new Image();
  var fg = new Image();
  var pipeNorth = new Image();
  var pipeSouth = new Image();
  var scoreSound = new Audio();
  scoreSound.src = "./score.mp3";
  bird.src = "./images/bird.png ";
  bg.src = "./images/bg.gif ";
  fg.src = "./images/fg.png ";
  pipeNorth.src = "./images/pipeNorth.png ";
  pipeSouth.src = "./images/pipeSouth.png ";

  var gap = 230;
  var bY = 150;
  var bX = 10;
  var gravity = 1.5;

  document.addEventListener("click", moveUp);
  function moveUp() {
    bY -= 25;
  }
  var score = 0;
  var pipe = [];
  pipe[0] = {
    x: cvs.width,
    y: 0
  };

  function draw() {
    var constant = pipeNorth.height + gap;
    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
      ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
      ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
      pipe[i].x--;

      if (pipe[i].x == 125) {
        pipe.push({
          x: cvs.width,
          y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
        });
      }
      if (
        (bX + bird.width >= pipe[i].x &&
          bX <= pipe[i].x + pipeNorth.width &&
          (bY <= pipe[i].y + pipeNorth.height ||
            bY + bird.height >= pipe[i].y + constant)) ||
        bY + bird.height >= cvs.height
      ) {
        location.reload();
      }
      if (pipe[i].x == 5) {
        score++;
        scoreSound.play();
      }
    }
    //ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "#ff0000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
  }
  draw();
});
