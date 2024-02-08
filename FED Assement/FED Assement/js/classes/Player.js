//class sprite used to draw all the sprites
class Sprite {
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
      this.width = this.image.width / this.frameRate
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
  draw() {//draws image 
    if (!this.loaded) return
    const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    }
    c.drawImage(//draws cropped image with width of this.width and this.height
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


//Player class containing all logic like collision and keys input
class Player extends Sprite {
  constructor({ attack,scale,position,collisionBlocks = [], imageSrc, frameRate, animations, loop ,reverseSprite,attackBox = { offset: {}, width: undefined, height: undefined }, postion = {x:undefined,y:undefined},
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
    this.gravity = 0.7

    this.collisionBlocks = collisionBlocks
    this.health = 100,
    this.dead = false,
    this.attack = attack
    this.hitbox = hitbox
    this.isAttacking = false
    this.newAttackBox
    this.preventInput = false
    this.camerabox = {
      position:{
        x:this.position.x,
        y:this.position.y,
      },
      width:200,
      height:80,
    }
    }

  //makes a camera box around the player
  updateCameraBox(){
    this.camerabox = {
      position:{
        x:this.position.x - 200,
        y:this.position.y,
      },
      width:500,
      height:200,
    }
  }
  //method to determine if you should pan camera left
  shouldPanCameraToLeft({camera}){
    const cameraBoxRightSide = this.camerabox.position.x+this.camerabox.width
    // Check if the camera box's right side is beyond the right edge of the canvas
    if (cameraBoxRightSide >= background.image.width) {
        return;
    }

    // Check if the camera's right edge is beyond the right edge of the window
    if (cameraBoxRightSide >= window.innerWidth + Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x;
    }
  }
  //method to determine if you should pan camera right
  shouldPanCameraToTheRight({camera }) {
    if (this.camerabox.position.x <= 0) return

    if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x
    }
  }

  update() {

    // this is the blue box(the cropbox)
     //c.fillStyle = 'rgba(0, 0, 255, 0.5)'
     //c.fillRect(this.position.x, this.position.y, this.width, this.height)
    this.position.x += this.velocity.x
    this.updateCameraBox()
    // c.fillStyle = 'rgb(0,0,255,0.3)'
    // c.fillRect(
    //   this.camerabox.position.x,
    //   this.camerabox.position.y,
    //   this.camerabox.width,
    //   this.camerabox.height
    // )
    this.updateHitbox()

    this.checkForHorizontalCollisions()
    this.applyGravity()

    this.updateHitbox()
    //Hitbox
    // c.fillStyle = 'rgb(0,0,255,0.3)'
    // c.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // )
    this.checkForVerticalCollisions()


  }
  // checks player input and give corresponding logic to input
  handleInput(keys,camera){
    if(this.preventInput) return
    this.velocity.x = 0
    if (this.dead == false){
    //if arrowright player switchsprite to run right and moves right
    if(keys.ArrowRight.pressed&&this.position.x<=background.width-this.width-3){
        this.switchSprite('runRight')
        this.velocity.x = 5
        this.lastDirection = 'right'
        this.shouldPanCameraToLeft({camera})
        if (level != 2){//plays 1st audio if level is 1
          var audio = document.getElementById('my_audio1');
          audio.play()
        }
}   //if arrowleft, player moves left and switch sprite to run left
    else if(keys.ArrowLeft.pressed&&this.position.x>=3){
            this.updateHitbox()
            this.switchSprite('runLeft')
            this.velocity.x = -5
            this.lastDirection = 'left'
            this.shouldPanCameraToTheRight({camera})

    }
    //if e and direction is left, melee left
    else if(keys.e.pressed && this.lastDirection == 'left'){
      this.switchSprite('AttackLeft')
      const attackBox = this.updateAttackbox()
      this.isAttacking = true
      return {isAttacking: true, attackBox:attackBox}
    }
    //if e and direction is right, melee right
    else if(keys.e.pressed&&this.lastDirection == 'right'){
      this.switchSprite('Attack')
      const attackBox = this.updateAttackbox()
      this.isAttacking = true
      return {isAttacking:true,attackBox:attackBox}
    }
    // if q and direction is left, flame Jet left
    else if(keys.q.pressed&&this.lastDirection == 'left'){
      this.switchSprite('FlameJetLeft')
      const attackBox = this.updateAttackbox()
      this.isAttacking = true
      return {isAttacking: true, attackBox:attackBox}
    }
    //if q and direction is right, flame Jet right
    else if(keys.q.pressed&&this.lastDirection == 'right'){
      this.switchSprite('FlameJet')
      const attackBox = this.updateAttackbox()
      this.isAttacking = true
      return {isAttacking: true, attackBox:attackBox}
     }
    else {
      //if no input idle left/right
        if(this.lastDirection === 'left') this.switchSprite('idleLeft')
        else this.switchSprite("idleRight")
    }
  }
  else if(this.dead == true){
    //if dead switch sprite to dead animation
    this.switchSprite("Death")
      }
    }
  
takeHit() {
  //deducts player health
  this.health -= 5
  gsap.to('#playerHealth', {
    width: player.health + '%',
  })
  if (this.health<=0) 
  { 
    //if player dead, pause audio and go to game over screen
    document.getElementById("my_audio").pause();
    this.dead = true
    var fadeCover = document.getElementById('gameCanvas');
    fadeCover.style.transition = "opacity 2s";
    fadeCover.style.opacity = "0";
    setTimeout(function() {
        window.location.href = "game-over.html";
    }, 2000); // Wait for the transition to complete
  } 
}
  //switch sprite to [name] by getting all the [name] info needed from animations array 
  switchSprite(name) {
    if (this.image === this.animations[name].image) return
    this.currentFrame = 0
    this.image = this.animations[name].image
    this.frameRate = this.animations[name].frameRate
    this.frameBuffer = this.animations[name].frameBuffer
    this.loop = this.animations[name].loop
    this.currentAnimation = this.animations[name]
    this.reverseSprite = this.animations[name].reverseSprite
    this.attackBox = this.animations[name].attackBox
  }
  //makes player hitbox
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
  //makes player attackBox whenever player presses q/e
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
    //Attackbox
    // c.fillStyle = 'rgb(0,0,255,0.3)'
    // c.fillRect(
    //   this.newAttackBox.position.x,
    //   this.newAttackBox.position.y,
    //   this.newAttackBox.width,
    //   this.newAttackBox.height
    // )
    return this.newAttackBox
  }
  //checks for horizontal collision with collision block
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
  //applies gravity every frame
  applyGravity() {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }
  //checks for vertical collision
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
        // if (this.velocity.y < 0) {
        //   this.velocity.y = 0
        //   const offset = this.hitbox.position.y - this.position.y
        //   this.position.y =
        //     collisionBlock.position.y + collisionBlock.height - offset + 0.01
        //   break
        // }

        if (this.velocity.y > 0) {
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }
      }
    }
  }
}
//Enemy class logic like AI and collision detection
class Enemy extends Sprite {
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
    this.health = 100,
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
    // c.fillStyle = 'rgb(0,0,255,0.3)'
    // c.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // )
    this.checkForVerticalCollisions()
    if (this.takeHitCooldown>0){
      this.takeHitCooldown-=1
    }


  }
  //gets distance between player and itself determining what action to do based on distance
  handleInput(keys){
    if(this.preventInput) return
    if (this.dead == false){
      //if player is to the right and more than 100, move right
    if(player.position.x - this.position.x > 100&&this.position.x<=background.width-this.width-3){
        this.switchSprite('runRight')
        //if (player.position.x - this.position.x >= 10)
        this.position.x +=3
        this.lastDirection = 'right'

     }
     //ifplayer is left and distance is more than 50, move left
    else if(this.position.x - player.position.x>50 &&this.position.x>=3){
            this.updateHitbox()
            this.switchSprite('runLeft')
            //if (enemy.position.x - this.position.x >= 10) 
            this.position.x -= 3
            this.lastDirection = 'left'

     }
     //if player left and distance less than 50, attack player left
    else if (this.position.x - player.position.x<=50&&this.lastDirection == 'left'){
      const randomAttack = Math.random();
      if (randomAttack <0.5&&this.takeHitCooldown<=0){
        this.switchSprite('AttackLeft')
        const attackBox = this.updateAttackbox()
        this.isAttacking = true
        this.takeHitCooldown = this.takeHitCooldownDuration
        return {isAttacking: true, attackBox:attackBox}
      }
    }
    //if player right and distance less than 100, attack player right
    else if(player.position.x - this.position.x<=100&&this.lastDirection == 'right'){
      const randomAttack = Math.random();
      if (randomAttack< 0.5&&this.takeHitCooldown<=0){
        this.switchSprite('FlameJet')
        const attackBox = this.updateAttackbox()
        this.isAttacking = true
        this.takeHitCooldown = this.takeHitCooldownDuration
        return {isAttacking: true, attackBox:attackBox}
      }
    }
    
    
    else{
      //idle if nothing happens(should not run)
        if(this.lastDirection === 'left') this.switchSprite('idleLeft')
        else this.switchSprite("idleRight")
    }
  }
  else if (this.dead == true){
    //switch to death sprite if dead
    this.switchSprite('Death')
  }
}

  takeHit() {
    //reduces enemy health if hit
      this.health -= 1
      gsap.to('#enemyHealth', {
        width: enemy.health + '%',
      })
      if (this.health <= 0) 
      { //if enemy dead, audio paused and move to the ending cutscene page
        this.dead = true
        var fadeCover = document.getElementById('gameCanvas');
        fadeCover.style.transition = "opacity 2s";
        fadeCover.style.opacity = "0";
        setTimeout(function() {
            window.location.href = "endCutscene.html";
        }, 2000); // Wait for the transition to complete
      } 
      } 
  
  //switch sprite to [name] by getting all the [name] info needed from animations array 
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
  //enemy hitbox
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
  //enemy attackBox
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
    // c.fillStyle = 'rgb(0,0,255,0.3)'
    // c.fillRect(
    //   this.newAttackBox.position.x,
    //   this.newAttackBox.position.y,
    //   this.newAttackBox.width,
    //   this.newAttackBox.height
    // )
    return this.newAttackBox
  }
  //enemy horizontal collision detection logic
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
  //gravity applied every frame
  applyGravity() {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }
  //enemy vertical collision detection logic
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
