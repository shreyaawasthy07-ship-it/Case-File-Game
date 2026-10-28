// ============================================================
// THE GREY DISTRICT
// CASE FILE 001 — ACT 1: THE MISSING JOURNALIST
// ============================================================


// ============================================================
// TEAM
// ============================================================

const TEAM = {

    maya: {
        name: "MAYA SHARMA",
        role: "Field Investigator",
        handles: "Locations, witnesses, old paper records",
        image: "../field investigator.png"
    },

    neel: {
        name: "DR. NEEL MEHRA",
        role: "Forensic Specialist",
        handles: "Physical evidence, fingerprints, ink, locks",
        image: "../forensic.png"
    },

    arjun: {
        name: "ARJUN KHANNA",
        role: "Intelligence / Tech",
        handles: "Phones, call records, CCTV, GPS",
        image: "../intelligence.png"
    }

};


// ============================================================
// EVIDENCE
// ============================================================

const EVIDENCE = {

    "EV-001": {
        title: "Missing Person Report",
        meta: "Sector 14 Police Station · Filed Sun 25 Oct by Ishaan Verma",
        report: true,
        primary: null
    },

    "EV-002": {
        title: "Shivvya's Mobile Phone",
        meta: "Recovered: Sector 14 overbridge · Sat 24 Oct, 06:00",
        images: [
            { src: "../assets/evidence/EV-002-phone.jpg" }
        ],
        body: "Screen cracked. Switched off when the patrol found it.",
        primary: "arjun",
        replies: {
            arjun:
                "Last incoming call at 22:32, 47 seconds, from 98110 41400. " +
                "That number belongs to the Sector 14 Police Station duty line. " +
                "Phone was switched off at 23:47:18. The last tower ping was Sector 14, near the overbridge. " +
                "Her messages app was wiped after 23:00. Someone knew her passcode, or made her open it.",
            neel:
                "No prints on it. None. Not even hers. That phone was wiped clean, on purpose.",
            maya:
                "Overbridge is a dead zone at night. If she walked there, she didn't walk there alone."
        },
        nudge: "Send that to me, it's a phone. My department."
    },

    "EV-003": {
        title: "Apartment Scene Photos",
        meta: "Taken by Maya · Green Arcade Apartments, Flat 4B",
        images: [
            { src: "../assets/backgrounds/apartment.png", caption: "Flat 4B, as found" },
            { src: "../assets/evidence/EV-003-charger.jpg", caption: "Charger. No laptop." },
            { src: "../assets/evidence/EV-003-notebook.jpg", caption: "Top pages torn out" }
        ],
        body:
            "Door locked from outside, keys missing. A laptop charger on the desk, " +
            "but no laptop. A notebook with the top pages torn out.",
        primary: "neel",
        replies: {
            neel:
                "No forced entry. The lock was turned with a key. Hers is missing. " +
                "The notebook: the torn pages left indentations on the page underneath. " +
                "Most of it is unreadable, but I can make out '…9-04…' and the word 'closed'.",
            arjun:
                "Charger's for a laptop that's nowhere in this flat. Someone took her work, not her valuables.",
            maya:
                "Her wallet's still in the drawer. This wasn't a robbery."
        },
        nudge: "Locks and paper are my world. Send the apartment photos to me."
    },

    "EV-004": {
        title: "Café CCTV, Blue Lantern Café",
        meta: "Pulled by Arjun · Camera near the last tower ping",
        cctv: true,
        images: [
            { src: "../assets/evidence/EV-004-a.png", caption: "22:41:06" },
            { src: "../assets/evidence/EV-004-b.png", caption: "22:58:40" },
            { src: "../assets/evidence/EV-004-c.png", caption: "23:05:12" }
        ],
        body:
            "22:41:06 Shivvya enters alone, sits by the window. " +
            "22:58:40 A man in a dark jacket and cap joins her. Face never toward camera. " +
            "23:05:12 They leave together, toward the overbridge.",
        primary: "arjun",
        replies: {
            arjun:
                "Enhanced frame at 22:58: there's a radio handset clipped to his belt. Police issue.",
            neel:
                "His boots, that reflective heel strip. Standard patrol issue in this District.",
            maya:
                "The café is 400 metres from her building. She was here at 22:41. Remember that."
        },
        nudge: "CCTV is my department. Send the footage over."
    },

    "EV-005": {
        title: "Building Guard's Logbook",
        meta: "Green Arcade gate cabin · Kept by Ramesh Yadav",
        images: [
            { src: "../assets/evidence/EV-005-logbook.jpg" }
        ],
        logEntry: "FRI 23 OCT · S. NAIR (4B) — OUT 23:00 — ALONE",
        body: "The entry for Friday night.",
        primary: "neel",
        replies: {
            neel:
                "Different pen from every other entry that night. And it's squeezed between two lines. " +
                "This was written later.",
            maya:
                "Ramesh has kept this book for nine years. He doesn't squeeze entries. " +
                "Somebody told him what to write.",
            arjun:
                "Nothing digital here. Paper's Neel's world."
        },
        nudge: "That ink needs a forensic eye. Send the logbook to me."
    }

};


