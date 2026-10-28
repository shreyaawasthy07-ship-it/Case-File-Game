// ============================================================
// THE GREY DISTRICT
// CASE FILE: SHIVVYA — STORY DATA (ACTS 1–5)
//
// Everything the player can find, read, visit and decide.
// The engine (engine.js) turns this into the game.
// Story source: design/case-001/case-bible.md
// ============================================================


// ============================================================
// IMAGES
// ============================================================

const IMG = {
    maya: "../field investigator.png",
    neel: "../forensic.png",
    arjun: "../intelligence.png",
    director: "../story/government official.png",

    shivvya: "../assets/characters/shivvya/portrait.png",
    shivvyaId: "../assets/characters/shivvya/id-photo.png",
    shivvyaSelfie: "../assets/characters/shivvya/selfie.png",
    shivvyaFound: "../assets/characters/shivvya/found.png",
    shivvyaSafe: "../assets/characters/shivvya/safe.png",

    garvit: "../assets/characters/garvit/portrait.png",
    garvitCold: "../assets/characters/garvit/phone.png",

    kabirFile: "../assets/characters/kabir/file-photo.png",
    kabirCalm: "../assets/characters/kabir/interrogation.png",
    kabirDefiant: "../assets/characters/kabir/defiant.png",
    kabirNervous: "../assets/characters/kabir/nervous.png",
    kabirBreaking: "../assets/characters/kabir/breaking.png",

    ishaan: "../assets/characters/ishaan/portrait.png",
    ishaanWorried: "../assets/characters/ishaan/worried.png",
    pooja: "../assets/characters/pooja/uneasy.png",
    ramesh: "../assets/characters/ramesh/portrait.png",
    rameshAfraid: "../assets/characters/ramesh/afraid.png",
    suresh: "../assets/characters/suresh/portrait.png",
    rhea: "../assets/characters/rhea/portrait.png",
    meera: "../assets/characters/meera/portrait.png",
    meeraHanding: "../assets/characters/meera/handing-over.png",

    hub: "../assets/backgrounds/hub.png",
    apartment: "../assets/backgrounds/apartment.png",
    cafe: "../assets/backgrounds/cafe.png",
    overbridge: "../assets/backgrounds/overbridge.png",
    gate: "../assets/backgrounds/gate-cabin.png",
    station: "../assets/backgrounds/police-station.png",
    interrogationRoom: "../assets/backgrounds/interrogation-room.png",
    records: "../assets/backgrounds/records-room.png",
    meeraHome: "../assets/backgrounds/meera-home.png",
    ringRoad: "../assets/backgrounds/ring-road.png",
    warehouse: "../assets/backgrounds/warehouse-outside.png",
    archive: "../assets/backgrounds/newspaper-archive.png"
};


// ============================================================
// TEAM (3 specialists, 6 units)
// ============================================================

const TEAM = {

    maya: {
        name: "MAYA SHARMA",
        role: "Field Investigator",
        units: ["FIELD UNIT", "RECORDS"],
        handles: "Locations, witnesses, police and government files",
        image: IMG.maya
    },

    neel: {
        name: "DR. NEEL MEHRA",
        role: "Forensic Specialist",
        units: ["FORENSICS", "MEDICAL"],
        handles: "Physical evidence, prints, ink, locks, injuries",
        image: IMG.neel
    },

    arjun: {
        name: "ARJUN KHANNA",
        role: "Intelligence / Tech",
        units: ["CYBER", "SURVEILLANCE", "FINANCIAL"],
        handles: "Phones, computers, CCTV, vehicles, money trails",
        image: IMG.arjun
    }

};


// ============================================================
// ITEMS: evidence, records and statements
//
// type: "evidence" | "record" | "statement"
// primary: the specialist who gives the key answer (null = examine only)
// onReply: what happens the first time a specialist answers
// ============================================================

