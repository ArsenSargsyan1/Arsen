// function windowLoad(){
//     console.log("Window is loaded");
// }
// window.onload = windowLoad;


// function preload() {
//     console.log("Widnow is loaded");
// }
// function click(evt) {
//     console.log(evt.pageX , evt.pageY);
// }
// window.onlick = click;


// function mousePressed(){
//     console.log(mouseX , mouseY);
// }

function main() {
    var socket = io();
    var chatDiv = document.getElementById('chat');
    var input = document.getElementById('message');
    var button = document.getElementById('submit');
 
    function handleSubmit(evt) {
        var val = input.value;
        if (val != "") {
            socket.emit("send message", val);
        }
    }
    button.onclick = handleSubmit;
 
    

function handleMessage(msg) {
    var p = document.createElement('p');
    p.innerText = msg;
    chatDiv.appendChild(p);
    input.value = "";
}

socket.on('display message', handleMessage);
} // main closing bracket

window.onload = main;