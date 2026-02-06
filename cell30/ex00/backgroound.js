

function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    
    return "rgb(" + r + ", " + g + ", " + b + ")";
}


let button = document.getElementById("btn");


button.addEventListener("click", function() {
    document.body.style.backgroundColor = getRandomColor();
});