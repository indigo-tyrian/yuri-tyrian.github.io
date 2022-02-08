// const y = document.getElementById('mobile-menu');


// y.addEventListener("click", function () { document.getElementsByClassName("realworld-feature_header").textContent = "rrrrrrrrrr"; alert("uuuuuuuuuuuuuuu"); });

// console.log("togger has been click");




const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar_menu')

const mobileMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);









// svg
let ele = document.getElementsByTagName('path');

console.log(ele[2].classList.value);
console.log(ele[0].getAttribute("name"));

let len = document.getElementsByTagName('path').length;
console.log(len);


let dddd = (uu) => {
    var oo = uu.getAttribute("class");
  if (oo ==null ) {
    oo =uu.getAttribute("name");
  }
  console.log(oo);
  document.getElementById('item').innerText=(oo);
}

Array.from(ele).forEach(uu => {uu.addEventListener("mouseover", ()=>(dddd(uu)))})

const stalker2 = document.getElementById('country'); 

document.addEventListener('mousemove', function (e) {
  stalker2.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});