// ============================================================
// STATEMENTS (heard by visiting locations)
// ============================================================

const STATEMENTS = {

    "ST-01": {
        person: "ISHAAN VERMA",
        role: "Editor, The Ledger",
        image: "../assets/characters/ishaan/worried.png",
        lines: [
            "Two months ago she stopped pitching stories. Said she was working on something old. Something nobody would let her print.",
            "Friday evening she told me she was meeting a source. She sounded nervous. Happy-nervous. Like it was finally happening."
        ]
    },

    "ST-02": {
        person: "POOJA",
        role: "Café Worker, Blue Lantern",
        image: "../assets/characters/pooja/uneasy.png",
        lines: [
            "She ordered chai and didn't drink it. Kept checking her phone.",
            "A man came in, and she relaxed. Like she'd been waiting for him. Like she trusted him.",
            "He paid. Cash. They left together."
        ]
    },

    "ST-03": {
        person: "RAMESH YADAV",
        role: "Security Guard, Green Arcade",
        image: "../assets/characters/ramesh/portrait.png",
        lines: [
            "Eleven o'clock, madam left. Alone. Walked toward the main road. Nobody with her.",
            "It's written in my book. I write everything in my book."
        ]
    }

};


// ============================================================
// LOCATIONS
// ============================================================

const LOCATIONS = [

    {
        id: "apartment",
        name: "Shivvya's Apartment",
        place: "Green Arcade Apartments, Flat 4B",
        image: "../assets/backgrounds/apartment.png",
        text: "The door was locked from outside. Maya photographed everything before anyone touched it.",
        gives: ["EV-003"],
        isOpen: function() { return true; }
    },

    {
        id: "gate",
        name: "Gate Cabin",
        place: "Green Arcade main gate",
        image: "../assets/backgrounds/gate-cabin.png",
        text: "Ramesh Yadav has guarded this gate for nine years. His register sits open on the table.",
        gives: ["ST-03", "EV-005"],
        isOpen: function() { return true; }
    },

    {
        id: "newsroom",
        name: "The Ledger Newsroom",
        place: "Editorial floor, late night",
        image: "../assets/characters/ishaan/portrait.png",
        text: "Her editor filed the missing person report. He hasn't gone home since.",
        gives: ["ST-01"],
        isOpen: function() { return true; }
    },

    {
        id: "overbridge",
        name: "Sector 14 Overbridge",
        place: "Where her phone was found",
        image: "../assets/backgrounds/overbridge.png",
        text: "MAYA: \"Patrol found the phone here at six in the morning. No cameras on this stretch. Whoever chose this spot knew that.\"",
        gives: [],
        lockedText: "Find out where her phone last pinged.",
        isOpen: function() { return hasReply("EV-002", "arjun"); }
    },

    {
        id: "cafe",
        name: "Blue Lantern Café",
        place: "400 metres from her building",
        image: "../assets/backgrounds/cafe.png",
        text: "Warm bulbs, empty tables. Pooja was working the counter on Friday night.",
        gives: ["ST-02"],
        lockedText: "Review the café footage first.",
        isOpen: function() { return hasReply("EV-004", "arjun"); }
    }

];


// ============================================================
// OBJECTIVES + CLUES
// ============================================================

const OBJECTIVES = [

    {
        text: "Review the missing person report",
        isDone: function() { return state.opened.includes("EV-001"); },
        clue: {
            who: "maya",
            text: "Start with the report Garvit handed you. Open EV-001 in the Evidence tab."
        }
    },

    {
        text: "Find out who she spoke to last",
        isDone: function() { return hasReply("EV-002", "arjun"); },
        clue: {
            who: "arjun",
            text: "Her phone is my department. Open EV-002 and send it to me."
        }
    },

    {
        text: "Trace where she went after the call",
        isDone: function() { return hasReply("EV-004", "arjun"); },
        clue: {
            who: "arjun",
            text: "I pulled the cameras near the last tower ping. Open EV-004 and send me the footage."
        }
    },

    {
        text: "Hear from the people who saw her",
        isDone: function() {
            return ["ST-01", "ST-02", "ST-03"].every(function(id) {
                return state.items.includes(id);
            });
        },
        clue: {
            who: "maya",
            text: "Three people saw her that night: her editor, the café worker and the gate guard. Find them in Locations."
        }
    },

    {
        text: "Find what doesn't add up",
        isDone: function() { return state.contradiction; },
        clue: {
            who: "maya",
            text: "Ramesh was very sure about eleven o'clock. Was she even home at eleven? Compare his statement with the CCTV."
        }
    }

];

