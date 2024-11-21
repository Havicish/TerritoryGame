/** @type { HTMLCanvasElement } */
let GameCanvas;
/** @type { CanvasRenderingContext2D } */
let Ctx;

let Screen = "StartGame";

document.addEventListener('DOMContentLoaded', () => {
    GameCanvas = document.querySelector('canvas');
    Ctx = GameCanvas.getContext('2d');

    Frame()
});

function SetScreen(ScreenId) {
    document.querySelectorAll('.Screen').forEach(Screen => {
        Screen.style.display = 'none';
    });

    document.querySelector(`#${ScreenId}`).style.display = 'block';
}

function DrawPolygon(X, Y, Radius, Sides, Color) {
    Ctx.beginPath();
    Ctx.moveTo(X + Radius * Math.cos(0), Y + Radius * Math.sin(0));

    for (let i = 1; i <= Sides; i++) {
        Ctx.lineTo(X + Radius * Math.cos(i * 2 * Math.PI / Sides), Y + Radius * Math.sin(i * 2 * Math.PI / Sides));
    }

    Ctx.fillStyle = Color;
    Ctx.fill();
    Ctx.closePath();
}

function DrawGrid(SlotsX, SlotsY, Color) {
    let ShortestSide = Math.min(GameCanvas.width, GameCanvas.height);
    
    let SlotWidth = ShortestSide / SlotsX;
    let SlotHeight = ShortestSide / SlotsY;

    let OffsetX = (GameCanvas.width - SlotWidth * SlotsX) / 2;
    let OffsetY = (GameCanvas.height - SlotHeight * SlotsY) / 2;

    Ctx.strokeStyle = Color;
    Ctx.lineWidth = 2;

    for (let i = 0; i <= SlotsX; i++) {
        Ctx.beginPath();
        Ctx.moveTo(OffsetX + SlotWidth * i, OffsetY);
        Ctx.lineTo(OffsetX + SlotWidth * i, OffsetY + SlotHeight * SlotsY);
        Ctx.stroke();
    }

    for (let i = 0; i <= SlotsY; i++) {
        Ctx.beginPath();
        Ctx.moveTo(OffsetX, OffsetY + SlotHeight * i);
        Ctx.lineTo(OffsetX + SlotWidth * SlotsX, OffsetY + SlotHeight * i);
        Ctx.stroke();
    }
}

function Frame() {
    if (Screen != "GameCanvas") {
        requestAnimationFrame(Frame);
        return;
    }

    GameCanvas.width = window.innerWidth;
    GameCanvas.height = window.innerHeight;

    Ctx.clearRect(0, 0, GameCanvas.width, GameCanvas.height);
    Ctx.fillStyle = 'black';
    Ctx.fillRect(0, 0, GameCanvas.width, GameCanvas.height);

    DrawPolygon(GameCanvas.width / 2, GameCanvas.height / 2, 10, 4, "white");
    DrawGrid(17, 17, "white");

    requestAnimationFrame(Frame);
}