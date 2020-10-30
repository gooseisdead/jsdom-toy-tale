let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
 
const toyCollection = document.querySelector("#toy-collection")
  
fetch("http://localhost:3000/toys")
.then(response => response.json())
.then(data => manifestToyCollection(data))
  
function manifestToyCollection(data) {
  data.forEach(createToyCard)
}
  
function createToyCard(toy) {
  const toyDiv = document.createElement("div")
  toyDiv.classList.add("card")
  toyDiv.setAttribute("toy-id", toy.id)
  toyDiv.innerHTML = 
    `<h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p class="likes-count">${toy.likes} likes</p>
    <button class="like-btn">❤️</button>`
  toyCollection.append(toyDiv)
    
  const likeButton = toyDiv.querySelector("button.like-btn")
  likeButton.addEventListener("click", increaseLikes)
    
  function increaseLikes() {
    toy.likes++;
        
  let configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
      body: JSON.stringify({ likes: toy.likes })
  }
        return fetch("http://localhost:3000/toys" + `/${toy.id}`, configObject)
          .then(function(response){
            return response.json()
          }).then(function(data){
            toyDiv.querySelector("p.likes-count").textContent = `${toy.likes} likes`
          }) .catch(function(error) {
            alert(error.message)
          })
    }
  }
  
  const newToyForm = document.querySelector(".add-toy-form")
  function getNewToy() {
    const toy = {
      name: newToyForm.name.value,
      image: newToyForm.image.value,
      likes: 0
    }
    return toy
  }

  newToyForm.addEventListener("submit", submitNewToy);
  function submitNewToy(event) {
    event.preventDefault();
    const newToy = getNewToy();
    submitData(newToy)

    newToyForm.reset()
  }
  
  function submitData(toy) {
    let configObject = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
      },
      body: JSON.stringify(toy)
    }
    return fetch("http://localhost:3000/toys", configObject)
        .then(function(response){
            return response.json()
        }).then(function(data){
            createToyCard(data)
        })
}





  
  
  
