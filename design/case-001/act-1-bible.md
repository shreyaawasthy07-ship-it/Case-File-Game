# CASE FILE: SHIVVYA
## Act 1: The Missing Journalist — Case Bible

> **Updated by case-bible.md.** The case is now called **CASE FILE: SHIVVYA** ("Case 001" means only the old trafficking case), the setting is **DELHI · SECTOR 14**, the notebook reads **"…001… closed"**, and the buried case is **Child Trafficking Case 001**, not Sealed File 19-047. See section 6 of case-bible.md for every Act 1 change to apply when coding.

> Tutorial act. It teaches the player to **examine evidence → send it to the right specialist → read statements → catch a contradiction.**
> The case board, timeline and interrogation stay locked until Act 2.

---

## 0. Canon (locked facts)

Anything marked *(proposed)* is my suggestion. Change it here before we build, and everything else follows.

| Item | Fact |
|---|---|
| Setting | The Grey District, **Sector 14**. Present day: **Mon 26 Oct 2026** |
| The collapse | Six years ago (2020) the District's police unit failed through **system failure**. 47 cases were left unresolved. (The briefing stays unchanged.) |
| Disappearance | **Fri 23 Oct 2026**, three nights ago |
| Last contact | **22:32**, an incoming call on Shivvya's phone |
| Phone goes dark | **23:47:18**, the timestamp in the opening |
| Missing person | **Shivvya Nair** *(proposed surname)*, 26, investigative journalist at *The Ledger* *(proposed)* |
| Your team | **Maya Sharma** (Field) · **Dr. Neel Mehra** (Forensic, renamed from Kabir Mehra) · **Arjun Khanna** (Intelligence / Tech) |
| Your superior | **Director Arvind Rao**: clean, an ally |
| Villain 1 | **SI Kabir Rathore** *(proposed surname)*, Sector 14 patrol, unit **P-14** |
| Villain 2 | **ACP Garvit Sehgal** *(proposed surname)*, Sector 14 in-charge. Friendly and helpful in Act 1 |
| The buried case | **Sealed File 19-047**, "lost in system failure" in 2020 |
| Shivvya's fate | Alive; found at the warehouse in Act 4 |

### Specialist routing (the core mechanic)

| Specialist | Handles |
|---|---|
| **Dr. Neel Mehra** | Physical evidence, fingerprints, ink, locks, medical |
| **Arjun Khanna** | Phones, call records, CCTV, GPS, money |
| **Maya Sharma** | Locations, witnesses, re-questioning people, old paper records |

---

## 1. Opening sequence (after "BEGIN INVESTIGATION")

| # | Screen | Content |
|---|---|---|
| 1 | Black | Faint police radio static, 2–3 seconds |
| 2 | Timestamp types in | `SECTOR 14 — 23:47:18` |
| 3 | Line | `A PHONE GOES DARK.` |
| 4 | File slides in | `CASE FILE 001` / `SUBJECT: SHIVVYA NAIR` with a photo (a portrait with a paper-clip) |
| 5 | Title | `THE GREY DISTRICT` / `EVERY CASE LEAVES A TRACE.` |

### Case subject card

```
CASE SUBJECT       SHIVVYA NAIR
AGE / ROLE         26 | Investigative Journalist
STATUS             MISSING
LAST KNOWN LOC.    Sector 14
LAST CONTACT       22:32, FRI 23 OCT
```

### Narration (one line per tap)

> Shivvya disappeared three nights ago.
> Her phone was found the next morning.
> Her apartment was locked.
> No ransom. No witness who saw her leave.
> And yet, someone has been very careful.

`YOUR ASSIGNMENT: FIND SHIVVYA.`

---

## 2. The handover: ACP Garvit Sehgal

Garvit's first appearance. He should feel **warm, efficient and on your side**.

> **GARVIT:** "You must be the Directorate's investigator. Garvit Sehgal, I run Sector 14.
> My patrol recovered her phone near the overbridge on Saturday, 6 AM. It was switched off when we found it.
> Whatever you need from my station, files, officers, vehicle logs, you call me directly. Let's bring her home."