const ITEMS = {

    // ---------------- ACT 1 ----------------

    "EV-001": {
        type: "record",
        title: "Missing Person Report",
        meta: "Sector 14 Police Station · Filed Sun 25 Oct by Ishaan Verma",
        doc: {
            head: "SECTOR 14 POLICE STATION · MISSING PERSON REPORT",
            rows: [
                ["Subject", "Shivvya Nair, 26"],
                ["Reported by", "Ishaan Verma, Editor, The Ledger"],
                ["Filed", "Sun 25 Oct 2026"]
            ],
            text: "\"Subject did not report to work Saturday. Phone unreachable. Apartment locked. No signs of struggle reported.\"",
            foot: "Investigating officer: SI K. Rathore"
        },
        primary: null
    },

    "REC-01": {
        type: "record",
        title: "Call Log: ACP Garvit Sehgal",
        meta: "Calls to your unit's line from ACP Sehgal",
        table: {
            columns: ["DATE", "TIME", "FROM", "LENGTH"],
            rows: [
                { act: 1, cells: ["MON 26 OCT", "10:12", "98110 77213", "2m 40s"] },
                { act: 1, cells: ["MON 26 OCT", "19:48", "98110 77213", "0m 52s"] },
                { act: 2, cells: ["TUE 27 OCT", "08:15", "98110 77213", "1m 05s"] },
                { act: 2, cells: ["TUE 27 OCT", "21:02", "98110 77213", "0m 48s"] },
                { act: 3, cells: ["WED 28 OCT", "11:30", "98110 77213", "1m 20s"] }
            ]
        },
        body: "Every call from ACP Sehgal comes from the same personal number.",
        primary: null
    },

    "EV-002": {
        type: "evidence",
        title: "Shivvya's Mobile Phone",
        meta: "Recovered: Sector 14 overbridge · Sat 24 Oct, 06:00",
        images: [{ src: "../assets/evidence/EV-002-phone.jpg" }],
        body: "Screen cracked. Switched off when the patrol found it.",
        primary: "arjun",
        replies: {
            arjun:
                "Last incoming call at 22:32, 47 seconds, from 98110 41400. That number belongs to the Sector 14 Police Station duty line. " +
                "Phone was switched off at 23:47:18. The last tower ping was Sector 14, near the overbridge. " +
                "Her messages app was wiped after 23:00. Someone knew her passcode, or made her open it.",
            neel: "No prints on it. None. Not even hers. That phone was wiped clean, on purpose.",
            maya: "Overbridge is a dead zone at night. If she walked there, she didn't walk there alone."
        },
        nudge: "Send that to me, it's a phone. My department.",
        onReply: {
            arjun: { give: ["EV-004"], toasts: ["NEW LEAD: THE DUTY LINE CALL · EV-004 UNLOCKED", "NEW LOCATION: SECTOR 14 OVERBRIDGE"] }
        }
    },

    "EV-003": {
        type: "evidence",
        title: "Apartment Scene Photos",
        meta: "Taken by Maya · Green Arcade Apartments, Flat 4B",
        images: [
            { src: IMG.apartment, caption: "Flat 4B, as found" },
            { src: "../assets/evidence/EV-003-charger.jpg", caption: "Charger. No laptop." },
            { src: "../assets/evidence/EV-003-notebook.jpg", caption: "Top pages torn out" }
        ],
        body: "Door locked from outside, keys missing. A laptop charger on the desk, but no laptop. A notebook with the top pages torn out.",
        primary: "neel",
        replies: {
            neel:
                "No forced entry. The lock was turned with a key. Hers is missing. " +
                "The notebook: the torn pages left indentations on the page underneath. " +
                "Most of it is unreadable, but I can make out '…001…' and the word 'closed'.",
            arjun: "Charger's for a laptop that's nowhere in this flat. Someone took her work, not her valuables.",
            maya: "Her wallet's still in the drawer. This wasn't a robbery."
        },
        nudge: "Locks and paper are my world. Send the apartment photos to me."
    },

    "EV-004": {
        type: "evidence",
        title: "Café CCTV, Blue Lantern Café",
        meta: "Pulled by Arjun · Camera near the last tower ping",
        cctv: true,
        images: [
            { src: "../assets/evidence/EV-004-a.png", caption: "CAM 02 · BLUE LANTERN · 22:41:06" },
            { src: "../assets/evidence/EV-004-b.png", caption: "CAM 02 · BLUE LANTERN · 22:58:40" },
            { src: "../assets/evidence/EV-004-c.png", caption: "CAM 02 · BLUE LANTERN · 23:05:12" }
        ],
        body:
            "22:41:06 Shivvya enters alone, sits by the window. " +
            "22:58:40 A man in a dark jacket and cap joins her. Face never toward camera. " +
            "23:05:12 They leave together, toward the overbridge.",
        primary: "arjun",
        replies: {
            arjun: "Enhanced frame at 22:58: there's a radio handset clipped to his belt. Police issue.",
            neel: "His boots, that reflective heel strip. Standard patrol issue in this District.",
            maya: "The café is 400 metres from her building. She was here at 22:41. Remember that."
        },
        nudge: "CCTV is my department. Send the footage over.",
        onReply: {
            arjun: { toasts: ["NEW LOCATION: BLUE LANTERN CAFÉ"] }
        }
    },

    "EV-005": {
        type: "evidence",
        title: "Building Guard's Logbook",
        meta: "Green Arcade gate cabin · Kept by Ramesh Yadav",
        images: [{ src: "../assets/evidence/EV-005-logbook.jpg" }],
        logEntry: "FRI 23 OCT · S. NAIR (4B) — OUT 23:00 — ALONE",
        body: "The entry for Friday night.",
        primary: "neel",
        replies: {
            neel: "Different pen from every other entry that night. And it's squeezed between two lines. This was written later.",
            maya: "Ramesh has kept this book for nine years. He doesn't squeeze entries. Somebody told him what to write.",
            arjun: "Nothing digital here. Paper's Neel's world."
        },
        nudge: "That ink needs a forensic eye. Send the logbook to me."
    },

    "ST-01": {
        type: "statement",
        person: "ISHAAN VERMA",
        role: "Editor, The Ledger",
        image: IMG.ishaanWorried,
        lines: [
            "Two months ago she stopped pitching stories. Said she was working on something old. Something nobody would let her print.",
            "Friday evening she told me she was meeting a source. She sounded nervous. Happy-nervous. Like it was finally happening."
        ]
    },

    "ST-02": {
        type: "statement",
        person: "POOJA",
        role: "Café Worker, Blue Lantern",
        image: IMG.pooja,
        lines: [
            "She ordered chai and didn't drink it. Kept checking her phone.",
            "A man came in, and she relaxed. Like she'd been waiting for him. Like she trusted him.",
            "He paid. Cash. They left together."
        ]
    },

    "ST-03": {
        type: "statement",
        person: "RAMESH YADAV",
        role: "Security Guard, Green Arcade",
        image: IMG.ramesh,
        lines: [
            "Eleven o'clock, madam left. Alone. Walked toward the main road. Nobody with her.",
            "It's written in my book. I write everything in my book."
        ]
    },

    // ---------------- ACT 2 ----------------

    "EV-006": {
        type: "record",
        title: "P-14 Vehicle GPS Log",
        meta: "Sent by ACP Sehgal · Fri 23 Oct, Kabir Rathore's jeep",
        table: {
            columns: ["TIME", "POSITION", "STATUS"],
            rows: [
                { cells: ["22:00", "Sector 14 Police Station", "PARKED"] },
                { cells: ["22:15", "Sector 14 Main Road", "MOVING"] },
                { cells: ["22:25", "Green Arcade, main gate", "STOPPED"] },
                { cells: ["22:35", "Near Blue Lantern Café", "STOPPED"] },
                { cells: ["22:40", "—", "SIGNAL LOST"], mark: true },
                { cells: ["23:27", "Sector 14 Main Road", "SIGNAL RESTORED"], mark: true },
                { cells: ["00:40", "Sector 14 Police Station", "PARKED"] }
            ]
        },
        primary: "arjun",
        replies: {
            arjun:
                "The tracker went dark from 22:40 to 23:27. Forty-seven minutes. These units don't just drop out; somebody switched it off by hand. " +
                "I'll pull the traffic cameras for that gap.",
            neel: "It's a spreadsheet. Unless you want me to dust your monitor, this is Arjun's.",
            maya: "Ten minutes stopped outside the café. Then the signal dies. That's not a coincidence."
        },
        nudge: "Vehicle tracking is surveillance. That's me. Send it over.",
        onReply: {
            arjun: { give: ["EV-007"], toasts: ["TRAFFIC CAMERA STILL RECOVERED · EV-007"] }
        }
    },

    "EV-007": {
        type: "evidence",
        title: "Traffic Camera, Overbridge Road",
        meta: "Pulled by Arjun · Fri 23 Oct, 23:12 · during the GPS gap",
        cctv: true,
        images: [{ src: "../assets/evidence/EV-007-trafficcam.png", caption: "TRAFFIC CAM 14-B · 23:12:37" }],
        body: "A white police jeep passes the overbridge stairs at 23:12, inside the forty-seven-minute gap.",
        primary: "arjun",
        replies: {
            arjun: "That's P-14, during the GPS gap. Enhanced: there's a passenger in the front seat. Olive jacket.",
            neel: "Olive jacket. Shivvya was wearing an olive utility jacket in every CCTV frame.",
            maya: "So she didn't walk to the overbridge. She was driven there."
        },
        nudge: "Traffic cameras are mine. Send it to me."
    },

    "EV-008": {
        type: "record",
        title: "Station Duty Phone Log",
        meta: "Sector 14 Police Station · Duty desk · Fri 23 Oct",
        table: {
            columns: ["TIME", "DIRECTION", "NUMBER", "SIGNED OUT TO"],
            rows: [
                { cells: ["22:05", "IN", "98102 55871", "HC S. PILLAI"] },
                { cells: ["22:18", "OUT", "011 2384 9910", "HC S. PILLAI"] },
                { cells: ["22:32", "OUT · 47s", "98730 22610", "SI K. RATHORE"], mark: true },
                { cells: ["22:51", "IN", "98990 13402", "HC S. PILLAI"] }
            ]
        },
        primary: "maya",
        replies: {
            maya: "Duty line, outgoing at 22:32, 47 seconds, to 98730 22610. That's Shivvya's number. Signed out to SI K. Rathore.",
            arjun: "Matches her phone exactly: incoming 22:32, 47 seconds, from the duty line. He made the call.",
            neel: "Paper log, same pen all night, no corrections. Nobody's touched this one."
        },
        nudge: "Station paperwork is Records. That's me. Send it over."
    },

    "EV-009": {
        type: "record",
        title: "Shivvya's Recovered Notes",
        meta: "Recovered by Arjun · Cloud backup, Fri 23 Oct, 21:00",
        notes: [
            "DEC 2025 — Why was Case 001 closed?",
            "RHEA M.",
            "Rhea wasn't an accident."
        ],
        primary: null
    },

    "ST-04": {
        type: "statement",
        person: "HC SURESH PILLAI",
        role: "Head Constable, night duty desk",
        image: IMG.suresh,
        lines: [
            "At half past ten SI Rathore came to my desk and took the duty phone. He said, 'I'll handle this one myself.'",
            "He'd never done that in six years. Then he went out on patrol."
        ]
    },

    "ST-05": {
        type: "statement",
        person: "SI KABIR RATHORE",
        role: "First interrogation",
        image: IMG.kabirDefiant,
        lines: [
            "Routine patrol. Sector 14, all night.",
            "I don't call journalists.",
            "Nobody was in my jeep."
        ]
    },

    // ---------------- ACT 3 ----------------

    "EV-010": {
        type: "record",
        title: "Case 001 File (2019)",
        meta: "Sector 14 Records Room · Closed file",
        images: [{ src: "../assets/evidence/EV-010-case-file.png" }],
        doc: {
            head: "SECTOR 14 POLICE STATION · CASE 001",
            rows: [
                ["Nature", "Trafficking of minors from shelter homes, using forged transfer papers"],
                ["Complainant", "Rhea Malhotra, counsellor, Asha Shelter Home"],
                ["Opened", "14 Mar 2019"],
                ["Investigating officer", "Insp. G. Sehgal"],
                ["Closed", "11 Feb 2020 · insufficient evidence"]
            ],
            stamp: "CLOSED"
        },
        primary: "maya",
        replies: {
            maya:
                "Opened March 2019 on Rhea Malhotra's complaint. Closed February 2020, 'insufficient evidence', in the middle of the collapse. " +
                "Forty-one transfers listed. Not one followed up.",
            neel: "For a closed file, the paper's been handled a lot. Someone still reads it.",
            arjun: "This predates the digital system. Paper records are Maya's."
        },
        nudge: "Old police files are Records. Give it to me."
    },

    "EV-011": {
        type: "record",
        title: "Rhea's Accident Report (2021)",
        meta: "Sector 14 Records Room · Road accident",
        doc: {
            head: "SECTOR 14 POLICE STATION · ROAD ACCIDENT REPORT",
            rows: [
                ["Victim", "Rhea Malhotra, 28"],
                ["Date", "Sun 14 Nov 2021"],
                ["Place", "Sector 22 Ring Road, near the industrial wall"],
                ["Type", "Hit-and-run · vehicle untraced"],
                ["Report filed", "21:10"],
                ["Approved by", "Insp. G. Sehgal"]
            ],
            text: "Case closed 15 Nov 2021. No further action."
        },
        primary: "maya",
        replies: {
            maya: "Hit-and-run, no vehicle ever traced. Filed at 21:10 and closed the next day. Nobody even asked the factory guards.",
            neel: "Send me the post-mortem, not the report. Reports say what someone wants them to say.",
            arjun: "No cameras on that stretch in 2021. Convenient."
        },
        nudge: "Police reports are Records. That's me."
    },

    "EV-012": {
        type: "record",
        title: "Rhea's Post-mortem Report",
        meta: "District hospital · 15 Nov 2021",
        doc: {
            head: "DISTRICT HOSPITAL · POST-MORTEM",
            rows: [
                ["Deceased", "Rhea Malhotra, 28"],
                ["Cause of death", "Head injury, consistent with road accident"],
                ["Findings", "Fracture to the back of the skull · leg and hip injuries"],
                ["Signed off", "15 Nov 2021, within one day"]
            ]
        },
        primary: "neel",
        replies: {
            neel:
                "The skull fracture is at the back of her head, and it happened before the leg injuries. A car hits you from the front, low. " +
                "Someone struck her from behind first. And this was signed off in a single day.",
            maya: "Signed off in one day. I've seen burglaries get more attention.",
            arjun: "Medical findings are Neel's. I'd only be guessing."
        },
        nudge: "Injuries are medical. That's my unit. Send it to me."
    },

    "EV-013": {
        type: "evidence",
        title: "Rhea's Phone",
        meta: "Returned to the family as 'accident belongings'",
        images: [{ src: "../assets/evidence/EV-013-rhea-phone.png" }],
        body: "Rhea's old phone. Meera kept it charged for five years.",
        primary: "arjun",
        replies: {
            arjun:
                "Last message at 21:32 on 14 Nov 2021, to a contact saved as 'G.': " +
                "'You promised you'd protect those children. I have copies. If anything happens to me, they go public.' " +
                "The number for 'G.' is 98110 77213.",
            neel: "Only her prints and her sister's. Nobody at the station even checked it.",
            maya: "Three days of messages to 'G.' before she died. She was giving him a chance."
        },
        nudge: "It's a phone. Cyber's mine. Send it over."
    },

    "EV-014": {
        type: "evidence",
        title: "Rhea's Diary",
        meta: "Given to you by Meera Malhotra",
        images: [{ src: "../assets/evidence/EV-014-diary.png" }],
        body: "Last entry, 11 Nov 2021: \"He was the one person I trusted.\"",
        primary: "neel",
        replies: {
            neel:
                "The back cover was slit open and glued shut again. Something flat was hidden inside it, and it was taken out recently. " +
                "The glue is weeks old, not years.",
            maya: "'He was the one person I trusted.' No name. She was too scared to write it.",
            arjun: "Paper and glue. That's Neel."
        },
        nudge: "That cover's been tampered with. That's forensics. Send it to me."
    },

    "EV-015": {
        type: "evidence",
        title: "Photograph: Rhea and the Inspector, 2019",
        meta: "From Meera Malhotra's album",
        images: [{ src: "../assets/evidence/EV-015-photo.png" }],
        body: "A press conference, March 2019. Rhea stands beside the officer who opened Case 001.",
        primary: "maya",
        replies: {
            maya: "15 March 2019, the day after Case 001 opened. The officer at the microphones is Inspector Garvit Sehgal. Rhea is looking at him like he's going to save everyone.",
            neel: "A real print from a newspaper photo desk. Not edited.",
            arjun: "I matched it to The Ledger's photo archive. Same frame, published the next morning."
        },
        nudge: "Faces and people are field work. Let me look at it."
    },

    "ST-06": {
        type: "statement",
        person: "MEERA MALHOTRA",
        role: "Rhea's sister",
        image: IMG.meera,
        lines: [
            "In her last week, Rhea stopped sleeping. She said the one person she trusted had lied to her. She never told me his name.",
            "In August a journalist came. Shivvya. She sat with Rhea's diary for an hour, and then she cried. She said, 'Your sister was right.'"
        ]
    },

    // ---------------- ACT 4 ----------------

    "EV-016": {
        type: "record",
        title: "Kabir Rathore's Bank Statements",
        meta: "Financial warrant, approved by Director Rao",
        table: {
            columns: ["DATE", "CREDIT", "FROM"],
            rows: [
                { cells: ["01 DEC 2021", "₹50,000", "NORTHGATE TRADERS"], mark: true },
                { cells: ["01 JAN 2022", "₹50,000", "NORTHGATE TRADERS"] },
                { cells: ["01 FEB 2022", "₹50,000", "NORTHGATE TRADERS"] },
                { cells: ["…", "57 more, every month", "NORTHGATE TRADERS"] },
                { cells: ["01 OCT 2026", "₹50,000", "NORTHGATE TRADERS"] },
                { cells: ["SAT 24 OCT 2026", "₹5,00,000", "NORTHGATE TRADERS"], mark: true }
            ]
        },
        primary: "arjun",
        replies: {
            arjun:
                "₹50,000 every month since December 2021, a month after Rhea died. " +
                "Plus ₹5,00,000 on Saturday 24 October, the morning after Shivvya vanished. All from Northgate Traders Pvt. Ltd.",
            maya: "A sub-inspector earns ₹45,000. He's been paid double his salary since 2021.",
            neel: "Numbers on a screen. That's Arjun's."
        },
        nudge: "Money trails are Financial. Send it to me.",
        onReply: {
            arjun: { give: ["EV-017"], toasts: ["COMPANY RECORD PULLED · EV-017"] }
        }
    },

    "EV-017": {
        type: "record",
        title: "Northgate Traders Company Record",
        meta: "Registrar of Companies",
        doc: {
            head: "NORTHGATE TRADERS PVT. LTD.",
            rows: [
                ["Incorporated", "22 Nov 2021"],
                ["Director", "Sunita Sehgal"],
                ["Business", "General trading"],
                ["Assets", "Leased warehouse · Plot 7, Sector 22 Industrial Area"]
            ]
        },
        primary: "maya",
        replies: {
            maya:
                "Incorporated eight days after Rhea died. Director: Sunita Sehgal. That's Garvit's wife. " +
                "And Northgate leases a warehouse in Sector 22. I want eyes on it tonight.",
            arjun: "No real trade in five years. It exists to move money.",
            neel: "Company paperwork. Records, not forensics."
        },
        nudge: "Company registrations are Records. That's me.",
        onReply: {
            maya: { toasts: ["NEW LOCATION: NORTHGATE WAREHOUSE"] }
        }
    },

    "EV-018": {
        type: "record",
        title: "Prepaid Phone Records",
        meta: "Kabir Rathore's phone · one repeated contact",
        table: {
            columns: ["PERIOD", "CONTACT", "PATTERN"],
            rows: [
                { cells: ["SEP–OCT 2026", "Prepaid 70422 18890", "1 text every night, 23:00–23:30"] },
                { cells: ["NIGHTLY", "70422 18890", "Rests at tower DL-S22-04"], mark: true }
            ]
        },
        primary: "arjun",
        replies: {
            arjun: "Kabir texts one prepaid number every night. That number sleeps at tower DL-S22-04, the same tower that covers Garvit's house.",
            maya: "Every single night. That's not a friend. That's a handler.",
            neel: "Phone data. Arjun."
        },
        nudge: "Phone records are Cyber. Mine."
    },

    "EV-019": {
        type: "evidence",
        title: "Surveillance Photos, Northgate Warehouse",
        meta: "Captured by you · Thu 29 Oct, night",
        cctv: true,
        images: [
            { src: "../assets/evidence/EV-019-a.png", caption: "FRAME 1 · KABIR ARRIVES" },
            { src: "../assets/evidence/EV-019-b.png", caption: "FRAME 2 · GARVIT ARRIVES" },
            { src: "../assets/evidence/EV-019-c.png", caption: "FRAME 3 · THE EXCHANGE" }
        ],
        body: "Garvit: \"There's nothing on it. She hid them somewhere else. We need those files before anyone else finds them.\"",
        primary: "arjun",
        replies: {
            arjun: "Frame two, enhanced. That's ACP Garvit Sehgal. No doubt at all.",
            neel: "The bag in frame three is a laptop bag. The charger from her flat fits that model.",
            maya: "We heard every word."
        },
        nudge: "Surveillance is my unit. Send the frames to me."
    },

    "ST-07": {
        type: "statement",
        person: "SHIVVYA NAIR",
        role: "Found alive, Northgate warehouse",
        image: IMG.shivvyaFound,
        lines: [
            "Rhea's files. I took the copies from her diary. Garvit's signature is on every transfer paper.",
            "They kept asking where I hid them. I didn't tell them.",
            "They're in the one place nobody reads anymore: The Ledger's archive. March 2019."
        ]
    },

    // ---------------- ACT 5 ----------------

    "EV-020": {
        type: "evidence",
        title: "Rhea's Files",
        meta: "The Ledger archive · inside the March 2019 bound volume",
        images: [{ src: "../assets/evidence/EV-020-files.png" }],
        body: "A plastic sleeve of copied transfer papers, hidden between the pages of March 2019.",
        primary: "neel",
        replies: {
            neel:
                "Forty-one transfer papers. Forged shelter stamps. The authorising signature on every page: Insp. G. Sehgal. " +
                "Ink and paper both match 2019. These are real.",
            arjun: "I'm scanning every page now. Nobody loses these again.",
            maya: "Rhea hid them. Shivvya protected them. Now we use them."
        },
        nudge: "Signatures and ink are forensics. Give them to me."
    }

};


