// temp1.filter(x => x.episode.indexOf("S01") > -1)     La méthode indexOf() renvoie l'indice de la première occurence de la valeur cherchée au sein de la chaîne courante (à partir de indexDébut). Elle renvoie -1 si la valeur cherchée n'est pas trouvée.

let container = document.querySelector(".season-container");
let episodesSection = document.getElementById("episodes");
// let seasonsSection = document.getElementById("seasons");
let season1Container = document.getElementById("season1");
let season2Container = document.getElementById("season2");
let season3Container = document.getElementById("season3");
let season4Container = document.getElementById("season4");
let seasonContainer = document.querySelectorAll("season");


let seasonsUri = [];

for (let i = 1; i <= 41; i++) {
    seasonsUri.push("https://rickandmortyapi.com/api/episode/" + [i]);
    
}
    
Promise.all(seasonsUri.map(uri => fetch(uri)))
    .then(res1 => Promise.all(res1.map(res2 => res2.json())))
    .then( jsonResponse => {
        console.log(jsonResponse);
 
        triEpisodeParSaison(jsonResponse, episodesSection);

        container.appendChild(episodesSection);
  
        // console.log(section.outerHTML) // console qui permet de retourner le contenu html
})


function triEpisodeParSaison(jsonResponse, section) {
        
    let saison1 = jsonResponse.filter(x => x.episode.indexOf("S01") > -1);
    let saison2 = jsonResponse.filter(x => x.episode.indexOf("S02") > -1);
    let saison3 = jsonResponse.filter(x => x.episode.indexOf("S03") > -1);
    let saison4 = jsonResponse.filter(x => x.episode.indexOf("S04") > -1);

    let sectionSaison1 = createSeasonSection(saison1, 1);
    let sectionSaison2 = createSeasonSection(saison2, 2);
    let sectionSaison3 = createSeasonSection(saison3, 3);
    let sectionSaison4 = createSeasonSection(saison4, 4);

    
    season1Container.appendChild(sectionSaison1);
    season2Container.appendChild(sectionSaison2);
    season3Container.appendChild(sectionSaison3);
    season4Container.appendChild(sectionSaison4);
    // console.log(seasonsSection)
    //  for(let i=0; i<seasonsSection; i++){
    //         seasonsSection[i].addEventListener("change", (event) =>{
    //             console.log(event.target, "bonjour")
    //         })
    //  }
    season1Container.addEventListener("click", (event) => {
        event.target.nextElementSibling.classList.toggle("active");
    })
    season2Container.addEventListener("click", (event) => {
        event.target.nextElementSibling.classList.toggle("active");
    })
    season3Container.addEventListener("click", (event) => {
        event.target.nextElementSibling.classList.toggle("active");
    })
    season4Container.addEventListener("click", (event) => {
        event.target.nextElementSibling.classList.toggle("active");
    })

    let saisons = saison1.concat(saison2).concat(saison3).concat(saison4);
    // console.log(saison1); 
  
    // console.log(saisons);

    for (let i = 0; i < saisons.length; i++) {

        let h3 = createH3(i, saisons);

        let divDetail = document.createElement("div");
        
        divDetail.setAttribute("class", "details-episode");
      
        section.appendChild(h3);
 
        createDivDetail(divDetail, saisons, i);

        section.appendChild(divDetail);

    };

}

function createSeasonSection(saisons, i) {
    console.log(saisons);
    let div = document.createElement("div");
    div.setAttribute("class", `saison${i} hide`);
    for (let i = 0; i < saisons.length; i++) {
        // console.log(saisons[i].name);
        div.innerHTML += `<div class="season-card">
        <h4 class="episode-name">Episode name : ${saisons[i].name}</h4>
                    <p class="episode-ref">Reference : ${saisons[i].episode}</p>
                    <p class="episode-date">Created : ${saisons[i].created}</p>
                    </div>`; 
    }
    return div;
}


function createDivDetail(divDetail, saisons, i) {
    divDetail.innerHTML += ` 
        <p class="created-date">Created date : ${saisons[i].air_date}</p>
        <p class="episode_number">Episode number : ${saisons[i].episode}</p>`;
}

function createH3(i, jsonResponse) {
    let h3 = document.createElement("h3");
    h3.setAttribute("class", "name");
    h3.dataset.url = jsonResponse[i].url; // on récupère l'url depuis la requête et on la stocke dans le paramètre dataset du h3
    h3.textContent = `Episode ${jsonResponse[i].id} : ${jsonResponse[i].name}`;

    h3.addEventListener("click",(event) =>{
        getCharactersArray(event);
        event.target.nextElementSibling.classList.toggle("active");
    });
    
    return h3;
}

 function getCharactersArray(event) {
    let uri = event.target.dataset.url // recupération de l'url 
    
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
            let characterDivDetail = document.createElement("div");
            characterDivDetail.setAttribute("class", "character_details");
            event.target.nextElementSibling.innerHTML="";
            for (let i = 0; i < data_characters.length; i++) {
                characterDivDetail.innerHTML += `<section class="container__card-location">
                <div class="img__loc">
                    <img src="${data_characters[i].image}" alt="photo ${data_characters[i].name}">
                </div>
                <div class="card__text">
                <h3>${data_characters[i].name}</h3>
                <p>${data_characters[i].gender}</p>
                <p>${data_characters[i].species}</p>
                <p>${data_characters[i].type}</p>
                </div>
                </section>`;            
            }
            event.target.nextElementSibling.appendChild(characterDivDetail);
            console.log(event.target.nextElementSibling.querySelector(".character_details"));
            return characterDivDetail;
        })   
    })
} 
      