const MAX_CLUES = 3;


// ============================================================
// CONTRADICTIONS (compare two items)
// ============================================================

const CONTRADICTIONS = [
    {
        pair: ["ST-03", "EV-004"],
        text: "Ramesh says she left the building at 23:00. The CCTV has her at the café from 22:41. She was already gone."
    },
    {
        pair: ["EV-005", "EV-004"],
        text: "The logbook says she went out at 23:00. The CCTV has her at the café from 22:41. The log entry is false."
    }
];


// ============================================================
// SCRIPTS
// ============================================================

const NARRATION = [
    "Shivvya disappeared three nights ago.",
    "Her phone was found the next morning.",
    "Her apartment was locked.",
    "No ransom. No witness who saw her leave.",
    "And yet, someone has been very careful.",
    "YOUR ASSIGNMENT: FIND SHIVVYA."
];

const GARVIT_IMAGE = "../assets/characters/garvit/portrait.png";

const HANDOVER = [
    {
        speaker: "ACP GARVIT SEHGAL",
        image: GARVIT_IMAGE,
        text: "You must be the Directorate's investigator. Garvit Sehgal, I run Sector 14."
    },
    {
        speaker: "ACP GARVIT SEHGAL",
        image: GARVIT_IMAGE,
        text: "My patrol recovered her phone near the overbridge on Saturday, 6 AM. It was switched off when we found it."
    },
    {
        speaker: "ACP GARVIT SEHGAL",
        image: GARVIT_IMAGE,
        text: "Whatever you need from my station, files, officers, vehicle logs, you call me directly. Let's bring her home."
    }
];

const RAMESH_SCENE = [
    {
        speaker: "RAMESH YADAV",
        image: "../assets/characters/ramesh/afraid.png",
        text: "…A policeman came Saturday morning. Before the report was even filed. He said, 'Write that she left alone. It saves everyone trouble.' I have a family, madam."
    },
    {
        speaker: "MAYA SHARMA",
        image: "../field investigator.png",
        text: "Did he give a name?"
    },
    {
        speaker: "RAMESH YADAV",
        image: "../assets/characters/ramesh/afraid.png",
        text: "No. But his jeep said P-14."
    },
    {
        speaker: "ARJUN KHANNA",
        image: "../intelligence.png",
        text: "P-14 was on duty Friday night. Assigned officer: SI Kabir Rathore. The same officer who's named on the missing person report."
    }
];

const GARVIT_CALL = [
    {
        speaker: "ACP GARVIT SEHGAL · PHONE",
        image: GARVIT_IMAGE,
        text: "Kabir? He's one of my best men. But you do what you have to do. I'll send you his vehicle GPS logs myself, today."
    }
];


// ============================================================
// STATE (saved, so the case continues after a reload)
// ============================================================

const SAVE_KEY = "greyDistrict.case001";

function freshState() {
    return {
        stage: "opening",
        items: [],
        opened: [],
        replies: [],
        visited: [],
        cluesLeft: MAX_CLUES,
        cluesUsedFor: [],
        wrongStreak: 0,
        contradiction: false
    };
}

function loadState() {

    if (new URLSearchParams(window.location.search).has("restart")) {
        return freshState();
    }

    try {
        const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
        if (saved && saved.stage) {
            return Object.assign(freshState(), saved);
        }
    } catch (error) {
        // no save yet, or storage blocked
    }

    return freshState();
}

function saveState() {
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (error) {
        // storage blocked: the case still works, it just won't resume
    }
}

let state = loadState();

function hasReply(id, who) {
    return state.replies.includes(id + ":" + who);
}

function currentObjective() {
    return OBJECTIVES.findIndex(function(objective) {
        return !objective.isDone();
    });
}


// ============================================================
// ELEMENTS
// ============================================================

const screens = document.querySelectorAll(".screen");

const openingScreen = document.getElementById("openingScreen");
const openingTime = document.getElementById("openingTime");
const openingLine = document.getElementById("openingLine");
const skipOpening = document.getElementById("skipOpening");

const subjectScreen = document.getElementById("subjectScreen");
const subjectContinue = document.getElementById("subjectContinue");

const narrationScreen = document.getElementById("narrationScreen");
const narrationText = document.getElementById("narrationText");

