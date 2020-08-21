// document.getElementsByTagName('p')[1].innerHTML = 'Galadriel';

const catalog = sample;

function createCard(index) {
  return `
    <article class='card'>
    <div class='card-name'>${catalog[index].title}</div>
    <div class='card-content'>
      <p class='author'>
        <span class='tag'>by</span> 
        ${catalog[index].author}
      </p>
      <p class='genre'>
        <span class='tag'>Genre</span> 
        ${catalog[index].category}
      </p>
      <p class='language'>
        <span class='tag'>Original language</span> 
        ${catalog[index].language}
      </p>
      <p class='comment'>
        (${catalog[index].comment})
      </p>
      <div class='quotation'>
        <div class='quote open'>“</div>
        <div class='text'>${catalog[index].quotes}</div>
        <div class='quote close'>„</div>
      </div>
    </div>
    <div class='card-footer'>
      <div class='card-status'>Not read</div>
      <div class='toggle-button'>
        <label class="switch">
          <input type="checkbox">
          <span class="slider"></span>
        </label>          
      </div>
    </div>
  </article>`;
}

function renderCards() {
  for (let i = 0; i < catalog.length; i += 1)
    document.getElementById('card-box').innerHTML += createCard(i);
}

renderCards();