// ============================================================
// LOCATIONS
//
// open: when the player can go there
// action: a special scene instead of a normal visit
// ============================================================

const LOCATIONS = [

    // ---------------- ACT 1 ----------------
    {
        id: "apartment", act: 1,
        name: "Shivvya's Apartment",
        place: "Green Arcade Apartments, Flat 4B",
        image: IMG.apartment,
        text: "The door was locked from outside. Maya photographed everything before anyone touched it.",
        gives: ["EV-003"],
        open: function() { return true; }
    },
    {
        id: "gate", act: 1,
        name: "Gate Cabin",
        place: "Green Arcade main gate",
        image: IMG.gate,
        text: "Ramesh Yadav has guarded this gate for nine years. His register sits open on the table.",
        gives: ["ST-03", "EV-005"],
        open: function() { return true; }
    },
    {
        id: "newsroom", act: 1,
        name: "The Ledger Newsroom",
        place: "Editorial floor, late night",
        image: IMG.ishaan,
        text: "Her editor filed the missing person report. He hasn't gone home since.",
        gives: ["ST-01"],
        open: function() { return true; }
    },
    {
        id: "overbridge", act: 1,
        name: "Sector 14 Overbridge",
        place: "Where her phone was found",
        image: IMG.overbridge,
        text: "MAYA: \"Patrol found the phone here at six in the morning. No cameras on this stretch. Whoever chose this spot knew that.\"",
        gives: [],
        lockedText: "Send her phone (EV-002) to Arjun to unlock.",
        open: function() { return replied("EV-002", "arjun"); }
    },
    {
        id: "cafe", act: 1,
        name: "Blue Lantern Café",
        place: "400 metres from her building",
        image: IMG.cafe,
        text: "Warm bulbs, empty tables. Pooja was working the counter on Friday night.",
        gives: ["ST-02"],
        lockedText: "Send the café CCTV (EV-004) to Arjun to unlock.",
        open: function() { return replied("EV-004", "arjun"); }
    },

    // ---------------- ACT 2 ----------------
    {
        id: "station", act: 2,
        name: "Sector 14 Police Station",
        place: "Night duty room",
        image: IMG.station,
        text: "The duty desk keeps a paper log of every call on the station line. Head Constable Pillai was on shift on Friday night.",
        gives: ["EV-008", "ST-04"],
        open: function() { return true; }
    },
    {
        id: "interrogate-kabir-1", act: 2,
        name: "Interrogation Room",
        place: "Question SI Kabir Rathore",
        image: IMG.interrogationRoom,
        lockedText: "Pin all three links to Kabir on the Case Board first.",
        action: { type: "interrogation", id: "kabir1" },
        done: function() { return flag("kabir1"); },
        open: function() { return linkDone("L1"); }
    },

    // ---------------- ACT 3 ----------------
    {
        id: "records", act: 3,
        name: "Records Room",
        place: "Sector 14 Police Station, basement",
        image: IMG.records,
        text: "Six years of dust. Maya finds the box marked 001, and Rhea Malhotra's name on two more files.",
        gives: ["EV-010", "EV-011", "EV-012"],
        open: function() { return true; }
    },
    {
        id: "meera", act: 3,
        name: "Meera Malhotra's Home",
        place: "Rhea's older sister",
        image: IMG.meeraHome,
        text: "Meera keeps Rhea's photo on the shelf, next to a lamp she never switches off.",
        gives: ["ST-06", "EV-013", "EV-014", "EV-015"],
        lockedText: "Find out who filed Case 001.",
        open: function() { return opened("EV-010"); }
    },
    {
        id: "ringroad", act: 3,
        name: "Sector 22 Ring Road",
        place: "Where Rhea died, 2021",
        image: IMG.ringRoad,
        text: "MAYA: \"No brake marks in the 2021 photos. Whoever hit her never tried to stop. And somebody still leaves marigolds here.\"",
        gives: [],
        lockedText: "Read Rhea's accident report first.",
        open: function() { return opened("EV-011"); }
    },

    // ---------------- ACT 4 ----------------
    {
        id: "stakeout", act: 4,
        name: "Northgate Warehouse",
        place: "Plot 7, Sector 22 · stakeout",
        image: IMG.warehouse,
        lockedText: "Find out who owns Northgate Traders.",
        action: { type: "surveillance" },
        done: function() { return flag("surveillance"); },
        open: function() { return replied("EV-017", "maya"); }
    },
    {
        id: "warehouse-inside", act: 4,
        name: "Northgate Warehouse, Inside",
        place: "The team goes in",
        image: IMG.warehouse,
        lockedText: "Watch the warehouse first.",
        action: { type: "search" },
        done: function() { return flag("rescue"); },
        open: function() { return flag("surveillance"); }
    },

    // ---------------- ACT 5 ----------------
    {
        id: "archive", act: 5,
        name: "The Ledger Archive",
        place: "Basement · with Ishaan Verma",
        image: IMG.archive,
        text: "ISHAAN: \"March 2019. Third shelf, bottom row. Nobody's opened these volumes in years.\" Between the pages of 15 March, a plastic sleeve of papers.",
        gives: ["EV-020"],
        open: function() { return true; }
    },
    {
        id: "interrogate-kabir-2", act: 5,
        name: "Interrogation Room: Kabir",
        place: "Final interrogation",
        image: IMG.interrogationRoom,
        lockedText: "Recover Rhea's files first.",
        action: { type: "interrogation", id: "kabir2" },
        done: function() { return flag("kabir2"); },
        open: function() { return has("EV-020"); }
    },
    {
        id: "interrogate-garvit", act: 5,
        name: "Interrogation Room: Garvit",
        place: "ACP Garvit Sehgal",
        image: IMG.interrogationRoom,
        lockedText: "Break Kabir first.",
        action: { type: "interrogation", id: "garvit" },
        done: function() { return flag("garvit"); },
        open: function() { return flag("kabir2"); }
    }

];


