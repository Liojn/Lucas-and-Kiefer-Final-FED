![image](https://github.com/Liojn/Lucas-and-Kiefer-Final-FED/assets/149935970/f2392884-5cc5-47a3-a948-679464936fdb)# Cards of Chaos
Welcome to Cards of Chaos, an immersive gaming experience where fate is in your hands. Dive into a world of magic and mystery as you embark on a thrilling adventure across three distinct realms. Upon signing in, players draw three cards, each holding the power to transport them to one of three unique worlds: a verdant grassland teeming with life, a foreboding cave filled with ancient secrets, or a dark netherworld haunted by sinister forces.

Once transported, players harness magical abilities, from unleashing fiery jets to wielding their bare fists, to conquer the realm's formidable boss and earn their ticket home. Whether battling a colossal plant guardian in the lush grass world, facing off against a formidable stone golem deep within the cavernous depths, or braving the relentless onslaught of minions in the grim netherworld, every encounter promises excitement and challenge. With Cards of Chaos, adventure awaits at every turn—do you dare to seize it?

## Design Process
Designing Cards of Chaos was a journey fueled by the desire to create an engaging and memorable experience tailored specifically for teenagers around the age of 17. Understanding the target audience was crucial in shaping every aspect of the game, from its overall theme and storyline to the mechanics and user interface. Teenagers at this age seek entertainment that is not only fun and enjoyable but also offers a sense of adventure and excitement. With this in mind, our project aimed to deliver a unique and creative gaming experience that would captivate and immerse players into fantastical worlds filled with magic and mystery.

User Stories:

- As a teenage gamer, I want to escape reality and embark on thrilling adventures, so that I can experience excitement and adventure from the comfort of my own home.

- As a fan of fantasy games, I want to explore diverse and immersive worlds filled with magical creatures and challenges, so that I can feel fully immersed in the game environment.

- As a player seeking challenges, I want to face formidable bosses and overcome obstacles, so that I can experience a sense of accomplishment and progress within the game.

- As a social gamer, I want to compete with my friends and see who can defeat bosses faster, so that I can enjoy a sense of camaraderie and friendly competition.

- As a teenager with a busy schedule, I want a game that offers quick and engaging gameplay sessions, so that I can enjoy gaming without feeling overwhelmed by time commitments.


## Features 
### Existing features
- Feature 1: User Sign-In: Allows users to create an account and log in to access the game, providing a personalized experience.
- Feature 2: Card Drawing Mechanism: Enables users to draw three cards upon signing in, determining their destination within the game's worlds.
- Feature 3: World Selection: Presents users with the choice of three distinct worlds to explore, each offering unique challenges and environments.
- Feature 4: Magical Abilities: Grants users access to a variety of magical abilities, such as melee attacks and flame jets, to aid them in their quest to defeat bosses.
- Feature 5: Boss Battles: Challenges users to confront and defeat formidable bosses within each world, requiring strategy and skill to emerge victorious.
  
### Features Left to implement
- Feature 6:  Multiplayer Mode: Introduce a multiplayer option that allows users to team up with friends or compete against each other in boss battles, enhancing the social aspect of the game.
- Feature 7:  Customization Options: Implement customization features that allow users to personalize their characters' appearance and abilities, adding depth to the gameplay experience.
- Feature 8:  Endless Mode: Introduce an endless mode where players can continuously face waves of enemies and bosses, testing their skills and endurance.
- Feature 9: Community Challenges: Create community-driven challenges and events where players can collaborate or compete to earn rewards and recognition within the game.

## Technologies Used
- HTML
- CSS
- JavaScript
- RestDB, used for the storing and updating of data. Such as the Sign In Page and Leaderboard (https://restdb.io/)
- LottieFiles, used for animation such as the Loading bar (https://lottiefiles.com/)

## Testing
- Sign In Form: i.) Run the index.html page, make sure sign in pop up appears. ii.) Enter an invalid email make sure it dosen't create an acc. iii.) Enter a valid email but wrong password make sure it dosen't sign me in. iv) Enter a valid email and password, make sure it sends the data to restDB to store.

- Draw 3 cards: i.) Click draw 3 cards to make sure skull lottie runs then make sure that it actually draws 3 random cards.
- Travel: i) Click travel and make sure that the loading lottie animation completes before it travels to the world corresponding to the 3 random cards logic.
  Interesting bug: Sometimes the Loading bar animation dosen't run when you first open VS code and run the html. error: [dotLottie-common]: Player unable to play whilst loading.
  
- Leaderboard: i) Click leaderboard, make sure that it shows the person with most bosses defeated as the highest rank.
- Worlds: i) Walk around the world, make sure don't fall of map ii) Make sure when arrow key up is pressed at portal bring to boss room. iii.) After boss defeated, change to end cutscene. iv) OR if player is defeated, show game over screen
- Character: i) Once in a world, Press arrow keys to make sure it moves the character in that direction. ii) Press Q to make sure that a flame jet attack is fireed. iii) Press E to make sure that melee attack is done.
- index html: i) Make sure by press any key, brings to cutscene.html
- cut scene: i) Make sure that press any key brings you to main.html
- Game over: i) Make sure that press any key brings you to cutscene.html
- End Cut scene: i) Make sure that press any key brings you to cutscene.html
- Responsiveness: i) Make sure that all html pages work even when minimised.

  ## Credits
  ### Content
  - Nothing compied
  ### Media
  - main.html background: https://www.deviantart.com/zedotagger/art/Dark-Souls-Altar-of-Sunlight-544007250
  - arrows.png & up.png: https://pngtree.com/freepng/keyboard-stereo-shadow-arrow-keys_7260322.html
  - All graveyard & sprites: https://itch.io/
  - All player sprites & Plant boss: https://craftpix.net/
  - Cave Environment & Cave Boss: https://itch.io/
  - Forest environment: Unity 2D asses store
  - Loop_Portal.webp: https://nuclear-throne.fandom.com/wiki/Pickups_and_Props?file=Loop_Portal.gif
  - 8-bit RPG Music Boss Battle: https://www.youtube.com/watch?v=NzFKyZc_va4
  - 8-bit RPG Music Cave Themehttps: //www.youtube.com/watch?v=YN40UybSLO4
  - xDeviruchi - And The Journey Begins & xDeviruchi - Decisive Battle: https://xdeviruchi.itch.io/8-bit-fantasy-adventure-music-pack
  - TitleScreen.gif: https://kryssalian.artstation.com/projects/nEq3K9
  - wizardEndCutscene.png & wizardCustscene.jpg: https://creator.nightcafe.studio/
  - Portal1.png & Portal2.png: https://.itch.io/