const dialogueScreen = document.getElementById("dialogueScreen");
const dialogueImage = document.getElementById("dialogueImage");
const dialogueSpeaker = document.getElementById("dialogueSpeaker");
const dialogueText = document.getElementById("dialogueText");

const stampScreen = document.getElementById("stampScreen");
const completeScreen = document.getElementById("completeScreen");
const completeContinue = document.getElementById("completeContinue");

const hubScreen = document.getElementById("hubScreen");
const hubTabs = document.querySelectorAll(".hub-tab");
const tabPanel = document.getElementById("tabPanel");
const objectiveText = document.getElementById("objectiveText");
const objectiveStep = document.getElementById("objectiveStep");
const clueButton = document.getElementById("clueButton");
const clueCount = document.getElementById("clueCount");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const toast = document.getElementById("toast");

const gameMusic = document.getElementById("gameMusic");
const selectSound = document.getElementById("selectSound");


// ============================================================
// SOUND
// ============================================================

function playSelectSound() {
    if (!selectSound) return;
    selectSound.currentTime = 0;
    selectSound.play().catch(function() {});
}

function startGameMusic() {
    if (!gameMusic) return;
    gameMusic.volume = 0.35;
    gameMusic.play().catch(function() {});
}


// ============================================================
// SCREENS
// ============================================================

function showScreen(screen) {
    screens.forEach(function(item) {
        item.classList.remove("is-active");
    });
    screen.classList.add("is-active");
}


// ============================================================
// 1. OPENING
// ============================================================

let openingTimers = [];
let openingFinished = false;

function typeText(element, text, speed, onDone) {
    let index = 0;
    element.textContent = "";
    const timer = setInterval(function() {
        index++;
        element.textContent = text.slice(0, index);
        if (index >= text.length) {
            clearInterval(timer);
            if (onDone) onDone();
        }
    }, speed);
    openingTimers.push(timer);
}

function playOpening() {
    showScreen(openingScreen);

    openingTimers.push(setTimeout(function() {
        typeText(openingTime, "SECTOR 14 — 23:47:18", 70, function() {
            openingTimers.push(setTimeout(function() {
                openingLine.textContent = "A PHONE GOES DARK.";
                openingLine.classList.add("is-visible");
                openingTimers.push(setTimeout(finishOpening, 2200));
            }, 600));
        });
    }, 1200));
}

function finishOpening() {
    if (openingFinished) return;
    openingFinished = true;
    openingTimers.forEach(function(timer) {
        clearTimeout(timer);
        clearInterval(timer);
    });
    showScreen(subjectScreen);
}


// ============================================================
// 2–3. SUBJECT CARD + NARRATION
// ============================================================

let narrationIndex = 0;

function showNarration() {
    narrationIndex = 0;
    showNarrationLine();
    showScreen(narrationScreen);
}

function showNarrationLine() {
    const line = NARRATION[narrationIndex];
    narrationText.textContent = line;
    narrationText.classList.toggle(
        "is-assignment",
        narrationIndex === NARRATION.length - 1
    );
    narrationText.classList.remove("fade-in");
    void narrationText.offsetWidth;
    narrationText.classList.add("fade-in");
}

function nextNarration() {
    playSelectSound();
    narrationIndex++;
    if (narrationIndex < NARRATION.length) {
        showNarrationLine();
    } else {
        playDialogue(HANDOVER, finishHandover);
    }
}

function finishHandover() {
    state.stage = "hub";
    ["EV-001", "EV-002"].forEach(addItem);
    saveState();
    openHub();
    showToast("RECEIVED FROM ACP SEHGAL: EV-001 · EV-002");
}


// ============================================================
// 4. DIALOGUE
// ============================================================

let dialogueLines = [];
let dialogueIndex = 0;
let dialogueDone = null;

function playDialogue(lines, onDone) {
    dialogueLines = lines;
    dialogueIndex = 0;
    dialogueDone = onDone;
    showDialogueLine();
    showScreen(dialogueScreen);
}

function showDialogueLine() {
    const line = dialogueLines[dialogueIndex];
    if (dialogueImage.getAttribute("src") !== line.image) {
        dialogueImage.src = line.image;
    }
    dialogueSpeaker.textContent = line.speaker;
    dialogueText.textContent = line.text;
}

function nextDialogue() {
    playSelectSound();
    dialogueIndex++;
    if (dialogueIndex < dialogueLines.length) {
        showDialogueLine();
    } else if (dialogueDone) {
        dialogueDone();
    }
}


// ============================================================
// 5. HUB
// ============================================================

let activeTab = "evidence";
let lastObjective = null;
let compareMode = false;
let compareSelection = [];

