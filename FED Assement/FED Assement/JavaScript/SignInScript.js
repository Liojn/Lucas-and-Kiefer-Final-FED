let world;
// Function to handle the sign-in process
async function signIn() {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value;
  const password = passwordInput.value;

  // Check if the email is valid
  if (!isValidEmail(email)) {
    alert('Invalid email format. Please enter a valid email address.');
    return;
  }

  try {
    // Check if the email exists in restDB
    const userData = await getUserData(email);
    if (userData) {
      // Email exists, check password
      if (password === userData.password) {
        // Password matches, allow login
        closeSignInModal();
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
      } else {
        // Password doesn't match
        alert('Incorrect password. Please try again.');
      }
    } else {
      // Email does not exist, sign up the user
      await signUp(email, password);
      // Proceed with login after sign up
      closeSignInModal();
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', password);
    }
  } catch (error) {
    console.error('Error signing in:', error);
    alert('An error occurred while signing in. Please try again later.');
  }
}

// Function to sign up the user by sending data to restDB
async function signUp(email, password) {
  const APIKEY = "65966cba603c3c467f8b31d4";
  const settings_Post = { // seting to post 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache"
    },
    body: JSON.stringify({
      email: email,
      password: password,
      bossDefeated: 0,
    })
  };

  const response = await fetch("https://interactivedev-4c4e.restdb.io/rest/gamedata", settings_Post);
  if (!response.ok) {
    throw new Error('Error signing up');
  }
}

// Function to get user data from restDB based on email
async function getUserData(email) {
  const APIKEY = "65966cba603c3c467f8b31d4";
  const settings_Get = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache"
    }
  };

  const response = await fetch(`https://interactivedev-4c4e.restdb.io/rest/gamedata?q={"email":"${email}"}`, settings_Get);
  if (!response.ok) {
    throw new Error('Error getting user data');
  }
  const userData = await response.json();
  return userData.length > 0 ? userData[0] : null;
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

  const overlay = document.getElementById('loadingOverlay');

  // Clear the inner HTML of the deck button and append the Lottie animation to the overlay
  overlay.innerHTML = '<dotlottie-player id="lottieAnimation" src="https://lottie.host/008071dc-aeba-4b1c-a3d5-bd48f2797465/q81eoGd9hp.json" background="transparent" speed="1" style="width: 100vw; height: 100vh;" autoplay></dotlottie-player>';
  overlay.style.display = 'block';

  // Fetch 9 cards from the Deck of Cards API
  fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=9')
    .then(response => response.json())
    .then(data => {
      // Handle the data (e.g., extract the cards)
      const cards = data.cards.slice(0, 3); // Select 3 cards randomly

      const cardValues = cards.map(card => card.value);
      console.log(cardValues);
      world = determineWorld(cardValues);
  

      displayCards(cards);

      const viewDetailsBtn = document.getElementById('viewDetailsBtn');
      viewDetailsBtn.style.display = 'block';


      const lottieAnimation = document.getElementById('lottieAnimation');
      if (lottieAnimation) {
        lottieAnimation.stop();
      }
    })
    .catch(error => {
      console.error('Error fetching cards:', error);
    })
    .finally(() => {

      setTimeout(() => {
        overlay.style.display = 'none';
      }, 2000);
    });
}
// Determining which world you got to
function determineWorld(cardValues) {
  if (cardValues.includes('JACK') || cardValues.includes('QUEEN')) {
    return 'graveyard.html';
  } else if (cardValues.includes('ACE') || cardValues.includes('KING')) {
    return 'assesment.html';
  } else {
    return 'caveEnvironment.html';
  }
}

function Travel() {
  const fadeOverlay = document.createElement('div');
  fadeOverlay.classList.add('fade-overlay');
  document.body.appendChild(fadeOverlay);

  // Create the Lottie animation element
  const lottieAnimation = document.createElement('dotlottie-player');
  lottieAnimation.src = "https://lottie.host/4d4a9859-3727-40bb-a2c2-ace3a7643669/cKeyCbL7v9.json";
  lottieAnimation.style.width = "300px";
  lottieAnimation.style.height = "300px";
  lottieAnimation.style.display = "block";

  // Create a container for the Lottie animation and center it
  const lottieContainer = document.createElement('div');
  lottieContainer.classList.add('lottie-container');
  lottieContainer.appendChild(lottieAnimation);

  // Append the Lottie animation container to the fade overlay
  fadeOverlay.appendChild(lottieContainer);
  
  lottieAnimation.addEventListener('dotLottieLoadError', () => {
    // If there's an error loading the animation, redirect to a new HTML page
    window.location.href = world; 
  });

  // Manually trigger the play method after a short delay
  setTimeout(() => {
    lottieAnimation.play();
  }, 100);

  // Listen for the animation complete event
  lottieAnimation.addEventListener('complete', () => {
    // Redirect to the determined world
    window.location.href = world; // Replace "world.html" with the URL of your destination page
    fadeOverlay.remove(); // Remove the fade overlay after the animation completes
  });
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


// Function to fetch leaderboard data from restDB
async function fetchLeaderboard() {
  const APIKEY = "65966cba603c3c467f8b31d4";
  const settings_Get = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache"
    }
  };

  try {
    const response = await fetch("https://interactivedev-4c4e.restdb.io/rest/gamedata", settings_Get);
    if (!response.ok) {
      throw new Error("Error fetching leaderboard data");
    }
    const leaderboardData = await response.json();

    // Sort leaderboard data based on number of bosses defeated in descending order
    leaderboardData.sort((a, b) => b.bossDefeated - a.bossDefeated);

    return leaderboardData;
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return null;
  }
}

function displayLeaderboard(leaderboardData) {
  const modal = document.getElementById("leaderboardModal");
  const modalContent = document.getElementById("leaderboardContent");

  // Clear previous content
  modalContent.innerHTML = "";

  // Create a div for the "Top 10 Players!" text
  const topText = document.createElement("div");
  topText.textContent = "Top 10 Players!";
  topText.classList.add("top-text");
  modalContent.appendChild(topText);

  // Create leaderboard table
  const table = document.createElement("table");
  table.classList.add("leaderboard-table");

  // Create table header
  const tableHeader = document.createElement("thead");
  tableHeader.innerHTML = `
    <tr>
      <th>Rank</th>
      <th>Email</th>
      <th>Bosses Defeated</th>
    </tr>
  `;
  table.appendChild(tableHeader);

  // Create table body
  const tableBody = document.createElement("tbody");
  // Loop through the first 10 elements of leaderboardData
  for (let i = 0; i < Math.min(leaderboardData.length, 10); i++) {
    const player = leaderboardData[i];
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${player.email}</td>
      <td>${player.bossDefeated}</td>
    `;
    tableBody.appendChild(row);
  }
  table.appendChild(tableBody);

  modalContent.appendChild(table);

  modal.classList.add("open");
}


// Function to close the leaderboard popup modal
function closeLeaderboardModal() {
  const modal = document.getElementById("leaderboardModal");
  modal.classList.remove("open");
}

// Add event listener to the leaderboard button
const leaderboardBtn = document.getElementById("openLeaderboard");
leaderboardBtn.addEventListener("click", async () => {
  const leaderboardData = await fetchLeaderboard();
  if (leaderboardData) {
    displayLeaderboard(leaderboardData);
  } else {
    alert("Failed to fetch leaderboard data. Please try again later.");
  }
});

// Add event listener to close the leaderboard modal
const closeLeaderboardBtn = document.getElementById("closeLeaderboard");
closeLeaderboardBtn.addEventListener("click", closeLeaderboardModal);
