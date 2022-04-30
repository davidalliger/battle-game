import { Fighter } from "./js/classes.js";

window.addEventListener('DOMContentLoaded', event => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    canvas.width = 1024;
    canvas.height = 576;

    context.fillRect(0, 0, canvas.width, canvas.height);



    const player = new Fighter({
        position: {
            x: 0,
            y: 0
        },
        velocity: {
            x: 0,
            y: 0
        },
        color: 'blue',
        offset: {
            x: 0,
            y: 0
        }
    });

    const enemy = new Fighter({
        position: {
            x: 400,
            y: 100
        },
        velocity: {
            x: 0,
            y: 0
        },
        offset: {
            x: 50,
            y: 0
        }
    });

    const keys = {
        a: {
            pressed: false
        },
        d: {
            pressed: false
        },
        w: {
            pressed: false
        },
        ArrowRight: {
            pressed: false
        },
        ArrowLeft: {
            pressed: false
        }
    };

    function rectangularCollision({ rectangle1, rectangle2 }) {
        return (
            rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
            rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
            rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
            rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
        )
    }

    function determineWinner({ player, enemy }) {
        const result = document.getElementById("result");
        if (player.health === enemy.health) {
            result.innerHTML = 'Tie!';
        } else if (player.health > enemy.health) {
            result.innerHTML = 'Player One Wins!';
        } else if (player.health < enemy.health) {
            result.innerHTML = 'Player Two Wins!';
        }
        result.style.display = 'flex';
    }

    let timer = 60;
    let timerId;
    function decreaseTimer() {
        if (timer > 0) {
            timerId = setTimeout(decreaseTimer, 1000);
            timer--;
            document.getElementById('timer').innerHTML = timer;
        }
        if (timer === 0) {
            determineWinner({ player, enemy });
        }
    }

    decreaseTimer();

    function animate() {
        window.requestAnimationFrame(animate);
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        player.update();
        enemy.update();
        player.velocity.x = 0;
        enemy.velocity.x = 0;

        //player movement
        if (keys.a.pressed && player.lastKey === 'a') {
            player.velocity.x = -5;
        } else if (keys.d.pressed && player.lastKey === 'd') {
            player.velocity.x = 5;
        }

        //enemy movement
        if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
            enemy.velocity.x = -5;
        } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
            enemy.velocity.x = 5;
        }

        // detect collision
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: enemy
            }) &&
            player.isAttacking
            ) {
                player.isAttacking = false;
                enemy.health -= 20;
                document.querySelector('#enemy-health').style.width = enemy.health + "%";
        }

        if (
            rectangularCollision({
                rectangle1: enemy,
                rectangle2: player
            }) &&
            enemy.isAttacking
            ) {
                enemy.isAttacking = false;
                player.health -= 20;
                document.querySelector('#player-health').style.width = player.health + "%";
        }

        // end game based on health
        if (enemy.health <= 0 || player.health <= 0) {
            determineWinner({ player, enemy });
            clearTimeout(timerId);
        }
    }

    animate();

    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true;
                player.lastKey = 'd';
                break
            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
                break
            case 'w':
                player.velocity.y = -20;
                break
            case ' ':
                player.attack();
                break

            //enemy keys
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
                break
            case 'ArrowUp':
                enemy.velocity.y = -20;
                break
            case 'ArrowDown':
                enemy.attack();
                break
        }
    });

    window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'd':
                keys.d.pressed = false;
                break
            case 'a':
                keys.a.pressed = false;
                break
        }

        switch(event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = false;
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = false;
                break
        }
    });
});
