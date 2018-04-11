const form = document.getElementById('amiibo-form'),
      amiiboType = document.getElementById('type'),
      amiiboGameSerie = document.getElementById('serie'),
      amount = document.getElementById('amount'),
      results = document.getElementById('results');

form.addEventListener('submit', loadAmiibos);

function loadAmiibos() {

  const selectedType = amiiboType.options[amiiboType.selectedIndex].value;
  const selectedGameSerie = amiiboGameSerie.options[amiiboGameSerie.selectedIndex].value;
  // const amountGenerated = amount.value;
  //
  let url = '';
  url += 'http://www.amiiboapi.com/api/amiibo/';
  if (selectedType !== '') {
    url += `?type=${selectedType}`;
  } else {
    return false;
  }

  if (selectedGameSerie !== '') {
    url += `&gameseries=${selectedGameSerie}`;
  } else {
    return false;
  }

  console.log('DATOS:', url);

  fetch(url)
    .then(response => response.json())
    .then(amiibos => {
      let structure = '<ul class="lista">';

      amiibos.amiibo.forEach(amiibo => {
        structure += `
          <li>
            <b>${amiibo.name}</b>
            <p>${amiibo.gameSeries} - <i>${amiibo.type}</i></p>
          </li>
        `;
      });

      structure += '</ul>'

      results.innerHTML = structure;
    })
    .catch(error => results.innerHTML = '')
}
