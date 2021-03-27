let episodeContainer = document.getElementById("episode");
let seasons = document.getElementById("seasons");
console.log();

fetch(`https://rickandmortyapi.com/api/episode`)
.then((res)=>{
    res.json()
    .then((episode)=>{
        console.log(episode.results);
        let data = episode.results;
        for(let i = 0; i < data.length; i++){
            episodeCard(data, i);
            let episodeContainer = document.getElementsByClassName("episode-container");
            let charactersContainer = document.getElementsByClassName("characters-container");
            for(let j=0; j<episodeContainer.length; j++){
                episodeContainer[j].addEventListener("click",()=>{
                    // charactersContainer.classList.add("display");
                    for(let k=0; data[j].characters.length; k++){
                        // console.log(data[j].characters[k]);
                        fetch(data[j].characters[k])
                        .then((res) => 
                            res.json())
                        .then((characterInfo) => {
                            characterCard(characterInfo);
                        });
                    }
                })
            }
        }
    })
})


function characterCard(characterInfo) {
    charactersContainer.innerHTML += `<section class="character-card">
                            <h3 class="character-name">${characterInfo.name}</h3>
                            <p class="character-gender">${characterInfo.gender}</p>
                            <p class="character-species">${characterInfo.species}</p>
                            <p class="character-type">${characterInfo.type}</p>
                            </section>`;
}

function episodeCard(data, i) {
    episodeContainer.innerHTML += `<section class="episode-container">
            <h3 class="episode-name">${data[i].name}</h3>
            <p class="episode-ref">${data[i].episode}</p>
            <p class="episode-date">${data[i].air_date}</p>
            </section>
            <section class="characters-container"></section>`;
}


