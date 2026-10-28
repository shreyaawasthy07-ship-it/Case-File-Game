// ============================================================
// THE GREY DISTRICT — STORY JS
// ============================================================

const gameMusic = document.getElementById("gameMusic");
const selectSound = document.getElementById("selectSound");

// ------------------------------------------------------------
// STORY SECTIONS
// ------------------------------------------------------------

const officialIntro = document.getElementById("officialIntro");
const officialBriefing = document.getElementById("officialBriefing");
const teamScene = document.getElementById("teamScene");
const teamCompleteScene = document.getElementById("teamCompleteScene");

// ------------------------------------------------------------
// BUTTONS
// ------------------------------------------------------------

const introContinueButton = document.getElementById("introContinueButton");
const briefingContinueButton = document.getElementById("briefingContinueButton");
const beginInvestigation = document.getElementById("beginInvestigation");
const teamCompleteClose = document.getElementById("teamCompleteClose");

// ------------------------------------------------------------
// BRIEFING ELEMENTS
// ------------------------------------------------------------

const briefingText = document.getElementById("briefingText");
const briefingProgress = document.getElementById("briefingProgress");

// ------------------------------------------------------------
// TEAM ELEMENTS
// ------------------------------------------------------------

const teamImage = document.getElementById("teamImage");
const teamMember = document.querySelector("#teamScene .team-member");
const teamRole = document.getElementById("teamRole");
const teamName = document.getElementById("teamName");
const teamDescription = document.getElementById("teamDescription");
const teamDialogue = document.getElementById("teamDialogue");
const teamProgress = document.getElementById("teamProgress");
const teamPreviousButton = document.getElementById("teamPreviousButton");
const teamNextButton = document.getElementById("teamNextButton");

// ------------------------------------------------------------
// AUDIO
// ------------------------------------------------------------

function startGameMusic() {
    if (!gameMusic) return;

    gameMusic.volume = 0.35;

    gameMusic.play().catch(function(error) {
        console.log("Music waiting for interaction:", error);
    });
}

function playSelectSound() {
    if (!selectSound) return;

    selectSound.currentTime = 0;
    selectSound.volume = 0.65;

    selectSound.play().catch(function(error) {
        console.log("Selection sound could not play:", error);
    });
}


// ============================================================
// BRIEFING
// FEWER SCREENS — MORE STORY PER SCREEN
// ============================================================


const briefingTexts = [

    `Welcome to the Grey District.

You were not chosen because you are the most experienced investigator in the Directorate.

You were chosen because you are still willing to ask questions that other people stopped asking.


Six years ago, the local police unit collapsed. Officers disappeared from duty, records stopped being maintained, evidence rooms were sealed, and investigations were forgotten.


Then people began disappearing.

Some were reported missing. Some were never reported at all.

Eventually, forty-seven cases remained unresolved.`,



`But the real concern is what happened to the evidence.


Files were altered. Statements disappeared. Evidence logs contained gaps. Photographs were replaced. Some reports were rewritten.


For six years, the District remained untouched.

Until now.

The government has reopened the investigation under the authority of the Regional Investigation Directorate.

You will lead the investigation with three specialists. Your identity will remain classified, and your movements will be monitored.

Forty-seven unresolved cases. Six years of missing evidence.



Someone worked very hard to bury these cases.


Your investigation begins now.`


];

let briefingIndex = 0;


// ============================================================
// SHOW / HIDE STORY STATES
// ============================================================

function showState(state) {

    const states = [
        officialIntro,
        officialBriefing,
        teamScene,
        teamCompleteScene
    ];

    states.forEach(function(section) {
        if (section) {
            section.classList.remove("active");
        }
    });

    if (state) {
        state.classList.add("active");
    }
}


// ============================================================
// OPEN BRIEFING
// ============================================================

function openBriefing() {

    startGameMusic();
    playSelectSound();

    briefingIndex = 0;

    officialIntro.classList.remove("active");
    officialBriefing.classList.add("active");

    showBriefingSegment();
}


// ============================================================
// DISPLAY CURRENT BRIEFING
// ============================================================

function showBriefingSegment() {

    if (!briefingText) return;

    briefingText.textContent = briefingTexts[briefingIndex];

    if (briefingProgress) {
        const current = String(briefingIndex + 1).padStart(2, "0");
        const total = String(briefingTexts.length).padStart(2, "0");

        briefingProgress.textContent = `${current} / ${total}`;
    }

    briefingText.style.opacity = "1";
}

// ============================================================
// NEXT BRIEFING
// ============================================================

function nextBriefing() {

    playSelectSound();

    if (briefingIndex < briefingTexts.length - 1) {

        briefingIndex++;

        showBriefingSegment();

    } else {

        openTeamScene();
    }
}


// ============================================================
// TEAM DATA
// ============================================================

