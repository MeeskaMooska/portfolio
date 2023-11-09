const overlay = document.getElementById('overlay');
overlay.style.backdropFilter = 'blur(2px)';
var prevEvent, currentEvent;
document.documentElement.onmousemove = function (event) {
    currentEvent = event;
}

// Credit to: https://codepen.io/zFunx on codepen
var maxSpeed = 0, prevSpeed = 0, maxPositiveAcc = 0, maxNegativeAcc = 0;
setInterval(function () {
    if (prevEvent && currentEvent) {
        var movementX = Math.abs(currentEvent.screenX - prevEvent.screenX);
        var movementY = Math.abs(currentEvent.screenY - prevEvent.screenY);
        var movement = Math.sqrt(movementX * movementX + movementY * movementY);

        //speed=movement/100ms= movement/0.1s= 10*movement/s
        var speed = 10 * movement;//current speed
        const maxSpeed = 1500;
        const maxBlur = 2;
        const minBlur = 0;
        const blur = (maxSpeed - speed) / maxSpeed * (maxBlur - minBlur) + minBlur;

        overlay.style = `filter: blur(${blur}px)`;
    }

    prevEvent = currentEvent;
    prevSpeed = speed;
}, 100);
