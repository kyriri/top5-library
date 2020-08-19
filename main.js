document.getElementsByTagName('p')[1].innerHTML = 'Galadriel';

const catalog = sample;

function createCard(index) {
  return `
  <div class='card'>
  <h2>${catalog[index].title}</h2>
  <p>by: ${catalog[index].author}</p>
  <p>Original language: ${catalog[index].language}</p>
  </div>`;
}

function renderCards() {
  for (let i = 0; i < catalog.length; i += 1)
    document.getElementById('card-box').innerHTML += createCard(i);
}

renderCards();