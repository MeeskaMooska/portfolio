var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();

function createHiDPICanvas(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    document.body.appendChild(can);  // Append the canvas to the document body
    return can;
}

var myCanvas = createHiDPICanvas(window.innerWidth, window.innerHeight);
myCanvas.style.position = "absolute";
var ctx = myCanvas.getContext("2d");

let x = Math.floor(Math.random() * 1000);
let y = Math.floor(Math.random() * 1000);

function moveLine() {
    // Define a new Path:
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.strokeStyle = "#1aff00";
    ctx.beginPath();

    // Define a start Point
    ctx.moveTo(x, y);

    // Define an end Point
    ctx.lineTo(10, 100);

    // Stroke it (Do the Drawing)
    ctx.stroke();
}

function moveRandomly() {
    // TODO: Change positional offset when this is changed
    const offsetSum = 50;

    // Generate start position
    min = Math.ceil(4); // No less than the radius of the circle
    maxX = Math.floor(window.innerWidth); // No more than the width of the window
    maxY = Math.floor(window.innerHeight); // No more than the height of the window
    const xStartPosition = Math.floor(Math.random() * (maxX - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    const yStartPosition = Math.floor(Math.random() * (maxY - min + 1) + min); 

    // Generate end position
    const xPositionalOffset = Math.floor(Math.random() * (8 - 22 + 1) + min)
    const yPositionalOffset = offsetSum - xPositionalOffset;

    const start = { x: xStartPosition, y: yStartPosition };
    const control1 = { x: 8, y: 10 };
    const control2 = { x: 20, y: 22 };
    const end = { x: xPositionalOffset, y: yPositionalOffset };
    const segments = 60;

    const bezierPoints = calculateBezierCurvePoints(start, control1, control2, end, segments);

    let i = 0;

    function drawPoint() {
        if (i < bezierPoints.length) {
            const point = bezierPoints[i];
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            ctx.beginPath();
            ctx.fillStyle = "#1aff00";
            ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
            ctx.fill();
            i++;
            setTimeout(drawPoint, 40);
        }
    }

    drawPoint();
}


function calculateBezierCurvePoints(start, control1, control2, end, segments) {
    const points = [];

    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = (1 - t) ** 3 * start.x + 3 * (1 - t) ** 2 * t * control1.x + 3 * (1 - t) * t ** 2 * control2.x + t ** 3 * end.x;
        const y = (1 - t) ** 3 * start.y + 3 * (1 - t) ** 2 * t * control1.y + 3 * (1 - t) * t ** 2 * control2.y + t ** 3 * end.y;
        points.push({ x, y });
    }

    return points;
}

moveRandomly();