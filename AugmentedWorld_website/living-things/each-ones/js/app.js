
const descriptionExpandButton = document.querySelector('.description-expand-button');
const descriptionContainer = document.querySelector('.description-container');

let descriptionIsExpanded=false

descriptionExpandButton.addEventListener('click', (e) => {
  if (descriptionIsExpanded == false) {
    // descriptionContainer.style.height = '25vw'
    // descriptionContainer.style.height = 'auto';
    descriptionContainer.style.textOverflow= ' ellipsis'
    descriptionExpandButton.innerHTML = 'read less';
    descriptionIsExpanded=true
  } else {

    // descriptionContainer.style.height = 'auto'
    // descriptionContainer.style.height = '3vw';
    descriptionContainer.style.textOverflow= 'clip'
    descriptionExpandButton.innerHTML = 'read more';
    descriptionIsExpanded=false
  }
})

