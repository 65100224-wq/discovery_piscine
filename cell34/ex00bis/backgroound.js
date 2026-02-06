$(document).ready(function() {
    function getRandomColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }

    
    $('#btn').click(function() {
        $('body').css('background-color', getRandomColor());
    });
});