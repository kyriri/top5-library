// document.getElementsByTagName('p')[1].innerHTML = 'Galadriel';

const catalog = sampleLibrary;

// make new card form appear on click
document.getElementById('add').addEventListener('click', show_or_hideNewCardForm);

// make new card form disappear with cancel button
document.getElementById('form-cancel-btn').addEventListener('click', show_or_hideNewCardForm);


function show_or_hideNewCardForm() {
  document.getElementById('new-card-form').classList.toggle('hidden');
  document.getElementById('whole-page').classList.toggle('blurred');
}

function createCard(index) {
  let cardColor = catalog[index].type;
  return `
  <article class='card ${cardColor}'>
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
            <span class='slider ${cardColor}'></span>
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
  
  // make cards change size on click
  let cards = document.querySelectorAll('#card-box > *');
  cards.forEach(card => card.addEventListener('click', changeCardSize));

  // make cards change color when toggle button is clicked
  let toggleButtons = document.querySelectorAll('.switch > input');
  toggleButtons.forEach(card => card.addEventListener('change', changeCardColor));
}

function changeCardSize() {
  // if card was big, make it small
  if (this.children[0].classList.contains('opened')) {
    this.children[0].classList.remove('opened');
  } else {
  // if card was small, make every other card small and then make clicked card big
    let cards = document.querySelectorAll('#card-box > *');
    cards.forEach(card => card.children[0].classList.remove('opened'));
    this.children[0].classList.add('opened');
  }
}

function changeCardColor(e) {
  console.log(e);
  // retrieve background color
  let element = e.originalTarget.nextElementSibling;
  console.log(`color: ${getComputedStyle(element).backgroundColor}`);
  // if read == true, increase card lightness by the equivalent of 50% alpha
  // if read == false, decrease card lightness by the same measure
  // convert from rgba to rgb (if needed)
  // change background color (card and toggle button)
}

// make nav bar sticky onscroll
// (adapted from: https://www.w3schools.com/howto/howto_js_sticky_header.asp)
let header = document.getElementsByTagName("nav")[0];
let sticky = header.offsetTop;
window.onscroll = () => window.pageYOffset > sticky ? 
  header.classList.add('sticky') : header.classList.remove('sticky');


renderCards();