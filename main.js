// document.getElementsByTagName('p')[1].innerHTML = 'Galadriel';

const catalog = sample;

function createCard(index) {
  return `
  <article class='card ${catalog[index].type}'>
    <div class='card-content ${index === 0 ? 'opened' : ''}'>
      <div class='card-buttons'>
        <button class='btn edit' type='button'><img src='./style/icon-edit.png' alt='edit card'></button>
        <button class='btn delete' type='button'><img src='./style/icon-trash.png' alt='delete card'></button>
      </div>
      <div class='card-head'>${catalog[index].title}</div>
      <div class='card-body'>
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
            <div class='quote-mark open'>“</div>
            <div class='text'>${' &nbsp;'.repeat(4)} ${catalog[index].quotes}</div>
            <div class='quote-mark close'>„</div>
          </div>
        `) : ''}
      </div>
      <div class='card-foot'>
        <div class='card-status'>${catalog[index].type} &nbsp;-&nbsp;  ${catalog[index].read ? 'Read' : 'Not read'}</div>
        <div class='toggle-button'>
          <label class='switch'>
            <input type='checkbox' ${catalog[index].read ? 'checked' : ''}>
            <span class='slider ${catalog[index].type}'></span>
          </label>          
        </div>
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