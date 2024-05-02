function showDiv() {
    document.getElementById('instruction').style.display = "block";
 }
 function OffDiv() {
    document.getElementById('instruction').style.display = "none";
 }

let gameSeq=[];
let userSeq=[];

let btns =["yellow","red","purple","green"];
let highestscore=0;

let started = false;
let level= 0;

let h2=document.querySelector("h2");
let btn=document.querySelectorAll(".btn");
btn=document.querySelector(".start")
btn.addEventListener("click",function(){
    if(started==false){
        console.log("game started");
        started=true;

        levelUp();
    }
    
});
if (started==true){
     btn.addEventListener("click",reset());
}

restart=document.querySelector(".restart");
restart.addEventListener("click",function(){
    reset();
    h2.innerHTML=`Level ${level}`;
});


function gameFlash(btn)
{
  btn.classList.add("flash");
  setTimeout(function(){
    btn.classList.remove("flash");
  },250);
}

function userFlash(btn)
{
  btn.classList.add("userflash");
  setTimeout(function(){
    btn.classList.remove("userflash");
  },250);
}

function levelUp(){
userSeq=[];
level++;
h2.innerText =`Level ${level}`;
//random btn choose
let randIdx = Math.floor(Math.random()*3);
let randColor = btns[randIdx];
let randBtn = document.querySelector(`.${randColor}`);
// console.log(randIdx);
// console.log(randColor);
// console.log(randBtn);
gameSeq.push(randColor);
console.log(gameSeq);
gameFlash(randBtn);
}

function checkAns(idx){
if(userSeq[idx] === gameSeq[idx]){
 if(userSeq.length == gameSeq.length){
    setTimeout(levelUp(),1000);
    updatehighestscore();//.................

 }
}else{
    h2.innerHTML = `Game Over! Your score was <b>${(level-1)*5}</b>  <br> Press Start to Play Again `;
    document.querySelector("body").style.backgroundColor = "red";
    sound();
    setTimeout(function(){
     document.querySelector("body").style.backgroundColor = "white";
    },150);
    reset();
    updatehighestscore();
}
}

function sound(){
    let mySound = new Audio('bounce1.wav');
    mySound.play()
}


function btnPress(idx) {
let btn=this;
userFlash(btn);

userColor = btn.getAttribute("id");
userSeq.push(userColor);

checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}




// Highest Score
let highestScore=document.querySelector("#highest-score");
function updatehighestscore(){
    console.log(level);
    if(level>highestscore){
        highestscore=level;
        highestScore.innerText=`Highest Score:${highestscore*5}`;
        console.log(level+".");
    }
}

function reset(){
    started = false;
    gameSeq=[];
    userSeq =[];
    level =0;
    highestScore.innerText=`Highest Score:${0}`;
}