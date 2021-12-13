


//Create category -------------------------------------------------------


const catName = document.getElementById('catName');

const catBtn = document.getElementById('catBtn');

const catWrap = document.getElementById('catWrap');

catName.addEventListener('click', createNewCat)

catBtn.addEventListener('click', createNewCat)



function createNewCat(e) {
  if (e.target.id == 'catBtn' && e.target.innerHTML == 'Save') {
    post(catNameValue.value, '/content/createcat')
    spanReset(e)
  } else {
    spanSwitch(e)
  }

}




function spanSwitch(e) {
  let txt = e.innerText;
  catName.innerHTML = `<input id="catNameValue" type="text"value='' />`;
  catBtn.innerHTML = 'Save'
  document.getElementsByTagName('input')[0].focus();
}

function spanReset(e) {
  let txt = 'Create new category';



  catName.innerHTML = `<span id="catName"> ${txt} </span>`;
  catBtn.innerHTML = 'Create'
}




// Create box -----------------------------------------------------------


let boxname = document.querySelectorAll('.boxname')
let boxnamebtn = document.querySelectorAll('.boxnamebtn')


boxnamebtn.forEach(btn => {
  btn.addEventListener('click', createNewBox)
})


function createNewBox(e) {


  let data = {
    id: this.parentElement.parentElement.parentElement.id,
    value: this.parentElement.getElementsByTagName('input')[0].value
  }

  post(data, '/content/createbox')
}


// Box ------------------------------------------------------------------






let arrows = document.querySelectorAll('.arrow')

arrows.forEach(arrow => {


  arrow.addEventListener('click', (e) => {
    e.preventDefault()

    console.log(e.target.parentElement.parentElement.parentElement);
    console.log();

    let form = e.target.parentElement.parentElement.parentElement.querySelector('.saveContent')

    if (e.target.style.transform == 'rotate(180deg)') {
      e.target.style.transform = 'rotate(0deg)'
      form.style.display = 'none';
    } else {
      e.target.style.transform = 'rotate(180deg)'
      form.style.display = 'block';
    }


  })
})








// Save content ---------------------------------------------------------

/*
let saveContentBtn = document.querySelectorAll('.saveContent')

saveContentBtn.forEach(btn => {

  btn.addEventListener('click', (e) => {
    console.log(e.target.parentElement);
    saveContent(e.target.parentElement)
  })
})
*/

/*
let saveContentForm = document.querySelectorAll('.saveContent')

saveContentForm.forEach(form => {

  e.preventDefault();

  form.addEventListener('submit', (e) => {

    console.log(form.parentElement.parentElement.parentElement.id);
    let elements = form.querySelectorAll('input, textarea, select');
    console.log(elements);


    let values = {
      boxId: form.parentElement.id,
      catId: form.parentElement.parentElement.parentElement.id,
      previewText: elements[0].value,
      previewImg: elements[1].value,
      action: elements[2].value,
    }


    //post(values, '/content/update/content')




  })
})
*/





//Drag and drop ---------------------------------------------------------





const draggables = document.querySelectorAll('.draggable')

const containers = document.querySelectorAll('.container')


draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', (e) => {
    if (draggable.classList.contains('box')) {
      e.stopPropagation()
    }
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', (e) => {
    if (draggable.classList.contains('box')) {
      e.stopPropagation()
    }
    draggable.classList.remove('dragging')


    const categorysNode = document.querySelectorAll('.catdraggable')
    const category = Array.from(categorysNode)

    let arr = []

    category.forEach(category => {

      let boxes = category.querySelectorAll('.box')

      boxid = []

      boxes.forEach(box => {
        boxid.push(box.id)
      });



      let obj = {
        id: category.id,
        boxes: boxid
      }
      arr.push(obj)

    });

    console.log(arr);
    post(arr, '/content/updatecatpos')

  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    if (container.classList.contains('boxcontainer')) {
      e.stopPropagation()
    }

    const draggable = document.querySelector('.dragging')

    if (container.classList[0].substring(0,3) == draggable.classList[0].substring(0,3)) {


      const afterElement = getDragAfterElement(container, e.clientY)


      if (afterElement == null) {
        container.appendChild(draggable)
      } else {
        console.log(container.classList + " : " + "(" + draggable.classList + " : " + afterElement.classList);
        //container.insertBefore(draggable, afterElement)
      }
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}






// FIX INSERT BEFORE AND BOX POS ROUTING






// Get & Post ---------------------------------------------------------
function get(url) {
  fetch('/content/company', {method: 'GET',})
  .then((response) => response.json())
  .then((responseJson) => {
    //displayCats(responseJson);
  })
  }



async function post (data, URL) {

    fetch(URL, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        data: data,
      })
    }) .then(res => {
      return res.json()
    })


}
