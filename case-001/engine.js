// ============================================================
// THE GREY DISTRICT
// CASE FILE: SHIVVYA — GAME ENGINE
//
// Reads the story from acts.js and runs every act:
// scenes, the hub tabs, the Case Board, the Timeline,
// interrogations, the stakeout, the verdict and the ending.
// ============================================================


// ============================================================
// STATE (saved, so the case continues after a reload)
// ============================================================

const SAVE_KEY = "greyDistrict.caseShivvya.v2";
const MAX_CLUES = 3;

function freshState() {
    return {
        act: 1,
        stage: "intro",
        items: [],
        opened: [],
        replies: [],
        visited: [],
        flags: [],
        board: {},
        timeline: {},
        clues: {},
        cluesUsedFor: [],
        wrongStreak: 0,
        events: [],
        finales: []
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


// ============================================================
// STORY HELPERS (used by acts.js)
// ============================================================

function has(id) { return state.items.includes(id); }
function opened(id) { return state.opened.includes(id); }
function replied(id, who) { return state.replies.includes(id + ":" + who); }
function flag(name) { return state.flags.includes(name); }

function setFlag(name) {
    if (!flag(name)) state.flags.push(name);
}

function linkDone(id) {
    return BOARD.links[id].slots.every(function(slot, index) {
        return state.board[id + ":" + index];
    });
}

function addItem(id) {
    if (has(id)) return false;
    state.items.push(id);
    return true;
}

function currentAct() {
    return ACTS[state.act];
}

function cluesLeft() {
    if (state.clues[state.act] === undefined) state.clues[state.act] = MAX_CLUES;
    return state.clues[state.act];
}

function currentObjective() {
    return currentAct().objectives.findIndex(function(objective) {
        return !objective.done();
    });
}

function finaleReady() {
    const act = currentAct();
    return act.finale && !state.finales.includes(state.act) && act.finale.ready();
}

function verdictReady() {
    if (state.act !== LAST_ACT || flag("verdict")) return false;
    return currentAct().objectives.slice(0, -1).every(function(objective) {
        return objective.done();
    });
}


// ============================================================
// ELEMENTS
// ============================================================

function $(id) { return document.getElementById(id); }

const screens = document.querySelectorAll(".screen");
const modal = $("modal");
const modalBody = $("modalBody");
const tabPanel = $("tabPanel");
const toast = $("toast");
const gameMusic = $("gameMusic");
const selectSound = $("selectSound");


// ============================================================
// SOUND
// ============================================================

function playSelectSound() {
    if (!selectSound) return;
    selectSound.currentTime = 0;
    selectSound.volume = 0.6;
    selectSound.play().catch(function() {});
}

function startGameMusic() {
    if (!gameMusic) return;
    gameMusic.volume = 0.3;
    gameMusic.play().catch(function() {});
}

// faint police radio static, made in the browser (no sound file needed)
function playRadioStatic() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const context = new AudioContext();
        const length = context.sampleRate * 2.6;
        const buffer = context.createBuffer(1, length, context.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < length; i++) {
            data[i] = (Math.random() * 2 - 1) * (0.6 + 0.4 * Math.sin(i / 900));
        }
        const noise = context.createBufferSource();
        noise.buffer = buffer;
        const band = context.createBiquadFilter();
        band.type = "bandpass";
        band.frequency.value = 1800;
        band.Q.value = 0.8;
        const gain = context.createGain();
        gain.gain.setValueAtTime(0, context.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, context.currentTime + 0.3);
        gain.gain.linearRampToValueAtTime(0, context.currentTime + 2.6);
        noise.connect(band).connect(gain).connect(context.destination);
        noise.start();
    } catch (error) {
        // audio blocked until the player taps; the opening still works silently
    }
}


// ============================================================
// SCREENS + EFFECTS
// ============================================================

let currentScreen = null;

function showScreen(id) {
    screens.forEach(function(screen) {
        screen.classList.remove("is-active");
    });
    $(id).classList.add("is-active");
    currentScreen = id;
}

function flashScreen() {
    const flash = $("flash");
    flash.classList.remove("is-flashing");
    void flash.offsetWidth;
    flash.classList.add("is-flashing");
}

function restartAnimation(element, className) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
}


// ============================================================
// SCENE STEPS
//
// Every cutscene is a list of steps. Each step type has a player
// that shows its screen and decides when to move to the next step.
// ============================================================

let stepQueue = [];
let stepDone = null;
let stepHandler = null;
let stepTimers = [];

function runSteps(steps, onDone) {
    stepQueue = steps.slice();
    stepDone = onDone;
    nextStep();
}

function clearStepTimers() {
    stepTimers.forEach(function(timer) {
        clearTimeout(timer);
        clearInterval(timer);
    });
    stepTimers = [];
}

function nextStep() {
    clearStepTimers();
    stepHandler = null;
    const step = stepQueue.shift();
    if (!step) {
        const done = stepDone;
        stepDone = null;
        if (done) done();
        return;
    }
    STEP_PLAYERS[step.type](step);
}

function tapAdvance() {
    if (stepHandler) {
        playSelectSound();
        stepHandler();
    }
}

// lets the player tap only after a short pause, so a double tap can't skip a moment
function armAfter(delay, handler) {
    stepTimers.push(setTimeout(function() {
        stepHandler = handler;
    }, delay));
}