function openHub() {
    showScreen(hubScreen);
    lastObjective = currentObjective();
    renderHub();
}

function renderHub() {
    renderObjective();
    clueCount.textContent = state.cluesLeft;
    clueButton.classList.toggle("is-empty", state.cluesLeft === 0);

    hubTabs.forEach(function(tab) {
        tab.classList.toggle("is-active", tab.dataset.tab === activeTab);
    });

    if (activeTab === "evidence") renderEvidenceTab();
    if (activeTab === "team") renderTeamTab();
    if (activeTab === "locations") renderLocationsTab();
    if (activeTab === "board") renderBoardTab();
}

function renderObjective() {
    const index = currentObjective();
    if (index === -1) {
        objectiveText.textContent = "Act 1 complete. Kabir Rathore is your person of interest.";
        objectiveStep.textContent = "ALL OBJECTIVES DONE";
    } else {
        objectiveText.textContent = OBJECTIVES[index].text;
        objectiveStep.textContent = "OBJECTIVE " + (index + 1) + " OF " + OBJECTIVES.length;
    }
}

// call after anything that changes the case
function caseChanged() {
    const now = currentObjective();
    if (lastObjective !== null && now !== lastObjective) {
        showToast(now === -1 ? "ALL OBJECTIVES COMPLETE" : "OBJECTIVE COMPLETE");
    }
    lastObjective = now;
    saveState();
    renderHub();
}

function addItem(id) {
    if (!state.items.includes(id)) {
        state.items.push(id);
        return true;
    }
    return false;
}


// ------------------------------------------------------------
// EVIDENCE TAB
// ------------------------------------------------------------

function itemThumb(id) {
    if (STATEMENTS[id]) return STATEMENTS[id].image;
    const item = EVIDENCE[id];
    return item.images ? item.images[0].src : null;
}

function itemTitle(id) {
    if (STATEMENTS[id]) return STATEMENTS[id].person;
    return EVIDENCE[id].title;
}

function cardHTML(id) {
    const thumb = itemThumb(id);
    const isNew = !state.opened.includes(id);
    const isSelected = compareSelection.includes(id);
    return (
        '<button class="item-card' +
            (isSelected ? " is-selected" : "") +
            '" data-item="' + id + '" type="button">' +
            (thumb
                ? '<img src="' + thumb + '" alt="">'
                : '<span class="item-doc">REPORT</span>') +
            '<span class="item-id">' + id + (isNew ? ' <em>NEW</em>' : "") + '</span>' +
            '<span class="item-name">' + itemTitle(id) + '</span>' +
        '</button>'
    );
}

function renderEvidenceTab() {
    const evidence = state.items.filter(function(id) { return EVIDENCE[id]; });
    const statements = state.items.filter(function(id) { return STATEMENTS[id]; });
    const canCompare = statements.length > 0 && !state.contradiction;

    let html = "";

    // contradiction found but the end scene hasn't played yet
    if (state.contradiction && state.stage === "hub") {
        html +=
            '<button id="startEndScene" class="continue-button end-banner" type="button">' +
                'CONTRADICTION FOUND · QUESTION RAMESH AGAIN <strong>→</strong>' +
            '</button>';
    }

    html +=
        '<div class="panel-bar">' +
            '<h2>EVIDENCE <span>' + evidence.length + '</span></h2>' +
            (canCompare
                ? '<button id="compareToggle" class="small-button' +
                    (compareMode ? " is-on" : "") + '" type="button">' +
                    (compareMode ? "CANCEL COMPARE" : "COMPARE") +
                  '</button>'
                : "") +
        '</div>';

    if (compareMode) {
        html += '<p class="panel-hint">Pick two things that can\'t both be true. ' +
            compareSelection.length + ' of 2 selected.</p>';
    }

    html += '<div class="card-grid">' + evidence.map(cardHTML).join("") + '</div>';

    html += '<div class="panel-bar"><h2>STATEMENTS <span>' + statements.length + '</span></h2></div>';

    html += statements.length
        ? '<div class="card-grid">' + statements.map(cardHTML).join("") + '</div>'
        : '<p class="panel-hint">No statements yet. Visit people in Locations.</p>';

    tabPanel.innerHTML = html;
}

function openItem(id) {
    if (compareMode) {
        toggleCompare(id);
        return;
    }

    playSelectSound();

    if (!state.opened.includes(id)) {
        state.opened.push(id);
        caseChanged();
    }

    if (STATEMENTS[id]) {
        openModal(statementHTML(id));
    } else {
        openModal(evidenceHTML(id));
    }
}

