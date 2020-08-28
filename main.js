// document.getElementsByTagName('p')[1].innerHTML = 'Galadriel';

const catalog = sample;

function createCard(index) {
  return `
  <article class='card ${catalog[index].type}'>
    <div class='card-content ${index === 0 ? '' : ''}'>
      <div class='card-buttons'>
        <button class='card-btn edit' type='button'><img src='./style/icon-edit.png' alt='edit card'></button>
        <button class='card-btn delete' type='button'><img src='./style/icon-trash.png' alt='delete card'></button>
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
        <div class='card-status'>${catalog[index].type} &nbsp;-&nbsp;  ${catalog[index].read ? '' : 'Not'} ${chooseStatusWording(catalog[index].type)}</div>
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

function chooseStatusWording(type) {
  let wording;
  switch(type) {
    case 'album':
      wording = 'listened';
      break;
    case 'book':
      wording = 'read';
      break;
    case 'movie':
    case 'play':
    case 'series':
      wording = 'watched';
      break;
    default:
      wording = 'enjoyed'
  }
  return wording;
}

function renderCards() {
  document.getElementById('card-box').innerHTML = '';
  for (let i = 0; i < catalog.length; i += 1)
    document.getElementById('card-box').innerHTML += createCard(i);
}

// make nav bar sticky onscroll
// adapted from: https://www.w3schools.com/howto/howto_js_sticky_header.asp
let header = document.getElementsByTagName("nav")[0];
let sticky = header.offsetTop;
window.onscroll = () => window.pageYOffset > sticky ? 
  header.classList.add('sticky') : header.classList.remove('sticky');

  
renderCards();