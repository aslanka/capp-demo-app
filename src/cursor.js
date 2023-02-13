let cursor = null;
let mean = null;

export function InitializeCursor() {

    cursor = document.createElement('div');
    mean = document.createElement('span');
    cursor.style.width = '80px';
    cursor.style.height = '80px';
    cursor.style.backgroundColor = 'white';
    cursor.style.color = 'black';
    cursor.style.position = 'fixed';
    mean.innerText = "Charlotte Applied Professional Practices Society \n(C.A.P.P.)";

    document.body.appendChild(cursor);
    document.body.appendChild(mean);
}

export function SetCursorVisibility(visible) {
    if (!visible) {

    } else {
        cursor.style.display = 'block';
    }
}

export function SetCursorColor(color) {
    cursor.style.backgroundColor = color;
    if (color == 'red') {
        if (parseInt(cursor.style.top, 10) > 300 && parseInt(cursor.style.top, 10) < 500 && parseInt(cursor.style.left, 10) > 700 && parseInt(cursor.style.left, 10) < 800) {
            cursor.innerHTML = "You got it right! Join CAPP!!";
            cursor.style.color = 'white';
            cursor.style.backgroundColor = 'green';
        } else cursor.innerHTML = "Try again!";
    } else {
        cursor.style.color = 'black';
        cursor.innerHTML = "Grab the vue building!";

    }
}

export function SetCursorPosition(left, top) {
    cursor.style.top = window.innerHeight * top + 'px';
    cursor.style.left = window.innerWidth * left + 'px';
}