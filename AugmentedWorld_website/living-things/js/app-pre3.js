const sleep = waitTime => new Promise(resolve => setTimeout(resolve, waitTime));
let counter = 1;
const prev = document.querySelector("#cta_prev-btn");
const next = document.querySelector("#cta_next-btn");
let nav = document.querySelector(".slider_nav");
let btn = Array.from(nav.children);
let slideText = document.querySelectorAll(".slide_text");
const sliderlist = document.querySelector(".cta_slider");
let downX;
let upX;


const slide = () => {
  console.log('wwwwww');
  sliderlist.style.transform = "translateX(" + (-100/6 * counter) + "%)";
} 

const flip = async (i) => {
  sliderlist.style.transition =  "unset";
  counter = i
  slideText[i].style.transition = 'unset';
  slideText[i].style.opacity = '100';
  slideText[i].style.transform = 'translateX(0)';
  slide();
  btnColorChange();
}

const transitionOn = () => {
  console.log('tt');
  sliderlist.style.transition = ".3s";
}

const operationInvalid = async() => {
  next.style.pointerEvents="none";
  await sleep(1000);
  next.style.pointerEvents = "initial";
}

const btnColorChange = () => {
  for (let i = 0; i <4 ; i++) {
    btn[i].classList.remove("current-slide");
  }

  for (let i = 0; i < 4; i++) {
    if (counter-1 == i) {
      btn[i].classList.add("current-slide");
    };
  }
  if (counter == 5) {
    btn[0].classList.add("current-slide");
  };
  if (counter == 0) {
    btn[3].classList.add("current-slide");
  };
}
 

const textAnimationPrev = async () => {
  slideText.forEach((e) => {
    e.style.transition = '1.2s ease-in-out';
    e.style.opacity = '0';
    e.style.transform = 'translateX(-60px)';
  });
  

  slideText.forEach(async (e, i) => {
    if (counter == i) {
      e.style.opacity = '100';
      e.style.transform = 'translateX(0)';
    }
  });
}

const textAnimationNext = async () => {
  slideText.forEach((e) => {
    e.style.transition = '1.2s ease-in-out';
    e.style.transform = 'translateX(60px)';
    e.style.opacity = '0';
  });
    
  slideText.forEach((e, i) => {
    if (counter == i) {
      e.style.opacity = '100';
      e.style.transform = 'translateX(0)';
    }
  });
};



next.addEventListener("click", async function () {
   console.log(counter);
  transitionOn();
  counter++;
  slide();
  console.log('uuuu')
  btnColorChange();
  textAnimationNext();
  next.style.pointerEvents="none";
  await sleep(1000);
  next.style.pointerEvents = "initial";
  if (counter == 5) {
    flip(1)
  };
});


prev.addEventListener("click", async function () {
  transitionOn();
  counter--;
  slide();
  btnColorChange();
  textAnimationPrev();
  prev.style.pointerEvents="none";
  await sleep(1000);
  prev.style.pointerEvents = "initial";
  if (counter == 0) {
    flip(4)
  };
});


btn.forEach((content, i) => {
  btn[i].addEventListener('click', () => {
    counterPrior=counter
    counter = i + 1;
    transitionOn();
    slide();
    btnColorChange();

    if (counterPrior > counter) {
      textAnimationPrev();
    } else{
      textAnimationNext();
    }
  });
});


sliderlist.addEventListener("mousedown", (e) =>{
  downX = e.x;
  console.log('down')
})


sliderlist.addEventListener("mouseup", (e) => {
  upX = e.x;
  counterPrior = counter
  nORp();
  if (counterPrior > counter) {
    textAnimationPrev();
  } else if (counterPrior < counter) {
    textAnimationNext();
  } else {
    return;
  };
});


const nORp = async() => {
  if ((downX - upX) > 0) {
    counter++;
    transitionOn();
    slide();
    btnColorChange();
    if (counter == 5) {
      await sleep(1000);
      flip(1)
    };
    
  } else if ((downX - upX) < 0) {
    counter--;
    transitionOn();
    slide();
    btnColorChange();
    await sleep(1000);
    if (counter == 0) {
      
      flip(4)
    };
  }
  else {
    return;
  };
  btnColorChange();
};

const autoSlide = async () => {
  sliderlist.style.transition = ".3s";
  counter++;
  slide();
  btnColorChange();
  textAnimationNext();
  next.style.pointerEvents = "none";
  await sleep(1000);
  next.style.pointerEvents = "initial";
  if (counter == 5) {
    flip(1)
  };
}

// const cta = document.querySelector('.cta');

// cta.addEventListener('click', () => {
//   setInterval(autoSlide, 7000);
// })

// setInterval(autoSlide, 3000);
slide();
textAnimationNext();





// TOPIC
let counterTopic = 1;
const prevTopic = document.querySelector("#topic_prev-btn");
const nextTopic = document.querySelector("#topic_next-btn");
let navTopic = document.querySelector(".topic-left .slider_nav");
let btnTopic = Array.from(navTopic.children);
let slideTextTopic = document.querySelectorAll(".topic-left .slide_text");
const sliderlistTopic = document.querySelector(".topic-left .slider");
let downXTopic;
let upXTopic;



