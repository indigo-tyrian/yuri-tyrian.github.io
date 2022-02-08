const sleep = waitTime => new Promise(resolve => setTimeout(resolve, waitTime));
let counter = 1;
const prev = document.querySelector("#cta_prev-btn");
const next = document.querySelector("#cta_next-btn");
let nav = document.querySelector(".slider_nav");
let btn = Array.from(nav.children);
let slideText = document.querySelectorAll(".slide_text");
const sliderlist = document.querySelector(".cta_slider");
const cta = document.querySelector(".cta");
const slideIndividual = document.querySelectorAll(".slide");
// let winWidth = (window.innerWidth);
let winWidth = document.body.clientWidth;
let currentTransValue = -winWidth;

const resizeWindow=() => {
  winWidth = document.body.clientWidth;
  currentTransValue = -winWidth;
  sliderlist.style.transition = "unset";
  slideText.forEach((e) => {
    e.style.transition = 'unset';
  })
  slide();

  winWidthTopic = document.querySelector('.topic_slider').clientWidth;
  currentTransValueTopic = -winWidthTopic;
  sliderlistTopic.style.transition =  "unset";
  slideTopic();
}

window.addEventListener('resize', resizeWindow);


let slideBg = document.querySelectorAll('.slide-bg');
const slideBgChange = (i) => {
  slideBg.forEach((e) => {
    e.style.opacity = '0';
  })
  if (i == 5){
    i=1
  } else if (i == 0) {
    i=4
  }
  slideBg[i-1].style.opacity = '100'
}




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
  transitionOn();
  counter++;
  if (counter>=6){
    return;
}
  slide();
  slideBgChange(counter);
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
  if (counter <= -1){
    return;
}
  slide();
  slideBgChange(counter);
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


let drag = false;
let mouseDown = false;
let mouseUp = false;
let mouseDownPos = sliderlist.clientX;
let mouseMovePos = 0;
let mouseReleasePos = 0;
let mouseWhich = 0; 
let isDragging = false;

sliderlist.addEventListener('mousedown', (e) => {
  isDragging = true;
  mouseDownPos = e.clientX;
  // currentTransValueNum = sliderlist.style.getPropertyValue("transform").replace(/[^\d.]/g, '');
  console.log(currentTransValue+'rrrrrrrrrrrrrrr');
});


  


sliderlist.addEventListener('mousemove', (e) => {
  // drag = true
  // if (!(drag == true && mouseDown == true))
  //   return  
  if (!isDragging)
    return;
    mouseMovePos = e.clientX;
    mouseRelate = mouseMovePos - mouseDownPos;
        sliderlist.style.transform = "translateX(" + (parseInt(mouseRelate) + parseInt(currentTransValue)) + "px)";
});

  
const mouseUpFunc = (e) => {

  if (!isDragging)
  return;
isDragging = false

  sliderlist.style.transition = '0.3s';
    sliderWidthHalf = (sliderlist.offsetWidth)/6/3;
  console.log('vvvvvvvvvvvvvvvvvvvvv');
    mouseDown = false
    mouseReleasePos = e.clientX
    mouseWhich = mouseReleasePos - mouseDownPos;
  //   console.log(mouseWhich);
  // console.log(typeof(mouseWhich));
    
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
      console.log(sliderWidthHalf);
      console.log(mouseWhich);
      transitionOn();
      counter--;
      btnColorChange();
      slide()
      
      if (counter == 0) {
        flip(4)
      };
      textAnimationNext();
  };   
  mouseReleasePos = none
  mouseDownPos=none;
}

// const cta=document.querySelector('.cta')

sliderlist.addEventListener(
  'mouseup',mouseUpFunc);

sliderlist.addEventListener(
  'mouseleave',mouseUpFunc)

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


  if(!navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)){
// const cta = document.querySelector('.cta');

cta.addEventListener('mouseover', async() => {
  // console.log('clear');
  clearInterval(interval);
  // await sleep(4000);
  //    interval=setInterval(autoSlide, 3000);
  // console.log('kkkkkkkkkkkkk'); 
})

cta.addEventListener('mouseleave', async () => {
  interval=setInterval(autoSlide, 2000)
})
  let interval = setInterval(autoSlide, 2000);
  }
slide();
textAnimationNext();





































// TOPIC
let counterTopic = 1;
const prevTopic = document.querySelector("#topic_prev-btn");
const nextTopic = document.querySelector("#topic_next-btn");
let navTopic = document.querySelector(".topic_slider .slider_nav");
let btnTopic = Array.from(navTopic.children);
let slideTextTopic = document.querySelectorAll(".topic_slider .slide_text");
const sliderlistTopic = document.querySelector(".topic_slider .slider");
let winWidthTopic = document.querySelector('.topic_slider').clientWidth;
let currentTransValueTopic =-winWidthTopic;

