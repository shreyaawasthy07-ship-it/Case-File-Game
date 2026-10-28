# CASE FILE: SHIVVYA — Full Case Bible (Acts 1–5)

> Built from **design/game-concept.md**, the master story. Act 1 detail lives in **act-1-bible.md** (already built).
> This file covers the structure decisions, the full canon, Acts 2–5, and every change to make when coding.
> Images for everything here are in **case-image-prompts.md**.

Anything marked *(proposed)* is my suggestion. Change it here before we build, and everything else follows.

---

## 0. Structure decisions

| # | Decision |
|---|---|
| A | The game's case is called **CASE FILE: SHIVVYA**. **"CASE 001"** only ever means the old child trafficking case. |
| B | **3 team members, 6 units.** Each specialist covers two or three of the concept's units (table below). |
| C | **4 tabs:** Evidence · Team · Locations · Case Board. Interrogation is a place in Locations; Timeline is a view inside Case Board; **Final Verdict** is a button that appears in Act 5. |
| D | Evidence actions: **Examine · Send to Team · Add to Case Board.** No Archive. |
| E | Fonts: **Inter** (UI) · **IBM Plex Mono** (IDs, dates, records) · **Bebas Neue** (big titles only). |
| F | **Child trafficking is never shown in images.** It lives only in documents, records and dialogue. No children appear in any art. |
| G | Setting: **DELHI · SECTOR 14**. The warehouses are in the **Sector 22 industrial area**. |
| H | **Clues: 3 per act.** The case now spans 5 acts, so 3 for the whole case would be too harsh. The counter refills at the start of each act. |

### Team units

| Specialist | Units | Handles |
|---|---|---|
| **Dr. Neel Mehra** | FORENSICS · MEDICAL | Physical evidence, prints, ink, locks, injuries, medical reports |
| **Arjun Khanna** | CYBER · SURVEILLANCE · FINANCIAL | Phones, computers, deleted data, CCTV, vehicles, GPS, money trails |
| **Maya Sharma** | FIELD UNIT · RECORDS | Locations, witnesses, police and government files |

The **"Who should handle this?"** screen shows the unit names under each face, so it feels like six departments.

### Tabs

| Tab | Contains | Opens |
|---|---|---|
| **Evidence** | Filters at the top: **Evidence · Records · Statements**. COMPARE lives here. | Act 1 |
| **Team** | The three specialists, their units, and every report they've returned | Act 1 |
| **Locations** | Places to visit. **Interrogation Room** appears here when a suspect is ready. | Act 1 |
| **Case Board** | A switch at the top: **Board · Timeline** | Board in Act 2, Timeline in Act 3 |
| **FINAL VERDICT** | A large button in the hub header, not a tab | Act 5 |

### Case status (always visible in the hub)

`07 Evidence · 03 Leads · 02 Persons of Interest · 01 Unresolved Connection`, updated live as the player finds things.

---

## 1. Canon: the whole truth

The player never gets this list. They build it.

