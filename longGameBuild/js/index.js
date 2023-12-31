const canvas = document.querySelector("canvas")
const canvasContext = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

canvasContext.fillRect(0,0,canvas.width, canvas.height )

const gravity = 0.7  
class Sprite{
    constructor({position, velocity, color}){
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.isAttacking
        this.color = color
        this.attackBox = {
            position : this.position,
            width : 100,
            height : 50
        }
    }
    draw(){
        canvasContext.fillStyle = this.color
        canvasContext.fillRect(this.position.x, 
            this.position.y,this.width, this.height )   
        // this is where attack bos is drawn
        canvasContext.fillStyle = "green"
        canvasContext.fillRect(this.attackBox.position.x,
             this.attackBox.position.y, this.attackBox.width,
              this.attackBox.height)
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        let value = parseInt(this.position.y + this.height + this.velocity )
        if (value >= canvas.height){
              this.velocity.y = 0
        }else this.velocity.y += gravity
    }
    attack(){
        this.isAttacking = true
        setTimeout(() =>{
            this.isAttacking = false
        }, 100
        )
    }
}

const player = new Sprite({
    position :{
    x: 0,
    y: 0
},
velocity: {
    x: 0,
    y: 0
},
color :"red"
})

const enemy = new Sprite({
    position: {
    x: 400,
    y: 100
},
velocity: {
    x: 0,
    y: 0
},
color :"blue"
})
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    }
}

function animate(){
    canvasContext.fillStyle = "black"
    canvasContext.fillRect(0, 0,canvas.width, canvas.height   )
    player.update()
    enemy.update()
    
    window.requestAnimationFrame(animate)
    player.velocity.x = 0
    enemy.velocity.x = 0

   //player movement
    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
    }else if (keys.d.pressed && player.lastKey ==='d'){
        player.velocity.x= 5
    }

    //enemy movement
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5 
    }else if (keys.ArrowRight.pressed && enemy.lastKey ==='ArrowRight'){
        enemy.velocity.x= 5
    }

    // detect collision
    if  (player.attackBox.position.x + player.attackBox.width
        >= enemy.position.x &&
        player.attackBox.position.x
         <= enemy.position.x + enemy.width &&
         player.attackBox.position.y + player.attackBox.height 
         >= enemy.position.y && player.isAttacking){
            console.log("collid");
        } 
 
}

animate ()
window.addEventListener('keydown', (event) =>{
    switch(event.key){
        case 'd':
            keys.d.pressed = true 
            player.lastKey = 'd'
        break
        case 'a':
            keys.a.pressed = true 
            player.lastKey = 'a'
          break
        case 'w':
            player.velocity.y = -20
           
          break
        case " ":
            player.attack()
            break

          // enemy keys
          case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight' 
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
          break
        case 'ArrowUp':
            enemy.velocity.y = -20
          break
    }
})
window.addEventListener('keyup', (event) =>{
    switch(event.key){
        case 'd':
            keys.d.pressed = false 
        break
        case 'a':
            keys.a.pressed = false  
          break
        
          //enemy keys
          case 'ArrowRight':
            keys.ArrowRight.pressed = false 
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false  
          break
       
    }
    console.log(event.key);
})