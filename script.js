const lines = [];

const canvas = document.getElementById('DemoCanvas');
const inputText = document.getElementById('inputText');
const canvasWidth = document.getElementById('canvasWidth');
const canvasHeight = document.getElementById('canvasHeight');
const context = canvas.getContext('2d');
const DEG2RAD = Math.PI / 180; 

const drawLine = (line) => {
    context.beginPath();
    context.moveTo(line.x1, line.y1);
    context.lineTo(line.x2, line.y2);
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

    x1 = parseInt(text[0]);
    y1 = parseInt(text[1]);
    angle = parseInt(text[2]);
    distance = parseInt(text[3]);
    convertedAngle = (angle + 90) * DEG2RAD;

    x2 = x1 + distance * Math.cos(convertedAngle);
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