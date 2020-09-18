let f_PokeName = document.getElementById("fPokeName")

// Request for pokemon
function getPokemon(pokemonName){
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(resp =>{
        document.getElementById("biggercontainer").style.display = "block"
        addToList(resp.data)
        console.log("Got -> ", resp.data.name)
        document.getElementById("warning").style.display = "none"
    }).catch(err =>{
        console.log(err)
        // Show error msg
        document.getElementById("warning").style.display = "block"
    })
}

// Add event listener for adding Pokemons
document.getElementById("fButton").addEventListener('click',(event)=>{
    event.stopPropagation()
    let pokemonName=document.getElementById("fPokeName").value

    if(pokemonName!=""){
        console.log("Valid input")
        f_PokeName.className="valid"
        getPokemon(pokemonName)
        f_PokeName.value="" 
    } else {
        console.log("Inavlid, Empty form")
        f_PokeName.className="invalid"
    }
})

// Add event listener for nodes with class "remove-item"
document.body.addEventListener('click',(event)=>{
    if(event.target.classList.contains("remove-item")){
        console.log("Hay click")
        remove_item(event.target.parentNode)
    }
})

// Append new item to list
function addToList(pokemon){
    let node_item=document.createElement("li")
    node_item.className = "list-item"
    node_item.setAttribute("data-weight", pokemon.weight)
    let list_item = get_element_li(pokemon.name, pokemon.id, pokemon.weight)
    node_item.innerHTML += list_item
    let lst = document.getElementById("list")
    lst.appendChild(node_item)
    // Add weight to total
    let total=document.getElementById("weight")
    let curr=Number(total.innerHTML)
    total.innerHTML = pokemon.weight+curr
}

// List item template
function get_element_li (pokemonName, pokeID, weight) {
    //let paddedID = addPaddnig(pokeID)
    let padID = addPadd(pokeID)
    pokemonName = upper(pokemonName)
    return `<img class="pokeImg" src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padID}.png"> ${pokemonName} | Weight: ${weight} <button class="remove-item">❌</button>`
}
  
// Remove child node
let remove_item  = (node_to_remove) => {
    let rm_item=node_to_remove
    subtractFromTotal(rm_item)
    let lst=document.getElementById("list")
    lst.removeChild(rm_item)
}

// Subtract from total
function subtractFromTotal(el){
    let total=document.getElementById("weight")
    let curr=Number(total.innerHTML)

    let weight = el.getAttribute("data-weight")

    total.innerHTML = curr-weight
}

// Add padding 0s to ID
function addPadd(id){
    id = ''+id
    while(id.length < 3){
        id = '0'+id
    }
    console.log("ID ", id)
    return id
}

// Make first char upercase
function upper(name){
    let upperName = name.charAt(0).toUpperCase() + name.slice(1)
    return upperName
}