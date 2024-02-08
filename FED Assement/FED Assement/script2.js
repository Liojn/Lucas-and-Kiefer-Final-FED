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
    x: 0,
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
                    level = 2
                    levels[2].init()
                    camera.position.x = 0
                    player.preventInput = false
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
    imageSrc: './Graveyard images/graveyardIdle.png',
    frameRate: 4,
    position:{
      x:1000,
      y:300,
    },
    hitbox:{
      offset:{
        x:70,
        y:60,
      },
      width:50,
      height:100,
    },
    animations:{
        idleRight:{
            frameRate: 4,
            frameBuffer: 12,
            loop: true,
            imageSrc: './Graveyard images/graveyardIdle.png',
            reverseSprite: false,
        },
        idleLeft:{
            frameRate: 4,
            frameBuffer: 12,
            loop: true,
            imageSrc: './Graveyard images/graveyardIdle(Left).png',
            reverseSprite:true,
        },
        summon: {
            frameRate: 4,
            frameBuffer: 16,
            loop: true,
            imageSrc: './Graveyard images/graveyardSummon.png',
            reverseSprite:false,
        },
        summonLeft: {  
            frameRate: 4,
            frameBuffer: 16,
            loop: true,
            imageSrc: './Graveyard images/graveyardSummon(Left).png',
            reverseSprite:true,
        },
        Attack:{
          frameRate:6,
          frameBuffer:12,
          loop:true,
          imageSrc:'./Graveyard images/graveyardAttack(Left).png',
          reverseSprite:true,
          attackBox:{
            offset: {
              x: 0,
              y: 70,
            },
            width: 90,
            height: 70,
          }
        },
        Death:{
          frameRate:10,
          frameBuffer:5,
          loop:false,
          imageSrc:'./Graveyard images/graveyardDeath.png',
          reverseSprite:false,
        },
    },  
})
<<<<<<< HEAD
//drawing class for minion
=======
//new class sprite2 for minion class
>>>>>>> 94fa922819814188f96cb26ab4807ad152b21d96
class Sprite2 {
    constructor({
      position,
      imageSrc,
      frameRate = 1,
      animations,
      frameBuffer = 2,
      loop = false,
      autoplay = true,
      reverseSprite = true,
      scale = 1,
    }) {
      this.position = position
      this.image = new Image()
      this.image.onload = () => {
        this.loaded = true
        this.width = 128
        this.height = this.image.height
      }
      this.image.src = imageSrc
      this.loaded = false
      this.frameRate = frameRate
      this.currentFrame = 0
      this.elapsedFrames = 0
      this.frameBuffer = frameBuffer
      this.animations = animations
      this.loop = loop
      this.autoplay = autoplay
      this.currentAnimation
      this.reverseSprite = reverseSprite
      this.scale = scale
  
  
      if (this.animations) {
        for (let key in this.animations) {
          const image = new Image()
          image.src = this.animations[key].imageSrc
          this.animations[key].image = image
        }
      }
    }
    draw() { //draws minion sprite image
      if (!this.loaded) return
      const cropbox = {
        position: {
          x: this.width * this.currentFrame,
          y: 0,
        },
        width: this.width,
        height: this.height,
      }
      c.drawImage(
        this.image,
        cropbox.position.x,
        cropbox.position.y,
        cropbox.width,
        cropbox.height,
        this.position.x,
        this.position.y,
        this.width*this.scale,
        this.height*this.scale
      )
  
      this.updateFrames()
    }
  
    play() {
      this.autoplay = true
    }
  
    updateFrames() {
      if (!this.autoplay) return
  
      //updates frames by one from right to left(for mirrored sprite sheets)
      if (this.reverseSprite){
        this.elapsedFrames++
        if (this.elapsedFrames % this.frameBuffer === 0) {
          if (this.currentFrame > 0) this.currentFrame--
          else if (this.loop) this.currentFrame = this.frameRate-1
        }
    
        if (this.currentAnimation?.onComplete) {
          if (
            this.currentFrame === 0 &&
            !this.currentAnimation.isActive
          ) {
            this.currentAnimation.onComplete()
            this.currentAnimation.isActive = true
          }
        }
      }
      //updates frames by one from left to right until the last sprite image
      else if(this.reverseSprite == false){
        this.elapsedFrames++
        if (this.elapsedFrames % this.frameBuffer === 0) {
          if (this.currentFrame < this.frameRate - 1) this.currentFrame++
          else if (this.loop) this.currentFrame = 0
        }
    
        if (this.currentAnimation?.onComplete) {
          if (
            this.currentFrame === this.frameRate - 1 &&
            !this.currentAnimation.isActive
          ) {
            this.currentAnimation.onComplete()
            this.currentAnimation.isActive = true
          }
        }
      }
  
    
  
    }
  }


