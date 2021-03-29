 fetch(`https://rickandmortyapi.com/api/character`)
.then((res)=>{
    res.json()
    .then((character)=>{
        console.log(character);
    })
})
import iconCross from '../assets/icon_cross.png';
import planet1 from '../assets/planet-1.png';
import planet2 from '../assets/planet-2.png';
import planet3 from '../assets/planet-3.jpg';
import planet4 from '../assets/planet-4.jpg';
import planet5 from '../assets/planet-5.png';
import planet6 from '../assets/planet-6.jpg';
import planet7 from '../assets/planet-7.jpg';
import planet8 from '../assets/planet-8.jpg';


const typeSelect = document.getElementById('typeSelect');
let locationCard = document.querySelector('.container__card-location');
let containerLocation = document.querySelector('.container_loc');

let tabPlanets = {
    Cluster: planet1,
    Microverse: planet2,
    TV: planet3,
    Resort: planet4,
    'Fantasy town': planet5,
    'Space station': planet6,
    Dream: planet7, 
    Planet: planet8,
};



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
        
        //Affiche cards courantes
        showCardType('')

        //************* CARDS ****************** */
        //récupère la valeur du select + vide + affiche cards correspondantes
        typeSelect.addEventListener('change', event => {
            containerLocation.innerHTML = ''
            showCardType(event.target.value)
        })   
    })
    .catch((error) => {
        console.error(error)
    })
})

//Afficher cards en fonction du type selectionné avec fetch ?type
function showCardType(type) {
    return fetch(`https://rickandmortyapi.com/api/location?type=${type}`)
    .then((res)=>{
        res.json()
        .then((location)=>{

            //results récupère le tab location.results
            const results = location.results;
            for (const location of results) {
                addCard(location, results);
            }

            let nameCards = document.querySelectorAll('.location-name');

            for (let index = 0; index < nameCards.length; index++) { 

                nameCards[index].addEventListener('click', () => {
                    //permet de récupérer l'index de l'élémt courant
                    addModal(results[index])
                })
            }
        })
    })   
}

//Création des cards
function addCard(location) {
    containerLocation.innerHTML += 
    `<section class="container__card-location">
        <div class="card_loc">
            <div class="card__text">
                <h3 class="location-name" id="h3_location${location.id}">
                    ${location.name}
                </h3>
            </div>
            <div class="img__loc">
                <img src="${tabPlanets[location.type]}" alt="">
            </div>
        </div>
    </section>`;
}

//Création modal
function addModal(location) {
    const modal = document.querySelector('.container-details');

    modal.innerHTML +=    
    `<section class="container__modal-location">     
        <div class="modal" id="id_location_${location.id}">
            <div class="icon-cross">
                <img src="${iconCross}" alt="Icon cross">
            </div>
            <div class="modal__card-detail">
                <div class="img__loc">
                    <img src="${tabPlanets[location.type]}" alt="">
                </div>
                <h3 class="modal-location-name">Name : ${location.name}</h3>
                <p>Type : ${location.type}</p>
                <p>Dimension : ${location.dimension}</p>
                <p>Residents:</p>
                <ul class="ul"></ul>
            </div>   
        </div>
    </section>`;
    getResidents(location)
 
    const locationModal = document.querySelector('.container__modal-location');
    let cross = document.querySelector('.icon-cross');

    cross.addEventListener('click', () => {
        locationModal.remove()
    })
 }


//Récupère les résidents au click de la card + les affiche ds modal
function getResidents(location) {

    for (const uri of location.residents) {
        fetch(uri)
        .then((res)=>{
            res.json()
            .then((resident)=> {
               let ul = document.querySelector('.ul');
               ul.innerHTML += `<li>${resident.name}</li>`
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

