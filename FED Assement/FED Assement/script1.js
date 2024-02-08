let canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


let parseCollisions 
let collisionBlocks 

let background
let doors 
const projectileCanvas = document.createElement('canvas');
//declares player values like animations, image, position and hitbox
const player = new Player({
  position: {
    x: 200,
    y: 400,
  },
  hitbox:{
    offset:{
      x:40,
      y:60,
    },
    width:25,
    height:70,
  },
    imageSrc: './Game Assets/Fire vizard/Idle.png',
    frameRate: 7,
    animations:{
        idleRight:{
            frameRate: 7,
            frameBuffer: 8,
            loop: true,
            imageSrc: './Game Assets/Fire vizard/Idle.png',
            reverseSprite: false,
        },
        idleLeft:{
            frameRate: 7,
            frameBuffer: 8,
            loop: true,
            imageSrc: './Game Assets/Fire vizard/IdleLeft.png',
            reverseSprite:true,
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 8,
            loop: true,
            imageSrc: './Game Assets/Fire vizard/Run.png',
            reverseSprite:false,
        },
        runLeft: {  
            frameRate: 8,
            frameBuffer: 8,
            loop: true,
            imageSrc: './Game Assets/Fire vizard/runLeft.png',
            reverseSprite:true,
        },
        takeHit:{
            frameRate: 3,
            frameBuffer: 8,
            loop: false,
            imageSrc: './Game Assets/Fire vizard/Hurt.png',
            reverseSprite:false,
            onComplete: () => {
                console.log('completed animation')
                //fades background to black on completion increase level by 1 bringing you to level 2
                gsap.to(overlay, {
                  opacity: 1,
                  onComplete: () => {
                    level++
                    document.getElementById("my_audio1").pause()
                    document.getElementById("my_audio").play();
                    levels[level].init()
                    camera.position.x = 0
                    player.preventInput = false
                    camera.position.x = 0
                    gsap.to(overlay, {
                      opacity: 0,
                    })
                  },
                })
              },
        },
        Attack:{
          frameRate:4,
          frameBuffer:8,
          loop:true,
          imageSrc:'./Game Assets/Fire vizard/Attack_1.png',
          reverseSprite:false,
          attackBox:{
            offset: {
              x: 75,
              y: 75,
            },
            width: 40,
            height: 40,
          },
          attack: 'Attack'
        },
        AttackLeft:{
          frameRate:4,
          frameBuffer:8,
          loop:true,
          imageSrc:'./Game Assets/Fire vizard/Attack_1Left.png',
          reverseSprite:true,
          attackBox:{
            offset: {
              x: 10,
              y: 75,
            },
            width: 40,
            height: 40,
          },
          attack: 'AttackLeft'
        },
        FlameJet:{
          frameRate:14,
          frameBuffer:5,
          loop:true,
          imageSrc:'./Game Assets/Fire vizard/Flame_jet.png',
          reverseSprite:false,
          attackBox:{
            offset: {
              x: 50,
              y: 70,
            },
            width: 85,
            height: 30,
          },
          attack: 'FlameJet'
        },
        FlameJetLeft:{
          frameRate:14,
          frameBuffer:5,
          loop:true,
          imageSrc:'./Game Assets/Fire vizard/Flame_jetLeft.png',
          reverseSprite:true,
          attackBox:{
            offset: {
              x: -5,
              y: 70,
            },
            width: 85,
            height: 30,
          },
          attack: 'FlameJetLeft'
        },
        Death:{
          frameRate:6,
          frameBuffer:6,
          loop:false,
          imageSrc:'./Game Assets/Fire vizard/Dead.png',
          reverseSprite:false,
        }

    },  
})
//creates class for projectiles and its constructors with objects like attackBox, velocity and ImageSrc
class Projectile{
  constructor({position, velocity, ImageSrc}){
    this.position = position
    this.velocity = velocity
    this.image = new Image()
    this.image.onload = () => {
      this.loaded = true
      this.width = this.image.width
      this.height = this.image.height
    }
    this.image.src = ImageSrc
    this.radius = 3
    // Define hitbox properties
    this.attackBox = {
        offset: { x: 100, y: 50 }, // Offset relative to the projectile position
        width: 80, 
        height: 30 
    };
  }

  draw(){
    if (!this.loaded) return; // Wait until the image is loaded
    c.drawImage(this.image, this.position.x, this.position.y, this.width*1.75, this.height*1.75);
    // c.fillStyle = 'rgba(255, 0, 0, 0.5)';
    // c.fillRect(
    //     this.position.x+this.attackBox.offset.x,
    //     this.position.y+this.attackBox.offset.y,
    //     this.attackBox.width,
    //     this.attackBox.height
    // );
  }
  update(){//updates player position by applying velocity to it 
    this.draw()
    this.position.x+=this.velocity.x
    this.position.y+= this.velocity.y
    // Update hitbox position based on projectile position
    this.attackBox.position = {
      x: this.position.x + this.attackBox.offset.x,
      y: this.position.y + this.attackBox.offset.y
  };
  }
}





