// document.getElementsByTagName('p')[1].innerHTML = 'Galadriel';

const catalog = sample;

function createCard(index) {
  return `
    <article class='card'>
    <div class='card-name'>${catalog[index].title}</div>
    <div class='card-content'>
      ${catalog[index].author ? (`
        <p class='author'>
          <span class='tag'>by</span> 
          ${catalog[index].author}
        </p>
      `) : ''}
      ${catalog[index].category ? (`
        <p class='category'>
          <span class='tag'>Category</span> 
          ${catalog[index].category}
        </p>
      `) : ''}
      ${catalog[index].language ? (`
        <p class='language'>
          <span class='tag'>Original language</span> 
          ${catalog[index].language}
        </p>
      `) : ''}
      ${catalog[index].comment ? (`
        <p class='comment'>
          (${catalog[index].comment})
        </p>
      `) : ''}
      ${catalog[index].quotes ? (`
        <div class='quotation'>
          <div class='quote open'>“</div>
          <div class='text'>${catalog[index].quotes}</div>
          <div class='quote close'>„</div>
        </div>
      `) : ''}
    </div>
    <div class='card-footer'>
      <div class='card-status'>${catalog[index].read ? 'Read' : 'Not read'}</div>
      <div class='toggle-button'>
        <label class="switch">
          <input type="checkbox" ${catalog[index].read ? 'checked' : ''}>
          <span class="slider"></span>
        </label>          
      </div>
    </div>
  </article>`;
}

function renderCards() {
  document.getElementById('card-box').innerHTML = '';
  for (let i = 0; i < catalog.length; i += 1)
    document.getElementById('card-box').innerHTML += createCard(i);
}

renderCards();