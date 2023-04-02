class Pokemon {
    constructor(name, health, attack) {
      this.name = name;
      this.health = health;
      this.attack = attack;
    }
  
    takeDamage(damage) {
      this.health -= damage;
      if (this.health < 0) {
        this.health = 0;
      }
    }
  }
  
  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
  }
  
  function getCookie(name) {
    const cookies = document.cookie.split('; ').reduce((result, c) => {
      const [key, val] = c.split('=').map(decodeURIComponent);
      result[key] = val;
      return result;
    }, {});
    return cookies[name];
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('pokemon-options')) {
      const pokemons = [
        new Pokemon('Bulbasaur', 100, 15),
        new Pokemon('Charmander', 100, 20),
        new Pokemon('Squirtle', 100, 10),
        new Pokemon('Pikachu', 100, 25),
      ];
  
      const pokemonOptions = document.getElementById('pokemon-options');
      pokemons.forEach((pokemon) => {
        const pokemonElement = document.createElement('div');
        pokemonElement.innerHTML = `
          <h2>${pokemon.name}</h2>
          <button>Select</button>
        `;
        pokemonElement.querySelector('button').addEventListener('click', function () {
          setCookie('selected-pokemon', JSON.stringify(pokemon), 7);
          document.getElementById('go-to-battle').style.display = 'block';
        });
        pokemonOptions.appendChild(pokemonElement);
      });
    }
  
    if (document.getElementById('battle-info')) {
      const selectedPokemon = JSON.parse(getCookie('selected-pokemon'));
      const enemyPokemon = new Pokemon('Meowth', 100, 15);
  
      const updateBattleInfo = () => {
        const battleInfo = document.getElementById('battle-info');
        battleInfo.innerHTML = `
          <h2>Your Pokémon: ${selectedPokemon.name}</h2>
          <p>Health: ${selectedPokemon.health}</p>
          <h2>Enemy Pokémon: ${enemyPokemon.name}</h2>
          <p>Health: ${enemyPokemon.health}</p>
        `;
      };
  
      updateBattleInfo();
  
      const attackButton = document.getElementById('attack-button');
      attackButton.style.display = 'block';
      attackButton.addEventListener('click', function () {
        enemyPokemon.takeDamage(selectedPokemon.attack);
        updateBattleInfo();
  
        if (enemyPokemon.health === 0) {
          document.getElementById('winner-info').innerHTML = 'You won the battle!';
          attackButton.style.display = 'none';
          return;
        }
  
        selectedPokemon.takeDamage(enemyPokemon.attack);
        updateBattleInfo();
  
        if (selectedPokemon.health === 0) {
          document.getElementById('winner-info').innerHTML = 'You lost the battle!';
          attackButton.style.display = 'none';
        }
      });
    }
  });
  