const STEP_PLAYERS = {

    opening: function(step) {
        const time = $("openingTime");
        const line = $("openingLine");
        time.textContent = "";
        line.textContent = step.line;
        line.classList.remove("is-visible");
        showScreen("openingScreen");
        if (step.radio) playRadioStatic();

        stepHandler = function() {
            if (line.classList.contains("is-visible")) nextStep();
        };

        stepTimers.push(setTimeout(function() {
            let index = 0;
            const typing = setInterval(function() {
                index++;
                time.textContent = step.time.slice(0, index);
                if (index >= step.time.length) {
                    clearInterval(typing);
                    stepTimers.push(setTimeout(function() {
                        line.classList.add("is-visible");
                        stepTimers.push(setTimeout(nextStep, 2400));
                    }, 500));
                }
            }, 55);
            stepTimers.push(typing);
        }, 900));
    },

    subject: function() {
        showScreen("subjectScreen");
        stepHandler = nextStep;
    },

    narration: function(step) {
        let index = 0;
        const text = $("narrationText");
        $("narrationImage").src = step.image;

        function show() {
            text.textContent = step.lines[index];
            text.classList.toggle("is-assignment", index === step.lines.length - 1);
            restartAnimation(text, "fade-in");
        }

        show();
        showScreen("narrationScreen");
        stepHandler = function() {
            index++;
            if (index < step.lines.length) show();
            else nextStep();
        };
    },

    dialogue: function(step) {
        let index = 0;
        const image = $("dialogueImage");

        function show() {
            const line = step.lines[index];
            if (image.getAttribute("src") !== line.image) image.src = line.image;
            $("dialogueSpeaker").textContent = line.speaker;
            $("dialogueText").textContent = line.text;
            restartAnimation($("dialogueText"), "fade-in");
        }

        show();
        showScreen("dialogueScreen");
        stepHandler = function() {
            index++;
            if (index < step.lines.length) show();
            else nextStep();
        };
    },

    stamp: function(step) {
        $("stampImage").src = step.image;
        $("stampKicker").textContent = step.kicker;
        $("stampTitle").textContent = step.title;
        restartAnimation($("stampMark"), "is-stamped");
        showScreen("stampScreen");
        armAfter(700, nextStep);
    },

    reveal: function(step) {
        const image = $("revealImage");
        image.hidden = !step.image;
        if (step.image) image.src = step.image;
        $("revealKicker").textContent = step.kicker || "";
        $("revealTitle").textContent = step.title;
        $("revealSub").textContent = step.sub || "";
        restartAnimation($("revealBox"), "fade-in");
        showScreen("revealScreen");
        armAfter(900, nextStep);
    },

    notes: function(step) {
        const board = $("notesBoard");
        let shown = 0;
        board.innerHTML = "";

        function pinNext() {
            const note = document.createElement("p");
            note.className = "pinned-note";
            note.textContent = step.notes[shown];
            board.appendChild(note);
            shown++;
        }

        pinNext();
        showScreen("notesScreen");
        stepHandler = function() {
            if (shown < step.notes.length) pinNext();
            else nextStep();
        };
    },

    give: function(step) {
        step.items.forEach(addItem);
        nextStep();
    }

};


// ============================================================
// ACT FLOW
// ============================================================

function startAct(number) {
    state.act = number;
    state.stage = "intro";
    cluesLeft();
    saveState();

    activeTab = "evidence";
    evidenceFilter = "all";

    runSteps(currentAct().intro, function() {
        currentAct().give.forEach(addItem);
        state.stage = "hub";
        saveState();
        openHub();
        if (currentAct().toast) showToast(currentAct().toast);
    });
}

function startFinale() {
    closeModal(true);
    runSteps(currentAct().finale.steps, function() {
        state.finales.push(state.act);
        state.stage = "complete";
        saveState();
        showComplete();
    });
}

function showComplete() {
    const act = currentAct();
    $("completeKicker").textContent = "CASE FILE: SHIVVYA";
    $("completeTitle").textContent = "ACT " + state.act + " COMPLETE";
    $("completeStatus").textContent = act.complete.status;
    $("completeUnlock").textContent = act.complete.unlocks;
    $("completeContinue").innerHTML =
        "BEGIN ACT " + (state.act + 1) + ": " + ACTS[state.act + 1].title + " <strong>→</strong>";
    showScreen("completeScreen");
}


// ============================================================
// HUB
// ============================================================

let activeTab = "evidence";
let evidenceFilter = "all";
let lastObjective = null;
let compareMode = false;
let compareSelection = [];
let boardView = "board";
let pendingPin = null;
let selectedEvent = null;
let eventQueue = [];

function openHub() {
    showScreen("hubScreen");
    lastObjective = currentObjective();
    renderHub();
    playQueuedEvents();
}

function renderHub() {
    const act = currentAct();

    $("hubAct").textContent = "ACT " + state.act + " · " + act.title;
    $("clueCount").textContent = cluesLeft();
    $("clueButton").classList.toggle("is-empty", cluesLeft() === 0);
    $("verdictButton").hidden = !verdictReady();

    renderObjective();
    renderStatus();

    document.querySelectorAll(".hub-tab").forEach(function(tab) {
        tab.classList.toggle("is-active", tab.dataset.tab === activeTab);
        if (tab.dataset.tab === "board") {
            tab.classList.toggle("is-locked", state.act < 2);
        }
    });

    $("hubBanner").innerHTML = finaleReady()
        ? '<button class="continue-button end-banner" data-finale type="button">' +
            act.finale.label + ' <strong>→</strong></button>'
        : "";

    if (activeTab === "evidence") renderEvidenceTab();
    if (activeTab === "team") renderTeamTab();
    if (activeTab === "locations") renderLocationsTab();
    if (activeTab === "board") renderBoardTab();
}

function renderObjective() {
    const index = currentObjective();
    const objectives = currentAct().objectives;

    if (index === -1) {
        $("objectiveText").textContent = finaleReady()
            ? "Something has changed. Continue the investigation."
            : "All objectives complete.";
        $("objectiveStep").textContent = "ACT " + state.act + " · DONE";
    } else {
        $("objectiveText").textContent = objectives[index].text;
        $("objectiveStep").textContent = "OBJECTIVE " + (index + 1) + " OF " + objectives.length;
    }
}

function renderStatus() {
    const count = function(type) {
        return state.items.filter(function(id) { return ITEMS[id].type === type; }).length;
    };
    const persons = (state.finales.includes(1) ? 1 : 0) + (state.finales.includes(3) ? 1 : 0);
    const pad = function(n) { return (n < 10 ? "0" : "") + n; };

    $("caseStatus").textContent =
        pad(count("evidence")) + " Evidence · " +
        pad(count("record")) + " Records · " +
        pad(count("statement")) + " Statements · " +
        pad(persons) + " Persons of Interest";
}

// call after anything that changes the case
function caseChanged() {
    const now = currentObjective();
    if (lastObjective !== null && now !== lastObjective) {
        showToast(now === -1 ? "ALL OBJECTIVES COMPLETE" : "OBJECTIVE COMPLETE");
    }
    lastObjective = now;

    (currentAct().events || []).forEach(function(event) {
        if (!state.events.includes(event.id) && event.when()) {
            state.events.push(event.id);
            eventQueue.push(event);
        }
    });

    saveState();
    if (currentScreen === "hubScreen") renderHub();
    playQueuedEvents();
}

// short scenes wait until the player has closed whatever they're reading
function playQueuedEvents() {
    if (!eventQueue.length || !modal.hidden || currentScreen !== "hubScreen") return;
    const event = eventQueue.shift();
    runSteps(event.steps, openHub);
}


// ------------------------------------------------------------
// CARDS + ITEM VIEWS
// ------------------------------------------------------------

function itemThumb(id) {
    const item = ITEMS[id];
    if (item.type === "statement") return item.image;
    if (item.images) return item.images[0].src;
    return null;
}

