

// Score

let score = 0;


// Mole objects
const moles = [
  {
    status: "sad",
    next: getInterval(),
    king: false,
    node: document.querySelector("#hole-0"),
  },
  {
    status: "sad",
    next: getInterval(),
    king: false,
    node: document.querySelector("#hole-1"),
  },
  {
    status: "sad",
    next: getInterval(),
    king: false,
    node: document.querySelector("#hole-2"),
  },
  {
    status: "sad",
    next: getInterval(),
    king: false,
    node: document.querySelector("#hole-3"),
  },
  {
    status: "sad",
    next: getInterval(),
    king: false,
    node: document.querySelector("#hole-4"),
  },
  {
    status: "sad",
    next: getInterval(),
    king: false,
    node: document.querySelector("#hole-5"),
  },
  {
    status: "sad",
    next: getInterval(),
    king: false,
    node: document.querySelector("#hole-6"),
  },
  {
    status: "sad",
    next: getInterval(),
    king: false,
    node: document.querySelector("#hole-7"),
  },
  {
    status: "sad",
    next: getInterval(),
    king: false,
    node: document.querySelector("#hole-8"),
  },
  {
    status: "sad",
    next: getInterval(),
    king: false,
    node: document.querySelector("#hole-9"),
  },
];

// Getting the time interval for between states
function getInterval() {
  return Date.now() + 1000;
}


// RequestAnimationFrame 

let runAgainAt = Date.now()+100;

function nextFrame() {

  const now = Date.now();

if(runAgainAt <= now) {

  for(let i=0; i < moles.length; i++) {

    if(moles[i].next <= now ) {
      getNextStatus(moles[i]);
    }
  }
  runAgainAt = now + 100;
}
requestAnimationFrame(nextFrame);
}

nextFrame();

function getNextStatus(mole) {

  switch(mole.status) {

    case 'sad':
    case 'fed':
      mole.next = getInterval();
      mole.status = 'leaving';    
      if(mole.king) {
        mole.node.children[0].src = './assets/images/king-mole-leaving.png';
      } else {
      mole.node.children[0].src = './assets/images/mole-leaving.png';
      }
      break;

    case 'leaving':
      mole.next = getGoneInterval();
      mole.status = 'gone';
      mole.node.children[0].classList.add('gone');
      break;

    case 'gone':
      mole.next = getHungryInterval();
      mole.status = 'hungry';
      mole.king = getKingStatus();
      if(mole.king) {
        mole.node.children[0].src = './assets/images/king-mole-hungry.png';
      } else {
      mole.node.children[0].src = './assets/images/mole-hungry.png';
      }
      mole.node.children[0].classList.add('hungry');
      mole.node.children[0].classList.remove('gone');
     
      break;

    case 'hungry':
      mole.next = getInterval();
      mole.status = 'sad';      
      if(mole.king) {
        mole.node.children[0].src = './assets/images/king-mole-sad.png';
      } else {
      mole.node.children[0].src = './assets/images/mole-sad.png';
      }
      break;

  }


}

function getGoneInterval() {
  return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function getHungryInterval() {
  return Date.now()+ Math.floor(Math.random() * 3000) + 2000;
}

function getKingStatus () {
  return Math.random() > .8;
}


// Event Listener

document.querySelector('.background-container').addEventListener('click', feed);

function feed(e) {
  if (e.target.tagName !== 'IMG' || !e.target.classList.contains('hungry')) {
    return;
  } 
  
  const mole = moles[parseInt(e.target.dataset.index)];

  mole.status = 'fed';
  mole.next = getInterval();
  
  if(mole.king) {
    mole.node.children[0].src = './assets/images/king-mole-fed.png';
    score += 2;
  } else {
  mole.node.children[0].src = './assets/images/mole-fed.png';
  score++;
  }
  mole.node.children[0].classList.remove('hungry');

  if(score >= 10) {
    win();
  }

  document.querySelector(".worm-container").style.width = `${10*score}%`


}

function win () {
  document.querySelector('.background-container').classList.add('hide');
  document.querySelector('.win').classList.remove('hide');
}