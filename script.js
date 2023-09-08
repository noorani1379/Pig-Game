'use strict';

//const  score0El= document.getElementById('score--0'); // اینطوری هم میشود 
const  score0El= document.querySelector('#score--0'); // تینی المنت هس El منظور از
const  score1El= document.querySelector('#score--1');
const current0El= document.getElementById('current--0');
const current1El= document.getElementById('current--1');

const player0El=document.querySelector('.player--0');
const player1El=document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, currentScore, activePlayer, gameState;

// Starting conditions
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameState = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};


init();

const switchPlayer = function(){

    document.getElementById(`current--${activePlayer}`).textContent=0;
    currentScore=0;

    activePlayer=activePlayer === 0 ? 1:0; //بالاخره هرکدوم بود عوض میشود
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');

}

score0El.textContent=score1El.textContent=0;
diceEl.classList.add('hidden')

btnRoll.addEventListener('click', function(){
    if(gameState){
        // 1. Generate a random number
    const dice= Math.floor(Math.random()*6)+1;
    //console.log(dice);
    diceEl.src=`dice-${dice}.png`;

    // 2. Display dice
    diceEl.classList.remove('hidden');

    // 3.Check for rolled :1 if true switch to next player and current is 0
    if (dice !== 1) {
        // Add dice to current score
        currentScore += dice; // currentScore = currentScore + dice

        //current0El.textContent= currentScore;
        document.getElementById(`current--${activePlayer}`).textContent= currentScore;

    }else{
        // switch to next player
        switchPlayer()
        }
    }

});

btnHold.addEventListener('click', function() {
    if(gameState){
        // 1.add current scor to active player total
       score[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent=score[activePlayer];
      // 2.check if player total >= 100
      if (score[activePlayer]>=100){
        // finish game
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        gameState=false
        diceEl.classList.add(`hidden`)
      } else{
        // switch player
        switchPlayer();
        }
    }

})

btnNew.addEventListener('click', init)