function evidenceHTML(id) {
    const item = EVIDENCE[id];
    let media = "";

    if (item.report) {
        media =
            '<div class="report-doc">' +
                '<p class="report-head">SECTOR 14 POLICE STATION<br>MISSING PERSON REPORT</p>' +
                '<dl>' +
                    '<dt>Subject</dt><dd>Shivvya Nair, 26</dd>' +
                    '<dt>Reported by</dt><dd>Ishaan Verma, Editor, The Ledger</dd>' +
                    '<dt>Filed</dt><dd>Sun 25 Oct 2026</dd>' +
                '</dl>' +
                '<p class="report-text">"Subject did not report to work Saturday. Phone unreachable. ' +
                    'Apartment locked. No signs of struggle reported."</p>' +
                '<p class="report-officer">Investigating officer: SI K. Rathore</p>' +
            '</div>';
    }

    if (item.images) {
        media += '<div class="evidence-media' + (item.images.length > 1 ? " is-gallery" : "") + '">' +
            item.images.map(function(image) {
                return (
                    '<figure class="' + (item.cctv ? "cctv-frame" : "") + '">' +
                        '<img src="' + image.src + '" alt="">' +
                        (image.caption
                            ? '<figcaption>' +
                                (item.cctv ? "CAM 02 · BLUE LANTERN · " : "") +
                                image.caption + '</figcaption>'
                            : "") +
                    '</figure>'
                );
            }).join("") +
        '</div>';
    }

    let html =
        '<p class="modal-kicker">' + id + ' · EVIDENCE</p>' +
        '<h2>' + item.title + '</h2>' +
        '<p class="modal-meta">' + item.meta + '</p>' +
        media +
        (item.logEntry ? '<p class="log-entry">' + item.logEntry + '</p>' : "") +
        (item.body ? '<p class="modal-text">' + item.body + '</p>' : "");

    if (item.primary) {
        html +=
            '<div class="send-row">' +
                '<span>SEND TO SPECIALIST</span>' +
                '<div>' +
                    Object.keys(TEAM).map(function(who) {
                        return '<button class="send-button" data-send="' + who + '" data-item="' + id + '" type="button">' +
                            '<img src="' + TEAM[who].image + '" alt="">' +
                            who.toUpperCase() +
                        '</button>';
                    }).join("") +
                '</div>' +
            '</div>' +
            '<div id="replyBox"></div>';
    } else {
        html += '<p class="panel-hint">Examine only. Nothing here for the lab yet.</p>';
    }

    return html;
}

function statementHTML(id) {
    const statement = STATEMENTS[id];
    return (
        '<p class="modal-kicker">' + id + ' · STATEMENT</p>' +
        '<div class="statement">' +
            '<img src="' + statement.image + '" alt="">' +
            '<div>' +
                '<h2>' + statement.person + '</h2>' +
                '<p class="modal-meta">' + statement.role + '</p>' +
                statement.lines.map(function(line) {
                    return '<p class="quote">"' + line + '"</p>';
                }).join("") +
            '</div>' +
        '</div>'
    );
}

function replyHTML(who, text) {
    return (
        '<div class="reply">' +
            '<img src="' + TEAM[who].image + '" alt="">' +
            '<div>' +
                '<strong>' + TEAM[who].name + '</strong>' +
                '<p>' + text + '</p>' +
            '</div>' +
        '</div>'
    );
}

function sendToSpecialist(id, who) {
    playSelectSound();

    const item = EVIDENCE[id];
    const replyBox = document.getElementById("replyBox");
    let html = replyHTML(who, item.replies[who]);

    // help system: two wrong routings in a row
    if (who === item.primary) {
        state.wrongStreak = 0;
    } else {
        state.wrongStreak++;
        if (state.wrongStreak >= 2) {
            html += replyHTML(item.primary, item.nudge);
            state.wrongStreak = 0;
        }
    }

    replyBox.innerHTML = html;

    const key = id + ":" + who;
    if (state.replies.includes(key)) {
        saveState();
        return;
    }
    state.replies.push(key);

    if (key === "EV-002:arjun") {
        addItem("EV-004");
        showToast("NEW LEAD: THE DUTY LINE CALL · EV-004 UNLOCKED");
        showToast("NEW LOCATION: SECTOR 14 OVERBRIDGE");
    }

    if (key === "EV-004:arjun") {
        showToast("NEW LOCATION: BLUE LANTERN CAFÉ");
    }

    caseChanged();
}


// ------------------------------------------------------------
// COMPARE (the contradiction gate)
// ------------------------------------------------------------

function toggleCompareMode() {
    playSelectSound();
    compareMode = !compareMode;
    compareSelection = [];
    renderHub();
}

