// document.getElementsByTagName('p')[1].innerHTML = 'Galadriel';

const catalog = sampleLibrary;

function Work(title, type, author, status, category, language, comment, quotes) {
  this.title = title ?? ''
  this.type = type ?? '' 
  this.author = author ?? '' 
  this.status = status || false;
  this.category = category ?? ''
  this.language = language ?? ''
  this.comment = comment ?? ''
  this.quotes = quotes ?? ''
  this.additionTime = Date.now()
}
Work.prototype.toggleStatus = function() {
  this.status === 'false' ? 'true' : 'false';
};
function sanitizeUserInput(input) {
  return input
    .trim()
    .replace(/\&/g, '&amp;')
    .replace(/\</g, '&#9001;')
    .replace(/\>/g, '&#9002;');
}
function addCard() {
  const form = document.getElementsByTagName('form')[0];
  const title = sanitizeUserInput(document.getElementById('form-title').value); 
  const type = sanitizeUserInput(document.getElementById('form-type').value);
  const author = sanitizeUserInput(document.getElementById('form-author').value); 
  const status = document.getElementById('form-status');
  const category = sanitizeUserInput(document.getElementById('form-category').value); 
  const language = sanitizeUserInput(document.getElementById('form-language').value);
  const comment = sanitizeUserInput(document.getElementById('form-comment').value);
  const quotes = sanitizeUserInput(document.getElementById('form-quotes').value);

  if (title === '' || type === '') {
    form.scrollIntoView();
    return;
  }
  const item = new Work(title, type, author, status, category, language, comment, quotes);
  catalog.unshift(item);
  renderDeck();
  show_or_hideNewCardForm();
  form.reset();
}
function removeCard(e) {
  const index = e.target.dataset.index;
  catalog.splice(index, 1);
  renderDeck();
}
function show_or_hideNewCardForm() {
  document.querySelector('.new-card-screen').classList.toggle('hidden');
  document.getElementById('whole-page').classList.toggle('blurred');
}
function createCard(index) {
  let cardColor = catalog[index].type;
  return `
  <article class='card ${cardColor}' data-index='${index}'>
    <div class='card-content ${index === 0 ? '' : ''}'>
      <div class='card-buttons'>
        <div>
          <button class='edit' type='button'><img src='./style/icon-edit.png' data-index='${index}' alt='edit card'></button>
          <button class='delete' type='button'><img src='./style/icon-trash.png' data-index='${index}' alt='delete card'></button>
        </div>
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
        <div class='card-status' data-index='${index}'>${statusText(catalog[index].type, catalog[index].read)}</div>
        <div class='toggle-button'>
          <label class='switch'>
            <input type='checkbox' data-index='${index}' ${catalog[index].read ? 'checked' : ''}>
            <span class='slider ${cardColor}'></span>
          </label>          
        </div>
      </div>
    </div>
  </article>`;
}
function statusText(type, status){
  return (`
    ${type} 
    &nbsp;-&nbsp;  
    ${status ? '' : 'Not'} 
    ${chooseStatusWording(type)}
  `)
}
function chooseStatusWording(type) {
  let wording;
  switch(type) {
    case 'album':
    case 'song':
    case 'music':
      wording = 'listened';
      break;
    case 'book':
    case 'comics':
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
function renderDeck() {
  document.getElementById('card-box').innerHTML = '';
  for (let i = 0; i < catalog.length; i += 1)
    document.getElementById('card-box').innerHTML += createCard(i);
  
  // make cards change size on click
  document.querySelectorAll('#card-box > *')
    .forEach(card => card.addEventListener('click', changeCardSize));

  // make cards change color when toggle button is clicked
  document.querySelectorAll('.switch > input')
    .forEach(card => card.addEventListener('change', updateCardColor));

  // activate card delete buttons
  document.querySelectorAll('.delete')
    .forEach(button => button.addEventListener('click', removeCard));
}
function changeCardSize() {
  // if card was big, make it small
  if (this.classList.contains('opened')) {
    this.classList.remove('opened');
  } else {
  // if card was small, make every other card small and then make clicked card big
    let cards = document.querySelectorAll('#card-box > *');
    cards.forEach(card => card.classList.remove('opened'));
    this.classList.add('opened');
  }
}
function updateCardColor(e) {
  const newStatus = this.checked;
  const index = e.target.dataset.index;
  const card = document.querySelector(`article[data-index='${index}']`);
  const cardStatus = document.querySelector(`article[data-index='${index}'] div[class='card-status']`);
  const toggleButton = e.originalTarget.nextElementSibling;
  const toggleButtonColor = getComputedStyle(toggleButton).backgroundColor.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  
  if (newStatus == true) {
    const newColor = dimColor(toggleButtonColor);
    card.style.backgroundColor = newColor;
  } else {
    card.removeAttribute('style');
  }
  catalog[index].read = newStatus;
  cardStatus.innerHTML = `${statusText(catalog[index].type, catalog[index].read)}`;
}
function dimColor(currentColor) {
  const alpha = 0.4;
  let oldColor = {
    R: currentColor[1] / 255,
    G: currentColor[2] / 255,
    B: currentColor[3] / 255,
  };
  let newColor = {
    R: 0,
    G: 0,
    B: 0,
  };
  if (currentColor) {
    newColor.R = (1 - alpha) + alpha * oldColor.R;
    newColor.G = (1 - alpha) + alpha * oldColor.G;
    newColor.B = (1 - alpha) + alpha * oldColor.B;
    newColor.R = Math.floor(newColor.R * 255);
    newColor.G = Math.floor(newColor.G * 255);
    newColor.B = Math.floor(newColor.B * 255);
    return `rgb(${newColor.R}, ${newColor.G}, ${newColor.B})`;
  } else { // (fallback if color parsing fails)
    return '#CCCCCC'
  } 
}

// make nav bar sticky onscroll
// (adapted from: https://www.w3schools.com/howto/howto_js_sticky_header.asp)
let header = document.getElementsByTagName("nav")[0];
let sticky = header.offsetTop;
window.onscroll = () => window.pageYOffset > sticky ? 
  header.classList.add('sticky') : header.classList.remove('sticky');

// make new card form appear on click
document.getElementById('btn-add')
  .addEventListener('click', show_or_hideNewCardForm);

// make new card form disappear with cancel button
document.getElementById('form-cancel-btn')
  .addEventListener('click', show_or_hideNewCardForm);

// make new card form disappear by clicking outside it
document.querySelector('.new-card-screen')
  .addEventListener('click', e => {
    if (!document.getElementsByTagName('form')[0].contains(e.target)) show_or_hideNewCardForm()
  });

// activate save new card button
document.getElementById('form-submit-btn')
  .addEventListener('click', addCard);

renderDeck();