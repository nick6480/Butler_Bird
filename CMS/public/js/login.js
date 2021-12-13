const next = document.getElementById('next');
const previous = document.getElementById('previous');
const pageNr = document.getElementById('pageNr');
const maxPageNr = document.getElementById('maxPageNr');

const type = document.querySelectorAll('.types');


maxPageNr.innerHTML = type.length;

next.addEventListener('click', nextPage)
previous.addEventListener('click', previousPage)


function nextPage() {
  const pageNr = document.getElementById('pageNr');


  console.log(pageNr.innerHTML + 1 == type.length);
  if (pageNr.innerHTML == type.length -1 ) {


    next.setAttribute('type', 'submit');

    next.innerHTML = "Register"
  }

  if (pageNr.innerHTML <= type.length) {
    type[pageNr.innerHTML-1].style.display = 'none';
    type[pageNr.innerHTML].style.display = 'flex';


    if (pageNr.innerHTML < type.length) {
      pageNr.innerHTML++;
    }


  }
}



function previousPage() {
  const pageNr = document.getElementById('pageNr');

  if (pageNr.innerHTML > 1) {
    pageNr.innerHTML--;
    type[pageNr.innerHTML-1].style.display = 'flex';
    type[pageNr.innerHTML].style.display = 'none';


    if (pageNr.innerHTML !== type.length ) {
      next.setAttribute('type', 'button');
      next.innerHTML = "Next"
    }
  }
}
