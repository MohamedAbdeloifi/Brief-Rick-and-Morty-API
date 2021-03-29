// temp1.filter(x => x.episode.indexOf("S01") > -1)     La méthode indexOf() renvoie l'indice de la première occurence de la valeur cherchée au sein de la chaîne courante (à partir de indexDébut). Elle renvoie -1 si la valeur cherchée n'est pas trouvée.
//  exemple : 
// let test = "lyes"
// undefined
// test.indexOf("ly")
// 0
// adresse de L'API : https://rickandmortyapi.com/ 

let container = document.querySelector(".container");

// Le fectch nous permet de faire une requete vers l'URI pour récupérer les épisodes
// => GET sur https://rickandmortyapi.com/api/episode

let linksPage = [];

for (let i = 1; i <= 41; i++) {
    linksPage.push("https://rickandmortyapi.com/api/episode/" + [i]);
    
}
    
Promise.all(linksPage.map(uri => fetch(uri)))
    .then(res1 => Promise.all(res1.map(res2 => res2.json())))
    .then( jsonResponse => {
        console.log(jsonResponse);

        let section = document.createElement("section");
        section.setAttribute("id", "episodes")

        triEpisodeParSaison(jsonResponse, section);

        container.appendChild(section);
  
        // console.log(section.outerHTML) // console qui permet de retourner l'html qui est à l'intérieur du parent.
      
})


function triEpisodeParSaison(jsonResponse, section) {
        
    let EpiParSaison1 = jsonResponse.filter(x => x.episode.indexOf("S01") > -1);
    let EpiParSaison2 = jsonResponse.filter(x => x.episode.indexOf("S02") > -1);
    let EpiParSaison3 = jsonResponse.filter(x => x.episode.indexOf("S03") > -1);
    let EpiParSaison4 = jsonResponse.filter(x => x.episode.indexOf("S04") > -1);
    
    let fusionSaison1 = EpiParSaison1.concat(EpiParSaison2);
    let fusionSaison2 = fusionSaison1.concat(EpiParSaison3);
    let saisons = fusionSaison2.concat(EpiParSaison4);

    console.log(EpiParSaison1);
  
//     console.log(saisons);

    for (let i = 0; i < saisons.length; i++) {

        let h1 = createH1(i, saisons);
        console.log(h1);


        let divDetail = document.createElement("div");
        
        divDetail.setAttribute("class", "details-episode");
      
        section.appendChild(h1);
 
        createDivDetail(divDetail, saisons, i);

        section.appendChild(divDetail);

    };

    let sectionSaison1 = createSection(EpiParSaison1, 1);
    let sectionSaison2 =createSection(EpiParSaison2, 2);
    let sectionSaison3 =createSection(EpiParSaison3, 3);
    let sectionSaison4 =createSection(EpiParSaison4, 4);

    section.appendChild(sectionSaison1);
    section.appendChild(sectionSaison2);
    section.appendChild(sectionSaison3);
    section.appendChild(sectionSaison4);

}

function createSection(saisons, i) {
    console.log(saisons);
    let section = document.createElement("section");
    section.setAttribute("class", `saison${i}`)
    for (let i = 0; i < saisons.length; i++) {
        console.log(saisons[i].name);
        section.innerHTML += `
                    <p class="character_name">Character Name : ${saisons[i].name}</p>
                    <p class="genre">${saisons[i].episode}</p>
                    <p class="specie">${saisons[i].created}</p>`; 
    }
    return section;
}


function createDivDetail(divDetail, saisons, i) {
    divDetail.innerHTML += ` 
        <p class="created-date">Created date : ${saisons[i].air_date}</p>
        <p class="episode_number">${saisons[i].episode}</p>
        <div class="container_character_details">

        </div>`;
}

function createH1(i, jsonResponse) {
    let h1 = document.createElement("h1");

    console.log(jsonResponse[i]);

    h1.setAttribute("class", "name");
    h1.dataset.url = jsonResponse[i].url; // (on le cible avec un nom d'attribut sur mesure en fonction de la valeur qu'il contient) pour récupérer l'url de chaque épisode et le donner à H1 comme data-url(La propriété HTMLElement.dataset fournit un accès en mode lecture et écriture, à tous les attributs de données sur mesure (data-*) définis sur l'élément)
    // console.log( h1.dataset.url);
    h1.textContent = `Episode ${jsonResponse[i].id}: ${jsonResponse[i].name}`;

    h1.addEventListener("click", getCharactersArray);
    return h1;
}

 function getCharactersArray(event) {
    let uri = event.target.dataset.url // pour récupérer le data-url car le dataset permet de lire et d'écrire 
    
    console.log(uri);
    
    fetch(uri)
    .then((res) => { 
        return res.json()
    })
    .then((jsonResponse) => {

        console.log(jsonResponse);
        
        Promise.all(jsonResponse.characters.map(uri => fetch(uri)))
        .then(res => Promise.all(res.map(r => r.json())))
        .then( data_characters => {
            
            console.log(data_characters);

            // let sectionCharacters = document.querySelector("section");
            let characterDivDetail = document.createElement("div");
            characterDivDetail.setAttribute("class", "character_details");
            
            for (let i = 0; i < data_characters.length; i++) {

                characterDivDetail.innerHTML += ` 
                    <div class="image">
                        <img src="${data_characters[i].image}" alt="">
                    </div>
                    <p class="character_name">Character Name : ${data_characters[i].name}</p>
                    <p class="genre">${data_characters[i].gender}</p>
                    <p class="specie">${data_characters[i].species}</p>`;
            
            }
            event.target.nextElementSibling
            .querySelector(".container_character_details")
            .appendChild(characterDivDetail);
            console.log(event.target.nextElementSibling);
        })   
    })
} 
      