// ============================================================
// CASE BOARD
//
// Nodes are pinned cards (x, y in % of the board).
// Links are strings; each slot needs one piece of evidence.
// ============================================================

const BOARD = {

    nodes: {
        shivvya: { label: "SHIVVYA", sub: "Missing", image: IMG.shivvya, x: 50, y: 15, show: function() { return true; } },
        case001: { label: "CASE 001", sub: "Closed 2020", image: "../assets/evidence/EV-010-case-file.png", x: 86, y: 27, show: function() { return has("EV-010"); } },
        rhea: { label: "RHEA MALHOTRA", sub: "Complainant", image: IMG.rhea, x: 86, y: 73, show: function() { return has("EV-010"); } },
        rheadeath: { label: "RHEA'S DEATH", sub: "14 Nov 2021", image: IMG.ringRoad, x: 50, y: 85, show: function() { return has("EV-011"); } },
        garvit: { label: "ACP GARVIT", sub: "Sector 14", image: IMG.garvit, x: 14, y: 73, show: function() { return has("EV-015") || flag("g-is-garvit"); } },
        kabir: { label: "SI KABIR", sub: "P-14", image: IMG.kabirFile, x: 14, y: 27, show: function() { return true; } }
    },

    links: {
        L1: {
            a: "kabir", b: "shivvya", act: 2,
            slots: [
                { label: "The 22:32 call", accepts: ["EV-008", "ST-04"] },
                { label: "The café", accepts: ["EV-004", "ST-02"] },
                { label: "The jeep", accepts: ["EV-007"] }
            ]
        },
        L2: { a: "shivvya", b: "case001", act: 3, slots: [{ label: "What she was chasing", accepts: ["EV-009"] }] },
        L3: { a: "case001", b: "rhea", act: 3, slots: [{ label: "Who opened it", accepts: ["EV-010"] }] },
        L4: { a: "rhea", b: "rheadeath", act: 3, slots: [{ label: "Not an accident", accepts: ["EV-012"] }] },
        L5: {
            a: "rheadeath", b: "garvit", act: 3,
            slots: [
                { label: "Her last message", accepts: ["EV-013"] },
                { label: "Who she trusted", accepts: ["EV-015"] }
            ]
        },
        L6: {
            a: "garvit", b: "kabir", act: 4,
            slots: [
                { label: "The money", accepts: ["EV-016", "EV-017"] },
                { label: "The meeting", accepts: ["EV-019"] }
            ]
        },
        L7: { a: "kabir", b: "rheadeath", act: 4, slots: [{ label: "Paid since", accepts: ["EV-016"] }] }
    }

};