function itemTitle(id) {
    const item = ITEMS[id];
    return item.type === "statement" ? item.person : item.title;
}

function itemPaperLabel(id) {
    const item = ITEMS[id];
    if (item.notes) return "NOTES";
    if (item.table) return "LOG";
    return "REPORT";
}

function cardHTML(id, attribute) {
    const thumb = itemThumb(id);
    const isNew = !opened(id);
    const selected = compareSelection.includes(id) || pendingPin === id;

    return (
        '<button class="item-card' + (selected ? " is-selected" : "") + '" ' +
            (attribute || "data-item") + '="' + id + '" type="button">' +
            (thumb
                ? '<img src="' + thumb + '" alt="">'
                : '<span class="item-doc">' + itemPaperLabel(id) + '</span>') +
            '<span class="item-id">' + id + ' · ' + ITEMS[id].type.toUpperCase() +
                (isNew ? ' <em>NEW</em>' : "") + '</span>' +
            '<span class="item-name">' + itemTitle(id) + '</span>' +
        '</button>'
    );
}

function mediaHTML(item) {
    let html = "";

    if (item.images) {
        html += '<div class="evidence-media' + (item.images.length > 1 ? " is-gallery" : "") + '">' +
            item.images.map(function(image) {
                return '<figure class="' + (item.cctv ? "cctv-frame" : "") + '">' +
                    '<img src="' + image.src + '" alt="">' +
                    (image.caption ? '<figcaption>' + image.caption + '</figcaption>' : "") +
                '</figure>';
            }).join("") +
        '</div>';
    }

    if (item.doc) {
        const doc = item.doc;
        html += '<div class="report-doc">' +
            (doc.stamp ? '<span class="doc-stamp">' + doc.stamp + '</span>' : "") +
            '<p class="report-head">' + doc.head + '</p>' +
            '<dl>' + doc.rows.map(function(row) {
                return '<dt>' + row[0] + '</dt><dd>' + row[1] + '</dd>';
            }).join("") + '</dl>' +
            (doc.text ? '<p class="report-text">' + doc.text + '</p>' : "") +
            (doc.foot ? '<p class="report-officer">' + doc.foot + '</p>' : "") +
        '</div>';
    }

    if (item.table) {
        const rows = item.table.rows.filter(function(row) {
            return !row.act || row.act <= state.act;
        });
        html += '<div class="log-table"><table>' +
            '<thead><tr>' + item.table.columns.map(function(column) {
                return '<th>' + column + '</th>';
            }).join("") + '</tr></thead>' +
            '<tbody>' + rows.map(function(row) {
                return '<tr' + (row.mark ? ' class="is-marked"' : "") + '>' +
                    row.cells.map(function(cell) { return '<td>' + cell + '</td>'; }).join("") +
                '</tr>';
            }).join("") + '</tbody>' +
        '</table></div>';
    }

    if (item.notes) {
        html += '<div class="notes-inline">' + item.notes.map(function(note) {
            return '<p class="pinned-note">' + note + '</p>';
        }).join("") + '</div>';
    }

    if (item.logEntry) html += '<p class="log-entry">' + item.logEntry + '</p>';
    if (item.body) html += '<p class="modal-text">' + item.body + '</p>';

    return html;
}

