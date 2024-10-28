function flipCard(card){
  card.classList.toggle('is-flipped');
}

const carousel = document.querySelector('.carousel');
let cards = [];
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');


const fetchCards = async () =>{
  try{
    const response = await fetch('http://localhost:5188/api/Game')
    const data = await response.json()

    console.log('dados da api:', data)

    if(Array.isArray(data)){
      generateCards(data)
      cards = document.querySelectorAll('.cards');
      updateCarousel()
    } else{
      console.log('A Api não está retornando corretamente')
    }
  } catch(error){
    console.log('Erro ao buscar os dados', error)
  }
}

fetchCards()
console.log(cards.length)

function generateCards(cardsData){
  cardsData.forEach(card =>{
    const cardsHtml = `
    <div class="cards col-6 col-sm-3" onclick="flipCard(this)">
        <div class="cards-front">
          <h3 class="game-name">${card.title}</h3>
          <div class="game-image">
           <img src="${card.image}" alt="Capa do jogo ${card.title}">
          </div>
          <div class="stars">
            ${generateStars(card.rating)}
          </div>
          <div class="description">
            <div class="short-description-text col-sm-7">
              <p>${card.subtitle}</p>
            </div>
            <div class="description-platform col-sm-5">
              ${generatePlatforms(card.plataforms)}
            </div>
          </div>
        </div>
        <div class="cards-back">
          <h3 class="game-name">${card.title}</h3>
          <p class="description-text">${card.description}...</p>
        </div>
      </div>
    `

    carousel.innerHTML += cardsHtml
  })
}

let currentIndex = 0;

function generatePlatforms (platforms){
  let platformHtml = ''
  let platformsArray = platforms.forEach(plataforma => {
    if(plataforma == ' Ea'){
      platformHtml += '<img src="src/images/platforms/ea.png" alt=""> '
    } else if(plataforma == 'PlayStation'){
      platformHtml += '<img src="src/images/platforms/playstation.png" alt=""> '
    }else if(plataforma == ' Mobile'){
      platformHtml += '<img src="src/images/platforms/mobile.png" alt=""> '
    }else if(plataforma == ' Nintendo' || plataforma == ' Switch'){
      platformHtml += '<img src="src/images/platforms/nintendo.png" alt=""> '
    }else if(plataforma == ' Steam' || plataforma == ' PC' || plataforma == 'Steam'){
      platformHtml += '<img src="src/images/platforms/steam.png" alt=""> '
    }else if(plataforma == ' Xbox'){
      platformHtml += '<img src="src/images/platforms/xbox.png" alt=""> '
    }
  });
  return platformHtml
}

function generateStars(rating){
  let starHtml= ''
  for(let i = 1; i <= rating; i++){
    starHtml += `<img src="src/images/estrela.png" alt="">`
  }
  return starHtml
}

console.log(cards.length)

function getCardsVisible() {
  if (window.innerWidth <= 580) {
    return 1;
  } else if (window.innerWidth <= 1024) {
    return 2;
  } else {
    return 4;
  }
}

function updateCarousel() {
  const cardsVisible = getCardsVisible();
  const totalCards = cards.length;
  const offset = -(currentIndex % totalCards) * (100 / cardsVisible);
  carousel.style.transform = `translateX(${offset}%)`;
}


nextButton.addEventListener('click', () => {
  const cardsVisible = getCardsVisible();
  const totalCards = cards.length;
  
  if (currentIndex < totalCards - cardsVisible) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  console.log('apertou next')
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  const cardsVisible = getCardsVisible();
  
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = cards.length - cardsVisible;
  }
  updateCarousel();
});

window.addEventListener('resize', updateCarousel);

