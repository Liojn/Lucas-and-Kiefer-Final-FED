//All these parse2D gets info from collision data and push info to a rows array
Array.prototype.parse2D = function () {
    const rows = []
    for (let i = 0; i < this.length; i += 90) {
      rows.push(this.slice(i, i + 90))
    }
  
    return rows
  }
Array.prototype.parse2D1 = function () {
    const rows = []
    for (let i = 0; i < this.length; i += 70) {
      rows.push(this.slice(i, i + 70))
    }
  
    return rows
  }

Array.prototype.parse2D2 = function () {
  const rows = []
  for (let i = 0; i < this.length; i += 100) {
    rows.push(this.slice(i, i + 100))
  }

  return rows
}
Array.prototype.parse2D3 = function () {
  const rows = []
  for (let i = 0; i < this.length; i += 170) {
    rows.push(this.slice(i, i + 170))
  }

  return rows
}
Array.prototype.parse2D4 = function () {
  const rows = []
  for (let i = 0; i < this.length; i += 80) {
    rows.push(this.slice(i, i + 80))
  }

  return rows
}

//creates a new collision block object by reading the data and collision block positions
Array.prototype.createObjectsFrom2D4 = function(){
  const objects = []
  this.forEach((row, y) => {
      row.forEach((symbol, x) => {
      if (symbol === 3841) {
          // push a new collision into collisionblocks array
          objects.push(
          new CollisionBlock({
              position: {
              x: x * 16,
              y: y * 16,
              },
          })
          )
      }
      })
  })
  return objects
}
//creates a new collision block object by reading the data and collision block positions

Array.prototype.createObjectsFrom2D1 = function(){
  const objects = []
  this.forEach((row, y) => {
      row.forEach((symbol, x) => {
      if (symbol === 6401) {
          // push a new collision into collisionblocks array
          objects.push(
          new CollisionBlock({
              position: {
              x: x * 16,
              y: y * 16,
              },
          })
          )
      }
      })
  })
  return objects
}
//creates a new collision block object by reading the data and collision block positions

Array.prototype.createObjectsFrom2D = function(){
    const objects = []
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
        if (symbol === 3201) {
            // push a new collision into collisionblocks array
            objects.push(
            new CollisionBlock({
                position: {
                x: x * 16,
                y: y * 16,
                },
            })
            )
        }
        })
    })
    return objects
}
//creates a new collision block object by reading the data and collision block positions

Array.prototype.createObjectsFrom2D2 = function(){
  const objects = []
  this.forEach((row, y) => {
      row.forEach((symbol, x) => {
      if (symbol === 11297) {
          // push a new collision into collisionblocks array
          objects.push(
          new CollisionBlock({
              position: {
              x: x * 16,
              y: y * 16,
              },
          })
          )
      }
      })
  })
  return objects
}
//creates a new collision block object by reading the data and collision block positions

Array.prototype.createObjectsFrom2D3 = function(){
  const objects = []
  this.forEach((row, y) => {
      row.forEach((symbol, x) => {
      if (symbol === 11521) {
          // push a new collision into collisionblocks array
          objects.push(
          new CollisionBlock({
              position: {
              x: x * 16,
              y: y * 16,
              },
          })
          )
      }
      })
  })
  return objects
}

function determineWinner({ player, enemy}) {
  if (player.health === enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Tie'
  } else if (player.health > enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
  } else if (player.health < enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
  }
}
