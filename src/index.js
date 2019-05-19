const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const div_toy = document.querySelector('#toy-collection')
let addToy = false
const newForm = document.querySelector(".add-toy-form")

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    bindFormSubmit();
  } else {
    toyForm.style.display = 'none'
  }
})


function fillToyList(){
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(data => data.forEach(slapToyOnTheDiv))
    // .then(data => console.log(data))
}

const toyCollection = document.querySelector("#toy-collection")

function slapToyOnTheDiv(toy) {
  const div = document.createElement("div")
  div.className = "card"
  div.innerHTML = `
    <h2>${toy.name}</h2>
    <img src = "${toy.image}" class="toy-avatar" />
    <p><span id = "toy-${toy.id}-likes">${toy.likes}</span> Likes</p>
`
const button = document.createElement("button")
button.innerText = "Like(s) ❤️"
button.dataset.toyId = toy.id
button.dataset.likes = toy.likes
button.addEventListener("click", increaseLikes)
div.appendChild(button)
toyCollection.appendChild(div)
}





  // h2 = document.createElement("h2")
  // h2.innerText = toy.name
  // div_card.appendChild(h2)
  //
  // image = document.createElement("img")
  // image.className = "toy-avatar"
  // image.src = toy.image
  // div_card.appendChild(image)
  //
  // p_tag = document.createElement("p")
  // p_tag.innerText = `likes ${toy.likes}`
  // div_card.appendChild(p_tag)
  //
  // button = document.createElement("button")
  // button.className = "like-btn"
  // button.innerText = "Like <3"
  // div_card.appendChild(button)



//   button.addEventListener("click", addLike)
//
//
//
//   div_toy.appendChild(div_card)
// }

// function addLikeText(data, likeTextPath, dataLikePath) {
//   likeTextPath.innerText = `likes ${ data.likes }`
//   dataLikePath.dataset.cardLikes = data.likes
// }

function increaseLikes(event){
  //figure out which toy needs its likes increased
  const button = event.target
  // fetch a PATCH to the toy
  const toyId = button.dataset.toyId
  const likesSpan = document.getElementById(`toy-${toyId}-likes`)
  const likes = parseInt(likesSpan.innerText)
  const newLikes = likes + 1

  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: newLikes
    })
  }).then(response => response.json())
    .then(function(data){
      likesSpan.innerText = newLikes
  })


  //update the number of likes on the DOM


  // const toyId = button.dataset.toyId
  // const likes = parseInt(button.dataset.toyLikes)
  // const newLikes = likes + 1
  // // likeTextPath = event.path[1].childNodes[2]
  // // dataLikePath = event.path[1].childNodes[3]
  // fetch(`http://localhost:3000/toys/${ toyId }`, {
  //   method: "PATCH",
  //   headers: {
  //   "Content-Type": "application/json",
  //   "Accept": "application/json"
  //   },
  //   body: JSON.stringify({ likes: newLikes})
  // })
  // .then(resp => resp.json())
  // .then(data => addLikeText(data, likeTextPath, dataLikePath))

}

function onSubmit(){
  toy_name = this.name.value
  toy_image = this.image.value

  event.preventDefault();
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify({ name: toy_name, image: toy_image, likes: 0})
  })
  .then(res => res.json())
  .then(data => slapToyOnTheDiv(data))
  toyForm.style.display = 'none'

}



function bindFormSubmit(){
  newForm.addEventListener("submit", onSubmit)
}

// <div class="card">
//   <h2>Woody</h2>
//   <img src=toy_image_url class="toy-avatar" />
//   <p>4 Likes </p>
//   <button class="like-btn">Like <3</button>
// </div>



fillToyList();
