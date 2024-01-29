// ... (your existing JavaScript code) ...

function drawCards() {
  // Fetch 9 cards from the Deck of Cards API
  fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=9')
    .then(response => response.json())
    .then(data => {
      // Handle the data (e.g., extract the cards)
      const cards = data.cards.slice(0, 3); // Select 3 cards randomly
      displayCards(cards);

      // Show the "View Details" button
      const viewDetailsBtn = document.getElementById('viewDetailsBtn');
      viewDetailsBtn.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching cards:', error);
    });
}

function Travel() {
  // Redirect to another JavaScript page or perform other actions
}

function displayCards(cards) {
  const cardsContainer = document.getElementById('cards');
  cardsContainer.innerHTML = '';

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    const cardImage = document.createElement('img');
    cardImage.src = card.image;
    cardElement.appendChild(cardImage);
    cardsContainer.appendChild(cardElement);
  });
}



const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const Instructions = document.getElementById("modal");

openBtn.addEventListener("click" , () => {
  Instructions.classList.add("open");
});

closeBtn.addEventListener("click", () =>{
  Instructions.classList.remove("open")
})


