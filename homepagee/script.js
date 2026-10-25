const siren = document.getElementById("sirenSound");
const enterButton = document.getElementById("enterButton");

// Start siren when user first interacts with the page
document.addEventListener("click", function startSiren() {

    siren.volume = 0.8;

    siren.play().catch(function(error) {
        console.log("Siren waiting for interaction:", error);
    });

}, { once: true });


// Enter Character page
enterButton.addEventListener("click", function(event) {

    event.preventDefault();

    // Stop siren
    siren.pause();
    siren.currentTime = 0;

    // Go to character page
    window.location.href = "../CHARACTER/character.html";

});