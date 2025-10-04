// cat interactivity
let cat = document.getElementById("catButton");
// to return to normal after pressing the button again
let comeBackCat = cat.innerHTML;


let runningCat = document.createElement("div");
// add class to set styling in css file
runningCat.id = "runningCat";
// add the image source
let catImage = document.createElement("img");
catImage.src = "assets/cat-assets/pounce/cat_02d-64.png";
catImage.alt = "Cat Image";
runningCat.appendChild(catImage);

// can only follow cursor so return false if on desktop
// thank you to this tutorial: https://www.youtube.com/watch?v=62BCYtJX2tY from Coding Artist
function isTouchDevice() {
    try{
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}

const move = (e) => {
    try{
        // PageX and PageY return the position of client's cursor from top left of screen
        var x = !isTouchDevice() ? e.pageX - 20 : e.touches[0].pageX - 20;
        var y = !isTouchDevice() ? e.pageY - 20 : e.touches[0].pageY - 20;
    } catch (e) {}

runningCat.style.left = x + "px";
runningCat.style.top = y + "px";
};

document.addEventListener("mousemove", (e) => {
    if (!isTouchDevice()) {
        move(e);
    }
});

document.addEventListener('touchmove', (e) => {
    move(e);
});


let isClicked = false;
cat.onclick = function() {
    if (!isClicked) {
        cat.innerHTML = "";
        cat.style.width = "32px";
        cat.style.height = "36.5px";
        cat.style.background = "transparent";
        cat.style.backgroundColor = 'rgb(255, 255, 233)';
        
        // save initial position of the cat
        let catRect = cat.getBoundingClientRect();
        let catInitialPosition = {
            x: catRect.left + window.scrollX,
            y: catRect.top + window.scrollY
        };
        
        // use this to give the appropriate starting position after click
        runningCat.style.left = catInitialPosition.x + "px";
        runningCat.style.top = catInitialPosition.y + "px";
        document.body.appendChild(runningCat);
    } else {
        cat.innerHTML = comeBackCat;
        cat.style.width = "";
        cat.style.height = "";
        cat.style.background = "";
        cat.style.backgroundColor = '';
        document.body.removeChild(runningCat);
    }
    isClicked = !isClicked;
};