const slideTopic = () => {
  sliderlistTopic.style.transform = "translateX(" + (-100/6 * counterTopic) + "%)";
} 

const flipTopic = async (i) => {
  sliderlistTopic.style.transition =  "unset";
  counterTopic = i
  slideTextTopic[i].style.transition = 'unset';
  slideTextTopic[i].style.opacity = '100';
  slideTextTopic[i].style.transform = 'translateX(0)';
  slideTopic();
  btnColorChangeTopic();
}

const transitionOnTopic = () => {
  sliderlistTopic.style.transition = ".3s";
}

const btnColorChangeTopic = () => {
  for (let i = 0; i <4 ; i++) {
    btnTopic[i].classList.remove("current-slide");
  }

  for (let i = 0; i < 4; i++) {
    if (counterTopic-1 == i) {
      btnTopic[i].classList.add("current-slide");
    };
  }
  if (counterTopic == 5) {
    btnTopic[0].classList.add("current-slide");
  };
  if (counterTopic == 0) {
    btnTopic[3].classList.add("current-slide");
  };

}

nextTopic.addEventListener("click", async function () {
  transitionOnTopic();
  counterTopic ++;
  slideTopic();
  btnColorChangeTopic();
  nextTopic.style.pointerEvents="none";
  await sleep(1000);
  nextTopic.style.pointerEvents = "initial";
  if (counterTopic == 5) {
    flipTopic(1)
  };
});

prevTopic.addEventListener("click", async function () {
  transitionOnTopic();
  counterTopic--;
  slideTopic();
  btnColorChangeTopic();
  prevTopic.style.pointerEvents="none";
  await sleep(1000);
  prevTopic.style.pointerEvents = "initial";
  if (counterTopic == 0) {
    flipTopic(4)
  };
});

btnTopic.forEach((content, i) => {
  btnTopic[i].addEventListener('click', () => {
    counterTopic = i + 1;
    transitionOnTopic();
    slideTopic();
    btnColorChangeTopic();
  });
});


sliderlistTopic.addEventListener("mousedown", (e) =>
{
  downXTopic = e.x;
})


sliderlistTopic.addEventListener("mouseup", (e) => {
  upXTopic = e.x;
  nORpTopic();
});


const nORpTopic = async() => {
  if ((downXTopic - upXTopic) > 0) {
    counterTopic ++;
    transitionOnTopic();
    slideTopic();
    btnColorChangeTopic();
    if (counterTopic == 5) {
      await sleep(1000);
      flipTopic(1)
    };
    button.removeEventListener('mouseup',);
    
  } else if ((downXTopic - upXTopic) < 0) {
    counterTopic--;
    transitionOnTopic();
    slideTopic();
    btnColorChangeTopic();
    await sleep(1000);
    if (counterTopic == 0) {
      
      flipTopic(4)
    };
    button.removeEventListener('mouseup',);
  }
  else {
    return;
  };
  btnColorChangeTopic();
};

slideTopic();

var video = document.querySelector('video');
video.controls = false;





// HABITAT
const habitatBox = document.querySelectorAll('.habitat .box');
const habitatImg = document.querySelectorAll('.habitat img');
const habitatOverlay = document.querySelectorAll('.habitat .overlay');

habitatBox.forEach((e, i) => {
  e.addEventListener('mouseover', () => {
    habitatImg[i].style.transform='scale(1)'
  });

  e.addEventListener('mouseout', () => {
    habitatImg[i].style.transform='scale(1.1)'
  });

 e.addEventListener('mouseover', () => {
   habitatOverlay[i].style.opacity = '0.3'   
 });
  
 e.addEventListener('mouseout', () => {
  habitatOverlay[i].style.opacity = '0'   
 });
});
  




// habitatBox.forEach((e) => {
//   e.addEventListener('mouseover', () => {
//     e.style.opacity = '0.3'

    
//   });
// });
  
// habitatImg.forEach((e) => {
//   e.addEventListener('mouseover', () => {
//     e.style.transform='scale(1.2)'
//   });
// });


const kindVideo = document.querySelectorAll('.kind video');
const kindBox = document.querySelectorAll('.kind .box');
const kindText = document.querySelectorAll('.kind .text');
// kindBox.forEach((e, i) => {
//   e.addEventListener('mouseover', () => {
//     kindVideo[i].style.opacity = '100'
//   });
//   e.addEventListener('mouseout', () => {
//     kindVideo[i].style.opacity = '0'
//   });
// })

kindText.forEach((e, i) => {
  e.addEventListener('mouseover', () => {
    kindVideo[i].style.opacity = '100';
    kindBox[i].style.border='white solid .3vw'
    kindBox[i].style.transform='scale(1.1)'
    kindVideo[i].play();

  });
  e.addEventListener('mouseout', () => {
    kindVideo[i].style.opacity = '0';
    kindBox[i].style.border='gray solid .3vw'
    kindBox[i].style.transform='scale(1)'
    kindVideo[i].pause();
    kindVideo[i].currentTime = 0;
  });
})
