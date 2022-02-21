const scrollUp = document.querySelector('.scroll-up');
let isTouching = false;
let touchStartPosX = scrollUp.clientX;
let touchStartPosY = scrollUp.clientY;
let touchMovePosX = 0;
let touchEndPos = 0;
let touchWhich = 0; 
let winHight = document.body.clientHeight;
let currentTransValue = winHight;
let bigImg = document.querySelector('.big-img');

    

  
  scrollUp.addEventListener('touchstart', (e) => {
    isTouching = true;
    // e.preventDefault();
    touchStartPosX = e.touches[0].pageX;
    touchStartPosY = e.touches[0].pageY;
  }, { passive: false }
  );
  
  scrollUp.addEventListener('touchmove', (e) => {
    if (!isTouching)
      return;
      touchMovePosX = e.touches[0].pageX;
      touchMovePosY = e.touches[0].pageY;
      touchRelateX = touchMovePosX - touchStartPosX;
      touchRelateY = touchMovePosY - touchStartPosY;
      scrollUp.style.transform = "translateY(" + (parseInt(touchRelateY)) + "px)";
    bigImg.style.transform = "scale(" + (parseInt(-touchRelateY)) /1.2+ "%)";
  }, {passive: false});
  
  scrollUp.addEventListener(
    'touchend', (e) => {
      if (!isTouching)
      return;
      isTouching = false;
    // e.preventDefault();[]
  
    
    scrollUp.style.transition = '0.3s';
        sliderWidthHalf = (scrollUp.offsetWidth)/6/10;
        touchEndPos = e.changedTouches[0].pageX;
        touchWhich = touchEndPos - touchStartPosX;
        
        if (-sliderWidthHalf<= touchWhich && touchWhich<=sliderWidthHalf ) {
          console.log('stay');
        } else if (touchWhich<-sliderWidthHalf) {
          console.log('left');

        }
        else if (sliderWidthHalf < touchWhich) {

      };   
  });

<style>
  .scroll-up{
    position: absolute;
    background-color: aquamarine;
    border-top: 10%;
    z-index: 100;
    transform: matrix(1,0,0,1,0,0);
  }
  </style>