// ============================================================
// TIMELINE (Act 3)
// ============================================================

const TIMELINE = {
    slots: ["2019", "2020", "2021", "2025", "2026"],
    events: [
        { id: "t1", text: "Case 001 opens on Rhea Malhotra's complaint", slot: 0, needs: "EV-010" },
        { id: "t2", text: "Case 001 is closed: 'insufficient evidence'", slot: 1, needs: "EV-010" },
        { id: "t3", text: "Rhea dies, three days after messaging 'G.'", slot: 2, needs: "EV-013" },
        { id: "t4", text: "Shivvya starts asking why Case 001 was closed", slot: 3, needs: "EV-009" },
        { id: "t5", text: "Shivvya disappears", slot: 4, needs: null }
    ],
    doneTitle: "THE TIMELINE HOLDS",
    doneText: "The man who closed Case 001 approved Rhea's accident report. The one person she trusted was the one person she should have feared."
};


// ============================================================
// INTERROGATIONS
//
// images: [calm, after 1 hit, after 2+ hits]
// accepts: evidence that breaks each answer
// ============================================================

const INTERROGATIONS = {

    kabir1: {
        suspect: "SI KABIR RATHORE",
        images: [IMG.kabirCalm, IMG.kabirDefiant, IMG.kabirNervous],
        questions: [
            {
                q: "Where were you on the night Shivvya disappeared?",
                a: "Routine patrol. Sector 14, all night. Check the GPS.",
                accepts: ["EV-006"],
                hit: "…The tracker plays up. It happens all the time."
            },
            {
                q: "Did you call Shivvya Nair on Friday night?",
                a: "I don't call journalists.",
                accepts: ["EV-008", "ST-04"],
                hit: "…Half the station uses that phone."
            },
            {
                q: "Was she in your jeep?",
                a: "Nobody was in my jeep.",
                accepts: ["EV-007"],
                hit: "…"
            }
        ],
        misses: ["That proves nothing.", "Is that all you've got?", "You're wasting my time."],
        quit: "I'm done talking. Get me my union rep.",
        end: [
            { speaker: "SI KABIR RATHORE", image: IMG.kabirNervous, text: "…I want my lawyer. And you should ask yourself who you're really working for." },
            { speaker: "ACP GARVIT SEHGAL · PHONE", image: IMG.garvit, text: "I've suspended him. But without a body, without a confession, a lawyer will have him out by tonight. Bring me something solid." },
            { speaker: "ARJUN KHANNA", image: IMG.arjun, text: "One more thing. Her phone's notes were wiped at 23:00, but her cloud backup ran at 21:00. I've pulled three notes back. They're in Records." }
        ],
        give: ["ST-05", "EV-009"],
        flag: "kabir1"
    },

    kabir2: {
        suspect: "SI KABIR RATHORE",
        images: [IMG.kabirCalm, IMG.kabirNervous, IMG.kabirBreaking],
        questions: [
            {
                q: "Who pays you, Kabir?",
                a: "The government. Like you.",
                accepts: ["EV-016", "EV-017"],
                hit: "…That's my wife's family business."
            },
            {
                q: "Who did you meet at the warehouse on Thursday night?",
                a: "I was at home.",
                accepts: ["EV-019"],
                hit: "…You were watching."
            },
            {
                q: "What happened to Rhea Malhotra?",
                a: "That was an accident. Everybody knows that.",
                accepts: ["EV-012", "EV-016"],
                hit: "…"
            }
        ],
        misses: ["You don't have anything.", "Try again.", "That's not proof of anything."],
        quit: "I'm not saying another word without a lawyer.",
        end: [
            { speaker: "SI KABIR RATHORE", image: IMG.kabirBreaking, text: "He told me to drive. He said she'd only be scared. I was twenty-nine." },
            { speaker: "SI KABIR RATHORE", image: IMG.kabirBreaking, text: "He made me a sub-inspector the next year. Every month since, I've been paid for that night." },
            { speaker: "SI KABIR RATHORE", image: IMG.kabirBreaking, text: "With the journalist… I just had to bring her in. He wanted the files. I swear I never touched her." }
        ],
        give: [],
        flag: "kabir2"
    },

    garvit: {
        suspect: "ACP GARVIT SEHGAL",
        images: [IMG.garvit, IMG.garvitCold, IMG.garvitCold],
        questions: [
            {
                q: "Did you know Rhea Malhotra?",
                a: "A brave woman. We met once or twice, about her complaint.",
                accepts: ["EV-015", "EV-013"],
                hit: "…She was emotional. She misunderstood a lot of things."
            },
            {
                q: "Why did you close Case 001?",
                a: "Insufficient evidence. It's in the file.",
                accepts: ["EV-020"],
                hit: "…Signatures can be copied."
            },
            {
                q: "Where were you on Thursday night?",
                a: "At home, with my wife.",
                accepts: ["EV-019"],
                hit: "…"
            }
        ],
        misses: ["Is that the best the Directorate can do?", "You're embarrassing yourself.", "Careful. I've ended better careers than yours."],
        quit: "This conversation is over. Speak to my lawyer.",
        end: [
            { speaker: "ACP GARVIT SEHGAL", image: IMG.garvitCold, text: "You think this is about me. One inspector. One closed file." },
            { speaker: "ACP GARVIT SEHGAL", image: IMG.garvitCold, text: "You've opened Case 001. You have no idea who else is in it." }
        ],
        give: [],
        flag: "garvit"
    }

};