He hands over **EV-001** and **EV-002**. *(Hidden seed: he offers the vehicle logs before anyone has mentioned a vehicle.)*

---

## 3. Evidence

Each item has a **primary specialist**. Sending an item to the wrong person still gets a short reply. Some of those replies hold bonus clues, which rewards curiosity, but the player is never stuck because of one.

### EV-001 — Missing Person Report
- **Source:** Sector 14 Police Station · Filed Sun 25 Oct by Ishaan Verma (editor)
- **Action:** EXAMINE only (tutorial: how to open a file)
- **Content:** "Subject did not report to work Saturday. Phone unreachable. Apartment locked. No signs of struggle reported."
- **Small detail:** Investigating officer: *SI K. Rathore*. *(Kabir's name appears in the very first file, easy to miss.)*

### EV-002 — Shivvya's Mobile Phone
- **Recovered:** Sector 14 overbridge, Sat 24 Oct, 06:00 · Screen cracked
- **Primary: ARJUN →**
  > "Last incoming call at **22:32**, 47 seconds, from **98110 41400**. That number belongs to the **Sector 14 Police Station duty line**.
  > Phone was switched off at **23:47:18**. The last tower ping was Sector 14, near the overbridge.
  > Her messages app was wiped after 23:00. Someone knew her passcode, or made her open it."
- **Neel →** *(bonus)* "No prints on it. None. Not even hers. That phone was wiped clean, on purpose."
- **Maya →** "Overbridge is a dead zone at night. If she walked there, she didn't walk there alone."
- **Unlocks:** Objective 3 · Lead **"The duty line call"**

### EV-003 — Apartment Scene Photos
- **Source:** Taken by Maya on arrival, Green Arcade Apartments, Flat 4B
- **Content:** door locked from outside, keys missing · laptop charger on the desk, no laptop · a notebook with the top pages torn out
- **Primary: NEEL →**
  > "No forced entry. The lock was turned with a key. Hers is missing.
  > The notebook: the torn pages left indentations on the page underneath. Most of it is unreadable, but I can make out **'…9-04…'** and the word **'closed'**."
  *(Seed for Sealed File 19-047. Nothing explains it yet.)*
- **Arjun →** "Charger's for a laptop that's nowhere in this flat. Someone took her work, not her valuables."
- **Maya →** "Her wallet's still in the drawer. This wasn't a robbery."

### EV-004 — Café CCTV, Blue Lantern Café *(proposed name)*
- **Unlocked by:** the lead "The duty line call". Arjun pulls cameras near the last tower ping.
- **Primary: ARJUN →** footage review, shown as CCTV stills with timestamps:
  - `22:41:06` Shivvya enters alone, sits by the window
  - `22:58:40` A man in a dark jacket and cap joins her. Face never toward camera.
  - `23:05:12` They leave together, toward the overbridge
  > "Enhanced frame at 22:58: there's a **radio handset clipped to his belt**. Police issue."
- **Neel →** "His boots, that reflective heel strip. Standard patrol issue in this District."
- **Maya →** "The café is 400 metres from her building. She was here at 22:41. Remember that."

### EV-005 — Building Guard's Logbook
- **Source:** Green Arcade gate cabin
- **Content:** entry for Fri 23 Oct: `S. NAIR (4B) — OUT 23:00 — ALONE`
- **Primary: NEEL →** *(optional second contradiction)*
  > "Different pen from every other entry that night. And it's squeezed between two lines. This was written **later**."
- **Maya →** "Ramesh has kept this book for nine years. He doesn't squeeze entries. Somebody told him what to write."
- **Arjun →** "Nothing digital here. Paper's Neel's world."

---

## 4. Statements

Opened from **RECORDS & STATEMENTS**. Each one is a short card with a portrait and 2–4 lines.

### ST-01 — Ishaan Verma, Editor, *The Ledger*
> "Two months ago she stopped pitching stories. Said she was working on something **old**. Something nobody would let her print.
> Friday evening she told me she was meeting a source. She sounded nervous. Happy-nervous. Like it was finally happening."

### ST-02 — Pooja, Café Worker, Blue Lantern
> "She ordered chai and didn't drink it. Kept checking her phone.
> A man came in, and she *relaxed*. Like she'd been waiting for him. Like she trusted him.
> He paid. Cash. They left together."

### ST-03 — Ramesh Yadav, Security Guard, Green Arcade
> "Eleven o'clock, madam left. Alone. Walked toward the main road. Nobody with her.
> It's written in my book. I write everything in my book."

---

## 5. The gate: first contradiction

**Mechanic:** the player selects two items and taps **COMPARE**.

| Selection | Result |
|---|---|
| **ST-03 + EV-004** ✅ | **CONTRADICTION FOUND.** Ramesh says she left the building at 23:00. The CCTV has her at the café from 22:41. She was already gone. |
| EV-005 + EV-004 ✅ (alternative path) | Same result. The log entry is false. |
| Any other pair | "These don't conflict. Look for two things that **can't both be true**." |

### After the contradiction: end-of-act sequence

1. **Maya** re-questions Ramesh (a short scene):
   > **RAMESH:** "…A policeman came Saturday morning. Before the report was even filed. He said, *'Write that she left alone. It saves everyone trouble.'* I have a family, madam."
   > **MAYA:** "Did he give a name?"
   > **RAMESH:** "No. But his jeep said **P-14**."
2. **Arjun** cross-checks: "P-14 was on duty Friday night. Assigned officer: **SI Kabir Rathore**. The same officer who's named on the missing person report."
3. Screen pauses, then a stamp: `PERSON OF INTEREST: SI KABIR RATHORE`
4. Phone call from **Garvit**:
   > "Kabir? He's one of my best men. But you do what you have to do. I'll send you his vehicle GPS logs myself, today."
   *(He hands you Kabir quickly. Too quickly, which is a seed for Act 4.)*
5. `ACT 1 COMPLETE`. Unlocks **CASE BOARD** and **INTERROGATION** for Act 2.

---

## 6. Objectives (the CURRENT OBJECTIVE panel in the hub)

| # | Objective | Completes when |
|---|---|---|
| 1 | Review the missing person report | EV-001 opened |
| 2 | Find out who she spoke to last | EV-002 sent to Arjun |
| 3 | Trace where she went after the call | EV-004 unlocked and reviewed |
| 4 | Hear from the people who saw her | ST-01–03 read |
| 5 | Find what doesn't add up | Contradiction found |

### Case status counter (end of Act 1)
`05 Evidence · 03 Statements · 01 Lead · 01 Person of Interest · 01 Unresolved ("…9-04… closed")`

---

## 7. Help system

- **2 wrong routings in a row:** the right specialist says something like *"Send that to me, it's a phone. My department."*
- **No progress for 3 minutes on objective 5:** Maya says *"Ramesh was very sure about eleven o'clock. Was she even home at eleven?"*

---

## 8. Asset list for Act 1 (image prompts are the next step)

**Characters** (portrait, plus emotions where noted)
- Shivvya Nair: portrait, a "found" phone selfie, an ID-card photo
- ACP Garvit Sehgal: portrait (warm / professional)
- Ishaan Verma, Pooja, Ramesh Yadav: portrait + 1 emotion each
- SI Kabir Rathore: **file photo only** (full art comes in Act 2)
- Team: Maya, Neel, Arjun (existing art; update Neel's name only)

**Backgrounds**
- Investigation hub room
- Shivvya's apartment, Flat 4B
- Blue Lantern Café: 3 CCTV-angle stills (22:41 / 22:58 / 23:05)
- Sector 14 overbridge at night
- Green Arcade gate cabin

**Evidence objects** (single object, dark background, no text)
- Cracked phone · torn notebook · guard logbook (open) · laptop charger on desk

**Built in code** (no image needed): EV-001 report, call log, guard log page, all timestamps, the CCTV overlay, the "PERSON OF INTEREST" stamp.
