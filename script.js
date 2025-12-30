// cat interactivity
let cat = document.getElementById("catButton");
// to return to normal after pressing the button again
let comeBackCat = cat.innerHTML;

let runningCat = document.createElement("div");
// add class to set styling in css file
runningCat.id = "runningCat";
// add the image source
let catImage = document.createElement("img");
try {
    catImage.src = "assets/cat-assets/pounce/cat_02d-64.png";
} catch (e) {
    catImage.src = "../assets/cat-assets/pounce/cat_02d-64.png";
}
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
        var y = !isTouchDevice() ? e.pageY - 25 : e.touches[0].pageY - 25;
    } catch (e) {}

    if (x < runningCat.offsetLeft) {
        runningCat.style.transform = "scaleX(-1)";
    } else {
        runningCat.style.transform = "scaleX(1)";
    }

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
        cat.style.backgroundColor = getComputedStyle(document.body).backgroundColor;
        
        // save initial position of the cat box and ajust for where the cat img is (due to padding)
        let catRect = cat.getBoundingClientRect();
        let catInitialPosition = {
            x: catRect.left + window.scrollX + 40,
            y: catRect.top + window.scrollY + 6
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

let darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.onclick = function() {
    document.body.classList.toggle("dark-mode");
};

// Courtesy of Claude:
async function loadPost(postId) {
    try {
        const response = await fetch(`posts/${postId}.md`);
        const markdown = await response.text();
        const html = marked.parse(markdown);
        document.getElementById('markdown-content').innerHTML = html;
        
        document.getElementById('index').style.display = 'none';
        document.getElementById('content').classList.add('show');
    } catch (error) {
        document.getElementById('markdown-content').innerHTML = '<p>Error loading post.</p>';
    }
}