function toggleCompare(id) {
    playSelectSound();

    if (compareSelection.includes(id)) {
        compareSelection = compareSelection.filter(function(item) { return item !== id; });
    } else {
        compareSelection.push(id);
    }

    if (compareSelection.length < 2) {
        renderHub();
        return;
    }

    const pair = compareSelection.slice().sort();
    const match = CONTRADICTIONS.find(function(contradiction) {
        return contradiction.pair.slice().sort().join() === pair.join();
    });

    compareMode = false;
    compareSelection = [];
    renderHub();

    if (match) {
        state.contradiction = true;
        caseChanged();
        openModal(
            '<p class="modal-kicker">' + pair.join(" + ") + '</p>' +
            '<h2 class="contradiction-title">CONTRADICTION FOUND</h2>' +
            '<p class="modal-text">' + match.text + '</p>' +
            '<button id="startEndScene" class="continue-button" type="button">' +
                'QUESTION RAMESH AGAIN <strong>→</strong>' +
            '</button>'
        );
    } else {
        openModal(
            '<p class="modal-kicker">' + pair.join(" + ") + '</p>' +
            '<h2>NO CONFLICT</h2>' +
            '<p class="modal-text">These don\'t conflict. Look for two things that can\'t both be true.</p>'
        );
    }
}

function playEndOfAct() {
    closeModal();
    playDialogue(RAMESH_SCENE, function() {
        showScreen(stampScreen);
    });
}

function finishStamp() {
    playSelectSound();
    playDialogue(GARVIT_CALL, function() {
        state.stage = "complete";
        saveState();
        showScreen(completeScreen);
    });
}


// ------------------------------------------------------------
// TEAM TAB
// ------------------------------------------------------------

function renderTeamTab() {
    tabPanel.innerHTML =
        '<div class="panel-bar"><h2>YOUR TEAM</h2></div>' +
        '<p class="panel-hint">Open any evidence and send it to the specialist who handles it.</p>' +
        '<div class="team-list">' +
            Object.keys(TEAM).map(function(who) {
                const member = TEAM[who];
                const notes = state.replies
                    .filter(function(key) { return key.split(":")[1] === who; })
                    .map(function(key) {
                        const id = key.split(":")[0];
                        return '<li><b>' + id + '</b> ' + EVIDENCE[id].replies[who] + '</li>';
                    });

                return (
                    '<article class="team-card">' +
                        '<img src="' + member.image + '" alt="">' +
                        '<div>' +
                            '<h3>' + member.name + '</h3>' +
                            '<p class="team-role">' + member.role + '</p>' +
                            '<p class="team-handles">HANDLES: ' + member.handles + '</p>' +
                            (notes.length
                                ? '<ul class="team-notes">' + notes.join("") + '</ul>'
                                : '<p class="panel-hint">No case notes yet.</p>') +
                        '</div>' +
                    '</article>'
                );
            }).join("") +
        '</div>';
}


// ------------------------------------------------------------
// LOCATIONS TAB
// ------------------------------------------------------------

function renderLocationsTab() {
    tabPanel.innerHTML =
        '<div class="panel-bar"><h2>LOCATIONS</h2></div>' +
        '<div class="location-grid">' +
            LOCATIONS.map(function(location) {
                const open = location.isOpen();
                const visited = state.visited.includes(location.id);
                return (
                    '<button class="location-card' + (open ? "" : " is-locked") + '" ' +
                        'data-location="' + location.id + '" type="button"' + (open ? "" : " disabled") + '>' +
                        '<img src="' + location.image + '" alt="">' +
                        '<span class="location-name">' + (open ? location.name : "LOCKED") + '</span>' +
                        '<span class="location-place">' +
                            (open ? location.place : location.lockedText) +
                        '</span>' +
                        (visited ? '<span class="location-visited">VISITED</span>' : "") +
                    '</button>'
                );
            }).join("") +
        '</div>';
}

function visitLocation(id) {
    playSelectSound();

    const location = LOCATIONS.find(function(item) { return item.id === id; });
    const found = location.gives.filter(addItem);

    if (!state.visited.includes(id)) {
        state.visited.push(id);
    }

    let html =
        '<p class="modal-kicker">LOCATION</p>' +
        '<h2>' + location.name + '</h2>' +
        '<p class="modal-meta">' + location.place + '</p>' +
        '<div class="evidence-media"><figure><img src="' + location.image + '" alt=""></figure></div>' +
        '<p class="modal-text">' + location.text + '</p>';

    location.gives.forEach(function(itemId) {
        if (STATEMENTS[itemId]) {
            html += statementHTML(itemId);
        }
    });

    if (found.length) {
        html += '<p class="found-line">ADDED TO CASE FILE: ' + found.join(" · ") + '</p>';
    }

    caseChanged();
    openModal(html);
}


