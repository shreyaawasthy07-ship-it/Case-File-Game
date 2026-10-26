/// ========================================
// CHARACTER SELECTION
// ========================================

let selectedCharacter = null;


// ========================================
// ELEMENTS
// ========================================

const maleWrapper =
    document.getElementById("maleWrapper");

const femaleWrapper =
    document.getElementById("femaleWrapper");

const characters =
    document.querySelector(".characters");

const confirmation =
    document.getElementById("confirmation");

const closeIdentity =
    document.getElementById("closeIdentity");

const selectedIdentity =
    document.getElementById("selectedIdentity");

const playerName =
    document.getElementById("playerName");

const confirmIdentity =
    document.getElementById("confirmIdentity");

const nameError =
    document.getElementById("nameError");

const modeButton =
    document.getElementById("modeButton");

const modeLabel =
    document.getElementById("modeLabel");

const cardCharacterImage =
    document.getElementById("cardCharacterImage");

const subjectNumber =
    document.getElementById("subjectNumber");


// ========================================
// GAME AUDIO
// ========================================

const gameMusic =
    document.getElementById("gameMusic");

const selectSound =
    document.getElementById("selectSound");


// ========================================
// START BACKGROUND MUSIC
// ========================================

function startGameMusic() {

    if (!gameMusic) {
        return;
    }

    gameMusic.volume = 0.35;

    gameMusic.play().catch(function(error) {

        console.log(
            "Music waiting for interaction:",
            error
        );

    });

}


// ========================================
// PLAY SELECTION SOUND
// ========================================

function playSelectSound() {

    if (!selectSound) {
        return;
    }

    selectSound.currentTime = 0;
    selectSound.volume = 0.65;

    selectSound.play().catch(function(error) {

        console.log(
            "Selection sound could not play:",
            error
        );

    });

}


// ========================================
// START MUSIC AFTER FIRST CLICK
// ========================================

document.addEventListener(
    "click",
    function() {

        startGameMusic();

    },
    { once: true }
);


// ========================================
// MALE
// ========================================

maleWrapper.addEventListener(
    "click",
    function() {

        chooseCharacter("male");

    }
);


// ========================================
// FEMALE
// ========================================

femaleWrapper.addEventListener(
    "click",
    function() {

        chooseCharacter("female");

    }
);


// ========================================
// CHOOSE CHARACTER
// ========================================

function chooseCharacter(gender) {

    selectedCharacter = gender;


    // Start music + selection sound

    startGameMusic();

    playSelectSound();


    // Save gender

    localStorage.setItem(
        "playerGender",
        gender
    );


    // Remove previous selection

    maleWrapper.classList.remove(
        "selected"
    );

    femaleWrapper.classList.remove(
        "selected"
    );


    // =================================
    // MALE
    // =================================

    if (gender === "male") {

        maleWrapper.classList.add(
            "selected"
        );

        selectedIdentity.textContent =
            "MALE";

        cardCharacterImage.src =
            "male-neutral.png";

        subjectNumber.textContent =
            "SUBJECT 01";

    }


    // =================================
    // FEMALE
    // =================================

    if (gender === "female") {

        femaleWrapper.classList.add(
            "selected"
        );

        selectedIdentity.textContent =
            "FEMALE";

        cardCharacterImage.src =
            "female-neutral.png";

        subjectNumber.textContent =
            "SUBJECT 02";

    }


    // Darken unselected character

    characters.classList.add(
        "has-selection"
    );


    // =================================
    // SHOW ID CARD
    // =================================

    setTimeout(
        function() {

            confirmation.classList.add(
                "active"
            );

            setTimeout(
                function() {

                    playerName.focus();

                },
                500
            );

        },
        500
    );

}


// ========================================
// CLOSE IDENTITY CARD
// ========================================

closeIdentity.addEventListener(
    "click",
    function() {

        confirmation.classList.remove(
            "active"
        );

        maleWrapper.classList.remove(
            "selected"
        );

        femaleWrapper.classList.remove(
            "selected"
        );

        characters.classList.remove(
            "has-selection"
        );

        selectedCharacter = null;
        playerName.value = "";
        nameError.classList.remove(
            "show"
        );

    }
);


// ========================================
// CONFIRM IDENTITY
// ========================================

confirmIdentity.addEventListener(
    "click",
    function() {

        const name =
            playerName.value.trim();


        // =================================
        // CHECK NAME
        // =================================

        if (name === "") {

            nameError.classList.add(
                "show"
            );

            playerName.focus();

            return;

        }


        // =================================
        // SAVE NAME
        // =================================

        localStorage.setItem(
            "playerName",
            name
        );


        // Save gender again
        // to make sure Story receives it

        localStorage.setItem(
            "playerGender",
            selectedCharacter
        );


        // =================================
        // PLAY CONFIRMATION SOUND
        // =================================

        playSelectSound();


        // =================================
        // BUTTON STATE
        // =================================

        confirmIdentity.disabled =
            true;

        confirmIdentity.innerHTML =
            "IDENTITY VERIFIED ✓";


        // =================================
        // OPEN STORY PAGE
        // =================================

        setTimeout(
            function() {

                window.location.href =
                    "../story/story.html";

            },
            1000
        );

    }
);


// ========================================
// REMOVE ERROR WHILE TYPING
// ========================================

playerName.addEventListener(
    "input",
    function() {

        nameError.classList.remove(
            "show"
        );

    }
);


// ========================================
// DARK / DARKER MODE
// ========================================

modeButton.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "darker"
        );


        if (
            document.body.classList.contains(
                "darker"
            )
        ) {

            modeLabel.textContent =
                "DARKER";

        } else {

            modeLabel.textContent =
                "DARK";

        }

    }
);


// ========================================
// CLOCK
// ========================================

function updateClock() {

    const clock =
        document.getElementById(
            "clock"
        );


    if (!clock) {
        return;
    }


    const now =
        new Date();


    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");


    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");


    clock.textContent =
        `${hours}:${minutes}:${seconds}`;

}


setInterval(
    updateClock,
    1000
);

updateClock();