const teamMembers = [

    {
        role: "FIELD INVESTIGATOR",
        name: "MAYA SHARMA",
        image: "../field investigator.png",
        description:
            "Specialist in field operations, surveillance and ground investigation.",
        dialogue:
            "I've spent three years tracking what happens inside the District. I know the streets, the people and the places that never appear on official maps."
    },

    {
        role: "FORENSIC SPECIALIST",
        name: "DR. KABIR MEHRA",
        image: "../forensic.png",
        description:
            "Specialist in forensic evidence, laboratory analysis and crime reconstruction.",
        dialogue:
            "Evidence doesn't disappear. Someone makes it disappear. Give me what remains, and I'll tell you what was taken."
    },

    {
        role: "INTELLIGENCE / TECH SPECIALIST",
        name: "ARJUN KHANNA",
        image: "../intelligence.png",
        description:
            "Specialist in intelligence analysis, surveillance systems and digital investigation.",
        dialogue:
            "Every system leaves a trace. Even when someone thinks they've erased it. The District has been leaving traces for six years."
    }
];

let teamIndex = 0;


// ============================================================
// OPEN TEAM SCENE
// ============================================================


function openTeamScene() {

    playSelectSound();

    // Hide briefing immediately
    officialBriefing.classList.remove("active");

    // Open team scene
    teamScene.classList.add("active");

    // Start directly with first team member
    teamIndex = 0;

    loadTeamMember();
}

// ============================================================
// LOAD TEAM MEMBER
// ============================================================

function loadTeamMember() {

    if (!teamMember || !teamImage) return;

    const member = teamMembers[teamIndex];
    if (!member) return;

    teamMember.classList.remove(
        "team-transition-in",
        "team-transition-out"
    );

    void teamMember.offsetWidth;

    teamMember.classList.add("team-transition-in");

    teamImage.src = member.image;
    teamImage.alt = member.name;

    if (teamRole) {
        teamRole.textContent = member.role;
    }

    if (teamName) {
        teamName.textContent = member.name;
    }

    if (teamDescription) {
        teamDescription.textContent = member.description;
    }

    if (teamDialogue) {
        teamDialogue.textContent = member.dialogue;
    }

    if (teamProgress) {
        teamProgress.textContent =
        `${String(teamIndex + 1).padStart(2, "0")} / ${String(teamMembers.length).padStart(2, "0")}`;

    if (teamPreviousButton) {
    teamPreviousButton.disabled = teamIndex === 0;
}    `${String(teamIndex + 1).padStart(2, "0")} / ${String(teamMembers.length).padStart(2, "0")}`;
} 

    if (teamPreviousButton) {
        teamPreviousButton.disabled = teamIndex === 0;
    }
}

// ============================================================
// NEXT TEAM MEMBER
// ============================================================

function nextTeamMember() {

    playSelectSound();

    if (teamIndex < teamMembers.length - 1) {

        teamMember.classList.remove("team-transition-in");
        teamMember.classList.add("team-transition-out");

        setTimeout(() => {

            teamIndex++;

            loadTeamMember();

        }, 220);

    } else {

        openTeamComplete();

    }
}
function previousTeamMember() {

    playSelectSound();

    if (teamIndex <= 0) return;

    teamMember.classList.remove("team-transition-in");
    teamMember.classList.add("team-transition-out");

    setTimeout(() => {

        teamIndex--;

        loadTeamMember();

    }, 220);
}

// ============================================================
// TEAM COMPLETE
// ============================================================

function openTeamComplete() {

    playSelectSound();

    teamScene.classList.remove("active");
    teamCompleteScene.classList.add("active");
}


// ============================================================
// CLOSE TEAM COMPLETE — BACK TO TEAM MEMBERS
// ============================================================

function closeTeamComplete() {

    playSelectSound();

    showState(teamScene);

    // Show the last team member again
    teamIndex = teamMembers.length - 1;

    loadTeamMember();
}


// ============================================================
// BEGIN INVESTIGATION
// ============================================================

function startInvestigation() {

    playSelectSound();

    // short pause so the click sound plays before the page changes
    setTimeout(function() {

        window.location.href = "../case-001/case.html";

    }, 400);

}


// ============================================================
// BUTTON EVENTS
// ============================================================

if (introContinueButton) {

    introContinueButton.addEventListener("click", function() {

        openBriefing();

    });

}
if (briefingContinueButton) {

    briefingContinueButton.addEventListener("click", function() {

        nextBriefing();

    });

}

if (teamNextButton) {
    teamNextButton.addEventListener(
        "click",
        nextTeamMember
    );
}

if (teamPreviousButton) {
    teamPreviousButton.addEventListener(
        "click",
        previousTeamMember
    );
}


if (teamCompleteClose) {
    teamCompleteClose.addEventListener(
        "click",
        closeTeamComplete
    );
}


if (beginInvestigation) {

    beginInvestigation.addEventListener("click", function() {

        startInvestigation();

    });

}


// ============================================================
// START MUSIC AFTER FIRST USER INTERACTION
// ============================================================

document.addEventListener("click", function() {

    startGameMusic();

}, { once: true });


// ============================================================
// INITIAL STATE
// ============================================================

showState(officialIntro);


// ============================================================
// DEBUG
// ============================================================

console.log("THE GREY DISTRICT — STORY JS LOADED");
console.log("Briefing segments:", briefingTexts.length);
console.log("Team members:", teamMembers.length);
