
// Function to handle the sign-in process
function signIn() {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value;
  const password = passwordInput.value;

  // Perform email format validation
  if (!isValidEmail(email)) {
    alert('Invalid email format. Please enter a valid email address.');
    return;
  }

  // Perform your additional sign-in validation here
  // For simplicity, let's assume the email and password are correct
  if (email && password) {
    // Now, make the API call to restDB
    sendToRestDB(email, password);
    closeSignInModal();

  } else {
    alert('Invalid email or password. Please try again.');
  }
}

// Function to send data to restDB
function sendToRestDB(email, password) {
  const APIKEY = "65966cba603c3c467f8b31d4";
  const settings_Post = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache"
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  };

  fetch("https://interactivedev-4c4e.restdb.io/rest/gamedata", settings_Post)
    .then(res => {
      if (!res.ok) {
        throw Error("Error occurred");
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      // Additional logic after successful API call
    })
    .catch(error => {
      console.error('Error sending data to restDB:', error);
    });
}


// Function to close the sign-in modal
function closeSignInModal() {
  const signInModal = document.getElementById('signInModal');
  signInModal.classList.remove('open');
}

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


// Show sign-in modal on page load
document.addEventListener('DOMContentLoaded', () => {
  const signInModal = document.getElementById('signInModal');
  signInModal.classList.add('open');

  // Attach event listener to the "Sign In" button
  const signInBtn = document.getElementById('signInBtn');
  signInBtn.addEventListener('click', signIn);
});

// Add this function to close the sign-in modal when close button is clicked
document.addEventListener('DOMContentLoaded', () => {
  const closeSignInModalBtn = document.getElementById('closeSignInModal');
  closeSignInModalBtn.addEventListener('click', closeSignInModal);
});

function drawCards() {
  const deckButton = document.getElementById('deck');
  const overlay = document.getElementById('loadingOverlay');

  // Clear the inner HTML of the deck button and append the Lottie animation to the overlay
  overlay.innerHTML = '<dotlottie-player id="lottieAnimation" src="https://lottie.host/8cc8fe6f-e5a0-4935-aa22-0a72fd3f61a7/5FczAEXp3y.json" background="transparent" speed="1" style="width: 100vw; height: 100vh;" autoplay></dotlottie-player>';
  overlay.style.display = 'block';

  // Fetch 9 cards from the Deck of Cards API
  fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=9')
    .then(response => response.json())
    .then(data => {
      // Handle the data (e.g., extract the cards)
      const cards = data.cards.slice(0, 3); // Select 3 cards randomly
      displayCards(cards);

      const viewDetailsBtn = document.getElementById('viewDetailsBtn');
      viewDetailsBtn.style.display = 'block';

      // Stop the Lottie animation
      const lottieAnimation = document.getElementById('lottieAnimation');
      if (lottieAnimation) {
        lottieAnimation.stop();
      }
    })
    .catch(error => {
      console.error('Error fetching cards:', error);
    })
    .finally(() => {
      // Delayed removal of loading overlay after 3 seconds
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 2000);
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
