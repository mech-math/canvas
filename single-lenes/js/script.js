$(document).ready(function() {
                    
    var canvas = document.getElementById('display');
    var ctx = canvas.getContext('2d');
    canvas.width = $(window).width();
    canvas.height = $(window).height();
                    
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(300,150);
    ctx.stroke();
});                 