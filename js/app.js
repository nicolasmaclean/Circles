var canvas = document.getElementById('canvas');
var maxRadius = 100;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', 
    function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function getRandomColor(){
    return Math.floor(Math.random()*16777215).toString(16);
}

function Circle(x, y, dx, dy, radius, color, minRadius) {

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.minRadius = minRadius;
    this.maxed = false;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = "#" + this.color;
        c.fill();
    }

    this.update = function() {
        this.x += this.dx;
        this.y += this.dy;
        
        if(this.x+radius > window.innerWidth || this.x-radius < 0){
            this.dx = -this.dx;
            this.color = getRandomColor();
        }
        if(this.y+radius > window.innerHeight || this.y-radius < 0){
            this.dy = -this.dy;
            this.color = getRandomColor();
        }

        if(mouse.x-this.x < 50 && mouse.x-this.x > -50 && mouse.y-this.y < 50 && mouse.y-this.y > -50 && this.radius < maxRadius && !this.maxed){
            this.radius += 5;
            if(this.radius >= maxRadius){
                this.maxed = true;
            }
        } else if(this.radius > this.minRadius){
            this.radius -= 1;
            if(this.radius <= this.minRadius)
                this.maxed = false;
        }

        // to optimize I could not draw circles that aren't close to the mouse
        this.draw();
    }  
}

var circles = [];

function init(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    circles = [];

    if(canvas.width > canvas.height){
        maxRadius  = canvas.height/6;
    } else {
        maxRadius  = canvas.width/6;
    }

    for(var i = 0; i < maxRadius*6; i++){
        var radius = Math.floor(Math.random()*25);
        var x = radius + Math.floor(Math.random()*(window.innerWidth-radius*2));
        var y = radius + Math.floor(Math.random()*(window.innerHeight-radius*2));
        var dx = Math.floor((Math.random()*4)-2);
        var dy = Math.floor((Math.random()*4)-2);
        var color = getRandomColor();
        var minRadius = 0;

        circles.push(new Circle(x, y, dx, dy, minRadius, color, minRadius));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(var i = 0; i < circles.length; i++){
        circles[i].update();
    }
}

init();

animate();