<<<<<<< HEAD
  //create new class called Minion with all its logic
=======
    //creates a new class called Minion where all logic is handled like collision detection and AI for the minion
>>>>>>> 94fa922819814188f96cb26ab4807ad152b21d96
    class Minion extends Sprite2 {
        constructor({ player,attack,scale,position,collisionBlocks = [], imageSrc, frameRate, animations, loop ,reverseSprite,attackBox = { offset: {}, width: undefined, height: undefined }, postion = {x:undefined,y:undefined},
          hitbox = { offset: {}, width: undefined, height: undefined }}) {
          super({ scale,position,imageSrc, frameRate, animations, loop ,reverseSprite})
          this.position = {
            x: position.x,
            y: position.y,
          } 
      
          this.velocity = {
            x: 0,
            y: 0,
          }
          this.sides = {
            bottom: this.position.y + this.height,
          }
          this.gravity = 1
      
          this.collisionBlocks = collisionBlocks
          this.health = 30,
          this.dead = false,
          this.attack = attack
          this.hitbox = hitbox
          this.isAttacking = false
          this.takeHitCooldown = 1; // Add a cooldown variable
          this.takeHitCooldownDuration = 1;
          this.player = player
        }
        update() {
          // this is the blue box
           //c.fillStyle = 'rgba(0, 0, 255, 0.5)'
           //c.fillRect(this.position.x, this.position.y, this.width, this.height)
          this.position.x += this.velocity.x
          this.updateHitbox()
          
          this.checkForHorizontalCollisions()
          this.applyGravity()
          this.updateHitbox()
          //Hitbox
        //   c.fillStyle = 'rgb(0,0,255,0.3)'
        //   c.fillRect(
        //     this.hitbox.position.x,
        //     this.hitbox.position.y,
        //     this.hitbox.width,
        //     this.hitbox.height
        //   )
          this.checkForVerticalCollisions()
          if (this.takeHitCooldown>0){
            this.takeHitCooldown-=1
          }
      
      
        }
        //handles minion logic based on player distance
        handleInput(keys){
          if(this.preventInput) return
          if (this.dead == false){
          if(player.position.x - this.position.x > 40&&this.position.x<=background.width-this.width-3){
              this.switchSprite("runRight")
              this.position.x += 1.5
              this.lastDirection = 'right'
              return {isAttacking: false}
      
           }
          else if(this.position.x - player.position.x>40 &&this.position.x>=3){
                  this.updateHitbox()
                  this.switchSprite('runLeft')
                  this.position.x -= 1.5
                  if(this.position.x < 250){
                    this.position.x = 250
                  }
                  this.lastDirection = 'left'
                  return {isAttacking: false}
      
           }
           else if(this.position.x - player.position.x<=40&player.position.x - this.position.x>0){
            this.switchSprite("Attack")
            const attackBox = this.updateAttackbox()
            this.isAttacking = true
            return {isAttacking: true, attackBox:attackBox, name:'Attack'}
           }
           else if(player.position.x - this.position.x<=40){
            this.switchSprite("AttackLeft")
            const attackBox = this.updateAttackbox()
            this.isAttacking = true
            return {isAttacking: true, attackBox:attackBox, name:'AttackLeft'}
           }
          
          
          
          
        else{
          //idle animation if nothing else
            if(this.lastDirection === 'left') this.switchSprite('idleLeft')
            else this.switchSprite("idleRight")
        }

        }
        else if(this.dead == true){
          this.switchSprite('Death')
          //switch to dead sprite if minion dead
        }
    }
          
        //minion taking hits logic
        takeHit() {
            this.health -= 1
            if(this.health<=0){
                this.dead = true
            }
            } 
        
      
        switchSprite(name) {
          if (this.image === this.animations[name].image) return
          if (this.dead){
            name == 'Death'
          }
          this.currentFrame = 0
          this.image = this.animations[name].image
          this.frameRate = this.animations[name].frameRate
          this.frameBuffer = this.animations[name].frameBuffer
          this.loop = this.animations[name].loop
          this.currentAnimation = this.animations[name]
          this.reverseSprite = this.animations[name].reverseSprite
          this.attackBox = this.animations[name].attackBox
        }
        //makes minion hitbox
        updateHitbox() {
          this.hitbox = {
            position: {
              x: this.position.x,
              y: this.position.y
            },
            offset: this.hitbox.offset,
            width: this.hitbox.width,
            height: this.hitbox.height
          },
          this.hitbox.position.x = this.position.x + this.hitbox.offset.x
          this.hitbox.position.y = this.position.y + this.hitbox.offset.y
        }
        //makes minion attackBox if minion attacks
        updateAttackbox(){
          this.attackBox = {
            position: {
              x: this.position.x,
              y: this.position.y
            },
            offset: this.attackBox.offset,
            width: this.attackBox.width,
            height: this.attackBox.height
          }
          this.attackBox.position.x = this.position.x + this.attackBox.offset.x
          this.attackBox.position.y = this.position.y + this.attackBox.offset.y
          this.newAttackBox = {
            position:{
              x:this.attackBox.position.x,
              y:this.attackBox.position.y,
            },
            width:this.attackBox.width,
            height:this.attackBox.height,
          }
        //   c.fillStyle = 'rgb(0,0,255,0.3)'
        //   c.fillRect(
        //     this.newAttackBox.position.x,
        //     this.newAttackBox.position.y,
        //     this.newAttackBox.width,
        //     this.newAttackBox.height
        //   )
          return this.newAttackBox
        }
        checkForHorizontalCollisions() {
          for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
      
            // if a collision exists
            if (
              this.hitbox.position.x <=
                collisionBlock.position.x + collisionBlock.width &&
              this.hitbox.position.x + this.hitbox.width >=
                collisionBlock.position.x &&
              this.hitbox.position.y + this.hitbox.height >=
                collisionBlock.position.y &&
              this.hitbox.position.y <=
                collisionBlock.position.y + collisionBlock.height
            ) {
              // collision on x axis going to the left
              if (this.velocity.x < -0) {
                const offset = this.hitbox.position.x - this.position.x
                this.position.x =
                  collisionBlock.position.x + collisionBlock.width - offset + 0.01
                break
              }
      
              if (this.velocity.x > 0) {
                const offset =
                  this.hitbox.position.x - this.position.x + this.hitbox.width
                this.position.x = collisionBlock.position.x - offset - 0.01
                break
              }
            }
          }
        }
      
        applyGravity() {
          this.velocity.y += this.gravity
          this.position.y += this.velocity.y
        }
      
        checkForVerticalCollisions() {
          for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
      
            // if a collision exists
            if (
              this.hitbox.position.x <=
                collisionBlock.position.x + collisionBlock.width &&
              this.hitbox.position.x + this.hitbox.width >=
                collisionBlock.position.x &&
              this.hitbox.position.y + this.hitbox.height >=
                collisionBlock.position.y &&
              this.hitbox.position.y <=
                collisionBlock.position.y + collisionBlock.height
            ) {
              if (this.velocity.y < 0) {
                this.velocity.y = 0
                const offset = this.hitbox.position.y - this.position.y
                this.position.y =
                  collisionBlock.position.y + collisionBlock.height - offset + 0.01
                break
              }
      
              if (this.velocity.y > 0) {
                this.velocity.y = 0
                const offset =
                  this.hitbox.position.y - this.position.y + this.hitbox.height
                this.position.y = collisionBlock.position.y - offset - 0.01
                break
              }
            }
          }
        }
  }