// ============================================================
// SURVEILLANCE (Act 4 stakeout)
// ============================================================

const SURVEILLANCE = {
    view: IMG.warehouse,
    frames: [
        { src: "../assets/evidence/EV-019-a.png", caption: "KABIR'S JEEP ARRIVES" },
        { src: "../assets/evidence/EV-019-b.png", caption: "A DARK SEDAN. GARVIT STEPS OUT." },
        { src: "../assets/evidence/EV-019-c.png", caption: "THE EXCHANGE" }
    ],
    audio: [
        { speaker: "ACP GARVIT SEHGAL · DIRECTIONAL MIC", image: "../assets/evidence/EV-019-c.png", text: "There's nothing on it. She hid them somewhere else. We need those files before anyone else finds them." },
        { speaker: "SI KABIR RATHORE · DIRECTIONAL MIC", image: "../assets/evidence/EV-019-c.png", text: "She won't talk." },
        { speaker: "ACP GARVIT SEHGAL · DIRECTIONAL MIC", image: "../assets/evidence/EV-019-c.png", text: "Then she has one more night to change her mind." },
        { speaker: "MAYA SHARMA", image: IMG.warehouse, text: "'One more night.' She's alive. She's in there. We go in as soon as his car is gone." }
    ],
    give: ["EV-019"],
    flag: "surveillance"
};


// ============================================================
// WAREHOUSE SEARCH (Act 4 rescue)
// ============================================================

const SEARCH = {
    title: "Northgate Warehouse",
    intro: "Torch beams cut through the dust. Crates, a corridor, a steel door at the end.",
    spots: [
        { id: "chair", label: "The plastic chair", text: "Cut cable ties on the floor beside it. Someone was tied here, and recently." },
        { id: "bottle", label: "The water bottle", text: "Half empty. The cap is still wet. She was given water today." },
        { id: "door", label: "The steel door", text: "Locked from this side. Maya presses her ear to it. Breathing." }
    ],
    steps: [
        { type: "dialogue", lines: [
            { speaker: "MAYA SHARMA", image: IMG.warehouse, text: "Shivvya? Shivvya Nair? Directorate. We're getting you out." }
        ] },
        { type: "reveal", image: IMG.shivvyaFound, kicker: "NORTHGATE WAREHOUSE · 00:14", title: "SHIVVYA — FOUND", sub: "Alive." },
        { type: "dialogue", lines: [
            { speaker: "SHIVVYA NAIR", image: IMG.shivvyaFound, text: "…You came. They said nobody would come." },
            { speaker: "SHIVVYA NAIR", image: IMG.shivvyaFound, text: "Rhea's files. I took the copies from her diary. Garvit's signature is on every transfer paper. They kept asking where I hid them." },
            { speaker: "SHIVVYA NAIR", image: IMG.shivvyaFound, text: "They're in the one place nobody reads anymore. The Ledger's archive. March 2019." }
        ] }
    ],
    give: ["ST-07"],
    flag: "rescue"
};


// ============================================================
// FINAL VERDICT (Act 5)
// ============================================================

const VERDICT = [
    {
        q: "What happened to Shivvya?",
        options: [
            { text: "She ran away to protect a source.", correct: false },
            { text: "Kabir lured her out and she was held at the Northgate warehouse.", correct: true },
            { text: "She was robbed on the overbridge.", correct: false },
            { text: "She was taken from her own flat.", correct: false }
        ],
        support: ["EV-008", "EV-007", "EV-004", "EV-019", "ST-07"]
    },
    {
        q: "Why was she investigating Case 001?",
        options: [
            { text: "Her editor assigned it to her.", correct: false },
            { text: "It was closed to protect the person running it.", correct: true },
            { text: "She knew Rhea personally.", correct: false }
        ],
        support: ["EV-009", "EV-010", "ST-01", "ST-06"]
    },
    {
        q: "What happened to Rhea Malhotra?",
        options: [
            { text: "A genuine hit-and-run accident.", correct: false },
            { text: "She was murdered, and the accident report was faked.", correct: true },
            { text: "She took her own life.", correct: false }
        ],
        support: ["EV-011", "EV-012", "EV-013"]
    },
    {
        q: "What was Garvit's role?",
        options: [
            { text: "He tried to save Case 001 and failed.", correct: false },
            { text: "He covered for Kabir out of loyalty.", correct: false },
            { text: "He protected the trafficking network and ordered both crimes.", correct: true }
        ],
        support: ["EV-020", "EV-015", "EV-013", "EV-019", "EV-017"]
    },
    {
        q: "What was Kabir's role?",
        options: [
            { text: "He was the mastermind.", correct: false },
            { text: "Garvit's driver and paid enforcer.", correct: true },
            { text: "An innocent officer framed by Garvit.", correct: false }
        ],
        support: ["EV-016", "EV-017", "EV-018", "ST-05"]
    },
    {
        q: "Why did Shivvya disappear?",
        options: [
            { text: "She was about to expose Kabir.", correct: false },
            { text: "For a ransom that was never sent.", correct: false },
            { text: "She had Rhea's files, and they needed them back.", correct: true }
        ],
        support: ["EV-019", "ST-07", "EV-020"]
    }
];

const ENDING = {
    lines: ["THE TRUTH WAS NEVER MISSING.", "IT WAS BURIED."],
    status: [
        ["SHIVVYA", "FOUND"],
        ["RHEA MALHOTRA", "CASE REOPENED"],
        ["CHILD TRAFFICKING CASE 001", "REOPENED"],
        ["GARVIT", "ARRESTED"],
        ["KABIR", "ARRESTED"]
    ]
};


