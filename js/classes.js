const gravity = 0.7;

let canvas;
let context;

window.addEventListener('DOMContentLoaded', event => {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
});

export class Sprite {
    constructor({ position }) {
        this.position = position;
        this.width = 50;
        this.height = 150;
    }

    draw() {

    }

    update() {
        this.draw();
    }
}

export class Fighter {
    constructor({ position, velocity, color = 'red', offset }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking;
        this.health = 100;
    }

    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.width, this.height)

        // attack box
        if (this.isAttacking) {
            context.fillStyle = 'green';
            context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update() {
        this.draw();
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
}
