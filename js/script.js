fetch(`https://rickandmortyapi.com/api/episode`)
.then((res)=>{
    res.json()
    .then((episode)=>{
        console.log(episode);
    
    })
})
fetch(`https://rickandmortyapi.com/api/character`)
.then((res)=>{
    res.json()
    .then((character)=>{
        console.log(character);
    
    })
})
fetch(`https://rickandmortyapi.com/api/location`)
.then((res)=>{
    res.json()
    .then((location)=>{
        console.log(location);
    
    })
})

