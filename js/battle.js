let userPokemon;
let computerPokemon;
let userHealth;
let computerHealth;
let attacksSelect;

window.onload = () => {
  userPokemon = JSON.parse(getCookie("userPokemonSelection"));
  computerPokemon = { name: "Bulbasaur", image: "bulbasaur.png", health: 100, attacks: [] };
  userHealth = getCookieValue("userCurrentHealth") || userPokemon.health;
  computerHealth = getCookieValue("computerCurrentHealth") || computerPokemon.health;

  setCookie("userPokemonSelection", JSON.stringify(userPokemon));
  setCookie("computerPokemonSelection", JSON.stringify(computerPokemon));

  const userPokemonDiv = document.getElementById("user-pokemon");
  const userImg = document.createElement("img");
  userImg.src = userPokemon.image;
  userPokemonDiv.appendChild(userImg);
  const userHealthSpan = document.createElement("span");
  userHealthSpan.innerHTML = `HP: ${userHealth}`;
  userPokemonDiv.appendChild(userHealthSpan);

  const enemyPokemonDiv = document.getElementById("enemy-pokemon");
  const enemyImg = document.createElement("img");
  enemyImg.src = computerPokemon.image;
  enemyPokemonDiv.appendChild(enemyImg);
  const enemyHealthSpan = document.createElement("span");
  enemyHealthSpan.innerHTML = `HP: ${computerHealth}`;
  enemyPokemonDiv.appendChild(enemyHealthSpan);

  attacksSelect = document.getElementById("attacks");
  for (let i = 0; i < userPokemon.attacks.length; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.innerHTML = userPokemon.attacks[i].name;
    attacksSelect.appendChild(option);
  }

  const attackBtn = document.getElementById("attack-btn");
  attackBtn.addEventListener("click", () => {
    const selectedAttackIndex = attacksSelect.value;
    const selectedAttack = userPokemon.attacks[selectedAttackIndex];
    const damage = calculateDamage(selectedAttack.damage);
    computerHealth -= damage;
    enemyHealthSpan.innerHTML = `HP: ${computerHealth}`;
    if (computerHealth <= 0) {
      endBattle("user");
    } else {
      setTimeout(computerAttack, 1000);
    }
  });
}

function calculateDamage(baseDamage) {
  const maxDamage = baseDamage * 1.5;
  const minDamage = baseDamage * 0.5;
  return Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
}

function computerAttack() {
  const selectedAttackIndex = Math.floor(Math.random() * computerPokemon.attacks.length);
  const selectedAttack = computerPokemon.attacks[selectedAttackIndex];
  const damage = calculateDamage(selectedAttack.damage);
  userHealth -= damage;
  const userHealthSpan = document.getElementById("user-pokemon").getElementsByTagName("span")[0];
  userHealthSpan.innerHTML = `HP: ${userHealth}`;
  if (userHealth <= 0) {
    endBattle("computer");
  }
}

function endBattle(winner) {
  if (winner === "user") {
    alert("You win!");
  } else {
    alert("Computer wins!");
  }
  deleteCookie("userPokemonSelection");
  deleteCookie("computerPokemonSelection");
  deleteCookie("userCurrentHealth");
  deleteCookie("computerCurrentHealth");
  window.location.href = "index.html";
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return decodeURIComponent(cookie[1]);
    }
  }
  return "";