//declares enemy values like animations, image, position and hitbox
const enemy = new Enemy({
    player: player,
    scale:1.75,
      imageSrc: './Game Assets/bitfuul-images/image1x1.png',
      frameRate: 4,
      position:{
        x:0,
        y:300,
      },
      hitbox:{
        offset:{
          x:40,
          y:30,
        },
        width:90,
        height:100,
      },
      animations:{
          idle:{
              name:'idle',
              frameRate: 4,
              frameBuffer: 8,
              loop: true,
              imageSrc: './Game Assets/bitfuul-images/image1x1.png',
              reverseSprite: false,
          },
          Attack:{
            name:'Attack',
            frameRate:7,
            frameBuffer:7,
            loop:true,
            imageSrc:'./Game Assets/bitfuul-images/image1x5.png',
            reverseSprite:false,
            attackBox:{
              offset: {
                x: 110,
                y: 50,
              },
              width: 50,
              height: 90,
            }
          },
          Laser:{
            name:'Laser',
            frameRate:9,
            frameBuffer:9,
            loop:false,
            imageSrc:'./Game Assets/bitfuul-images/image1x3.png',
            reverseSprite:false,
            attackBox:{
              offset: {
                x: 110,
                y: 40,
              },
              width: 30,
              height: 30,
            }
          },
          Death:{
            name:'Death',
            frameRate:9,
            frameBuffer:9,
            loop:false,
            imageSrc:'./Game Assets/bitfuul-images/image1x8.png',
            reverseSprite:false,
          },
          GroundSlam:{
            name:'GroundSlam',
            frameRate:10,
            frameBuffer:9,
            loop:true,
            imageSrc:'./Game Assets/bitfuul-images/image1x7.png',
            reverseSprite:false,
            attackBox:{
              offset: {
                x: 20,
                y: 100,
              },
              width: 120,
              height: 30,
            }
          }
  
  
      },  
  })
  
  
  //assigns html things like healthbars to a javascipt variable
  var displayTextElement = document.getElementById('healthbar');
  var victoryElement = document.getElementById('displayText')
  const healthBar = document.getElementById("healthbar");
  var tip = document.getElementById('Tips')







  
  let level = 1
  //contains all data about each level including width and level collision box data
  let levels = {
    1: {
      init: () => {
        canvas.width = 100*16;
        canvas.height = 60*16;
        parseCollisions = collisionCave.parse2D2()
        collisionBlocks = parseCollisions.createObjectsFrom2D1()
        player.collisionBlocks = collisionBlocks
        if (player.currentAnimation) player.currentAnimation.isActive = false
  
        background = new Sprite({
          position: {
            x: 0,
            y: 0,
          },
          imageSrc: './Game Assets/Cave World/caveenvironment.png',
        })
  
        doors = [
          new Sprite({
            position: {
              x: 87*16,
              y: 635,
            },
            imageSrc: './Images/Portal2.png',
            frameRate: 6,
            frameBuffer: 5,
            loop: true,
            autoplay:true,
          }),
        ]
      },
    },
    2: {
      init: () => {
          canvas.width = 70*16
          canvas.height = 40*16
        parseCollisions = collsionCaveBoss.parse2D1()
        collisionBlocks = parseCollisions.createObjectsFrom2D2()
        player.collisionBlocks = collisionBlocks
        enemy.collisionBlocks = collisionBlocks
        player.position.x = 500
        player.position.y = 300
  
        if (player.currentAnimation) player.currentAnimation.isActive = false
  
        background = new Sprite({
          position: {
            x: 0,
            y: 0,
          },
          imageSrc: './Game Assets/Cave World/cavebossroom.png',
        })
      },
    },
  }
  levels[level].init()  
