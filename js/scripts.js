const pokemons = [
    {
        name: 'Mewtwo',
        imageUrl: 'mewtwo.png',
        health: 100,
    },
    // Add other Pokémon objects here
];

function createPokemonCard(pokemon, index) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.innerHTML = `
        <h3>${pokemon.name}</h3>
        <img src="${pokemon.imageUrl}" alt="${pokemon.name}">
        <p>Health: ${pokemon.health}</p>
    `;
    card.addEventListener('click', () => {
        document.cookie = `userPokemonIndex=${index};`;
        document.cookie = `computerPokemonIndex=${(index + 1) % pokemons.length};`;
        window.location.href = 'battle.html';
    });
    return card;
}

function main() {
    const pokemonSelection = document.getElementById('pokemon-selection');
    pokemons.forEach((pokemon, index) => {
        const card = createPokemonCard(pokemon, index);
        pokemonSelection.appendChild(card);
    });
}

main();