| Year | What really happened |
|---|---|
| **Mar 2019** | **Rhea Malhotra** *(26, counsellor at Asha Shelter Home, proposed)* reports that children are being moved out of shelters with forged transfer papers. **Child Trafficking Case 001** opens. **Inspector Garvit Sehgal** leads it and is praised in the press, photographed beside Rhea. |
| **2019** | Garvit is secretly paid by the network. He signs the forged transfer papers himself. |
| **Feb 2020** | During the police unit's collapse, Garvit closes Case 001: *"insufficient evidence."* |
| **Nov 2021** | Rhea finds copies of the papers with Garvit's signature and confronts him by message: *"I have copies. If anything happens to me, they go public."* Three days later, on **14 Nov 2021**, she is killed on Sector 22 Ring Road. It's ruled a **hit-and-run accident**. The driver was **Constable Kabir Rathore**, then Garvit's driver. The accident report is fabricated. |
| **Dec 2021 →** | Garvit pays Kabir **₹50,000 a month** through **Northgate Traders Pvt. Ltd.** *(proposed)*, a shell company in his wife **Sunita Sehgal's** name. Kabir is promoted to SI. |
| **Dec 2025** | Shivvya finds Case 001 on an old court list and asks why it was closed. |
| **Aug 2026** | Shivvya visits **Meera Malhotra**, Rhea's sister, and gets Rhea's diary. She works out the copies are hidden inside it, and takes them. From then on she stops pitching other stories (Ishaan's statement). |
| **Fri 23 Oct 2026** | Kabir calls Shivvya from the station duty line at 22:32, pretending to be an insider with Case 001 files. He meets her at the café, walks her to the overbridge, and takes her to the **Northgate warehouse in Sector 22**. Her laptop goes with them. |
| **Since then** | Shivvya is alive. They are keeping her until she says where she hid **Rhea's files**. She hid them in **The Ledger's newspaper archive**, inside the bound volume for March 2019, the month Case 001 opened. |
| **Garvit's plan** | Hand the investigator Kabir quickly (Act 1), let Kabir take the blame as a "rogue officer", and close the case before anyone reaches Case 001. |

**Ending:** Shivvya found · Rhea Malhotra case reopened · Child Trafficking Case 001 reopened · Garvit arrested · Kabir arrested · *Or is it?* (Garvit: *"You have no idea who else is in Case 001."*)

### Characters

| Character | Who | Status |
|---|---|---|
| **Shivvya** | 26, investigative journalist, The Ledger | Missing → found in Act 4 |
| **ACP Garvit Sehgal** | Sector 14 in-charge | Ally → doubt (Act 3) → revealed (Act 4) |
| **SI Kabir Rathore** | P-14 patrol officer | First suspect → Garvit's man |
| **Rhea Malhotra** | Complainant in Case 001, died 2021 | Seen only in photos and records |
| **Meera Malhotra** | Rhea's older sister, 36, schoolteacher | Witness (Act 3) |
| **Head Constable Suresh Pillai** *(proposed)* | Night duty desk, Sector 14 | Witness (Act 2) |
| **Director Arvind Rao** | Your superior | Ally: approves warrants |
| Maya · Neel · Arjun | Your team | — |
| Ishaan · Pooja · Ramesh | Act 1 witnesses | Ishaan returns in Act 5 |
| **Sunita Sehgal** | Garvit's wife, Northgate's director on paper | Name in records only |

---

## 2. ACT 2 — THE OFFICER

> Prove Kabir lied, interrogate him, and discover what Shivvya was really investigating.
> **Unlocks at the start:** Case Board (Board view) · Interrogation Room.

### Opening
`DELHI · TUE 27 OCT — 08:10` → `SHE HAS BEEN GONE FOR FOUR DAYS.` → Kabir's file photo with the PERSON OF INTEREST stamp → `ACT 2 — THE OFFICER`.

**Garvit (phone):** "As promised, Kabir's vehicle GPS for Friday night. If he's done something, he answers for it. I want this closed as much as you do."
*(He's genuinely handing over Kabir. He wants the case to stop at Kabir.)*

### Evidence & records

| ID | Item | Type | Primary | Key finding |
|---|---|---|---|---|
| EV-006 | P-14 Vehicle GPS Log | Record | **Arjun** (Surveillance) | "The tracker went dark from **22:40 to 23:27**. Forty-seven minutes. Somebody switched it off by hand." |
| EV-007 | Traffic camera still, overbridge road, 23:12 | Evidence | **Arjun** (Surveillance) | "That's P-14, during the GPS gap. There's a **passenger** in the front seat. Olive jacket." |
| EV-008 | Station Duty Phone Log | Record | **Maya** (Records) | "Duty line, outgoing, 22:32, 47 seconds. Signed out to **SI K. Rathore**." |
| EV-009 | Shivvya's Recovered Notes | Record | **Arjun** (Cyber) | Found at the end of the act (below) |

### Statements

- **ST-04, Head Constable Suresh Pillai** (Police Station): "At half past ten SI Rathore took the duty phone from my desk. He said, 'I'll handle this one myself.' He'd never done that in six years."
- **ST-05, Kabir, first statement** (Interrogation, before the player challenges him): "Routine patrol. Sector 14 all night. Check the GPS."

### Locations (new)

| Location | Gives | Unlocks when |
|---|---|---|
| **Sector 14 Police Station** (duty room) | EV-008 · ST-04 | Act 2 starts |
| **Interrogation Room** | Kabir interrogation | Case Board: all 3 links filled |

### Case Board (first use)

Kabir's photo in the middle. Three strings, each with an empty slot:

| Link | Correct evidence |
|---|---|
| Kabir ↔ the 22:32 call | EV-008 duty phone log or ST-04 Suresh |
| Kabir ↔ the café | EV-004 CCTV (Act 1) or ST-02 Pooja |
| Kabir ↔ the overbridge | EV-007 traffic camera |

All three filled → stamp **ENOUGH TO QUESTION HIM** → the Interrogation Room unlocks.

### Interrogation: Kabir (round 1)

The player picks questions. A wrong answer earns a smug reply; 3 wrong answers end the session (the player can retry). His emotion goes **defiant → nervous**. He does **not** break in Act 2.

| Question | Kabir says | Break it with |
|---|---|---|
| Where were you on the night Shivvya disappeared? | "Routine patrol." | **EV-006** GPS gap |
| Did you call Shivvya Nair? | "I don't call journalists." | **EV-008** duty phone log |
| Was she in your jeep? | "Nobody was in my jeep." | **EV-007** traffic camera |

**Kabir, after round 3:** "…I want my lawyer. And you should ask yourself who you're really working for."

**Garvit (phone):** "I've suspended him. Without a body, without a confession, a lawyer will have him out by tonight. Bring me something solid."
*(Kabir walks free, so Act 4's surveillance can happen.)*

### Act 2 ending: the Rhea discovery (turning point)

1. **Arjun:** "Her phone's notes were wiped at 23:00. But her cloud backup ran at **21:00**. I got three notes back."
2. EV-009 opens as three pinned notes, one per tap:
   - *"Why was Case 001 closed?"*
   - *"RHEA M."*
   - *"Rhea wasn't an accident."*
3. **Maya:** "Case 001. That's the number from her notebook. '…001… closed.'"
4. Screen pause → **NEW LEAD UNLOCKED: RHEA MALHOTRA**
5. `ACT 2 COMPLETE`. Unlocks **Timeline** and the **Records** filter for Act 3.

### Objectives
1. Check Kabir's GPS log · 2. Find out who called Shivvya at 22:32 · 3. Place Kabir with Shivvya on the Case Board · 4. Question Kabir · 5. Find out what Shivvya was working on

---

## 3. ACT 3 — RHEA

> Find out who Rhea was, prove her death wasn't an accident, and begin to doubt Garvit.

### Opening
`DELHI · WED 28 OCT — 07:30` → `FIVE DAYS.` → a closed police file with a red **CLOSED** stamp → `ACT 3 — RHEA`.

### Evidence & records

| ID | Item | Type | Primary | Key finding |
|---|---|---|---|---|
| EV-010 | Case 001 File (2019) | Record | **Maya** (Records) | "Opened March 2019. Complainant: **Rhea Malhotra**, Asha Shelter Home. Closed February 2020, insufficient evidence. Investigating officer: **Inspector G. Sehgal**." *(The player has to notice the name.)* |
| EV-011 | Rhea's Accident Report (2021) | Record | **Maya** (Records) | "Hit-and-run, Sector 22 Ring Road, 14 Nov 2021. Report filed **21:10**. No vehicle traced." |
| EV-012 | Rhea's Post-mortem Report | Record | **Neel** (Medical) | "Head injury from **behind, before the impact**. A car doesn't do that. And the report was signed off in one day." |
| EV-013 | Rhea's Phone | Evidence | **Arjun** (Cyber) | "Last message at **21:32**, to a contact saved as **'G.'**: *'You promised you'd protect those children. I have copies. If anything happens to me, they go public.'*" |
| EV-014 | Rhea's Diary | Evidence | **Neel** (Forensics) | "The back cover was slit open and glued shut again. Something flat was hidden inside, and recently removed." *(Shivvya took the copies.)* |
| EV-015 | Photograph: Rhea and Garvit, 2019 | Evidence | **Maya** (Field) | "Press conference, March 2019. The officer who opened Case 001, beside the woman who started it. That's Garvit." |

### Statements

- **ST-06, Meera Malhotra** (Meera's home): "In her last week, Rhea stopped sleeping. She said the one person she trusted had lied to her. She never told me his name.
  In August a journalist came. Shivvya. She sat with Rhea's diary for an hour, and then she cried. She said, 'Your sister was right.'"
  *(Meera hands over EV-013 Rhea's phone and EV-014 the diary. Police returned both as "accident belongings".)*

### Locations (new)

| Location | Gives | Unlocks when |
|---|---|---|
| **Records Room**, Sector 14 | EV-010 · EV-011 · EV-012 | Act 3 starts |
| **Meera Malhotra's home** | ST-06 · EV-013 · EV-014 · EV-015 | EV-010 read |
| **Sector 22 Ring Road** (accident site) | Maya: "No brake marks in the photos. Whoever hit her never tried to stop." | EV-011 read |

### Contradictions (COMPARE)

| Pair | Result |
|---|---|
| **EV-011 + EV-013** | The accident report was filed at **21:10**. Rhea sent a message at **21:32**. **The report was written before she died.** |
| **EV-013 + Garvit's number** | The contact "G." is **Garvit's personal number**, the same one that has been calling you. *(Garvit's calls are logged in Records from Act 1; this makes them comparable.)* |

### Timeline (new view, first use)

Horizontal; the player drags event cards into place. Five slots:

`2019 Case 001 opens (Rhea complains)` → `2020 Case 001 closed (Sehgal)` → `2021 Rhea dies, 3 days after messaging "G."` → `2025 Shivvya starts asking about Case 001` → `2026 Shivvya disappears`

All five placed → the gap lights up: **"The man who closed Case 001 is the man Rhea was afraid of."**

### Garvit's tone changes

**Garvit (phone), mid-act:** "I hear you've been in the Records Room. Rhea Malhotra was a tragedy, and that file was closed properly. Shivvya is missing *now*. Focus."

### Act 3 ending

1. Case Board: the player connects **Rhea ↔ Case 001 ↔ Garvit**.
2. Screen pause → **GARVIT IS NOT HELPING THE INVESTIGATION. He's protecting himself.**
3. **Director Rao:** "If you're wrong about an ACP, it ends both our careers. If you're right… I'll sign the financial warrant. Quietly."
4. `ACT 3 COMPLETE`. Unlocks **financial records** for Act 4.

### Objectives
1. Find out what Case 001 was · 2. Find out how Rhea died · 3. Talk to Rhea's family · 4. Prove her death wasn't an accident · 5. Find out who "G." is

---

## 4. ACT 4 — THE WAREHOUSE

> Follow the money from Garvit to Kabir, watch them meet, and find Shivvya.

### Opening
`DELHI · THU 29 OCT — 22:00` → `SIX DAYS. SHE MAY STILL BE ALIVE.` → `ACT 4 — THE WAREHOUSE`.

### Evidence & records

| ID | Item | Type | Primary | Key finding |
|---|---|---|---|---|
| EV-016 | Kabir's Bank Statements | Record | **Arjun** (Financial) | "₹50,000 every month since **December 2021**, a month after Rhea died. Plus **₹5,00,000 on Sat 24 Oct**, the morning after Shivvya vanished. From **Northgate Traders Pvt. Ltd.**" |
| EV-017 | Northgate Traders Company Record | Record | **Maya** (Records) | "Director: **Sunita Sehgal**. Garvit's wife. Northgate also leases a **warehouse in Sector 22**." |
| EV-018 | Prepaid Phone Records | Record | **Arjun** (Cyber) | "Kabir texts one prepaid number every night. That number sleeps at the same tower as Garvit's house." |
| EV-019 | Surveillance Photos (3 frames) | Evidence | captured by the player | Below |

### Surveillance stakeout (new mechanic)

The player watches the Northgate warehouse from Maya's car. A live surveillance view plays three moments. The player must tap **CAPTURE** while each one is on screen; missing one replays it.

1. Kabir's jeep arrives. Kabir gets out, looks around.
2. A dark sedan arrives. **Garvit** steps out. His face catches the light.
3. Kabir hands Garvit **Shivvya's laptop bag**.

**Audio from Maya's directional mic:**
> **GARVIT:** "There's nothing on it. She hid them somewhere else. **We need those files before anyone else finds them.**"
> **KABIR:** "She won't talk."
> **GARVIT:** "Then she has one more night to change her mind."

### The rescue

After Garvit drives away, the team goes in.

1. **Location: Northgate Warehouse, back room.** The player searches (tap 3 spots: a locked door, a chair with cut cable ties, a water bottle).
2. Behind the locked door: **Shivvya. Alive.**
3. **ST-07, Shivvya:** "Rhea's files. I took the copies from her diary. Garvit's signature is on every transfer paper.
   They kept asking where I hid them. I didn't tell them.
   They're in the one place nobody reads anymore: **The Ledger's archive. March 2019.**"

### Contradiction (COMPARE)

| Pair | Result |
|---|---|
| **EV-016 + EV-011** | Kabir's payments start **one month after Rhea's death**. "He wasn't paid for Shivvya. He was paid for Rhea." |

### Act 4 ending

1. Case Board: **Garvit → Kabir** (EV-016, EV-019), **Kabir → Rhea's death** (EV-016 + EV-011).
2. `SHIVVYA — FOUND`
3. `ACT 4 COMPLETE`. Unlocks the **Final Verdict** for Act 5.

### Objectives
1. Follow the money · 2. Find out who owns Northgate · 3. Watch the warehouse · 4. Capture the meeting · 5. Find Shivvya

---

## 5. ACT 5 — THE VERDICT

> Recover Rhea's files, break both men, and reconstruct the whole case.

### Opening
`DELHI · FRI 30 OCT — 06:00` → `ONE WEEK.` → `ACT 5 — THE VERDICT`.

### Evidence

| ID | Item | Type | Primary | Key finding |
|---|---|---|---|---|
| EV-020 | Rhea's Files | Evidence | **Neel** (Forensics) | "Forty-one transfer papers. Forged shelter stamps. The authorising signature on every page: **Insp. G. Sehgal**. Ink and paper match 2019." |

### Locations (new)

| Location | Gives |
|---|---|
| **The Ledger Newspaper Archive** (with Ishaan) | EV-020, hidden in the March 2019 bound volume |
| **Interrogation Room** | Kabir (final) · Garvit |

### Interrogation: Kabir (final, he breaks)

| Question | Kabir says | Break it with |
|---|---|---|
| Who pays you? | "My salary." | **EV-016** bank statements |
| Who did you meet at the warehouse? | "Nobody." | **EV-019** surveillance photos |
| What happened to Rhea Malhotra? | "…That was an accident." | **EV-012** post-mortem + **EV-016** payment dates |

**Kabir breaks:** "He told me to drive. He said she'd only be scared… I was twenty-nine. He made me a sub-inspector the next year. Every month since, I've been paying for that night."

### Interrogation: Garvit

Calm the whole way. He answers every question smoothly until the player presents the right evidence. His composure shown as **warm → cold**.

| Question | Garvit says | Break it with |
|---|---|---|
| Did you know Rhea Malhotra? | "A brave woman. We met once or twice." | **EV-015** the photograph + **EV-013** "G." messages |
| Why did you close Case 001? | "Insufficient evidence." | **EV-020** Rhea's files, his signature |
| Where were you on Thursday night? | "At home." | **EV-019** surveillance + audio |

**Garvit, at the end:** "You've opened Case 001. You have no idea who else is in it."

### Final Verdict

Six questions. Each one has 3–4 possible answers, and the player must attach **supporting evidence** to each answer.

| Question | Correct answer | Supporting evidence |
|---|---|---|
| What happened to Shivvya? | Lured by Kabir, held at the Northgate warehouse | EV-008 · EV-007 · ST-07 |
| Why was she investigating Case 001? | It was closed to protect the person running it | EV-010 · EV-009 |
| What happened to Rhea? | Murdered, and the accident report was faked | EV-011 + EV-013 · EV-012 |
| What was Garvit's role? | Protected the network, ordered both crimes | EV-020 · EV-015 · EV-019 |
| What was Kabir's role? | Garvit's driver and paid enforcer | EV-016 · EV-017 |
| Why did Shivvya disappear? | They needed Rhea's files back | EV-019 audio · ST-07 |

A wrong answer or wrong evidence → *"The case won't hold. Look again."* (no penalty). All six right → **CASE SOLVED**.

### The ending

Black. Quiet. Then:
> THE TRUTH WAS NEVER MISSING.
> *(pause)*
> IT WAS BURIED.

```
CASE STATUS
SHIVVYA                        FOUND
RHEA MALHOTRA                  CASE REOPENED
CHILD TRAFFICKING CASE 001     REOPENED
GARVIT                         ARRESTED
KABIR                          ARRESTED
```
`CASE CLOSED`, then underneath: *Or is it?*

---

## 6. Changes to Act 1 (apply when coding)

| Change | Where |
|---|---|
| "CASE FILE 001" → **"CASE FILE: SHIVVYA"** | hub header, subject card tab, complete screen |
| Opening timestamp → **"DELHI · SECTOR 14 — 23:47:18"** | opening |
| Neel's notebook reply "…9-04…" → **"…001…"**; the end counter text to match | EV-003 |
| Fonts → Inter / IBM Plex Mono / Bebas Neue; text colour → off-white `#D9D7D0`; background → `#111315` | all pages |
| Send-to-team buttons show **unit names** under each face | evidence screen |
| Evidence tab gets **Evidence · Records · Statements** filters (EV-001 report becomes a Record) | evidence tab |
| **Add to Case Board** action on evidence | evidence screen |
| Clues: **3 per act** | clue system |
| Screen effects: film grain, vignette, CCTV static, evidence flash, interrogation flicker | all pages |
| **Faint radio static** at the opening | needs a sound file from you |
| Garvit's calls are logged as **Records** so his number can be compared in Act 3 | Act 1 handover + every call |

---

## 7. Coding plan (at the end, once the images are in)

1. Restructure the case page into **acts** (one data file per act, one shared engine).
2. Apply the Act 1 changes above.
3. Build the new mechanics: **Case Board**, **Timeline**, **Interrogation**, **Surveillance capture**, **Final Verdict**.
4. Fill in Acts 2–5 from this file.
5. Test the whole case end to end on desktop and phone sizes.
