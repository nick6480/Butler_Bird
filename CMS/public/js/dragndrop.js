

//Drag and drop ---------------------------------------------------------



const catdraggables = document.querySelectorAll('.catdraggable')
const catcontainers = document.querySelectorAll('.catcontainer')

const boxdraggables = document.querySelectorAll('.boxdraggable')
const boxcontainers = document.querySelectorAll('.boxcontainer')



function drag(dragclass, draggables, containers) {

console.log(draggables + ' : ' + containers);

draggables.forEach(draggable => {

    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging')
    })



  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
    const catagoryNode = document.querySelectorAll('.draggable')
    const categorys = Array.from(catagoryNode)

    /*
    let catId = [];

    categorys.forEach(category => {
      catId.push(category.id)

    });*/
    //console.log(catId);

    //post(catId, '/content/updatecatpos')


  })

});




  containers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault()
      const afterElement = getDragAfterElement(dragclass, container, e.clientY)
      const draggable = document.querySelector('.dragging')
      if (afterElement == null) {
        container.appendChild(draggable)
      } else {
        container.insertBefore(draggable, afterElement)
      }

    })
  });


  function getDragAfterElement(dragclass, container, y) {
    //const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    const draggableElements = [...container.querySelectorAll(`${dragclass}:not(.dragging)`)]

    console.log("peeeeeeeeeeeeeeeeppoooooooooooooo "draggableElements);

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset : offset, element : child}
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  }


}





drag('catdraggable', catdraggables,  catcontainers)


drag('boxdraggable', boxdraggables,  boxcontainers)







/*
  boxes.forEach(box => {

    box.addEventListener('mouseenter', () => {
      console.log('entered box: ' + box);

      draggables.forEach(draggable => {
        draggable.setAttribute("draggable", false);

      })
    })

      box.addEventListener('mouseleave', () => {
        console.log('left box: ' + box);


          draggables.forEach(draggable => {
            draggable.setAttribute("draggable", true);
          })
      })


  });

*/
























function drag(dragclass, draggables, containers) {

console.log(draggables + ' : ' + containers);

draggables.forEach(draggable => {

    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging')
    })



  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
    const catagoryNode = document.querySelectorAll('.draggable')
    const categorys = Array.from(catagoryNode)

    /*
    let catId = [];

    categorys.forEach(category => {
      catId.push(category.id)

    });*/
    //console.log(catId);

    //post(catId, '/content/updatecatpos')


  })

});




  containers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault()
      const afterElement = getDragAfterElement(dragclass, container, e.clientY)
      const draggable = document.querySelector('.dragging')
      if (afterElement == null) {
        container.appendChild(draggable)
      } else {
        container.insertBefore(draggable, afterElement)
      }

    })
  });


  function getDragAfterElement(dragclass, container, y) {
    //const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    const draggableElements = [...container.querySelectorAll(`${dragclass}:not(.dragging)`)]



    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset : offset, element : child}
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  }


}





drag('catdraggable', catdraggables,  catcontainers)


drag('boxdraggable', boxdraggables,  boxcontainers)





 function mouseover() {
   boxdraggables.forEach(draggable => {
     draggable.addEventListener('mouseover', (e) => {

       let descendant = isDescendant(draggable, e.target)

       console.log(descendant);

       if (descendant !== false) {
         if (descendant.classList.contains('box')) {

           console.log('box');

           //Remove category events
           catcontainers.forEach(draggable => {
             draggable.removeEventListener('dragover', containerAddEvent)

           })

           catdraggables.forEach(draggable => {
             draggable.removeEventListener('dragstart', dragAddEvents)

             draggable.removeEventListener('dragend', dragAddEvents)
             draggable.setAttribute('draggable', false)
           })




           // Add box events
           dragAddEvents(boxdraggables)
           containerAddEvent(boxdraggables)

         } else {

           console.log('not box');

           //Remove box events
           boxcontainers.forEach(draggable => {
             draggable.removeEventListener('dragover', containerAddEvent)

           })

           boxdraggables.forEach(draggable => {
             draggable.removeEventListener('dragstart', dragAddEvents)

             draggable.removeEventListener('dragend', dragAddEvents)
           })


           //Add cat events
           dragAddEvents(catdraggables)
           containerAddEvent(catcontainers)

         }
       }

     })
   });

 }






 function dragAddEvents(draggables) {
   draggables.forEach(draggable => {
   draggable.addEventListener('dragstart', () => {
     draggable.classList.add('dragging')
   })

   draggable.addEventListener('dragend', () => {
     draggable.classList.remove('dragging')
   })
 })
 }



 dragAddEvents(catdraggables)




 function containerAddEvent(containers) {
   containers.forEach(container => {
     container.addEventListener('dragover', e => {
       e.preventDefault()
       const afterElement = getDragAfterElement(container, e.clientY)
       const draggable = document.querySelector('.dragging')
         console.log(container.classList + " : " + draggable.classList);

       if (afterElement == null) {

         //container.appendChild(draggable)
       } else {
         //container.insertBefore(draggable, afterElement)
       }
     })
   })
 }


 containerAddEvent(catcontainers)



 mouseover()






 const isDescendant = function (parent, child) {
     let node = child.parentNode;
     while (node) {
         if (node === parent) {
           console.log(parent.classList);
           if (parent.classList.contains('boxcontainer')) {
             return parent;
           }

         }

         // Traverse up to the parent
         node = node.parentNode;
     }

     // Go up until the root but couldn't find the `parent`
     return false;
 };



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


 Company.findOne({ _id:req.user.company}, function(err,hotel) {
   //Finds the matching id and push it to an array
   for (var i = 0; i < req.body.data.length; i++) {
     for (var o = 0; o < hotel.butlerbird.content.categorys.length; o++) {
       if (req.body.data[i].id === hotel.butlerbird.content.categorys[o].category.catid) {
         console.log('match: ' + req.body.data[i] + " : " + hotel.butlerbird.content.categorys[o].category.catid);
         newArr.push(hotel.butlerbird.content.categorys[o])

       }
       for (var a = 0; a < hotel.butlerbird.content.categorys[o].category.content.length; a++) {

           console.log(req.body.data[a]);

         }
       }
     }
   }

   Company.findOneAndUpdate({ _id:req.user.company}, {"butlerbird.content.categorys": newArr},{new: true, upsert: true }).exec();
   console.log(newArr);
 });

})
