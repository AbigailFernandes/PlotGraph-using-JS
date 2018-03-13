// Variable initialization
var canvas = document.getElementById("canvasTop");
var ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("canvasBottom");
var ctx2 = canvas2.getContext("2d");
var canvasOffset = $("#canvasTop").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var functElement = document.getElementById("function");
var gridElement = document.getElementById("gridSpace");

// Function to display the position of the cursor
function handleMouseMove(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = 1 - (2*(e.clientY - offsetY)/canvas.height);
    $("#movelog").html("Coursor points: x = " + mouseX + " , y = " + mouseY.toFixed(3));
}

$("#canvasTop").mousemove(function (e) {
    handleMouseMove(e);
});

function init() {
    var gridSpace = gridElement.options[gridElement.selectedIndex].value;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
    drawRulerGrid(gridSpace);
    
    ctx.beginPath();
    drawSine(ctx,canvas.width,canvas.height,gridSpace);  
    ctx.stroke();
}

function changeGridSpace() {   
    var gridSpace = gridElement.options[gridElement.selectedIndex].value;
    var funct = functElement.options[functElement.selectedIndex].value;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
    drawRulerGrid(gridSpace);
    
    ctx.beginPath();
    if(funct==0) {
        drawSine(ctx,canvas.width,canvas.height,gridSpace);   
    }
    else{
        drawCosine(ctx,canvas.width,canvas.height,gridSpace) ;  
    }
    ctx.stroke();
}

function plotFunction() {
    var gridSpace = gridElement.options[gridElement.selectedIndex].value;
    var funct = functElement.options[functElement.selectedIndex].value;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
    drawRulerGrid(gridSpace, funct);
    
    ctx.beginPath();
    if(funct==0) {
        drawSine(ctx,canvas.width,canvas.height,gridSpace);   
    }
    else{
        drawCosine(ctx,canvas.width,canvas.height,gridSpace);  
    }
    ctx.stroke();
}

function drawRulerGrid(gridSpace, funct){
    var x,y;
    ctx.beginPath();
    ctx2.beginPath();
    // gridSpace = 50;
    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#fff'
    
    for (var i = 0; i < canvas.width; i += 10) {
        if(i/gridSpace == parseInt(i/gridSpace)){
            y = 0;
            ctx.moveTo(i , 0);
            ctx.lineTo(i ,canvas.height);
            ctx2.strokeText(i/gridSpace, i+15, 15);
        }
        else {
            y = 10
        }
        ctx2.moveTo(i + 25, y);
        ctx2.lineTo(i + 25, 15);

        if(i / gridSpace == parseInt(i / gridSpace)) {
            x = 5;
            ctx.moveTo(0 , i);
            ctx.lineTo(canvas.width ,i);
            ctx2.strokeText((canvas.height - 2*i)/canvas.height, 0, i+15);
        }
        else {
            x = 15;
        }
        // var x = (i / 50 == parseInt(i / 50)) ? 0 : 10;
        ctx2.moveTo(x, i + 15);
        ctx2.lineTo(25, i + 15);
    }
    ctx.stroke();
    ctx2.stroke(); 
}


function drawSine(context, width, height, gridSpace) {

    context.strokeStyle = '#00f';
    context.fillStyle = '#fff';
    context.moveTo(0, 250);
    
    for (i = 0; i <= width; i += 10) {
        x = i*(Math.PI/(gridSpace*2));
        y = Math.sin(-x);
        context.lineTo(i, parseInt(y*250 + 250));
    }
}

function drawCosine(context, width, height, gridSpace) {

    context.strokeStyle = '#00f';
    context.fillStyle = '#fff';
    context.moveTo(0, 250);
    
    for (i = 0; i <= width; i += 10) {
        x = i*(Math.PI/(gridSpace*2));
        y = -Math.cos(x);
        context.lineTo(i, parseInt(y*250 + 250));
    }
}