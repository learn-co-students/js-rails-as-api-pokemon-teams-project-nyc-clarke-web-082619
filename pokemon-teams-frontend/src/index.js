const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
   

    function createPokemonLis(arr){
        let nodes = arr.map(pokemon => {
            let li = document.createElement('li');
            li.textContent = `${pokemon.nickname} (${pokemon.species})`;
            let button = document.createElement('button');
            button.classList.add('release');
            button.setAttribute('data-pokemon-id', pokemon.id);
            button.textContent = "Release";
            li.appendChild(button);
            return li;
        })
        return nodes;
    }

    function createTrainerCard(json){
        let pokemons = json.pokemons;
        let divCard = document.createElement('div');
        divCard.classList.add('card');
        divCard.setAttribute('data-id', json.id);
        divCard.textContent = json.name;
        let addButton = document.createElement('button');
        addButton.setAttribute('data-trainer-id', json.id);
        addButton.textContent = "Add Pokemon";
        let ul = document.createElement('ul');
        let pokemonLiNodes = createPokemonLis(pokemons);
        divCard.appendChild(addButton);
        divCard.appendChild(ul);
        pokemonLiNodes.forEach(node => {
            ul.appendChild(node);
        })
        divCard.appendChild(ul);
        return divCard;
    }

    function onPageLoad(){
        let main = document.getElementsByTagName('main')[0];
        fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(json => {
            json.forEach(trainer => {
                main.appendChild(createTrainerCard(trainer));
            })
        })
    }

    function releasePokemon(id){
        fetch(`${POKEMONS_URL}/${id}`, {method: "DELETE"})
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
    }

    function updatePokemonLi(pokemon){
        let li = document.createElement('li');
        li.textContent = `${pokemon.nickname} (${pokemon.species})`;
        let button = document.createElement('button');
        button.classList.add('release');
        button.setAttribute('data-pokemon-id', pokemon.id);
        button.textContent = "Release";
        li.appendChild(button);
        return li;
    }

    function addPokemon(id,ul){
        let formData = {trainer_id: id};
        let configObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(formData)
        }
        fetch(POKEMONS_URL, configObj)
        .then(response => response.json())
        .then(json => {
            if(json[0] === "too many pokemon"){
                alert("Only six Pokemon per team allowed.")
            }
            else{
                let li = updatePokemonLi(json)
                ul.appendChild(li);
            }
        })
    }


    onPageLoad();

    document.getElementsByTagName('main')[0].addEventListener('click', (event) => {
        if(event.target.classList.contains('release')){
            releasePokemon(event.target.getAttribute('data-pokemon-id'));
            let card = event.target.parentNode.parentNode;
            let pokemonLi = event.target.parentNode;
            card.removeChild(pokemonLi);
        }
        if(event.target.textContent === "Add Pokemon"){
            let ul = event.target.parentNode.getElementsByTagName('ul')[0];
            addPokemon(event.target.getAttribute('data-trainer-id'), ul);
        }
    })


})