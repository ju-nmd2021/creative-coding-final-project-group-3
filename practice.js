const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';
ctx.lineWidth = 10;

class Particle {
    constructor(effect) {
          this.effect = effect;
          this.x = Math.floor(Math.random() * this.effect.width);
          this.y = Math.floor(Math.random() * this.effect.height);
        }
          draw(context) {
               context.fillRect(this.x, this.y, 1, 1);
          }
    }

class Effect {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.particles = [];
        this.numberOfParticles = 2000;
        effect.init();
    }
    init(){
        for (let i = 0; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
        }
        
    }
    render(context){
        this.particles.forEach(particle => {
            particle.draw(context);
        })
    }
}

const effect = new Effect(canvas.width, canvas.height);

effect.render(ctx);