//creates  a projectile array containing projectile objects
const projectiles =[new Projectile({
  position:{
    x:0,
    y:300,
  },
  velocity:{
    x:10,
    y:0,
  },
  ImageSrc: "./Game Assets/Mecha-stone Golem 0.1/weapon PNG/arm_projectile.png"
})]
  
  //declaring all keys used
  const keys = {
      ArrowUp:{
          pressed:false
      },
      ArrowLeft:{
          pressed:false
      },
      ArrowRight:{
          pressed:false
      },
      e:{
        preseed:false
      },
      q:{
        pressed:false
      }
  }
  //function to detect collision between attackbox and hitbox, return true if collision detected
  function rectangularCollision({ rectangle1,rectangle2 }) {
    return (
      rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
        rectangle2.hitbox.position.x &&
      rectangle1.attackBox.position.x <=
        rectangle2.hitbox.position.x + rectangle2.hitbox.width &&
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
        rectangle2.hitbox.position.y &&
      rectangle1.attackBox.position.y <= rectangle2.hitbox.position.y + rectangle2.hitbox.height
    )
  }
  
  function determineWinner({ player, enemy}) {
    if (player.health === enemy.health) {
      document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (enemy.health <= 0) {
      document.querySelector('#displayText').innerHTML = 'Player Wins'
    } else if (player.health <= 0) {
      document.querySelector('#displayText').innerHTML = 'Boss Wins'
    }
  }
  //overlay is transparent
  const overlay = {
      opacity:0,
  }
  //declares camera constant
  const camera = {
    position:{
      x:0,
      y:0,
    }
  }
  function animate(){
      window.requestAnimationFrame(animate)
      c.fillStyle = 'black'
      c.fillRect(0, 0, canvas.width, canvas.height)
      if (level == 1){
        c.save()
        c.translate(camera.position.x, -200)//updates canvas based on camera position
        background.draw()
        player.update()
        const playerAttack = player.handleInput(keys,camera)
        player.draw()
        if (player.isAttacking) {
          player.isAttacking = false
        }
        doors.forEach(door=>{
          door.draw()
        })
        tip.style.display = 'block'
        c.restore()
      }
      else if(level == 2){
        c.save()
        tip.style.display = 'none'
        c.translate(camera.position.x, 0)//updates canvas based on camera position
        background.draw()
        player.update()
        const playerAttack = player.handleInput(keys,camera)
        player.draw()
              //if player misses not counted as attack
      if (player.isAttacking == true&&
        !rectangularCollision({
            rectangle1: playerAttack,
            rectangle2: enemy,
        })) {
        player.isAttacking = false
      }
      //if player hits counted as attack and enemy health is reduced
      if (player.isAttacking == true&&
        rectangularCollision({
            rectangle1: playerAttack,
            rectangle2: player,
        })
      ){
        enemy.takeHit();
        if (enemy.health <= 0) {
          determineWinner({ player, enemy})
          victoryElement.style.display = 'block'
  
        }
        player.isAttacking = false
      }
        doors.forEach(door=>{
          door.draw()
        })
        enemy.draw()
        enemy.update()
        c.restore()
      }

       //Loads boss momster and relevant collision detection
       if (level == 2&&!player.dead&&!enemy.dead){

        displayTextElement.style.display = 'block';
        if (window.innerWidth>background.image.width){
          healthBar.style.width = `${canvas.width}px`;
        }
        else{
          healthBar.style.width = `${window.innerWidth}px`;
        }
        const enemyAttack =enemy.handleInput(keys)
        //if enemy misses not counted as attack
        if (enemy.isAttacking == true&&
          !rectangularCollision({
              rectangle1: enemyAttack,
              rectangle2: player,
          })) {
          enemy.isAttacking = false
        }
        //if enemy hits counted as attack and player health reduced
        if (enemy.isAttacking == true&&
          rectangularCollision({
              rectangle1: enemyAttack,
              rectangle2: player,
          })
        ){
          player.takeHit();
          if (player.health <= 0) {
            determineWinner({ player, enemy})
          }
          enemy.isAttacking = false
        }
        //if enemy is shooting projectile
        if (enemyAttack.name == 'Laser'){
        projectiles.forEach(projectile =>{
          projectile.update()//updates projectile to give it speed
          //checks for collision between projectile and player
          if (
            rectangularCollision({
                rectangle1: projectile,
                rectangle2: player,
            })
          ){
            player.takeHit();
            if (player.health <= 0) {
              determineWinner({ player, enemy})
              victoryElement.style.display = 'block'
            }
            enemy.isAttacking = false
          }
          //spawns new projectile once old projectile reaches end of screen
          if (projectile.position.x >= canvas.width) {
            // Remove the projectile from the array
            projectiles.splice(projectiles.indexOf(projectile), 1);
            // Spawn a new projectile
            projectiles.push(new Projectile({
                position:{
                    x: 0, // Adjust the starting position as needed
                    y: 300,
                },
                velocity:{
                    x: 10,
                    y: 0,
                },
                ImageSrc: "./Game Assets/Mecha-stone Golem 0.1/weapon PNG/arm_projectile.png"
            }))          
        }
        })
      }
       }
       else{
        displayTextElement.style.display = 'none';
       }

      c.save()
      c.globalAlpha = overlay.opacity
      c.fillStyle = 'Black'
      c.fillRect(0,0,canvas.width,canvas.height)
      c.restore()
  }
  animate()