console.log('aaaaaaaaaaaaaaa'+currentTransValueTopic)


const slideTopic = () => {
  currentTransValueTopic = (-winWidthTopic * counterTopic);
  sliderlistTopic.style.transform = "translateX(" + currentTransValueTopic + "px)";
} 

const flipTopic = async (i) => {
  await sleep(500);
  sliderlistTopic.style.transition = "unset"; 
  counterTopic = i;
  console.log('66666' + i);
  slideTopic();
  btnColorChangeTopic();
}


// const flip = async (i) => {
//   await sleep(500);
//   sliderlist.style.transition =  "unset";
//   counter = i
//   slideText[i].style.transition = 'unset';
//   slideText[i].style.opacity = '100';
//   slideText[i].style.transform = 'translateX(0)';
//   slide();
//   btnColorChange();
// }




const transitionOnTopic = () => {
  sliderlistTopic.style.transition = ".3s";
}

const btnColorChangeTopic = () => {
    btnTopic.forEach ((e,i)=> {
      e.classList.remove("current-slide");
      if (counterTopic-1 == i) {
        e.classList.add("current-slide");
      };
    })
  if (counterTopic == 5) {
    btnTopic[0].classList.add("current-slide");
  };
  if (counterTopic == 0) {
    btnTopic[3].classList.add("current-slide");
  };

}

nextTopic.addEventListener("click", async function () {
  transitionOnTopic();
  counterTopic++;
  if (counterTopic>=6)
    return;
  slideTopic();
  btnColorChangeTopic();
  if (counterTopic == 5) {
    flipTopic(1)
  };
});




