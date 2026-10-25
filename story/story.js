
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
const teamContinueButton = document.getElementById("teamContinueButton");
const beginInvestigation = document.getElementById("beginInvestigation");

// ------------------------------------------------------------
// BRIEFING ELEMENTS
// ------------------------------------------------------------

const briefingText = document.getElementById("briefingText");
const briefingProgress = document.getElementById("briefingProgress");

// ------------------------------------------------------------
// TEAM ELEMENTS
// ------------------------------------------------------------

const teamImage = document.getElementById("teamImage");
const teamRole = document.getElementById("teamRole");
const teamName = document.getElementById("teamName");
const teamDescription = document.getElementById("teamDescription");
const teamDialogue = document.getElementById("teamDialogue");
const teamProgress = document.getElementById("teamProgress");

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

const briefingSegments = [

    `Welcome to the Grey District.

You were not chosen because you are the most experienced investigator in the Directorate.

You were chosen because you are still willing to ask questions that other people stopped asking.

Six years ago, this district became the centre of an investigation that was never allowed to finish.`,

    `The Grey District was once one of the most heavily monitored regions in the country.

Then, six years ago, the local police unit collapsed.

Officers disappeared from duty. Records stopped being maintained. Evidence rooms were sealed. Investigations were transferred, delayed, and eventually forgotten.

Officially, it was described as an institutional failure.

Unofficially, people inside the Directorate knew there was more to it.`,

    `After the collapse, people began disappearing.

Some were reported missing.

Some were never reported at all.

Families came to the authorities looking for answers and were given paperwork, delays, and silence.

The cases accumulated.

One file became ten.

Ten became twenty.

Eventually, forty-seven cases remained unresolved.`,

    `What makes these cases different is not simply the number of missing people.

It is what happened to the evidence.

Files were altered.

Statements disappeared.

Evidence logs contained gaps.

Some photographs were replaced.

Some reports were rewritten.

And several case records were transferred into archives that officially did not exist.`,

    `For six years, the Grey District remained largely untouched.

No functioning police unit.

No complete investigation.

No official explanation for what happened.

Until now.

The government has reopened the investigation under the authority of the Regional Investigation Directorate.

The original case files have been recovered.

The district has been placed under restricted investigation.

And the forty-seven unsolved cases are being examined again.`,

    `That is where you come in.

You will lead the investigation.

Your identity will remain classified.

Your movements inside the District will be monitored.

You will have access to evidence that was previously sealed.

But understand this clearly:

Someone worked very hard to bury these cases.

And someone may still be working to keep them buried.`,

    `You will not investigate the Grey District alone.

I have assembled a small team.

Three specialists.

Each one has been selected for a different reason.

Field investigation.

Forensic analysis.

Intelligence and technology.

You will lead them.

What you discover will determine what happens next.`,

    `This is no longer a cold case review.

It is an active investigation.

Forty-seven unresolved cases.

Six years of missing evidence.

One district that was never truly investigated.

Directorate authorization has been granted.

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

    briefingText.style.opacity = "0";

    setTimeout(function() {

        briefingText.textContent = briefingSegments[briefingIndex];

        if (briefingProgress) {
            const current = String(briefingIndex + 1).padStart(2, "0");
            const total = String(briefingSegments.length).padStart(2, "0");

            briefingProgress.textContent = `${current} / ${total}`;
        }

        briefingText.style.opacity = "1";

    }, 180);
}


// ============================================================
// NEXT BRIEFING
// ============================================================

function nextBriefing() {

    playSelectSound();

    if (briefingIndex < briefingSegments.length - 1) {

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

    const member = teamMembers[teamIndex];

    if (!member) return;

    // Fade the current content slightly
    teamImage.style.opacity = "0";
    teamRole.style.opacity = "0";
    teamName.style.opacity = "0";
    teamDescription.style.opacity = "0";
    teamDialogue.style.opacity = "0";

    // Change everything almost immediately
    setTimeout(function() {

        teamImage.src = member.image;
        teamImage.alt = member.name;

        teamRole.textContent = member.role;
        teamName.textContent = member.name;
        teamDescription.textContent = member.description;
        teamDialogue.textContent = `"${member.dialogue}"`;

        teamProgress.textContent =
            `${String(teamIndex + 1).padStart(2, "0")} / ${String(teamMembers.length).padStart(2, "0")}`;

        // Bring everything back together
        requestAnimationFrame(function() {

            teamImage.style.opacity = "1";
            teamRole.style.opacity = "1";
            teamName.style.opacity = "1";
            teamDescription.style.opacity = "1";
            teamDialogue.style.opacity = "1";

        });

    }, 80);
}


// ============================================================
// NEXT TEAM MEMBER
// ============================================================

function nextTeamMember() {

    playSelectSound();

    if (teamIndex < teamMembers.length - 1) {

        teamIndex++;

        loadTeamMember();

    } else {

        openTeamComplete();
    }
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
// BEGIN INVESTIGATION
// ============================================================

function startInvestigation() {

    playSelectSound();

    // For now, keep this as the final story screen.
    // We will connect CASE FILE 001 here next.

    console.log("Investigation ready to begin.");

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


if (teamContinueButton) {

    teamContinueButton.addEventListener("click", function() {

        nextTeamMember();

    });

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
console.log("Briefing segments:", briefingSegments.length);
console.log("Team members:", teamMembers.length);
