const sleep = waitTime => new Promise(resolve => setTimeout(resolve, waitTime));
let counter = 1;
const prev = document.querySelector("#prev-btn");
const next = document.querySelector("#next-btn");
let nav = document.querySelector(".slider_nav");
let btn = Array.from(nav.children);
let direction;


let slideText = document.querySelectorAll(".slide_text");

const flip =async (i) => {
  sliderlist.style.transition =  "1s";
  counter = i
  slideText[i].style.transition = 'unset';
  slideText[i].style.opacity = '100';
  slideText[i].style.transform = 'translateX(0)';
  slide();
  btnColorChange();
}




const textAnimationPrev = async() => {
  console.log('prev');
  // slideText.forEach((e) => {
    // console.log('start');
    // console.log(e);
    // e.style.transition = 'unset';
    // e.style.opacity = '0';
    // e.style.transform = 'translateX(-90px)';
    // e.style.color = 'black';
    // console.log("88888");
    
    
    // console.log(e);
    // console.log('finish');
    // });
    // await sleep(500);
    slideText.forEach(async(e, i) => {
      // console.log(e);
      // console.log(i+1);
      // console.log(counter);
      // if (counter == i+1) {  ---> works weirdly
      if (counter == i) {
        // slideText[i].style.opacity = '100';
        // slideText[i].style.transform = 'translateX(0)';
        slideText[i].transition = 'unset';
        slideText[i].style.color = 'black';
        slideText[i].transition = '3s';
        slideText[i].transition = 'unset';
        slideText[i].style.color = 'green';
        slideText[i].style.color = 'yellow';
        slideText[i].transition = 'unset';
        await sleep(4500         );
        slideText[i].transition = 'none';
        slideText[i].style.color = 'cyan';



        
      }
    })
  };

const textAnimationNext = async() => {
  // priorDirection = direction;
  // direction = 0;
  // if (priorDirection = direction) {

    console.log('next');
  slideText.forEach((e) => {
    e.style.transition = '5s';
      // e.style.opacity = '0';
    // e.style.transform = 'translateX(40px)';
    e.style.color = 'red';
      
    });
    // await sleep(500);
    slideText.forEach((e, i) => {
      // console.log(e);
      // console.log(i+1);
      // console.log(counter);
      if (counter == i) {
        // slideText[i].style.opacity = '100';
        slideText[i].style.color = 'white'
        // slideText[i].style.transform = 'translateX(0)';
      }
    });
  // } else {}

    
};

const slide = () => {
  sliderlist.style.transform = "translateX(" + (-100/6 * counter) + "%)";
} 

const sliderlist = document.querySelector(".cta_slider");
const sliderlist_item = document.querySelectorAll(".sliderlist__item");


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




slide();

next.addEventListener("click", async function () {
  sliderlist.style.transition = ".3s";
  counter++;
  // console.log('nextbefore'+counter);
  slide();
  btnColorChange();
  textAnimationNext();
  next.style.pointerEvents="none";
  await sleep(1300);
  next.style.pointerEvents = "initial";
  if (counter == 5) {
    flip(1)
  };
  // console.log('nextafter'+counter);
});

prev.addEventListener("click",async function(){
  sliderlist.style.transition = ".3s";
  counter--;
  // console.log('prevbefore'+counter);
  slide();
  btnColorChange();
  textAnimationPrev();
  prev.style.pointerEvents = "none";
  // await sleep(1300);
  prev.style.pointerEvents="initial";
  if (counter == 0) {
    flip(4);
  };
  // console.log('prevafter'+counter);
  
});



btn.forEach((content, i) => {
  btn[i].addEventListener('click', () => {
    counterPrior=counter
    counter = i + 1;
    sliderlist.style.transition = ".3s";
    slide();
    btnColorChange();

    if (counterPrior > counter) {
      textAnimationPrev();
    } else{
      textAnimationNext();
    }
  });
  
});

let downX;
let upX;




sliderlist.addEventListener("mousedown", (e) =>
{
  downX = e.x;
  // console.log('down', e.x, e.y);
})


sliderlist.addEventListener("mouseup", (e) => {
  upX = e.x;
  // console.log('up', e.x, e.y);
  counterPrior=counter
  nORp();
  if (counterPrior > counter) {
    textAnimationPrev();
  }else if (counterPrior < counter){
    textAnimationNext();
  }else {
    return;
  };
})


const nORp = async() => {
  // console.log(upX, downX)
  if ((downX - upX) > 0) {
    console.log('nextttttttttttttttttt');
    counter++;
    sliderlist.style.transition = ".3s";
    console.log('nexttttttt'+counter);
    slide();
    btnColorChange();
    if (counter == 5) {
      await sleep(1300);
      flip(1)
    };
    
  } else if ((downX - upX) < 0) {
    console.log('prevvvvvvvvvvvvvvvvvvv');
    counter--;
    sliderlist.style.transition = ".3s";
    console.log('perrrrrr'+counter);
    slide();
    btnColorChange();
    if (counter == 0) {
      await sleep(1300);
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
  await sleep(1300);
  next.style.pointerEvents = "initial";
  if (counter == 5) {
    flip(1)
  };
  // console.log('nextafter' + counter);
}

// setInterval(autoSlide, 3000);

// in order to add text animation from slide1 to slide(2or0) only first time 
textAnimationNext();






