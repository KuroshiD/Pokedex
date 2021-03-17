const getUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePromises = () => Array(150).fill().map((_, index) => fetch(getUrl(index + 1)).then(response => response.json()))

const HTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    accumulator += `
            <li class="card ${elementTypes[0]}">
                <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" />
                <h2 class="card-title">${id}. ${name}</h2>
                <p class="card-subtitle">${elementTypes.join(' | ')}</p>
            </li>
        `
    return accumulator
}, ' ')

const InsertPokemons = pokemons => {
    const ul = document.querySelector('[data-js]');
    ul.innerHTML = pokemons
}
const pokemonPromises = generatePromises()
Promise.all(pokemonPromises).then(HTML)
    .then(InsertPokemons)