// ============================================================
// ACTS
//
// intro: steps played before the hub
// objectives: in order; the first unfinished one is "current"
// events: short scenes that play once when their condition is met
// finale: the end-of-act sequence, started from a banner in the hub
// ============================================================

const ACTS = {

    1: {
        title: "THE MISSING JOURNALIST",
        intro: [
            { type: "opening", time: "DELHI · SECTOR 14 — 23:47:18", line: "A PHONE GOES DARK.", radio: true },
            { type: "subject" },
            { type: "narration", image: IMG.shivvyaSelfie, lines: [
                "Shivvya disappeared three nights ago.",
                "Her phone was recovered.",
                "Her apartment was locked.",
                "No ransom demand was received. No confirmed witness saw her leave.",
                "And yet, someone has been trying very hard to make sure she is never found.",
                "YOUR ASSIGNMENT: FIND SHIVVYA."
            ] },
            { type: "dialogue", lines: [
                { speaker: "ACP GARVIT SEHGAL", image: IMG.garvit, text: "You must be the Directorate's investigator. Garvit Sehgal, I run Sector 14." },
                { speaker: "ACP GARVIT SEHGAL", image: IMG.garvit, text: "My patrol recovered her phone near the overbridge on Saturday, 6 AM. It was switched off when we found it." },
                { speaker: "ACP GARVIT SEHGAL", image: IMG.garvit, text: "Whatever you need from my station, files, officers, vehicle logs, you call me directly. Let's bring her home." }
            ] }
        ],
        give: ["EV-001", "EV-002", "REC-01"],
        toast: "RECEIVED FROM ACP SEHGAL: EV-001 · EV-002",
        objectives: [
            { text: "Review the missing person report", done: function() { return opened("EV-001"); },
              clue: { who: "maya", text: "Start with the report Garvit handed you. Open EV-001 in the Evidence tab." } },
            { text: "Find out who she spoke to last", done: function() { return replied("EV-002", "arjun"); },
              clue: { who: "arjun", text: "Her phone is my department. Open EV-002 and send it to me." } },
            { text: "Trace where she went after the call", done: function() { return replied("EV-004", "arjun"); },
              clue: { who: "arjun", text: "I pulled the cameras near the last tower ping. Open EV-004 and send me the footage." } },
            { text: "Hear from the people who saw her", done: function() { return has("ST-01") && has("ST-02") && has("ST-03"); },
              clue: { who: "maya", text: "Three people saw her that night: her editor, the café worker and the gate guard. Find them in Locations." } },
            { text: "Find what doesn't add up", done: function() { return flag("ramesh-lied"); },
              clue: { who: "maya", text: "Ramesh was very sure about eleven o'clock. Was she even home at eleven? Compare his statement with the CCTV." } }
        ],
        contradictions: [
            { pair: ["ST-03", "EV-004"], flag: "ramesh-lied",
              text: "Ramesh says she left the building at 23:00. The CCTV has her at the café from 22:41. She was already gone." },
            { pair: ["EV-005", "EV-004"], flag: "ramesh-lied",
              text: "The logbook says she went out at 23:00. The CCTV has her at the café from 22:41. The log entry is false." }
        ],
        finale: {
            ready: function() { return flag("ramesh-lied"); },
            label: "QUESTION RAMESH AGAIN",
            steps: [
                { type: "dialogue", lines: [
                    { speaker: "RAMESH YADAV", image: IMG.rameshAfraid, text: "…A policeman came Saturday morning. Before the report was even filed. He said, 'Write that she left alone. It saves everyone trouble.' I have a family, madam." },
                    { speaker: "MAYA SHARMA", image: IMG.maya, text: "Did he give a name?" },
                    { speaker: "RAMESH YADAV", image: IMG.rameshAfraid, text: "No. But his jeep said P-14." },
                    { speaker: "ARJUN KHANNA", image: IMG.arjun, text: "P-14 was on duty Friday night. Assigned officer: SI Kabir Rathore. The same officer who's named on the missing person report." }
                ] },
                { type: "stamp", image: IMG.kabirFile, kicker: "PERSON OF INTEREST", title: "SI KABIR RATHORE" },
                { type: "dialogue", lines: [
                    { speaker: "ACP GARVIT SEHGAL · PHONE", image: IMG.garvit, text: "Kabir? He's one of my best men. But you do what you have to do. I'll send you his vehicle GPS logs myself." }
                ] }
            ]
        },
        complete: {
            status: "05 Evidence · 03 Statements · 01 Lead · 01 Person of Interest · 01 Unresolved (\"…001… closed\")",
            unlocks: "UNLOCKED FOR ACT 2: CASE BOARD · INTERROGATION"
        }
    },

    2: {
        title: "THE OFFICER",
        intro: [
            { type: "opening", time: "DELHI · TUE 27 OCT — 08:10", line: "SHE HAS BEEN GONE FOR FOUR DAYS." },
            { type: "stamp", image: IMG.kabirFile, kicker: "PERSON OF INTEREST", title: "SI KABIR RATHORE" },
            { type: "reveal", kicker: "CASE FILE: SHIVVYA", title: "ACT 2 — THE OFFICER" },
            { type: "dialogue", lines: [
                { speaker: "ACP GARVIT SEHGAL · PHONE", image: IMG.garvit, text: "As promised, Kabir's vehicle GPS for Friday night. If he's done something, he answers for it. I want this closed as much as you do." }
            ] }
        ],
        give: ["EV-006"],
        toast: "RECEIVED FROM ACP SEHGAL: EV-006 · NEW LOCATION: POLICE STATION",
        objectives: [
            { text: "Check Kabir's GPS log", done: function() { return replied("EV-006", "arjun"); },
              clue: { who: "arjun", text: "Garvit's GPS file is vehicle tracking. Send EV-006 to me." } },
            { text: "Find out who called Shivvya at 22:32", done: function() { return replied("EV-008", "maya"); },
              clue: { who: "maya", text: "The call came from the station's duty line. The duty desk keeps a paper log. Visit the police station, then send me the log." } },
            { text: "Place Kabir with Shivvya on the Case Board", done: function() { return linkDone("L1"); },
              clue: { who: "maya", text: "Open the Case Board. The string between Kabir and Shivvya needs three proofs: the call, the café, and the jeep." } },
            { text: "Question Kabir", done: function() { return flag("kabir1"); },
              clue: { who: "neel", text: "He'll lie three times. Answer each lie with the one record he can't explain away. The Interrogation Room is in Locations." } },
            { text: "Find out what Shivvya was working on", done: function() { return opened("EV-009"); },
              clue: { who: "arjun", text: "I recovered her notes from the cloud backup. They're in Evidence, under Records: EV-009." } }
        ],
        contradictions: [],
        finale: {
            ready: function() { return opened("EV-009"); },
            label: "SHOW THE TEAM HER NOTES",
            steps: [
                { type: "notes", notes: ITEMS["EV-009"].notes },
                { type: "dialogue", lines: [
                    { speaker: "MAYA SHARMA", image: IMG.maya, text: "Case 001. That's the number from her notebook. '…001… closed.' She wasn't chasing a story. She was chasing a closed case." }
                ] },
                { type: "reveal", kicker: "NEW LEAD UNLOCKED", title: "RHEA MALHOTRA" }
            ]
        },
        complete: {
            status: "09 Evidence · 05 Statements · 01 Person of Interest · 01 New Lead: Rhea Malhotra",
            unlocks: "UNLOCKED FOR ACT 3: TIMELINE · RECORDS ROOM"
        }
    },

    3: {
        title: "RHEA",
        intro: [
            { type: "opening", time: "DELHI · WED 28 OCT — 07:30", line: "FIVE DAYS." },
            { type: "stamp", image: "../assets/evidence/EV-010-case-file.png", kicker: "CASE 001 · 2019", title: "CLOSED" },
            { type: "reveal", kicker: "CASE FILE: SHIVVYA", title: "ACT 3 — RHEA" }
        ],
        give: [],
        toast: "NEW LOCATION: RECORDS ROOM · TIMELINE UNLOCKED",
        objectives: [
            { text: "Find out what Case 001 was", done: function() { return replied("EV-010", "maya"); },
              clue: { who: "maya", text: "Old files live in the Records Room. Find Case 001 and send it to me." } },
            { text: "Find out how Rhea died", done: function() { return replied("EV-012", "neel"); },
              clue: { who: "neel", text: "Don't trust the accident report. Send me her post-mortem, EV-012." } },
            { text: "Talk to Rhea's family", done: function() { return has("ST-06"); },
              clue: { who: "maya", text: "Rhea had a sister, Meera. Her home is in Locations now." } },
            { text: "Prove her death wasn't an accident", done: function() { return flag("report-faked"); },
              clue: { who: "arjun", text: "Check the times. When was the accident report filed, and when did Rhea send her last message? Compare them." } },
            { text: "Find out who 'G.' is", done: function() { return flag("g-is-garvit"); },
              clue: { who: "arjun", text: "You have G.'s number from Rhea's phone. Somebody else who calls you has the same one. Compare it with your call log, REC-01." } },
            { text: "Rebuild the timeline", done: function() { return flag("timeline"); },
              clue: { who: "maya", text: "Open the Case Board and switch to Timeline. Put each event in its year." } },
            { text: "Connect Rhea to the man she trusted", done: function() { return linkDone("L2") && linkDone("L3") && linkDone("L4") && linkDone("L5"); },
              clue: { who: "maya", text: "On the Case Board, follow the chain: Shivvya, Case 001, Rhea, her death, and the man she trusted. Each string needs its proof." } }
        ],
        contradictions: [
            { pair: ["EV-011", "EV-013"], flag: "report-faked", title: "THE REPORT CAME FIRST",
              text: "The accident report was filed at 21:10. Rhea sent her last message at 21:32. The report was written before she died." },
            { pair: ["EV-013", "REC-01"], flag: "g-is-garvit", title: "G. IS GARVIT",
              text: "Rhea's contact 'G.' is 98110 77213. Every call from ACP Garvit Sehgal comes from 98110 77213." }
        ],
        events: [
            {
                id: "garvit-warning",
                when: function() { return has("EV-010"); },
                steps: [{ type: "dialogue", lines: [
                    { speaker: "ACP GARVIT SEHGAL · PHONE", image: IMG.garvitCold, text: "I hear you've been in the Records Room. Rhea Malhotra was a tragedy, and that file was closed properly." },
                    { speaker: "ACP GARVIT SEHGAL · PHONE", image: IMG.garvitCold, text: "Shivvya is missing now. Focus on finding her." }
                ] }]
            }
        ],
        finale: {
            ready: function() {
                return flag("report-faked") && flag("g-is-garvit") && flag("timeline") &&
                    linkDone("L2") && linkDone("L3") && linkDone("L4") && linkDone("L5");
            },
            label: "SEE THE WHOLE BOARD",
            steps: [
                { type: "reveal", kicker: "THE CASE BOARD", title: "GARVIT IS NOT HELPING THE INVESTIGATION.", sub: "He's protecting himself." },
                { type: "dialogue", lines: [
                    { speaker: "DIRECTOR ARVIND RAO", image: IMG.director, text: "If you're wrong about an ACP, it ends both our careers." },
                    { speaker: "DIRECTOR ARVIND RAO", image: IMG.director, text: "If you're right… I'll sign the financial warrant. Quietly. Follow the money." }
                ] }
            ]
        },
        complete: {
            status: "15 Evidence · 06 Statements · 02 Persons of Interest: Kabir, Garvit · Case 001 linked to Rhea's death",
            unlocks: "UNLOCKED FOR ACT 4: FINANCIAL RECORDS"
        }
    },

    4: {
        title: "THE WAREHOUSE",
        intro: [
            { type: "opening", time: "DELHI · THU 29 OCT — 22:00", line: "SIX DAYS. SHE MAY STILL BE ALIVE." },
            { type: "reveal", kicker: "CASE FILE: SHIVVYA", title: "ACT 4 — THE WAREHOUSE" },
            { type: "dialogue", lines: [
                { speaker: "ARJUN KHANNA", image: IMG.arjun, text: "Director Rao's warrant came through. Kabir's bank statements and his phone records are in Evidence." }
            ] }
        ],
        give: ["EV-016", "EV-018"],
        toast: "FINANCIAL WARRANT: EV-016 · EV-018",
        objectives: [
            { text: "Follow the money", done: function() { return replied("EV-016", "arjun"); },
              clue: { who: "arjun", text: "Money trails are mine. Send me Kabir's bank statements, EV-016." } },
            { text: "Find out who owns Northgate", done: function() { return replied("EV-017", "maya"); },
              clue: { who: "maya", text: "Company registrations are records. Send me EV-017." } },
            { text: "Watch the warehouse", done: function() { return flag("surveillance"); },
              clue: { who: "maya", text: "The Northgate warehouse is in Locations. When someone steps into the light, capture the frame." } },
            { text: "Connect Garvit to Kabir", done: function() { return linkDone("L6") && linkDone("L7"); },
              clue: { who: "arjun", text: "On the Case Board: the money and the meeting link Garvit to Kabir. And look at when the payments started." } },
            { text: "Find Shivvya", done: function() { return flag("rescue"); },
              clue: { who: "maya", text: "She's inside that warehouse. Go in from Locations and search everything." } }
        ],
        contradictions: [
            { pair: ["EV-016", "EV-011"], flag: "paid-for-rhea", title: "PAID FOR RHEA",
              text: "Kabir's payments start on 1 December 2021, two weeks after Rhea's death. He wasn't paid for Shivvya. He was paid for Rhea." }
        ],
        finale: {
            ready: function() { return flag("rescue") && linkDone("L6") && linkDone("L7"); },
            label: "BRING HER HOME",
            steps: [
                { type: "reveal", image: IMG.shivvyaSafe, kicker: "FRI 30 OCT — 05:40", title: "SHIVVYA IS SAFE", sub: "Now finish it." }
            ]
        },
        complete: {
            status: "SHIVVYA — FOUND · 19 Evidence · 07 Statements · Garvit and Kabir linked by money and surveillance",
            unlocks: "UNLOCKED FOR ACT 5: THE LEDGER ARCHIVE · FINAL VERDICT"
        }
    },

    5: {
        title: "THE VERDICT",
        intro: [
            { type: "opening", time: "DELHI · FRI 30 OCT — 06:00", line: "ONE WEEK." },
            { type: "reveal", kicker: "CASE FILE: SHIVVYA", title: "ACT 5 — THE VERDICT" }
        ],
        give: [],
        toast: "NEW LOCATION: THE LEDGER ARCHIVE",
        objectives: [
            { text: "Recover Rhea's files", done: function() { return replied("EV-020", "neel"); },
              clue: { who: "maya", text: "Shivvya told us exactly where: The Ledger archive, March 2019. Find the files, then send them to Neel." } },
            { text: "Break Kabir", done: function() { return flag("kabir2"); },
              clue: { who: "neel", text: "Money, the meeting, and the post-mortem. He has no answer to any of them." } },
            { text: "Question Garvit", done: function() { return flag("garvit"); },
              clue: { who: "maya", text: "He'll stay calm. Show him the photograph, Rhea's files with his signature, and the warehouse." } },
            { text: "Deliver the final verdict", done: function() { return flag("verdict"); },
              clue: { who: "maya", text: "Press FINAL VERDICT. Answer each question, and back every answer with the evidence that proves it." } }
        ],
        contradictions: [],
        complete: null
    }

};

const LAST_ACT = 5;
