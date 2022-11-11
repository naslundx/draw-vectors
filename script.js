const lines = [];
const DEG2RAD = Math.PI / 180; 
const MIL2DEG = 0.05625;

const canvas = document.getElementById('DemoCanvas');
const inputText = document.getElementById('inputText');
const canvasWidth = document.getElementById('canvasWidth');
const canvasHeight = document.getElementById('canvasHeight');
const context = canvas.getContext('2d');
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];
const system = document.getElementById("system");

const drawLine = (line) => {
    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2;
    context.beginPath();
    context.moveTo(line.x1 + halfWidth, line.y1 + halfHeight);
    context.lineTo(line.x2 + halfWidth, line.y2 + halfHeight);
    context.stroke();
}

const drawAll = () => {
    lines.forEach(drawLine);
}

const drawLatest = () => {
    if (lines) {
        drawLine(lines[lines.length - 1]);
    }
}

const add = () => {
    const text = inputText.value.split(',');
    const angleSystem = system.selectedIndex;

    x1 = parseInt(text[0]);
    y1 = parseInt(text[1]);
    angle = parseInt(text[2]);
    distance = parseInt(text[3]);

    if (angleSystem == 1) {
        angle *= MIL2DEG;
    }

    convertedAngle = (angle + 90) * DEG2RAD;

    x2 = x1 + distance * Math.cos(convertedAngle + Math.PI);
    y2 = y1 + distance * Math.sin(-convertedAngle);

    lines.push({
        x1,
        y1,
        x2,
        y2,
    });
    drawLatest();
}

// ---

const updateCanvas = () => {
    const width = parseInt(canvasWidth.value);
    const height = parseInt(canvasHeight.value);
    canvas.width = width;
    canvas.height = height;
    drawAll();
}

updateCanvas();

// ---

const showModal = () => {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}