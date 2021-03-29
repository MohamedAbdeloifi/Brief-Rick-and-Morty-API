let selectSpecies = document.getElementById("speciesSelect");
let characterCard = document.querySelector(".container-card-character");
const characterModal = document.querySelector('.container__modal-character');
const btnLocationnName = document.querySelector('.character-species');
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
    let charaterName = document.querySelectorAll(".character-name")
    for (let i = 0; i < charaterName.length; i++) {

        charaterName[i].addEventListener('click', () => {
            console.log(characterModal)
            addModal()
        })
    }
}

//Afficher cards en fonction du type selectionné avec fetch ?type
function showCardSpecies(species) {
    return fetch(`https://rickandmortyapi.com/api/character?species=${species}`)
        .then((res) => {
            res.json()
                .then((character) => {
                    character.results.map((character) => {
                        addCard(character)

                    })

                })
        })
}





function addModal() {
    characterModal.innerHTML =
        `<div class="modal">
    <div class="modal__card-detail">
    <h3 class="character-name">${character.name}</h3>
    <p>${character.species}</p>
    <p>${character.gender}</p>
    <p>${character.type}</p>
    <p>${character.origin}</p>
    <p>${character.location}</p>
    <ul class="ul">${getResidents(character)}</ul>
    </div>
    </div>`;
    // characterModal.appendChild(iconCross)
    // iconCross.classList.remove('hide')
    // removeModal()
}


function removeModal() {
    iconCross.addEventListener('click', () => {
        characterModal.innerHTML = ""

    })
}

//Récupère les résidents au click de la card + les affiche ds modal
function getResidents(character) {
    for (const uri of character.results) {
        fetch(uri)
            .then((res) => {
                res.json()
                    .then((character) => {
                        let ul = characterModal.querySelector('.ul')
                        ul.innerHTML += `<li>${character.results}</li>`
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
