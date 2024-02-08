let canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// canvas.width = 90*16
// canvas.height = 320

let parseCollisions 
let collisionBlocks 
let background
let doors 
//declares player values like animations, image, position and hitbox
const player = new Player({
  position: {
    x: 200,
    y: 200,
  },
  hitbox:{
    offset:{
      x:40,
      y:50,
    },
    width:25,
    height:80,
  },
    imageSrc: './Fire vizard/Idle.png',
    frameRate: 7,
    animations:{
        idleRight:{
            frameRate: 7,
            frameBuffer: 8,
            loop: true,
            imageSrc: './Fire vizard/Idle.png',
            reverseSprite: false,
        },
        idleLeft:{
            frameRate: 7,
            frameBuffer: 8,
            loop: true,
            imageSrc: './Fire vizard/IdleLeft.png',
            reverseSprite:true,
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 8,
            loop: true,
            imageSrc: './Fire vizard/Run.png',
            reverseSprite:false,
        },
        runLeft: {  
            frameRate: 8,
            frameBuffer: 8,
            loop: true,
            imageSrc: './Fire vizard/runLeft.png',
            reverseSprite:true,
        },
        takeHit:{
            frameRate: 3,
            frameBuffer: 8,
            loop: false,
            imageSrc: './Fire vizard/Hurt.png',
            reverseSprite:false,
            onComplete: () => {
                console.log('completed animation')
                //fades background to black on completion increase level by 1 bringing you to level 2
                gsap.to(overlay, {
                  opacity: 1,
                  onComplete: () => {
                    document.getElementById("my_audio1").pause()
                    document.getElementById("my_audio").play();
                    level++
                    levels[level].init()
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
          imageSrc:'./Fire vizard/Attack_1.png',
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
          imageSrc:'./Fire vizard/Attack_1Left.png',
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
          imageSrc:'./Fire vizard/Flame_jet.png',
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
          imageSrc:'./Fire vizard/Flame_jetLeft.png',
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
          imageSrc:'./Fire vizard/Dead.png',
          reverseSprite:false,
        }

    },  
})


//declares enemy values like animations(attacks/walking), hitbox and position
const enemy = new Enemy({
  player: player,
  scale:1.75,
    imageSrc: './1/Idle.png',
    frameRate: 4,
    position:{
      x:750,
      y:400,
    },
    hitbox:{
      offset:{
        x:15,
        y:77,
      },
      width:140,
      height:90,
    },
    animations:{
        idleRight:{
            frameRate: 4,
            frameBuffer: 8,
            loop: true,
            imageSrc: './1/IdleRight.png',
            reverseSprite: true,
        },
        idleLeft:{
            frameRate: 4,
            frameBuffer: 8,
            loop: true,
            imageSrc: './1/Idle.png',
            reverseSprite:false,
        },
        runRight: {
            frameRate: 6,
            frameBuffer: 8,
            loop: true,
            imageSrc: './1/WalkRight.png',
            reverseSprite:true,
        },
        runLeft: {  
            frameRate: 6,
            frameBuffer: 8,
            loop: true,
            imageSrc: './1/Walk.png',
            reverseSprite:false,
        },
        takeHit:{
            frameRate: 4,
            frameBuffer: 5,
            loop: false,
            imageSrc: './1/Hurt.png',
            reverseSprite:false,
        },
        Attack:{
          frameRate:6,
          frameBuffer:6,
          loop:true,
          imageSrc:'./1/Attack1Right.png',
          reverseSprite:true,
          attackBox:{
            offset: {
              x: 75,
              y: 110,
            },
            width: 90,
            height: 50,
          }
        },
        AttackLeft:{
          frameRate:6,
          frameBuffer:6,
          loop:true,
          imageSrc:'./1/Attack1.png',
          reverseSprite:false,
          attackBox:{
            offset: {
              x: 0,
              y: 110,
            },
            width: 90,
            height: 50,
          }
        },
        FlameJet:{
          frameRate:6,
          frameBuffer:6,
          loop:true,
          imageSrc:'./1/Attack2Right.png',
          reverseSprite:true,
          attackBox:{
            offset: {
              x: 75,
              y: 110,
            },
            width: 90,
            height: 50,
          }
        },
        FlameJetLeft:{
          frameRate:6,
          frameBuffer:6,
          loop:true,
          imageSrc:'./1/Attack2.png',
          reverseSprite:false,
          attackBox:{
            offset: {
              x: 0,
              y: 110,
            },
            width: 90,
            height: 50,
          }
        },
        Death:{
          frameRate:6,
          frameBuffer:5,
          loop:false,
          imageSrc:'./1/Death.png',
          reverseSprite:false,
        },


    },  
})


//declares all variables from html page
var displayTextElement = document.getElementById('healthbar');
var victoryElement = document.getElementById('displayText')
const healthBar = document.getElementById("healthbar");
var audio = document.getElementById('my_audio')
var audio1 = document.getElementById('audio')
var tip = document.getElementById('Tips')


let level = 1
//contains all data about each level including width and level collision box data
let levels = {
  1: {
    init: () => {
      canvas.width = 90*16;
      canvas.height = 20*16; //320
      parseCollisions = collisionlevel1.parse2D()
      collisionBlocks = parseCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './newmap(1).png',
      })




      doors = [
        new Sprite({
          position: {
            x: 82*16,
            y: 170,
          },
          imageSrc: './Portal2.png',
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
      parseCollisions = collisionlevel2.parse2D1()
      collisionBlocks = parseCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      enemy.collisionBlocks = collisionBlocks
      player.position.x = 100
      player.position.y = 100

      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './bossMap.png',
      })
    },
  },
}
levels[level].init()

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


const overlay = {
  opacity: 0 // Set the initial opacity to 0 (fully transparent)
};
//declare camera constant

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
    c.translate(camera.position.x, 0)//updates canva based on camera position
    background.draw()
    player.update()
    const playerAttack = player.handleInput(keys,camera)
    player.draw()
    if (player.isAttacking) {
      player.isAttacking = false
    }
    doors.forEach(door=>{//draw doors
      door.draw()
    })
    c.restore()
    displayTextElement.style.display = 'none';//dont display healthbar
    tip.style.display = 'block';//display tips
  }
  else if(level == 2&&!player.dead&&!enemy.dead){
    c.save()
    c.translate(camera.position.x, 0)
    tip.style.display = 'none'//dont display tips
    background.draw()
    player.update()
    const playerAttack = player.handleInput(keys,camera)
    console.log(playerAttack)
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
    const enemyAttack =enemy.handleInput(keys)
    enemy.draw()
    enemy.update()
    displayTextElement.style.display = 'block';
    //sets healthbar width based on window width
    if (window.innerWidth>background.image.width){
      healthBar.style.width = `${background.width}px`;
    }
    else{
      healthBar.style.width = `${window.innerWidth}px`;
    }
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
        victoryElement.style.display = 'block'
      }
      enemy.isAttacking = false
    }
    player.draw()

    c.restore()
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