prevTopic.addEventListener("click", async function () {
  transitionOnTopic();
  counterTopic--;
  if (counterTopic <= -1)
    return;
  slideTopic();
  btnColorChangeTopic();
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


let dragTopic = false;
let mouseDownTopic = false;
let mouseDownPosTopic = 0;
let mouseMovePosTopic = 0;
let mouseReleasePosTopic = 0;
let sliderWidthTopic = 0;
let mouseWhichTopic = 0; 
let isDraggingTopic = false;

sliderlistTopic.addEventListener('mousedown', (e) => {
  isDraggingTopic = true;
  mouseDownPosTopic = e.clientX;
});
  

sliderlistTopic.addEventListener('mousemove', (e) => {
  if (!isDraggingTopic)
  return;
  // if (dragTopic == true && mouseDownTopic == true) {  
    mouseMovePosTopic = e.clientX;
    mouseRelateTopic = mouseMovePosTopic - mouseDownPosTopic;
    sliderWidthTopic = (sliderlist.offsetWidth)/6;
        sliderlistTopic.style.transform = "translateX(" + (parseInt(mouseRelateTopic) + parseInt(currentTransValueTopic)) + "px)";
});

  

// sliderlistTopic.addEventListener(
//   'mouseleave', (e) => {
//     removeEventListener('mouseup')
//   })

const mouseUpFuncTopic = (e) => {

  if (!isDraggingTopic)
  return;
isDraggingTopic = false

  sliderlistTopic.style.transition = '0.3s';
    sliderWidthHalfTopic = (sliderlistTopic.offsetWidth)/6/3;
    mouseDownTopic = false
    mouseReleasePosTopic = e.clientX
    mouseWhichTopic = mouseReleasePosTopic - mouseDownPosTopic;
    
    if (-sliderWidthHalfTopic<= mouseWhichTopic && mouseWhichTopic<=sliderWidthHalfTopic ) {
      console.log('stay');
      transitionOnTopic();
      slideTopic();
    } else if (mouseWhichTopic<-sliderWidthHalfTopic) {
      console.log('left');
      transitionOnTopic();
      counterTopic++;
      btnColorChangeTopic();
      slideTopic();
      if (counterTopic == 5) {
        flipTopic(1)
      };
      
    }
    else if (sliderWidthHalfTopic < mouseWhichTopic) {
      console.log('right');
      console.log(sliderWidthHalfTopic);
      console.log(mouseWhichTopic);
      transitionOnTopic();
      counterTopic--;
      btnColorChangeTopic();
      slideTopic()
      
      if (counterTopic == 0) {
        flipTopic(4)
      };
  };   
}

// const cta=document.querySelector('.cta')

sliderlistTopic.addEventListener(
  'mouseup',mouseUpFuncTopic);

sliderlistTopic.addEventListener(
  'mouseleave',mouseUpFuncTopic)


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








  
// KIND
const kindVideo = document.querySelectorAll('.kind video');
const kindBox = document.querySelectorAll('.kind .box');
const kindText = document.querySelectorAll('.kind .text');

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









// cta Smart Phone mode
let isTouching = false;
let touchStartPos = sliderlist.clientX;
let touchMovePos = 0;
let touchEndPos = 0;
let touchWhich = 0; 

sliderlist.addEventListener('touchstart', (e) => {
  isTouching = true;
  e.preventDefault();
  touchStartPos = e.touches[0].pageX;
  console.log('eeeeeeeee'+touchStartPos)
  console.log('eeeeeeehhhhhhhee'+currentTransValue)
}, { passive: false }
);

sliderlist.addEventListener('touchmove', (e) => {
  if (!isTouching)
    return;
    e.preventDefault();
    touchMovePos = e.touches[0].pageX;
    touchRelate = touchMovePos - touchStartPos;
  sliderlist.style.transform = "translateX(" + (parseInt(touchRelate) + parseInt(currentTransValue)) + "px)";
  console.log(touchRelate)
}, {passive: false});

sliderlist.addEventListener(
  'touchend', (e) => {
    if (!isTouching)
    return;
    isTouching = false;
  // e.preventDefault();[]

  
    sliderlist.style.transition = '0.3s';
      sliderWidthHalf = (sliderlist.offsetWidth)/6/3;
      touchEndPos = e.changedTouches[0].pageX;
      touchWhich = touchEndPos - touchStartPos;
      
      if (-sliderWidthHalf<= touchWhich && touchWhich<=sliderWidthHalf ) {
        console.log('stay');
        transitionOn();
        slide();
      } else if (touchWhich<-sliderWidthHalf) {
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
      else if (sliderWidthHalf < touchWhich) {
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
  

// Topic Smart Phone mode
let isTouchingTopic = false;
let touchStartPosTopic = sliderlistTopic.clientX;
let touchMovePosTopic = 0;
let touchEndPosTopic = 0;
let touchWhichTopic = 0; 

sliderlistTopic.addEventListener('touchstart', (e) => {
  isTouchingTopic = true;
  e.preventDefault();
  touchStartPosTopic = e.touches[0].pageX;
  console.log('eeeeeeeee'+touchStartPos)
  console.log('eeeeeeehhhhhhhee'+currentTransValue)
}, { passive: false }
);

sliderlistTopic.addEventListener('touchmove', (e) => {
  if (!isTouchingTopic)
    return;
    e.preventDefault();
    touchMovePosTopic = e.touches[0].pageX;
    touchRelateTopic = touchMovePosTopic - touchStartPosTopic;
  sliderlistTopic.style.transform = "translateX(" + (parseInt(touchRelateTopic) + parseInt(currentTransValueTopic)) + "px)";
  console.log(touchRelate)
}, {passive: false});

sliderlistTopic.addEventListener(
  'touchend', (e) => {
    if (!isTouchingTopic)
    return;
    isTouchingTopic = false;
  // e.preventDefault();[]

  
    sliderlistTopic.style.transition = '0.3s';
      sliderWidthHalfTopic = (sliderlistTopic.offsetWidth)/6/3;
      touchEndPosTopic = e.changedTouches[0].pageX;
      touchWhichTopic = touchEndPosTopic - touchStartPosTopic;
      
      if (-sliderWidthHalfTopic<= touchWhichTopic && touchWhichTopic<=sliderWidthHalfTopic ) {
        console.log('stay');
        transitionOnTopic();
        slideTopic();
      } else if (touchWhichTopic<-sliderWidthHalfTopic) {
        console.log('left');
        transitionOnTopic();
        counterTopic++;
        btnColorChangeTopic();
        slideTopic();
        if (counterTopic == 5) {
          flipTopic(1)
        };       
        textAnimationPrevTopic();
      }
      else if (sliderWidthHalfTopic < touchWhichTopic) {
        transitionOnTopic();
        counterTopic--;
        btnColorChangeTopic();
        slideTopic()
        
        if (counterTopic == 0) {
          flipTopic(4)
        };
        textAnimationNextTopic();
    };   
  });








// Nav bar Toggle
// const menu = document.querySelector('#mobile-menu');
// const menuLinks = document.querySelector('.navbar_menu')

// const mobileMenu = () => {
//   menu.classList.toggle('is-active');
//   menuLinks.classList.toggle('active');
// };

// menu.addEventListener('click', mobileMenu);