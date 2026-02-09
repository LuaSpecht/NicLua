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
      otherCards()
    }
  } catch(error){
    console.log('Erro ao buscar os dados', error)
    otherCards()
    cards = document.querySelectorAll('.cards');
    updateCarousel()
  }
}

fetchCards()

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
    starHtml += `<img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">`
  }
  return starHtml
}


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
    if (!cards.length) return;

  const cardWidth = cards[0].getBoundingClientRect().width;

  const offset = -(currentIndex * (cardWidth));

  carousel.style.transform = `translateX(${offset}px)`;
}


nextButton.addEventListener('click', () => {
  const cardsVisible = getCardsVisible();
  const totalCards = cards.length;
  
  if (currentIndex < totalCards - cardsVisible) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
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

function otherCards(){
  const cardsHtml = `
    <div class="cards col-6 col-sm-3" onclick="flipCard(this)">
        <div class="cards-front">
          <h3 class="game-name">The Last of Us</h3>
          <div class="game-image">
            <img src="src/images/game-images/The_Last_of_Us_capa.png" alt="Capa de The Last Of Us">
          </div>
          <div class="stars">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
          </div>
          <div class="description">
            <div class="short-description-text col-sm-7">
              <p>Jogo de Zumbi e pai solteiro</p>
            </div>
            <div class="description-platform col-sm-5">
              <img src="src/images/platforms/playstation.png" alt="">
              <img src="src/images/platforms/steam.png" alt="">
            </div>
          </div>
        </div>
        <div class="cards-back">
          <h3 class="game-name">The Last Of Us</h3>
          <p class="description-text">
            Joel, um sobrevivente solitário e que perdeu sua filha adolescente no início do
            apocalipse, recebe a missão de levar para fora de uma zona de quarentena uma menina de 14 anos, chamada
            Ellie. A jovem é a única humana conhecida que é imune ao fungo e se torna a esperança de uma cura.</p>
        </div>
      </div>
      <div class="cards col-6 col-sm-3" onclick="flipCard(this)">
        <div class="cards-front">
          <h3 class="game-name">Bloons TD 6</h3>
          <div class="game-image">
            <img src="src/images/game-images/bloons.jpg" alt="Capa de Bloons TD 6">
          </div>
          <div class="stars">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
          </div>
          <div class="description">
            <div class="short-description-text col-sm-7">
              <p>Mamacos que odeiam balões</p>
            </div>
            <div class="description-platform col-sm-5">
              <img src="src/images/platforms/playstation.png" alt="">
              <img src="src/images/platforms/steam.png" alt="">
            </div>
          </div>
        </div>
        <div class="cards-back">
          <h3 class="game-name">Bloons TD 6</h3>
          <p class="description-text">
            Monte sua defesa perfeita com uma combinação de torres de macacos poderosas e heróis incríveis, depois
            estoure até o último Bloon invasor!
          </p>
        </div>
      </div>
      <div class="cards col-6 col-sm-3" onclick="flipCard(this)">
        <div class="cards-front">
          <h3 class="game-name">Celeste</h3>
          <div class="game-image">
            <img src="src/images/game-images/celeste.avif" alt="Capa de Celeste">
          </div>
          <div class="stars">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
          </div>
          <div class="description">
            <div class="short-description-text col-sm-7">
              <p>Olha o moranguin.... caí DE NOVO</p>
            </div>
            <div class="description-platform col-sm-5">
              <img src="src/images/platforms/playstation.png" alt="">
              <img src="src/images/platforms/steam.png" alt="">
            </div>
          </div>
        </div>
        <div class="cards-back">
          <h3 class="game-name">Celeste</h3>
          <p class="description-text">
            Ajude Madeline a enfrentar seus demônios internos em sua jornada até o topo da Montanha Celeste, nesse jogo
            de plataforma super afiado dos criadores de TowerFall. Desbrave centenas de desafios meticulosos, descubra
            segredos complicados e desvende o mistério da montanha.
          </p>
        </div>
      </div>
      <div class="cards col-6 col-sm-3" onclick="flipCard(this)">
        <div class="cards-front">
          <h3 class="game-name">EA FC 24</h3>
          <div class="game-image">
            <img src="src/images/game-images/fifa-24.webp" alt="Capa do EA FC 24">
          </div>
          <div class="stars">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
          </div>
          <div class="description">
            <div class="short-description-text col-sm-7">
              <p>Jogando pelado com os amigos</p>
            </div>
            <div class="description-platform col-sm-5">
              <img src="src/images/platforms/playstation.png" alt="">
              <img src="src/images/platforms/steam.png" alt="">
            </div>
          </div>
        </div>
        <div class="cards-back">
          <h3 class="game-name">EA FC 24</h3>
          <p class="description-text">
            O EA SPORTS FC™ 25 oferece mais maneiras de ganhar pelo clube. Jogue com suas amizades nos seus modos
            favoritos com o novo Rush 5x5 e leve seu clube à vitória com o FC IQ dando mais controle tático do que
            nunca.
          </p>
        </div>
      </div>
      </div>
      <div class="cards col-6 col-sm-3" onclick="flipCard(this)">
        <div class="cards-front">
          <h3 class="game-name">Enigma do Medo</h3>
          <div class="game-image">
            <img src="src/images/game-images/enigma_do_medo.jpg" alt="Capa de Enigma do Medo">
          </div>
          <div class="stars">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
          </div>
          <div class="description">
            <div class="short-description-text col-sm-7">
              <p>Senhor Veríssimo?🫦</p>
            </div>
            <div class="description-platform col-sm-5">
              <img src="src/images/platforms/playstation.png" alt="">
              <img src="src/images/platforms/steam.png" alt="">
            </div>
          </div>
        </div>
        <div class="cards-back">
          <h3 class="game-name">Enigma do Medo</h3>
          <p class="description-text">
            Se torne Mia, uma detetive paranormal buscando por seu pai que desapareceu. Investigue e desvende os
            mistérios do Enigma do Medo, derrotando monstros assustadores em seu caminho.
          </p>
        </div>
      </div>
      <div class="cards col-6 col-sm-3" onclick="flipCard(this)">
        <div class="cards-front">
          <h3 class="game-name">Minecraft</h3>
          <div class="game-image">
            <img src="src/images/game-images/minecraft.avif" alt="Capa de Minecraft">
          </div>
          <div class="stars">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
            <img src="src/images/estrela.png" alt="imagem de estrela vazada, indica a pontuação de cada jogo">
          </div>
          <div class="description">
            <div class="short-description-text col-sm-7">
              <p>Meu PC não roda Minecraft :(</p>
            </div>
            <div class="description-platform col-sm-5">
              <img src="src/images/platforms/playstation.png" alt="">
              <img src="src/images/platforms/steam.png" alt="">
            </div>
          </div>
        </div>
        <div class="cards-back">
          <h3 class="game-name">Minecraft</h3>
          <p class="description-text">
            Construa qualquer coisa que você possa imaginar, descubra mistérios perturbadores e sobreviva à noite no
            melhor jogo sandbox. O Minecraft é diferente cada vez que você o joga e aventuras inesquecíveis esperam por
            você em cada esquina. Explore e construa seu caminho em um mundo infinito que você pode moldar de acordo com
            sua vontade, um bloco de cada vez.
          </p>
        </div>
      </div>
    `
    carousel.innerHTML += cardsHtml
}