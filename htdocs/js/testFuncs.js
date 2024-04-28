function myFunc() {
    document.getElementById("t1").innerHTML = "Changed!";
}
function warn(msg) {
    window.alert(msg);
}
function addSpace(id) {
    document.getElementById(id).innerHTML += "  ";
}
function newButton() {
    document.getElementById("bts").innerHTML += '<div id="bts"><button style="" type="button" onclick="newButton()">newButton</button></div>';
}
function increment(id, amount, lowerBound, upperBound) {
    let element = document.getElementById(id);
    let count = parseInt(element.innerHTML);
    if(count + amount < lowerBound)
        element.innerHTML = lowerBound;
    else if(count + amount > upperBound)
        element.innerHTML = upperBound;
    else 
        element.innerHTML = count + amount;
}
function phpFunc() {
    document.getElementById('php').innerHTML = '<?php echo "Successful!"; ?>'
}