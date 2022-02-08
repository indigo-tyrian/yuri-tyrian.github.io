const sleep = waitTime => new Promise(resolve => setTimeout(resolve, waitTime));
let counter = 1;
const prev = document.querySelector("#cta_prev-btn");
const next = document.querySelector("#cta_next-btn");
let nav = document.querySelector(".slider_nav");
let btn = Array.from(nav.children);
let slideText = document.querySelectorAll(".slide_text");
const sliderlist = document.querySelector(".cta_slider");
const slideIndividual = document.querySelectorAll(".slide");
let downX;
let upX;
// let winWidth = (window.innerWidth);
let winWidth = document.body.clientWidth;
let currentTransValue =-winWidth;

const slide = () => { 
  currentTransValue = (-winWidth * counter);
  sliderlist.style.transform = "translateX(" + currentTransValue + "px)";
} 

const flip = async (i) => {
  await sleep(500);
  sliderlist.style.transition =  "unset";
  counter = i
  slideText[i].style.transition = 'unset';
  slideText[i].style.opacity = '100';
  slideText[i].style.transform = 'translateX(0)';
  slide();
  btnColorChange();
}

const transitionOn = () => {
  // console.log('tt');
  sliderlist.style.transition = ".3s";
}

const operationInvalid = async() => {
  next.style.pointerEvents="none";
  // await sleep(1000);
  next.style.pointerEvents = "initial";
}

const btnColorChange = () => {
  btn.forEach ((e,i)=> {
    e.classList.remove("current-slide");
    if (counter-1 == i) {
      e.classList.add("current-slide");
    };
  })

  if (counter == 5) {
    btn[0].classList.add("current-slide");
  };
  if (counter == 0) {
    btn[3].classList.add("current-slide");
  };
}
 

const textAnimationPrev = async () => {
  slideText.forEach((e) => {
    e.style.transition = '0.5s ease-in-out';
    e.style.opacity = '0';
    e.style.transform = 'translateX(-50px)';
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
    e.style.transition = '0.5s ease-in-out';
    e.style.transform = 'translateX(50px)';
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
  console.log('lbbbbbbbbbbbbbbbbbbbbbbbbbbb');
  transitionOn();
  counter++;
  slide();
  btnColorChange();
  if (counter == 5) {
    flip(1)
  };
  textAnimationNext();
  // next.style.pointerEvents="none";
  // await sleep(1000);
  // next.style.pointerEvents = "initial";

});


prev.addEventListener("click", async function () {
  transitionOn();
  counter--;
  slide();
  btnColorChange();
  
  if (counter == 0) {
    flip(4)
  };
  textAnimationPrev();
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


// sliderlist.addEventListener("mousedown", (e) =>{
//   downX = e.x;
//   console.log('down')
// })


// sliderlist.addEventListener("mouseup", (e) => {
//   upX = e.x;
//   counterPrior = counter
//   nORp();
//   if (counterPrior > counter) {
//     textAnimationPrev();
//   } else if (counterPrior < counter) {
//     textAnimationNext();
//   } else {
//     return;
//   };
// });


let drag = false;
let mouseDown = false;
let mouseDownPos = 0;
let mouseMovePos = 0;
let mouseReleasePos = 0;
sliderlist.addEventListener('mousedown', (e) => {
  mouseDown = true
  mouseDownPos = e.clientX;
  // currentTransValueNum = sliderlist.style.getPropertyValue("transform").replace(/[^\d.]/g, '');
  
  console.log(currentTransValue+'rrrrrrrrrrrrrrr');

  
});
  

sliderlist.addEventListener('mousemove', (e) => {
  drag = true
  if (drag == true && mouseDown == true) {  
    mouseMovePos = e.clientX;
    mouseRelate = mouseMovePos - mouseDownPos;
    sliderWidth = (sliderlist.offsetWidth)/6;
        sliderlist.style.transform = "translateX(" + (parseInt(mouseRelate) + parseInt(currentTransValue)) + "px)";

    
    // console.log('rtrans' + (parseInt(mouseRelate) + parseInt(currentTransValue)));
    c = sliderlist.style.getPropertyValue("transform");
    console.log(',,,,,,,,,,,,,,,,,,,,,,,,,,')
    // sliderlist.style.transform = "translateX(" + parseInt(mouseRelate) + parseInt(currentTransValueNum) + "px)";
    // console.log('currentTransValue      '+currentTransValue);
    // console.log('mouseRelate            '+mouseRelate);
    // console.log('+++++++++++            ' + ((parseInt(mouseRelate) + parseInt(currentTransValue))));
    
    // console.log('currentTransValue      '+typeof(currentTransValue));
    // console.log('mouseRelate            '+typeof(mouseRelate));
    // console.log('+++++++++++            ' + typeof((parseInt(mouseRelate) + parseInt(currentTransValue)))); 
    // console.log(typeof(currentTransValueNum));
    // console.log('++++++++++'+(currentTransValueNum)+'++++++++++');
    
    
  }
});

let sliderWidth = 0;
let mouseWhich = 0;   

sliderlist.addEventListener(
  'mouseleave', (e) => {
    removeEventListener('mouseup')
  })

sliderlist.addEventListener(
  'mouseup', (e) => {
    sliderlist.style.transition = '0.3s';
    sliderWidthHalf = (sliderlist.offsetWidth)/6/3;
  console.log(sliderWidth);
  console.log(typeof(sliderWidth));

    // currentTransValue += mouseRelate
    mouseDown = false
    mouseReleasePos = e.clientX
    mouseWhich = mouseReleasePos - mouseDownPos;
    console.log(mouseWhich);
  console.log(typeof(mouseWhich));
    

    // if (mouseWhich > 0) {
    //   console.log('right')
    // } else if (mouseWhich < 0) {
    //   console.log('left')
    // }

    if (-sliderWidthHalf<= mouseWhich && mouseWhich<=sliderWidthHalf ) {
      console.log('stay');
      transitionOn();
      slide();
    } else if (mouseWhich<-sliderWidthHalf) {
      console.log('left');
      transitionOn();
      counter++;
      btnColorChange();
      slide();
      if (counter == 5) {
        flip(1)
      };
      
      textAnimationPrev();
    }
    else if (sliderWidthHalf < mouseWhich) {
      console.log('right');
      transitionOn();
      counter--;
      btnColorChange();
      slide()
      
      if (counter == 0) {
        flip(4)
      };
      textAnimationNext();
    };
    
    
});


// const nORp = async() => {
//   if ((downX - upX) > 0) {
//     counter++;
//     transitionOn();
//     slide();
//     btnColorChange();
//     if (counter == 5) {
//       flip(1)
//     };
    
//   } else if ((downX - upX) < 0) {
//     counter--;
//     transitionOn();
//     slide();
//     btnColorChange();
//     await sleep(1000);
//     if (counter == 0) {    
//       flip(4)
//     };
//   }
//   else {
//     return;
//   };
//   btnColorChange();
// };

const autoSlide = async () => {
  sliderlist.style.transition = ".3s";
  counter++;
  slide();
  btnColorChange();
  textAnimationNext();
  if (counter == 5) {
    flip(1)
  };
}

// const cta = document.querySelector('.cta');

sliderlist.addEventListener('click', () => {
  console.log('clear')
  clearInterval(autoSlide);
  autoSlide=0
  // setTimeout(setInterval(autoSlide, 3000), 5000);
})

setInterval(autoSlide, 3000);
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