// ------------------------------------------------------------
// CASE BOARD TAB (locked until Act 2)
// ------------------------------------------------------------

function renderBoardTab() {
    tabPanel.innerHTML =
        '<div class="board-locked">' +
            '<span class="lock-badge">LOCKED · ACT 2</span>' +
            '<h2>CASE BOARD</h2>' +
            '<p>Connect people, places and evidence on one board. ' +
                'It opens once you have a suspect.</p>' +
            (state.contradiction
                ? '<div class="board-poi">' +
                    '<img src="../assets/characters/kabir/file-photo.png" alt="">' +
                    '<p><span>PERSON OF INTEREST</span>SI KABIR RATHORE</p>' +
                  '</div>'
                : "") +
        '</div>';
}


// ============================================================
// CLUES (3 per case)
// ============================================================

function useClue() {
    playSelectSound();

    const index = currentObjective();

    if (index === -1) {
        openModal(clueHTML("maya", "The case file is closed for now. Save your instincts for Act 2.", ""));
        return;
    }

    const clue = OBJECTIVES[index].clue;
    let note;

    if (state.cluesUsedFor.includes(index)) {
        note = "Already used for this objective. No clue spent.";
    } else if (state.cluesLeft <= 0) {
        openModal(clueHTML(null, "No clues left for this case. You're on your own, investigator.", ""));
        return;
    } else {
        state.cluesLeft--;
        state.cluesUsedFor.push(index);
        note = state.cluesLeft + (state.cluesLeft === 1 ? " clue" : " clues") + " left for this case.";
        caseChanged();
    }

    openModal(clueHTML(clue.who, clue.text, note));
}

function clueHTML(who, text, note) {
    return (
        '<p class="modal-kicker">CLUE</p>' +
        (who
            ? replyHTML(who, text)
            : '<p class="modal-text">' + text + '</p>') +
        (note ? '<p class="panel-hint">' + note + '</p>' : "")
    );
}


// ============================================================
// MODAL + TOAST
// ============================================================

function openModal(html) {
    modalBody.innerHTML = html;
    modal.hidden = false;
    modalBody.scrollTop = 0;
}

function closeModal() {
    modal.hidden = true;
    modalBody.innerHTML = "";
}

let toastQueue = [];
let toastBusy = false;

function showToast(text) {
    toastQueue.push(text);
    if (!toastBusy) nextToast();
}

function nextToast() {
    if (!toastQueue.length) {
        toastBusy = false;
        return;
    }
    toastBusy = true;
    toast.textContent = toastQueue.shift();
    toast.classList.add("is-visible");
    setTimeout(function() {
        toast.classList.remove("is-visible");
        setTimeout(nextToast, 350);
    }, 2600);
}


// ============================================================
// EVENTS
// ============================================================

skipOpening.addEventListener("click", function(event) {
    event.stopPropagation();
    finishOpening();
});

openingScreen.addEventListener("click", function() {
    if (openingLine.classList.contains("is-visible")) finishOpening();
});

subjectContinue.addEventListener("click", function() {
    playSelectSound();
    showNarration();
});

narrationScreen.addEventListener("click", nextNarration);
dialogueScreen.addEventListener("click", nextDialogue);
stampScreen.addEventListener("click", finishStamp);

completeContinue.addEventListener("click", function() {
    playSelectSound();
    openHub();
});

hubTabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
        playSelectSound();
        activeTab = tab.dataset.tab;
        compareMode = false;
        compareSelection = [];
        renderHub();
    });
});

clueButton.addEventListener("click", useClue);

tabPanel.addEventListener("click", function(event) {
    const compare = event.target.closest("#compareToggle");
    const card = event.target.closest("[data-item]");
    const location = event.target.closest("[data-location]");

    if (event.target.closest("#startEndScene")) playEndOfAct();
    else if (compare) toggleCompareMode();
    else if (card) openItem(card.dataset.item);
    else if (location) visitLocation(location.dataset.location);
});

modalBody.addEventListener("click", function(event) {
    const send = event.target.closest("[data-send]");
    if (send) sendToSpecialist(send.dataset.item, send.dataset.send);
    if (event.target.closest("#startEndScene")) playEndOfAct();
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", function(event) {
    if (event.target === modal) closeModal();
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && !modal.hidden) closeModal();
});

document.addEventListener("click", startGameMusic, { once: true });


// ============================================================
// START
// ============================================================

if (state.stage === "opening") {
    saveState();
    playOpening();
} else {
    openHub();
}
