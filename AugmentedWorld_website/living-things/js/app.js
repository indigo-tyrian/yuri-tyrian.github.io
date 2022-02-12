const sleep = waitTime => new Promise(resolve => setTimeout(resolve, waitTime));
let counter = 1;
const prev = document.querySelector("#cta_prev-btn");
const next = document.querySelector("#cta_next-btn");
let nav = document.querySelector(".cta .slider_nav");
let btn = Array.from(nav.children);
let slideText = document.querySelectorAll(".slide_text");
const sliderlist = document.querySelector(".cta_slider");
const cta = document.querySelector(".cta");
const slideIndividual = document.querySelectorAll(".slide");
let winWidth2 = (screen.width);
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
  
  // if (window.matchMedia("(max-width: 480px)").matches) {
  //   currentTransValue = (-winWidth2 * counter);
  //   sliderlist.style.transform = "translateX(" + currentTransValue + "px)";
  // } else {
    currentTransValue = (-winWidth * counter);
      sliderlist.style.transform = "translateX(" + currentTransValue + "px)";
    }
  
// } 

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
    slideBgChange(counter);
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
    sliderWidthHalf = (sliderlist.offsetWidth)/6/4;
    mouseDown = false
    mouseReleasePos = e.clientX
    mouseWhich = mouseReleasePos - mouseDownPos;
    
    if (-sliderWidthHalf<= mouseWhich && mouseWhich<=sliderWidthHalf ) {
      transitionOn();
      slide();
    } else if (mouseWhich<-sliderWidthHalf) {
      // console.log('left');
      transitionOn();
      counter++;
      btnColorChange();
      slide();
      slideBgChange(counter)
      if (counter == 5) {
        flip(1)
      };
      
      textAnimationPrev();
    }
    else if (sliderWidthHalf < mouseWhich) {
      transitionOn();
      counter--;
      btnColorChange();
      slide();
      slideBgChange(counter);
      
      if (counter == 0) {
        flip(4)
      };
      textAnimationNext();
  };   
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
    slideBgChange(counter)
    btnColorChange();
    textAnimationNext();
    if (counter == 5) {
      flip(1)
    };
  }


  if(!navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)){
// const cta = document.querySelector('.cta');

cta.addEventListener('mouseover', async() => {
  clearInterval(interval);
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


const slideTopic = () => {
  currentTransValueTopic = (-winWidthTopic * counterTopic);
  sliderlistTopic.style.transform = "translateX(" + currentTransValueTopic + "px)";
} 

const flipTopic = async (i) => {
  await sleep(500);
  sliderlistTopic.style.transition = "unset"; 
  counterTopic = i;
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
    sliderWidthHalfTopic = (sliderlistTopic.offsetWidth)/6/4;
    mouseDownTopic = false
    mouseReleasePosTopic = e.clientX
    mouseWhichTopic = mouseReleasePosTopic - mouseDownPosTopic;
    
    if (-sliderWidthHalfTopic<= mouseWhichTopic && mouseWhichTopic<=sliderWidthHalfTopic ) {
      // console.log('stay');
      transitionOnTopic();
      slideTopic();
    } else if (mouseWhichTopic<-sliderWidthHalfTopic) {
      // console.log('left');
      transitionOnTopic();
      counterTopic++;
      btnColorChangeTopic();
      slideTopic();
      if (counterTopic == 5) {
        flipTopic(1)
      };
      
    }
    else if (sliderWidthHalfTopic < mouseWhichTopic) {
      // console.log('right');
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









// KIND
const kindVideo = document.querySelectorAll('.kind video');
const kindBox = document.querySelectorAll('.kind .box');
const kindOverlay = document.querySelectorAll('.kind-overlay');


// 

kindOverlay.forEach((e, i) => {
    
  if (window.matchMedia("(max-width: 480px)").matches) { 
    return
  }

    e.addEventListener('mouseover', () => {
      kindVideo[i].style.opacity = '100';
      kindBox[i].style.border = 'white solid .3vw'
      kindBox[i].style.transform = 'scale(1.1)'
      kindVideo[i].play();
      console.log('iii')

    });
    e.addEventListener('mouseout', () => {
      kindVideo[i].style.opacity = '0';
      kindBox[i].style.border = 'gray solid .3vw'
      kindBox[i].style.transform = 'scale(1)'
      kindVideo[i].pause();
      kindVideo[i].currentTime = 0;
    });
  })










// HABITAT
const habitatBox = document.querySelectorAll('.habitat .box');
const habitatImg = document.querySelectorAll('.habitat img');
const habitatOverlay = document.querySelectorAll('.habitat .overlay');

if (window.matchMedia("(min-width: 480px)").matches) {

  habitatBox.forEach((e, i) => {
    e.addEventListener('mouseover', () => {
      habitatImg[i].style.transform = 'scale(1)'
    });

    e.addEventListener('mouseout', () => {
      habitatImg[i].style.transform = 'scale(1.1)'
    });

    e.addEventListener('mouseover', () => {
      habitatOverlay[i].style.opacity = '0.3'
    });
  
    e.addEventListener('mouseout', () => {
      habitatOverlay[i].style.opacity = '0'
    });
  });
}







  










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
}, { passive: false }
);

sliderlist.addEventListener('touchmove', (e) => {
  if (!isTouching)
    return;
    e.preventDefault();
    touchMovePos = e.touches[0].pageX;
    touchRelate = touchMovePos - touchStartPos;
  sliderlist.style.transform = "translateX(" + (parseInt(touchRelate) + parseInt(currentTransValue)) + "px)";
}, {passive: false});

sliderlist.addEventListener(
  'touchend', (e) => {
    if (!isTouching)
    return;
    isTouching = false;
  // e.preventDefault();[]

  
    sliderlist.style.transition = '0.3s';
      sliderWidthHalf = (sliderlist.offsetWidth)/6/5;
      touchEndPos = e.changedTouches[0].pageX;
      touchWhich = touchEndPos - touchStartPos;
      
      if (-sliderWidthHalf<= touchWhich && touchWhich<=sliderWidthHalf ) {
        // console.log('stay');
        transitionOn();
        slide();
      } else if (touchWhich<-sliderWidthHalf) {
        // console.log('left');
        transitionOn();
        counter++;
        btnColorChange();
        slide();
        slideBgChange(counter);
        if (counter == 5) {
          flip(1)
        };       
        textAnimationPrev();
      }
      else if (sliderWidthHalf < touchWhich) {
        transitionOn();
        counter--;
        btnColorChange();
        slide();
        slideBgChange(counter);
        
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
}, { passive: false }
);

sliderlistTopic.addEventListener('touchmove', (e) => {
  if (!isTouchingTopic)
    return;
    e.preventDefault();
    touchMovePosTopic = e.touches[0].pageX;
    touchRelateTopic = touchMovePosTopic - touchStartPosTopic;
  sliderlistTopic.style.transform = "translateX(" + (parseInt(touchRelateTopic) + parseInt(currentTransValueTopic)) + "px)";
}, {passive: false});

sliderlistTopic.addEventListener(
  'touchend', (e) => {
    if (!isTouchingTopic)
    return;
    isTouchingTopic = false;
  // e.preventDefault();[]

  
    sliderlistTopic.style.transition = '0.3s';
      sliderWidthHalfTopic = (sliderlistTopic.offsetWidth)/6/5;
      touchEndPosTopic = e.changedTouches[0].pageX;
      touchWhichTopic = touchEndPosTopic - touchStartPosTopic;
      
      if (-sliderWidthHalfTopic<= touchWhichTopic && touchWhichTopic<=sliderWidthHalfTopic ) {
        transitionOnTopic();
        slideTopic();
      } else if (touchWhichTopic<-sliderWidthHalfTopic) {
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





// LANGUAGE


  window.onload = function() { 
    // --- ブラウザのデフォルト言語を取得して初回の表示 ----- 
    var wDef = (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2);
    langSet(wDef);
   
  }
   // =========================================================
   //      選択された言語のみ表示
   // =========================================================
  function langSet(argLang){
   
    // --- 切り替え対象のclass一覧を取得 ----------------------
    var elm = document.getElementsByClassName("langCng");
   
    for (var i = 0; i < elm.length; i++) {
   
      // --- 選択された言語と一致は表示、その他は非表示 -------
      if(elm[i].getAttribute("lang") == argLang){
        elm[i].style.display = '';
      }
      else{
        elm[i].style.display = 'none';
      }
    }
  }









  // svg
let mapPath = document.getElementsByTagName('path');
const stalker2 = document.getElementById('country-name_container');
// console.log(ele[2].classList.value);
// console.log(ele[0].getAttribute("name"));

// let len = document.getElementsByTagName('path').length;
// console.log(len);


const getCountryName = (mapMouseOver) => {
    var countryName = mapMouseOver.getAttribute("class");
  if (countryName ==null ) {
    countryName =mapMouseOver.getAttribute("name");
  }
  console.log(countryName);
  document.getElementById('country-name').innerText=(countryName);
}

Array.from(mapPath).forEach(e => {
  e.addEventListener("mouseover", () => (
    getCountryName(e)
  ))
  e.addEventListener("touchstart", () => (
    getCountryName(e)
    // stalker2.classList.add("center")

  ))

})

 
if (window.matchMedia("(min-width: 480px)").matches) {
  document.addEventListener('mousemove', function (e) {
    stalker2.style.transform = 'translate(' + (e.clientX) + 'px, ' + (e.clientY) + 'px)';
  });
}