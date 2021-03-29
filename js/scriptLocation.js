//  fetch(`https://rickandmortyapi.com/api/episode`)
// .then((res)=>{
//     res.json()
//     .then((episode)=>{
//         console.log(episode);
//     })
// })


const typeSelect = document.getElementById('typeSelect');
let locationCard = document.querySelector('.container__card-location');
const locationModal = document.querySelector('.container__modal-location');
const btnLocationnName = document.querySelector('.location-name');
let iconCross = document.querySelector('.icon-cross')


fetch(`https://rickandmortyapi.com/api/location`)
.then((res)=>{
    res.json()
    .then((location)=>{
        console.log("location global : ", location);
        console.log("location info : ", location.info);
        console.log("location results : ", location.results);

        //********* SELECT ******************** */
        //Filtre les types en doubles
        let uniqType = uniq(location.results, 'type')

        //récupérer les types filtrés dans results
        uniqType.map((location) => {
            typeSelect.innerHTML +=
            `<option value="${location.type}">${location.type}</option>`
        });
        //Affiche cards de base
        showCardType('')

        //************* CARDS ****************** */
        //récupère la valeur du select + vide + affiche cards correspondantes
        typeSelect.addEventListener('change', event => {
            locationCard.innerHTML = ''
            showCardType(event.target.value)
        })
    })
})

//Afficher cards en fonction du type selectionné avec fetch ?type
function showCardType(type) {
    return fetch(`https://rickandmortyapi.com/api/location?type=${type}`)
    .then((res)=>{
        res.json()
        .then((location)=>{
            location.results.map((location) => {
                addCard(location);
            })
        })
    })   
}

//Création des cards
function addCard(location) {
    locationCard.innerHTML += 
    `<div class="card" >
    <div class="card__text">
    <h3 class="location-name">${location.name}</h3>
    </div>
    <div class="card__img img__loc">
    <img src="" alt="">
    </div>
    </div>`;
  
    //Affiche modal au click du H3
    let nameCard = document.querySelectorAll('.location-name');
    for(let i = 0; i < nameCard.length; i ++) {

        nameCard[i].addEventListener('click', () => {
            addModal(location)
        })
    }
        
}

//Création modal
function addModal(location) {
    locationModal.innerHTML = 
    `<div class="modal">
    <div class="modal__card-detail">
    <h3 class="location-name">${location.name}</h3>
    <p>${location.type}</p>
    <p>${location.dimension}</p>
    <ul class="ul">${getResidents(location)}</ul>
    </div>
    </div>`;
    locationModal.appendChild(iconCross)
    iconCross.classList.remove('hide')
    removeModal()
}

function removeModal() {
    iconCross.addEventListener('click', () => {
        locationModal.innerHTML = ""

    })
}

//Récupère les résidents au click de la card + les affiche ds modal
function getResidents(location) {
    for (const uri of location.residents) {
        fetch(uri)
        .then((res)=>{
            res.json()
            .then((resident)=>{
               let ul = locationModal.querySelector('.ul')
               ul.innerHTML += `<li>${resident.name}</li>`
               return ul
            })
        })  
    }
}


//function pour enlever doublons ds tableau
function uniq(array, key) {

    //reduce accumule les valeurs à chaque passage
    return array.reduce((arrayItems, currentItem) => {

        //récupère le tableau courant + filtre les elements
        let filter = arrayItems.filter((items) => {
           
            //retourne le tableau filtré d'éléments différent du tableau de l'élément courant avec la clé
            return items[key] !== currentItem[key]
        })
        //retourne un nvx tableau avec le tab filtré + élémts pas en doubles
        return [...filter, currentItem]
    }, []
    )   
}