<<<<<<< HEAD
//declares new minion array
const minions = [new Minion({
=======
//minion array containing minion class instances
const minions = [new Minion({//contains all minion constructor data like imageSrc, animations and framerate
>>>>>>> 94fa922819814188f96cb26ab4807ad152b21d96
    player: player,
      imageSrc: './SkeletonWarrior/Idle.png',
      frameRate: 4,
      position:{
        x:550,
        y:400,
      },
      hitbox:{
        offset:{
          x:40,
          y:65,
        },
        width:40,
        height:60,
      },
      animations:{
          idleRight:{
              frameRate: 7,
              frameBuffer: 7,
              loop: true,
              imageSrc: './SkeletonWarrior/Idle.png',
              reverseSprite: false,
          },
          idleLeft:{
              frameRate: 7,
              frameBuffer: 7,
              loop: true,
              imageSrc: './SkeletonWarrior/Idle.png',
              reverseSprite:true,
          },
          runRight: {
              frameRate: 7,
              frameBuffer:7,
              loop: true,
              imageSrc: './SkeletonWarrior/Walk.png',
              reverseSprite:false,
          },
          runLeft: {  
              frameRate: 7,
              frameBuffer: 14,
              loop: true,
              imageSrc: './SkeletonWarrior/Walk(Left).png',
              reverseSprite:true,
          },
          Attack:{
            frameRate:4,
            frameBuffer:12,
            loop:true,
            imageSrc:'./SkeletonWarrior/Attack_3.png',
            reverseSprite:true,
            attackBox:{
              offset: {
                x: 75,
                y: 70,
              },
              width: 40,
              height: 60,
            }
          },
          AttackLeft:{
            frameRate:5,
            frameBuffer:15,
            loop:true,
            imageSrc:'./SkeletonWarrior/Attack_1Left.png',
            reverseSprite:true,
            attackBox:{
              offset: {
                x: 0,
                y: 60,
              },
              width: 50,
              height: 60,
            }
          },
          Death:{
            frameRate:4,
            frameBuffer:12,
            loop:false,
            imageSrc:'./SkeletonWarrior/Dead.png',
            reverseSprite:false,
          },
      },  
    })]





//Declares all required id's and assign to variables
var displayTextElement = document.getElementById('healthbar');
var victoryElement = document.getElementById('displayText')
const healthBar = document.getElementById("healthbar");
var tip = document.getElementById('Tips')

let level = 1
//contains all data about each level including width and level collision box data
let levels = {
  1: {
    init: () => {
      canvas.width = 170*16;
      canvas.height = 60*16; //320
      parseCollisions = graveyard.parse2D3()
      collisionBlocks = parseCollisions.createObjectsFrom2D3()
      player.collisionBlocks = collisionBlocks
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './Graveyard images/graveyard.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 150*16,
            y: 450,
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
      parseCollisions = bossGraveyard.parse2D4()
      collisionBlocks = parseCollisions.createObjectsFrom2D4()
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
        imageSrc: './Graveyard images/bossgraveyard.png',
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
const halfPageThreshold = canvas.width / 2;
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

const overlay = {
    opacity:0,
}
const camera = {
    position:{
      x:0,
      y:0,
    },
  }
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
function animate(){
    window.requestAnimationFrame(animate)


    if (level == 1){
    c.save()
    c.translate(camera.position.x, -99)//updates canvas based on camera position
    background.draw()
    player.update()
    const playerAttack = player.handleInput(keys,camera)
    player.draw()
    if (player.isAttacking) {
        player.isAttacking = false
      }
    doors.forEach(door=>{//draws doors
      door.draw()
    })
    c.restore()
    displayTextElement.style.display = 'none';//healthbar is hidden at level 1
    tip.style.display = 'block';//tips is shown at level 1
  }
  else if(level == 2&&!player.dead&&!enemy.dead){
    c.save()
    background.draw()
    tip.style.display = 'none'//tips is hidden at level 2
    c.translate(camera.position.x, -99)//updates canvas based on camera position
    background.draw()
    player.draw()
    player.update()
    const playerAttack = player.handleInput(keys,camera)
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
          rectangle2: enemy,
      })
    ){
      enemy.takeHit();
      if (enemy.health <= 0) {
        determineWinner({ player, enemy})
      }
      player.isAttacking = false
    }
    doors.forEach(door=>{
      door.draw()
    })
    const enemyAttack =enemy.handleInput(keys)
    enemy.draw()
    enemy.update()
    //if enemy does summon animation
    if (enemyAttack.name == 'summon'){
    minions.forEach(minion =>{
      //draws and updates minions
        minion.draw()
        minion.update()
        const minionAttack = minion.handleInput(keys)
        const playerAttack = player.handleInput(keys,camera)
        minion.collisionBlocks = collisionBlocks
        //if minion misses not counted as attack
        if (minion.isAttacking&&
            !rectangularCollision({
                rectangle1: minionAttack,
                rectangle2: player,
            })) {
            minion.isAttacking = false
        }
        //if minion hits counted as attack and player health reduced
        if (minion.isAttacking&&
            rectangularCollision({
                rectangle1: minionAttack,
                rectangle2: player,
            })
        ){
            player.takeHit();
            if (player.health <= 0) {
            determineWinner({ player, enemy})
            }
            minion.isAttacking = false
        }
        //if player misses minion
        if (player.isAttacking && !rectangularCollision({
            rectangle1: playerAttack,
            rectangle2: minion,
        })) {
            player.isAttacking = false
        }
        //checks if player attack hits minion
        if (player.isAttacking && rectangularCollision({
            rectangle1: playerAttack,
            rectangle2: minion,
        })) {
            minion.takeHit();
            player.isAttacking = false;            
        }
        if(minion.dead){//if minion dead reduce enemy health
            enemy.health -= 10
            gsap.to('#enemyHealth', {
                width: enemy.health + '%',
            })
<<<<<<< HEAD
            if(enemy.health<=0){
              //if enemy dead pause music and redirect to endCutscene page
=======
            if(enemy.health<=0){//if enemy dead pause music and redirect to end cutscene
>>>>>>> 94fa922819814188f96cb26ab4807ad152b21d96
                enemy.dead = true
                displayTextElement.style.display = 'none';
                document.getElementById("my_audio").pause();
                var fadeCover = document.getElementById('gameCanvas');
                fadeCover.style.transition = "opacity 2s";
                fadeCover.style.opacity = "0";
                setTimeout(function() {
                    window.location.href = "endCutscene.html";
                }, 2000);
            }
            const randomNum = Math.random();//randomises where minion will spawn relative to player
            if (randomNum < 0.5){
                offset = 70
            }
            else{
                offset = -70
            }
            minions.splice(minions.indexOf(minion), 1);//remove existing minion from array
            minions.push(new Minion({//add new minion with required constructors like framerate and imageSrc
                player: player,
                  imageSrc: './SkeletonWarrior/Idle.png',
                  frameRate: 4,
                  position:{
                    x:player.position.x+offset,
                    y:450,
                  },
                  hitbox:{
                    offset:{
                      x:40,
                      y:65,
                    },
                    width:40,
                    height:60,
                  },
                  animations:{
                      idleRight:{
                          frameRate: 7,
                          frameBuffer: 7,
                          loop: true,
                          imageSrc: './SkeletonWarrior/Idle.png',
                          reverseSprite: false,
                      },
                      idleLeft:{
                          frameRate: 7,
                          frameBuffer: 7,
                          loop: true,
                          imageSrc: './SkeletonWarrior/Idle.png',
                          reverseSprite:true,
                      },
                      runRight: {
                          frameRate: 7,
                          frameBuffer:7,
                          loop: true,
                          imageSrc: './SkeletonWarrior/Walk.png',
                          reverseSprite:false,
                      },
                      runLeft: {  
                          frameRate: 7,
                          frameBuffer: 14,
                          loop: true,
                          imageSrc: './SkeletonWarrior/Walk(Left).png',
                          reverseSprite:true,
                      },
                      Attack:{
                        frameRate:4,
                        frameBuffer:12,
                        loop:true,
                        imageSrc:'./SkeletonWarrior/Attack_3.png',
                        reverseSprite:true,
                        attackBox:{
                          offset: {
                            x: 75,
                            y: 70,
                          },
                          width: 40,
                          height: 60,
                        }
                      },
                      AttackLeft:{
                        frameRate:5,
                        frameBuffer:15,
                        loop:true,
                        imageSrc:'./SkeletonWarrior/Attack_1Left.png',
                        reverseSprite:true,
                        attackBox:{
                          offset: {
                            x: 0,
                            y: 60,
                          },
                          width: 50,
                          height: 60,
                        }
                      },
                      Death:{
                        frameRate:4,
                        frameBuffer:12,
                        loop:false,
                        imageSrc:'./SkeletonWarrior/Dead.png',
                        reverseSprite:false,
                      },
                  },  
                }))
        }

    })  
    }
    //makes healthbar responsive to window size
    displayTextElement.style.display = 'block';
    if (window.innerWidth>canvas.width){
      healthBar.style.width = `${canvas.width}px`;
    }
    else{
      healthBar.style.width = `${window.innerWidth}px`;
    }
    //if enemy misses not counted as attack
    if(enemyAttack.name == "Attack"){
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
        player.takeHit2()        
      enemy.isAttacking = false
    }
    }
    c.restore()
  }
  else{
    //makes healthbar hidden
    displayTextElement.style.display = 'none';
  }
    c.save()
    //fades level 1 to black and redirect to level 2
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'Black'
    c.fillRect(0,0,canvas.width,canvas.height)
    c.restore()
}

animate()



