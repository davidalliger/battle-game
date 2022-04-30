export function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

export function determineWinner({ player, enemy }) {
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
export function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.getElementById('timer').innerHTML = timer;
    }
    if (timer === 0) {
        determineWinner({ player, enemy });
    }
}
