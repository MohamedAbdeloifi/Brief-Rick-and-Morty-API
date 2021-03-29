let selectSpecies = document.getElementById("speciesSelect");
let characterCard = document.querySelector(".container-card-character");
const characterModal = document.querySelector('.container__modal-character');
let iconCross = document.querySelector('.icon-cross')




fetch(`https://rickandmortyapi.com/api/character`)
    .then((res) => {
        res.json()
            .then((character) => {

                //* SELECT ** */
                //Filtre les types en doubles
                let uniqSpecies = uniq(character.results, 'species')

                //récupérer les types filtrés dans results
                uniqSpecies.map((character) => {
                    selectSpecies.innerHTML +=
                        `<option value="${character.species}">${character.species}</option>`
                });

                showCardSpecies("")

                selectSpecies.addEventListener("change", event => {
                    characterCard.innerHTML = ""
                    showCardSpecies(event.target.value)
                })

            })
    })

function addCard(character) {
    characterCard.innerHTML +=
        `<div class="card">
        <div class="card__text">
        <a href="#">
            <h3 id="h3-character${character.id}" class="character-name">${character.name}</h3>
        </a>
        </div>
            <div class="card__img img__character">
                <img src="${character.image}" alt="${character.name}">
            </div>
    </div>`;
    //console.log(character)
    
}

//Afficher cards en fonction du type selectionné avec fetch ?type
function showCardSpecies(species) {
    return fetch(`https://rickandmortyapi.com/api/character?species=${species}`)
        .then((res) => {
            res.json()
                .then((character) => {
                    let results = character.results
                    for (const character of results) {
                        addCard(character, results)

                    }
                    let charaterName = document.querySelectorAll(".character-name")
                    for (let i = 0; i < charaterName.length; i++) {

                        charaterName[i].addEventListener('click', () => {
                            console.log(characterModal)
                            addModal(results[i])
                        })
                    }

                })
        })
}





function addModal(character) {
    characterModal.innerHTML =
        `<div class="modal" id="id-character-${character.id}">
        <div class="icon-cross">
        <img src="">
        </div>
    <div class="modal__card-detail">
    <h3 class="character-name">${character.name}</h3>
    <p>${character.species}</p>
    <p>${character.gender}</p>
    <p>${character.type}</p>
    <p>${character.origin.name}</p>
    <p>${character.location.name}</p>
    <ul class="ul"></ul>
    </div>
    </div>`;
    getEpisode(character)
    
                    
    let modal = document.querySelector(".modal")
    let cross = document.querySelector(".icon-cross")
    cross.addEventListener('click', () => {
    modal.remove()

    })
}



function getEpisode(character) {

    for (const uri of character.episode) {
        fetch(uri)
        .then((res)=>{
            res.json()
            .then((episode)=> {
               let ul = document.querySelector('.ul');
               ul.innerHTML += `<li>${episode.name}</li>`
                        console.log("episode", episode.name)

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