function statementHTML(id) {
    const item = ITEMS[id];
    return (
        '<div class="statement">' +
            '<img src="' + item.image + '" alt="">' +
            '<div>' +
                '<h2>' + item.person + '</h2>' +
                '<p class="modal-meta">' + item.role + '</p>' +
                item.lines.map(function(line) {
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

function itemHTML(id) {
    const item = ITEMS[id];
    let html = '<p class="modal-kicker">' + id + ' · ' + item.type.toUpperCase() + '</p>';

    if (item.type === "statement") {
        html += statementHTML(id);
    } else {
        html += '<h2>' + item.title + '</h2>' +
            '<p class="modal-meta">' + item.meta + '</p>' +
            mediaHTML(item);
    }

    html += '<div class="item-actions">';

    if (item.primary) {
        html +=
            '<div class="send-row">' +
                '<span>WHO SHOULD HANDLE THIS?</span>' +
                '<div>' +
                    Object.keys(TEAM).map(function(who) {
                        return '<button class="send-button" data-send="' + who + '" data-item="' + id + '" type="button">' +
                            '<img src="' + TEAM[who].image + '" alt="">' +
                            '<b>' + who.toUpperCase() + '</b>' +
                            '<small>' + TEAM[who].units.join(" · ") + '</small>' +
                        '</button>';
                    }).join("") +
                '</div>' +
            '</div>' +
            '<div id="replyBox"></div>';
    } else if (item.type !== "statement") {
        html += '<p class="panel-hint">Examine only. Nothing here for the lab.</p>';
    }

    if (state.act >= 2) {
        html += '<button class="small-button" data-pin-start="' + id + '" type="button">ADD TO CASE BOARD</button>';
    }

    html += '</div>';
    return html;
}

function openItem(id) {
    if (compareMode) {
        toggleCompare(id);
        return;
    }

    playSelectSound();
    openModal(itemHTML(id));

    if (!opened(id)) {
        state.opened.push(id);
        caseChanged();
    }
}

function sendToSpecialist(id, who) {
    playSelectSound();

    const item = ITEMS[id];
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

    $("replyBox").innerHTML = html;

    const key = id + ":" + who;
    if (state.replies.includes(key)) {
        saveState();
        return;
    }
    state.replies.push(key);

    const effect = item.onReply && item.onReply[who];
    if (effect) {
        (effect.give || []).forEach(addItem);
        (effect.toasts || []).forEach(showToast);
        if (effect.give) flashScreen();
    }

    caseChanged();
}


// ------------------------------------------------------------
// EVIDENCE TAB
// ------------------------------------------------------------

function openContradictions() {
    const list = [];
    for (let act = 1; act <= state.act; act++) {
        ACTS[act].contradictions.forEach(function(contradiction) {
            if (!flag(contradiction.flag)) list.push(contradiction);
        });
    }
    return list;
}

function renderEvidenceTab() {
    const filters = [
        ["all", "ALL"],
        ["evidence", "EVIDENCE"],
        ["record", "RECORDS"],
        ["statement", "STATEMENTS"]
    ];

    const items = state.items.filter(function(id) {
        return evidenceFilter === "all" || ITEMS[id].type === evidenceFilter;
    });

    const canCompare = openContradictions().length > 0 &&
        state.items.some(function(id) { return ITEMS[id].type === "statement" || state.act > 1; });

    let html =
        '<div class="panel-bar">' +
            '<div class="filter-row">' +
                filters.map(function(filter) {
                    const total = filter[0] === "all"
                        ? state.items.length
                        : state.items.filter(function(id) { return ITEMS[id].type === filter[0]; }).length;
                    return '<button class="filter-chip' + (evidenceFilter === filter[0] ? " is-active" : "") + '" ' +
                        'data-filter="' + filter[0] + '" type="button">' + filter[1] + ' <span>' + total + '</span></button>';
                }).join("") +
            '</div>' +
            (canCompare
                ? '<button id="compareToggle" class="small-button' + (compareMode ? " is-on" : "") + '" type="button">' +
                    (compareMode ? "CANCEL COMPARE" : "COMPARE") + '</button>'
                : "") +
        '</div>';

    if (compareMode) {
        html += '<p class="panel-hint">Pick two things that can\'t both be true. ' +
            compareSelection.length + ' of 2 selected.</p>';
    }

    html += items.length
        ? '<div class="card-grid">' + items.map(function(id) { return cardHTML(id); }).join("") + '</div>'
        : '<p class="panel-hint">Nothing here yet.</p>';

    tabPanel.innerHTML = html;
}

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
    compareMode = false;
    compareSelection = [];

    let match = null;
    for (let act = 1; act <= state.act; act++) {
        ACTS[act].contradictions.forEach(function(contradiction) {
            if (contradiction.pair.slice().sort().join() === pair.join()) match = contradiction;
        });
    }

    renderHub();

    if (!match) {
        openModal(
            '<p class="modal-kicker">' + pair.join(" + ") + '</p>' +
            '<h2>NO CONFLICT</h2>' +
            '<p class="modal-text">These don\'t conflict. Look for two things that can\'t both be true.</p>'
        );
        return;
    }

    if (flag(match.flag)) {
        openModal(
            '<p class="modal-kicker">' + pair.join(" + ") + '</p>' +
            '<h2>ALREADY ESTABLISHED</h2>' +
            '<p class="modal-text">' + match.text + '</p>'
        );
        return;
    }

    setFlag(match.flag);
    flashScreen();
    caseChanged();

    openModal(
        '<p class="modal-kicker">' + pair.join(" + ") + '</p>' +
        '<h2 class="contradiction-title">' + (match.title || "CONTRADICTION FOUND") + '</h2>' +
        '<p class="modal-text">' + match.text + '</p>' +
        (finaleReady()
            ? '<button class="continue-button" data-finale type="button">' +
                currentAct().finale.label + ' <strong>→</strong></button>'
            : "")
    );
}


// ------------------------------------------------------------
// TEAM TAB
// ------------------------------------------------------------

function renderTeamTab() {
    tabPanel.innerHTML =
        '<div class="panel-bar"><h2>TEAM ASSISTANCE</h2></div>' +
        '<p class="panel-hint">Open any evidence and choose who should handle it. Each specialist runs more than one unit.</p>' +
        '<div class="team-list">' +
            Object.keys(TEAM).map(function(who) {
                const member = TEAM[who];
                const notes = state.replies
                    .filter(function(key) { return key.split(":")[1] === who; })
                    .map(function(key) {
                        const id = key.split(":")[0];
                        return '<li><b>' + id + '</b> ' + ITEMS[id].replies[who] + '</li>';
                    });

                return (
                    '<article class="team-card">' +
                        '<img src="' + member.image + '" alt="">' +
                        '<div>' +
                            '<h3>' + member.name + '</h3>' +
                            '<p class="team-role">' + member.role + '</p>' +
                            '<p class="team-units">' + member.units.map(function(unit) {
                                return '<span>' + unit + '</span>';
                            }).join("") + '</p>' +
                            '<p class="team-handles">' + member.handles + '</p>' +
                            (notes.length
                                ? '<ul class="team-notes">' + notes.reverse().join("") + '</ul>'
                                : '<p class="panel-hint">No reports yet.</p>') +
                        '</div>' +
                    '</article>'
                );
            }).join("") +
        '</div>';
}


// ------------------------------------------------------------
// LOCATIONS TAB
// ------------------------------------------------------------

function visibleLocations() {
    // newest act first, so new places are at the top
    return LOCATIONS
        .filter(function(location) { return location.act <= state.act; })
        .sort(function(a, b) { return b.act - a.act; });
}

function renderLocationsTab() {
    tabPanel.innerHTML =
        '<div class="panel-bar"><h2>LOCATIONS</h2></div>' +
        '<div class="location-grid">' +
            visibleLocations().map(function(location) {
                const open = location.open();
                const done = location.done ? location.done() : state.visited.includes(location.id);
                return (
                    '<button class="location-card' + (open ? "" : " is-locked") + '" ' +
                        'data-location="' + location.id + '" type="button"' + (open ? "" : " disabled") + '>' +
                        '<img src="' + location.image + '" alt="">' +
                        '<span class="location-name">' + (open ? location.name : "LOCKED") + '</span>' +
                        '<span class="location-place">' + (open ? location.place : location.lockedText) + '</span>' +
                        (done ? '<span class="location-visited">' + (location.action ? "DONE" : "VISITED") + '</span>' : "") +
                        (location.act === state.act && !done && open ? '<span class="location-new">NEW</span>' : "") +
                    '</button>'
                );
            }).join("") +
        '</div>';
}

function visitLocation(id) {
    playSelectSound();

    const location = LOCATIONS.find(function(item) { return item.id === id; });

    if (location.action) {
        if (location.done && location.done()) {
            showToast("YOU'VE ALREADY DONE THIS");
            return;
        }
        if (location.action.type === "interrogation") startInterrogation(location.action.id);
        if (location.action.type === "surveillance") startSurveillance();
        if (location.action.type === "search") startSearch();
        return;
    }

    const found = location.gives.filter(addItem);
    if (!state.visited.includes(id)) state.visited.push(id);

    let html =
        '<p class="modal-kicker">LOCATION</p>' +
        '<h2>' + location.name + '</h2>' +
        '<p class="modal-meta">' + location.place + '</p>' +
        '<div class="evidence-media"><figure><img src="' + location.image + '" alt=""></figure></div>' +
        '<p class="modal-text">' + location.text + '</p>';

    location.gives.forEach(function(itemId) {
        if (ITEMS[itemId].type === "statement") html += statementHTML(itemId);
    });

    if (found.length) {
        html += '<p class="found-line">ADDED TO CASE FILE: ' + found.join(" · ") + '</p>';
        flashScreen();
    }

    openModal(html);
    caseChanged();
}


// ------------------------------------------------------------
// CASE BOARD TAB (Board + Timeline)
// ------------------------------------------------------------

function renderBoardTab() {
    if (state.act < 2) {
        tabPanel.innerHTML =
            '<div class="board-locked">' +
                '<span class="lock-badge">LOCKED · ACT 2</span>' +
                '<h2>CASE BOARD</h2>' +
                '<p>Pin people, places and evidence on one wall, and connect them yourself. It opens once you have a suspect.</p>' +
            '</div>';
        return;
    }

    const switcher =
        '<div class="panel-bar">' +
            '<div class="filter-row">' +
                '<button class="filter-chip' + (boardView === "board" ? " is-active" : "") + '" data-view="board" type="button">BOARD</button>' +
                '<button class="filter-chip' + (boardView === "timeline" ? " is-active" : "") +
                    (state.act < 3 ? " is-locked" : "") + '" data-view="timeline" type="button">' +
                    'TIMELINE' + (state.act < 3 ? " · ACT 3" : "") + '</button>' +
            '</div>' +
        '</div>';

    tabPanel.innerHTML = switcher + (boardView === "timeline" && state.act >= 3 ? timelineHTML() : boardHTML());
}

function visibleLinks() {
    return Object.keys(BOARD.links).filter(function(id) {
        const link = BOARD.links[id];
        return link.act <= state.act && BOARD.nodes[link.a].show() && BOARD.nodes[link.b].show();
    });
}

function boardHTML() {
    const nodes = BOARD.nodes;
    const links = visibleLinks();
    let lines = "";
    let slots = "";

    links.forEach(function(id) {
        const link = BOARD.links[id];
        const a = nodes[link.a];
        const b = nodes[link.b];
        const done = linkDone(id);

        lines += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" ' +
            'class="' + (done ? "is-done" : "") + '" />';

        // slot labels stack at the middle of the string so they never overlap
        link.slots.forEach(function(slot, index) {
            const x = (a.x + b.x) / 2;
            const y = (a.y + b.y) / 2 + (index - (link.slots.length - 1) / 2) * 7;
            const pinned = state.board[id + ":" + index];
            slots +=
                '<button class="board-slot' + (pinned ? " is-pinned" : "") + '" ' +
                    'style="left:' + x + '%;top:' + y + '%" ' +
                    'data-link="' + id + '" data-slot="' + index + '" type="button"' +
                    (pinned ? ' disabled title="' + pinned + '"' : "") + '>' +
                    (pinned ? "✓ " + slot.label : "+ " + slot.label) +
                '</button>';
        });
    });

    const cards = Object.keys(nodes).filter(function(id) { return nodes[id].show(); }).map(function(id) {
        const node = nodes[id];
        return '<div class="board-node" style="left:' + node.x + '%;top:' + node.y + '%">' +
            '<span class="board-pin"></span>' +
            '<img src="' + node.image + '" alt="">' +
            '<strong>' + node.label + '</strong>' +
            '<small>' + node.sub + '</small>' +
        '</div>';
    }).join("");

    const hint = pendingPin
        ? '<p class="panel-hint pin-hint">Pinning <b>' + pendingPin + '</b>: tap the string it proves. ' +
            '<button class="small-button" data-pin-cancel type="button">CANCEL</button></p>'
        : '<p class="panel-hint">Tap a <b>+</b> on a string, then pick the evidence that proves that connection.</p>';

    return hint +
        '<div class="board-scroll"><div class="board">' +
            '<svg class="board-lines" viewBox="0 0 100 100" preserveAspectRatio="none">' + lines + '</svg>' +
            cards + slots +
        '</div></div>';
}

function chooseForSlot(linkId, slotIndex) {
    playSelectSound();

    if (pendingPin) {
        const item = pendingPin;
        pendingPin = null;
        tryPin(linkId, slotIndex, item);
        return;
    }

    const slot = BOARD.links[linkId].slots[slotIndex];
    openModal(
        '<p class="modal-kicker">CASE BOARD · PIN EVIDENCE</p>' +
        '<h2>' + slot.label + '</h2>' +
        '<p class="panel-hint">Which piece proves this connection?</p>' +
        '<div class="card-grid">' + state.items.map(function(id) {
            return cardHTML(id, 'data-pin="' + linkId + ':' + slotIndex + '" data-pin-item');
        }).join("") + '</div>'
    );
}

function tryPin(linkId, slotIndex, itemId) {
    const slot = BOARD.links[linkId].slots[slotIndex];
    const key = linkId + ":" + slotIndex;

    if (slot.accepts.includes(itemId)) {
        state.board[key] = itemId;
        closeModal(true);
        flashScreen();
        showToast("PINNED: " + slot.label.toUpperCase());
        if (linkDone(linkId)) showToast("CONNECTION MADE");
        if (linkId === "L1" && linkDone("L1")) showToast("ENOUGH TO QUESTION HIM · INTERROGATION ROOM OPEN");
        caseChanged();
    } else {
        openModal(
            '<p class="modal-kicker">CASE BOARD</p>' +
            replyHTML("maya", "That doesn't prove " + slot.label.toLowerCase() + ". Think about what each piece actually shows.")
        );
    }
}

function timelineHTML() {
    const placed = state.timeline;
    const available = TIMELINE.events.filter(function(event) {
        return placed[event.id] === undefined && (!event.needs || has(event.needs));
    });

    const slots = TIMELINE.slots.map(function(year, index) {
        const event = TIMELINE.events.find(function(item) { return placed[item.id] === index; });
        return '<button class="timeline-slot' + (event ? " is-filled" : "") + '" data-year="' + index + '" type="button"' +
            (event ? " disabled" : "") + '>' +
            '<span class="timeline-year">' + year + '</span>' +
            '<span class="timeline-text">' + (event ? event.text : (selectedEvent ? "Place here" : "?")) + '</span>' +
        '</button>';
    }).join("");

    const cards = available.map(function(event) {
        return '<button class="timeline-card' + (selectedEvent === event.id ? " is-selected" : "") + '" ' +
            'data-event="' + event.id + '" type="button">' + event.text + '</button>';
    }).join("");

    const waiting = TIMELINE.events.filter(function(event) {
        return placed[event.id] === undefined && event.needs && !has(event.needs);
    }).length;

    return (
        '<p class="panel-hint">' + (flag("timeline")
            ? TIMELINE.doneText
            : "Tap an event, then tap the year it belongs to.") + '</p>' +
        '<div class="timeline-scroll"><div class="timeline">' + slots + '</div></div>' +
        (cards ? '<div class="timeline-cards">' + cards + '</div>' : "") +
        (waiting ? '<p class="panel-hint">' + waiting + ' more event' + (waiting > 1 ? "s" : "") + ' will appear as you find evidence.</p>' : "")
    );
}

function placeEvent(slotIndex) {
    if (!selectedEvent) return;
    playSelectSound();

    const event = TIMELINE.events.find(function(item) { return item.id === selectedEvent; });
    selectedEvent = null;

    if (event.slot !== slotIndex) {
        showToast("THAT DOESN'T FIT THERE · CHECK THE RECORDS");
        renderHub();
        return;
    }

    state.timeline[event.id] = slotIndex;

    if (Object.keys(state.timeline).length === TIMELINE.events.length) {
        setFlag("timeline");
        flashScreen();
        openModal(
            '<p class="modal-kicker">TIMELINE</p>' +
            '<h2 class="contradiction-title">' + TIMELINE.doneTitle + '</h2>' +
            '<p class="modal-text">' + TIMELINE.doneText + '</p>'
        );
    }

    caseChanged();
}


// ============================================================
// INTERROGATION
// ============================================================

let interro = null;

function startInterrogation(id) {
    interro = { id: id, data: INTERROGATIONS[id], q: 0, hits: 0, strikes: 0, phase: "ask", line: "" };
    showScreen("interrogationScreen");
    renderInterrogation();
}

function renderInterrogation() {
    const data = interro.data;
    const question = data.questions[interro.q];
    const image = $("interroImage");
    const src = data.images[Math.min(interro.hits, data.images.length - 1)];
    if (image.getAttribute("src") !== src) image.src = src;

    $("interroName").textContent = data.suspect;
    $("interroComposure").innerHTML = data.questions.map(function(_, index) {
        return '<span class="' + (index < interro.hits ? "is-broken" : "") + '"></span>';
    }).join("");
    $("interroStrikes").textContent = "WRONG ANSWERS " + interro.strikes + " / 3";

    const surname = data.suspect.split(" ").pop();
    let html = "";

    if (interro.phase === "ask" || interro.phase === "present") {
        html +=
            '<p class="interro-label">QUESTION 0' + (interro.q + 1) + '</p>' +
            '<p class="interro-question">' + question.q + '</p>' +
            '<p class="interro-answer"><b>' + surname + ':</b> "' + question.a + '"</p>';

        if (interro.phase === "ask") {
            html += '<button class="continue-button" data-interro="present" type="button">PRESENT EVIDENCE <strong>→</strong></button>';
        } else {
            html += '<p class="interro-label">WHICH EVIDENCE BREAKS THIS?</p>' +
                '<div class="tray">' + state.items.map(function(id) {
                    return cardHTML(id, "data-present");
                }).join("") + '</div>' +
                '<button class="small-button" data-interro="ask" type="button">BACK</button>';
        }
    }

    if (interro.phase === "hit") {
        html +=
            '<p class="interro-label">COMPOSURE BREAKING</p>' +
            '<p class="interro-answer"><b>' + surname + ':</b> "' + interro.line + '"</p>' +
            '<button class="continue-button" data-interro="next" type="button">' +
                (interro.q + 1 < data.questions.length ? "NEXT QUESTION" : "PRESS HIM") + ' <strong>→</strong></button>';
    }

    if (interro.phase === "miss") {
        html +=
            '<p class="interro-label">HE RELAXES</p>' +
            '<p class="interro-answer"><b>' + surname + ':</b> "' + interro.line + '"</p>' +
            '<button class="continue-button" data-interro="ask" type="button">TRY AGAIN <strong>→</strong></button>';
    }

    if (interro.phase === "quit") {
        html +=
            '<p class="interro-label">SESSION OVER</p>' +
            '<p class="interro-answer"><b>' + surname + ':</b> "' + data.quit + '"</p>' +
            '<p class="panel-hint">You can come back and try again from Locations.</p>' +
            '<button class="continue-button" data-interro="leave" type="button">LEAVE THE ROOM <strong>→</strong></button>';
    }

    $("interroPanel").innerHTML = html;
}

function presentEvidence(id) {
    playSelectSound();

    const data = interro.data;
    const question = data.questions[interro.q];

    if (question.accepts.includes(id)) {
        interro.hits++;
        interro.line = question.hit;
        interro.phase = "hit";
        flashScreen();
    } else {
        interro.strikes++;
        interro.line = data.misses[(interro.strikes - 1) % data.misses.length];
        interro.phase = interro.strikes >= 3 ? "quit" : "miss";
    }

    renderInterrogation();
}

function interroAction(action) {
    playSelectSound();

    if (action === "present" || action === "ask") {
        interro.phase = action;
        renderInterrogation();
    }

    if (action === "next") {
        interro.q++;
        if (interro.q < interro.data.questions.length) {
            interro.phase = "ask";
            renderInterrogation();
        } else {
            finishInterrogation();
        }
    }

    if (action === "leave") {
        interro = null;
        openHub();
    }
}

function finishInterrogation() {
    const data = interro.data;
    interro = null;

    runSteps([{ type: "dialogue", lines: data.end }], function() {
        const found = data.give.filter(addItem);
        setFlag(data.flag);
        openHub();
        if (found.length) {
            flashScreen();
            showToast("ADDED TO CASE FILE: " + found.join(" · "));
        }
        caseChanged();
    });
}


// ============================================================
// SURVEILLANCE (stakeout)
// ============================================================

let surv = null;

function startSurveillance() {
    surv = { index: 0, showing: false, timers: [] };
    $("survView").src = SURVEILLANCE.view;
    $("survFrame").classList.remove("is-visible");
    showScreen("surveillanceScreen");
    renderSurveillanceStrip();
    setSurvStatus("WATCHING THE WAREHOUSE…");
    scheduleFrame(2000);
}

function survTimer(fn, delay) {
    surv.timers.push(setTimeout(fn, delay));
}

function stopSurveillance() {
    if (!surv) return;
    surv.timers.forEach(clearTimeout);
    surv = null;
}

function setSurvStatus(text) {
    $("survStatus").textContent = text;
}

function renderSurveillanceStrip() {
    $("survStrip").innerHTML = SURVEILLANCE.frames.map(function(frame, index) {
        return index < surv.index
            ? '<img src="' + frame.src + '" alt="">'
            : '<span>' + (index + 1) + '</span>';
    }).join("");
}

function scheduleFrame(delay) {
    survTimer(function() {
        const frame = SURVEILLANCE.frames[surv.index];
        $("survFrame").src = frame.src;
        $("survFrame").classList.add("is-visible");
        surv.showing = true;
        setSurvStatus("MOVEMENT: " + frame.caption);

        // missed it: the moment passes and plays again
        survTimer(function() {
            if (!surv.showing) return;
            surv.showing = false;
            $("survFrame").classList.remove("is-visible");
            setSurvStatus("MISSED IT. STAY ON THE DOOR…");
            scheduleFrame(1600);
        }, 3800);
    }, delay);
}

function captureFrame() {
    if (!surv) return;
    flashScreen();

    if (!surv.showing) {
        setSurvStatus("NOTHING IN FRAME. WAIT FOR MOVEMENT.");
        return;
    }

    playSelectSound();
    surv.showing = false;
    surv.timers.forEach(clearTimeout);
    surv.timers = [];
    surv.index++;
    renderSurveillanceStrip();
    setSurvStatus("CAPTURED " + surv.index + " / " + SURVEILLANCE.frames.length);

    survTimer(function() {
        $("survFrame").classList.remove("is-visible");
        if (surv.index < SURVEILLANCE.frames.length) {
            setSurvStatus("WATCHING…");
            scheduleFrame(1400);
        } else {
            stopSurveillance();
            runSteps([{ type: "dialogue", lines: SURVEILLANCE.audio }], function() {
                SURVEILLANCE.give.forEach(addItem);
                setFlag(SURVEILLANCE.flag);
                openHub();
                flashScreen();
                showToast("ADDED TO CASE FILE: EV-019 · NEW LOCATION: WAREHOUSE INSIDE");
                caseChanged();
            });
        }
    }, 900);
}


// ============================================================
// WAREHOUSE SEARCH
// ============================================================

let searchFound = [];

function startSearch() {
    searchFound = [];
    renderSearch();
}

function renderSearch() {
    const allFound = searchFound.length === SEARCH.spots.length;
    openModal(
        '<p class="modal-kicker">SEARCH</p>' +
        '<h2>' + SEARCH.title + '</h2>' +
        '<p class="modal-text">' + SEARCH.intro + '</p>' +
        '<div class="search-spots">' + SEARCH.spots.map(function(spot) {
            const found = searchFound.includes(spot.id);
            return '<button class="search-spot' + (found ? " is-found" : "") + '" data-spot="' + spot.id + '" type="button">' +
                '<b>' + spot.label + '</b>' +
                (found ? '<span>' + spot.text + '</span>' : '<span>Search</span>') +
            '</button>';
        }).join("") + '</div>' +
        (allFound
            ? '<button class="continue-button" data-open-door type="button">BREAK THE DOOR OPEN <strong>→</strong></button>'
            : '<p class="panel-hint">' + (SEARCH.spots.length - searchFound.length) + ' places left to search.</p>')
    );
}

function searchSpot(id) {
    playSelectSound();
    if (!searchFound.includes(id)) searchFound.push(id);
    renderSearch();
}

function openTheDoor() {
    closeModal(true);
    runSteps(SEARCH.steps, function() {
        SEARCH.give.forEach(addItem);
        setFlag(SEARCH.flag);
        openHub();
        flashScreen();
        showToast("ADDED TO CASE FILE: ST-07");
        caseChanged();
    });
}


// ============================================================
// FINAL VERDICT
// ============================================================

let verdict = null;

function startVerdict() {
    playSelectSound();
    verdict = { q: 0, answer: null, support: [], message: "" };
    showScreen("verdictScreen");
    renderVerdict();
}

function renderVerdict() {
    const question = VERDICT[verdict.q];

    $("verdictProgress").textContent = "QUESTION " + (verdict.q + 1) + " OF " + VERDICT.length;
    $("verdictQuestion").textContent = question.q;

    $("verdictOptions").innerHTML = question.options.map(function(option, index) {
        return '<button class="verdict-option' + (verdict.answer === index ? " is-selected" : "") + '" ' +
            'data-answer="' + index + '" type="button">' + option.text + '</button>';
    }).join("");

    $("verdictSupport").innerHTML = state.items.map(function(id) {
        const selected = verdict.support.includes(id);
        return '<button class="support-chip' + (selected ? " is-selected" : "") + '" data-support="' + id + '" type="button">' +
            '<b>' + id + '</b> ' + itemTitle(id) + '</button>';
    }).join("");

    $("verdictMessage").textContent = verdict.message;
}

function submitVerdict() {
    const question = VERDICT[verdict.q];

    if (verdict.answer === null) {
        verdict.message = "Choose an answer first.";
        renderVerdict();
        return;
    }
    if (!verdict.support.length) {
        verdict.message = "Attach at least one piece of evidence that proves it.";
        renderVerdict();
        return;
    }

    const right = question.options[verdict.answer].correct &&
        verdict.support.every(function(id) { return question.support.includes(id); });

    if (!right) {
        verdict.message = "The case won't hold. Look again.";
        renderVerdict();
        restartAnimation($("verdictCard"), "shake");
        return;
    }

    playSelectSound();
    flashScreen();
    verdict.q++;
    verdict.answer = null;
    verdict.support = [];
    verdict.message = "";

    if (verdict.q < VERDICT.length) {
        renderVerdict();
        return;
    }

    setFlag("verdict");
    saveState();
    runSteps([{ type: "stamp", image: IMG.shivvyaId, kicker: "CASE FILE: SHIVVYA", title: "CASE SOLVED" }], playEnding);
}


// ============================================================
// ENDING
// ============================================================

let endingTimers = [];

function playEnding() {
    state.stage = "ended";
    saveState();

    const lines = $("endingLines");
    const status = $("endingStatus");
    lines.innerHTML = "";
    status.innerHTML = "";
    $("endingFinal").classList.remove("is-visible");
    showScreen("endingScreen");

    ENDING.lines.forEach(function(text, index) {
        endingTimers.push(setTimeout(function() {
            const line = document.createElement("p");
            line.textContent = text;
            line.className = "fade-in";
            lines.appendChild(line);
        }, 1200 + index * 2600));
    });

    endingTimers.push(setTimeout(showEndingStatus, 1200 + ENDING.lines.length * 2600 + 600));
}

function showEndingStatus() {
    endingTimers.forEach(clearTimeout);
    endingTimers = [];

    $("endingLines").innerHTML = ENDING.lines.map(function(text) {
        return '<p>' + text + '</p>';
    }).join("");

    $("endingStatus").innerHTML =
        '<p class="ending-kicker">CASE STATUS</p>' +
        ENDING.status.map(function(row) {
            return '<div class="ending-row"><span>' + row[0] + '</span><b>' + row[1] + '</b></div>';
        }).join("");

    $("endingFinal").classList.add("is-visible");
}


// ============================================================
// MODAL + TOAST
// ============================================================

function openModal(html) {
    modalBody.innerHTML = html;
    modal.hidden = false;
    modalBody.scrollTop = 0;
}

// quiet: closing to move straight into a scene, so don't start queued scenes
function closeModal(quiet) {
    modal.hidden = true;
    modalBody.innerHTML = "";
    if (!quiet) playQueuedEvents();
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
// CLUES (3 per act)
// ============================================================

function useClue() {
    playSelectSound();

    const index = currentObjective();

    if (index === -1) {
        openModal('<p class="modal-kicker">CLUE</p>' +
            replyHTML("maya", "Nothing left to chase in this act. If you see a button to continue, take it."));
        return;
    }

    const clue = currentAct().objectives[index].clue;
    const key = state.act + ":" + index;
    let note;

    if (state.cluesUsedFor.includes(key)) {
        note = "Already used for this objective. No clue spent.";
    } else if (cluesLeft() <= 0) {
        openModal('<p class="modal-kicker">CLUE</p>' +
            '<p class="modal-text">No clues left for this act. You\'re on your own, investigator.</p>');
        return;
    } else {
        state.clues[state.act]--;
        state.cluesUsedFor.push(key);
        note = cluesLeft() + (cluesLeft() === 1 ? " clue" : " clues") + " left for this act.";
        caseChanged();
    }

    openModal('<p class="modal-kicker">CLUE</p>' + replyHTML(clue.who, clue.text) +
        '<p class="panel-hint">' + note + '</p>');
}


// ============================================================
// EVENTS
// ============================================================

// scene screens: tap anywhere to continue
["openingScreen", "narrationScreen", "dialogueScreen", "stampScreen", "revealScreen", "notesScreen"].forEach(function(id) {
    $(id).addEventListener("click", tapAdvance);
});

$("skipOpening").addEventListener("click", function(event) {
    event.stopPropagation();
    nextStep();
});

$("subjectContinue").addEventListener("click", tapAdvance);

$("completeContinue").addEventListener("click", function() {
    playSelectSound();
    startAct(state.act + 1);
});

document.querySelectorAll(".hub-tab").forEach(function(tab) {
    tab.addEventListener("click", function() {
        playSelectSound();
        activeTab = tab.dataset.tab;
        compareMode = false;
        compareSelection = [];
        renderHub();
    });
});

$("clueButton").addEventListener("click", useClue);
$("verdictButton").addEventListener("click", startVerdict);

$("hubBanner").addEventListener("click", function(event) {
    if (event.target.closest("[data-finale]")) startFinale();
});

tabPanel.addEventListener("click", function(event) {
    const target = event.target;
    const filterChip = target.closest("[data-filter]");
    const viewChip = target.closest("[data-view]");
    const card = target.closest("[data-item]");
    const location = target.closest("[data-location]");
    const slot = target.closest("[data-link]");
    const timelineCard = target.closest("[data-event]");
    const year = target.closest("[data-year]");

    if (filterChip) {
        evidenceFilter = filterChip.dataset.filter;
        renderHub();
    } else if (target.closest("#compareToggle")) {
        toggleCompareMode();
    } else if (target.closest("[data-pin-cancel]")) {
        pendingPin = null;
        renderHub();
    } else if (viewChip) {
        if (viewChip.dataset.view === "timeline" && state.act < 3) {
            showToast("THE TIMELINE OPENS IN ACT 3");
            return;
        }
        boardView = viewChip.dataset.view;
        renderHub();
    } else if (card) {
        openItem(card.dataset.item);
    } else if (location) {
        visitLocation(location.dataset.location);
    } else if (slot) {
        chooseForSlot(slot.dataset.link, Number(slot.dataset.slot));
    } else if (timelineCard) {
        playSelectSound();
        selectedEvent = selectedEvent === timelineCard.dataset.event ? null : timelineCard.dataset.event;
        renderHub();
    } else if (year) {
        placeEvent(Number(year.dataset.year));
    }
});

modalBody.addEventListener("click", function(event) {
    const target = event.target;
    const send = target.closest("[data-send]");
    const pinStart = target.closest("[data-pin-start]");
    const pinItem = target.closest("[data-pin-item]");
    const spot = target.closest("[data-spot]");

    if (send) {
        sendToSpecialist(send.dataset.item, send.dataset.send);
    } else if (pinStart) {
        pendingPin = pinStart.dataset.pinStart;
        activeTab = "board";
        boardView = "board";
        closeModal(true);
        renderHub();
        showToast("TAP THE STRING THAT " + pendingPin + " PROVES");
    } else if (pinItem) {
        const parts = pinItem.dataset.pin.split(":");
        tryPin(parts[0], Number(parts[1]), pinItem.dataset.pinItem);
    } else if (target.closest("[data-finale]")) {
        startFinale();
    } else if (spot) {
        searchSpot(spot.dataset.spot);
    } else if (target.closest("[data-open-door]")) {
        openTheDoor();
    }
});

$("modalClose").addEventListener("click", function() { closeModal(); });

modal.addEventListener("click", function(event) {
    if (event.target === modal) closeModal();
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && !modal.hidden) closeModal();
});

$("interroPanel").addEventListener("click", function(event) {
    const action = event.target.closest("[data-interro]");
    const evidence = event.target.closest("[data-present]");
    if (action) interroAction(action.dataset.interro);
    if (evidence) presentEvidence(evidence.dataset.present);
});

$("interroLeave").addEventListener("click", function() {
    interroAction("leave");
});

$("survCapture").addEventListener("click", captureFrame);

$("survLeave").addEventListener("click", function() {
    stopSurveillance();
    openHub();
});

$("verdictOptions").addEventListener("click", function(event) {
    const option = event.target.closest("[data-answer]");
    if (!option) return;
    playSelectSound();
    verdict.answer = Number(option.dataset.answer);
    verdict.message = "";
    renderVerdict();
});

$("verdictSupport").addEventListener("click", function(event) {
    const chip = event.target.closest("[data-support]");
    if (!chip) return;
    playSelectSound();
    const id = chip.dataset.support;
    verdict.support = verdict.support.includes(id)
        ? verdict.support.filter(function(item) { return item !== id; })
        : verdict.support.concat(id);
    verdict.message = "";
    renderVerdict();
});

$("verdictSubmit").addEventListener("click", submitVerdict);

$("verdictBack").addEventListener("click", function() {
    playSelectSound();
    verdict = null;
    openHub();
});

$("endingScreen").addEventListener("click", function(event) {
    if (event.target.closest("a")) return;
    if (!$("endingFinal").classList.contains("is-visible")) showEndingStatus();
});

document.addEventListener("click", startGameMusic, { once: true });


// ============================================================
// START
// ============================================================

if (state.stage === "intro") {
    startAct(state.act);
} else if (state.stage === "complete") {
    showComplete();
} else if (state.stage === "ended") {
    showScreen("endingScreen");
    showEndingStatus();
} else {
    openHub();
}
