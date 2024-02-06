
window.addEventListener('keydown',(event)=>{

    if (player.preventInput) return
    switch (event.key){
        case 'ArrowUp':
            event.preventDefault();
            //check if player hitbox is within portal/door if so trigger animation and takes him to next stage
            for (let i = 0;i<doors.length;i++){
                const door = doors[i]

                if (player.hitbox.position.x + player.hitbox.width<=door.position.x + door.width &&
                  player.hitbox.position.x >= door.position.x &&
                  player.hitbox.position.y + player.hitbox.height >=
                    door.position.y &&
                  player.hitbox.position.y <=
                    door.position.y + door.height){
                        player.velocity.x = 0
                        player.velocity.y = 0
                        player.preventInput = true
                        player.switchSprite('takeHit')
                        return
                    }
            }
            if(player.velocity.y === 0)
                player.velocity.y = -15;
            break
        case 'ArrowLeft':
            event.preventDefault();
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight':
            event.preventDefault();
            keys.ArrowRight.pressed = true
            break
        case 'ArrowDown':
            event.preventDefault();
            break
        case ' ':
            event.preventDefault();
            break
        case 'e':
            keys.e.pressed = true
            break
        case 'q':
            keys.q.pressed = true
            
    }
})
window.addEventListener('keyup',(event)=>{
    switch (event.key){
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'e':
            keys.e.pressed = false
        case 'q':
            keys.q.pressed = false
    }
})