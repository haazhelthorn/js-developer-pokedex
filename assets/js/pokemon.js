window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const pokemonName = urlParams.get('name');

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(data => {
          document.getElementById('pokemonName').textContent = data.name;
          document.getElementById('pokemonImage').src = data.sprites.front_default;
          document.getElementById('pokemonDescription').textContent = `Este é ${data.name}.`;

          // Adicione a classe CSS correspondente ao tipo de Pokémon
          const pokemonDetailElement = document.querySelector('.pokemon-detail');
          pokemonDetailElement.classList.add(data.types[0].type.name);

          // Obtenha os status do Pokémon
          const stats = data.stats;
          const hpStat = stats.find(stat => stat.stat.name === 'hp');
          const attackStat = stats.find(stat => stat.stat.name === 'attack');
          const defenseStat = stats.find(stat => stat.stat.name === 'defense');
          const speedStat = stats.find(stat => stat.stat.name === 'speed');

          // Adicione os status à descrição
          document.getElementById('pokemonDescription').innerHTML += `
              <p>HP: ${hpStat.base_stat}</p>
              <p>Ataque: ${attackStat.base_stat}</p>
              <p>Defesa: ${defenseStat.base_stat}</p>
              <p>Velocidade: ${speedStat.base_stat}</p>
          `;
      });
}
