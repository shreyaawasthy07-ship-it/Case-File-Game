# THE GREY DISTRICT — Game Concept

> The master story and design document. Every act bible follows this file.

**An Interactive Detective Investigation Game**

- **Genre:** Crime Mystery / Investigation / Interactive Detective
- **Format:** Web-based interactive game
- **Core experience:** The player becomes the lead investigator and must solve Shivvya's disappearance by collecting evidence, using their investigation team, connecting clues, interrogating people, reconstructing the timeline and finally presenting a verdict.

---

## 1. The core idea

The player is brought into The Grey District Investigation Unit to investigate the disappearance of Shivvya, a 26-year-old crime journalist.

At first, it appears to be a missing-person case. But as the investigation progresses, the player discovers that Shivvya had been investigating an old case: **Child Trafficking Case 001**.

That investigation leads to:

**Shivvya → Case 001 → Rhea Malhotra → Rhea's death → ACP Garvit → SI Kabir → Shivvya's disappearance**

The player doesn't receive this chain directly. They have to build it.

## 2. The game's feel

The game should feel like:

- Opening a classified police file
- Entering a dark investigation room
- Watching CCTV footage
- Examining physical evidence
- Calling witnesses
- Interrogating suspects
- Connecting photographs and documents on a detective board
- Discovering something that changes the entire case

The feeling should be *"I am actually investigating this case."* Not *"I'm reading a story."*

## 3. Visual identity

The world should be dark, cold and investigative, with occasional warm colours when memories or important emotional moments appear.

| Colour | Hex | Use |
|---|---|---|
| Charcoal Black | `#111315` | Main background |
| Gunmetal Grey | `#252A2E` | Panels, cards, investigation screens |
| Steel Grey | `#596168` | Secondary text and borders |
| Off White | `#D9D7D0` | Main readable text |
| Muted Red | `#8E3030` | Danger, blood, warnings, suspicious evidence |
| Amber / Evidence Yellow | `#B89A57` | Important clues, selected evidence, highlights |
| Cold Blue | `#536B78` | Technology, CCTV, digital investigation |

**Principle:** don't make the entire website black and red. Red should feel rare and meaningful. If everything is red, nothing feels dangerous.

## 4. Screen effects

**Background** (very subtle): film grain, dust, paper texture, CCTV noise, slight vignette, very slow moving shadows. Nothing too animated.

**Transitions:**

| Moment | Effect |
|---|---|
| File open | Screen briefly darkens → paper/file slides in |
| CCTV | Static → footage appears |
| Evidence found | Small camera flash / scan effect |
| Important discovery | Screen pauses for a second → evidence gets highlighted |
| Interrogation | Lights slightly flicker |
| Final verdict | Everything becomes quieter and cleaner |

## 5. Typography

Two fonts, maximum three.

- **Inter** (main UI): buttons, menus, evidence descriptions, reports, player instructions
- **IBM Plex Mono** (case files): case numbers, evidence IDs, dates, timestamps, police records, CCTV info, coordinates. Example: `CASE 001` · `EVIDENCE #017` · `23:47:18` · `LOCATION: SECTOR 14`
- **Bebas Neue / Oswald** (dramatic headings): used sparingly for large titles

## 6. Opening experience

The game shouldn't immediately start with a dashboard.

1. Black screen. Very faint police radio. Static.
2. A timestamp appears: `DELHI — 23:47:18`
3. `CASE FILE: SHIVVYA`. A photograph/document appears.
4. `THE GREY DISTRICT`, with a small line underneath: `EVERY CASE LEAVES A TRACE.`

## 7. Backstory

Presented like a classified briefing, not a long paragraph.

```
CASE SUBJECT          SHIVVYA
                      26 | Investigative Journalist
STATUS                MISSING
LAST KNOWN LOCATION   Sector 14
LAST CONTACT          10:32 PM
```

Narration:

> Shivvya disappeared three nights ago.
> Her phone was recovered.
> Her apartment was locked.
> No ransom demand was received.
> No confirmed witness saw her leave.
> And yet, someone has been trying very hard to make sure she is never found.

`YOUR ASSIGNMENT: Find Shivvya.`

## 8. Government / police briefing

The player enters the Investigation Unit. A senior government official gives the briefing and introduces **your team**.

Each member gets: photo, name, role, specialty, personality. No huge biographies. Example:

> **ARJUN MEHRA** · Forensic Officer · *"If there's a trace, I'll find it."*

The player understands: these people are your tools.

## 9. Main investigation hub

The player's digital investigation room.

**Main navigation:** Evidence · Team Assistance · Records & Statements · Case Board · Timeline · Interrogation · Final Verdict

Always visible:

- **CURRENT OBJECTIVE:** LOCATE SHIVVYA
- **CASE STATUS:** 07 Evidence · 03 Leads · 02 Persons of Interest · 01 Unresolved Connection

## 10. Evidence

The player's evidence locker. Visual style: dark metal filing cabinet + digital interface. Every piece gets an ID.

```
EVIDENCE #014
Shivvya's Mobile Phone
Recovered: Sector 14
Status: Analysed
```

Actions: **Examine · Send to Team · Add to Case Board · Archive**

## 11. Team assistance

One of the game's signature mechanics. The player selects evidence, then: **WHO SHOULD HANDLE THIS?**

| Unit | Handles |
|---|---|
| Forensics | Physical evidence |
| Cyber | Phones, computers, deleted data |
| Financial | Transactions and money trails |
| Surveillance | CCTV and vehicles |
| Field Unit | Locations and witnesses |
| Records | Police/government files |

The team investigates and returns a report.

## 12. Records & statements

This section feels like opening actual case files.

- **Records:** police reports, medical reports, CCTV logs, call records, vehicle GPS, financial records, old case files, employment records
- **Statements:** Kabir, Meera, Shivvya's colleague, security guard, café employee, police personnel

**Key mechanic:** statements can contradict records. That's how the player discovers lies.

## 13. Case board

One of the most beautiful screens: a physical-looking investigation wall with pinned photographs, names, documents, evidence, locations and dates, connected with thin lines.

**The player makes the connections.** Eventually:

SHIVVYA → CHILD TRAFFICKING CASE 001 → RHEA MALHOTRA → RHEA'S DEATH → ACP GARVIT → SI KABIR → SHIVVYA'S DISAPPEARANCE

The satisfaction comes when the player realizes: *"It's all connected."*

## 14. Timeline

A horizontal investigation timeline.

| Year | Event |
|---|---|
| 2019 | Child Trafficking Case 001 |
| 2020 | Case officially closed |
| 2021 | Rhea's death |
| 2025 | Shivvya begins investigating Case 001 |
| Present | Shivvya disappears |

The player keeps adding events, and eventually discovers contradictions and missing periods.

## 15. Interrogation

Completely different visually: a dark interrogation room. One person, one table, one light. The player chooses questions.

> **KABIR · QUESTION 01:** Where were you on the night Shivvya disappeared?
> **Kabir:** "Routine patrol."
> **Player:** PRESENT EVIDENCE → GPS RECORD

Now the interrogation changes. The player can challenge him, which creates branching responses.

## 16. The Rhea discovery (turning point)

The player initially thinks Kabir is suspicious. Then Shivvya's notes reveal:

- *"Why was Case 001 closed?"*
- *"RHEA M."*
- *"Rhea wasn't an accident."*

**NEW LEAD UNLOCKED: RHEA MALHOTRA.** The player contacts her sister, **Meera Malhotra**, who provides information about Rhea's final days. Then the player investigates Rhea's phone. That's where they begin discovering Garvit.

## 17. The Garvit reveal

Garvit should initially appear trustworthy: a senior officer, helpful, professional, possibly even supportive of the investigation. The player shouldn't immediately think he's the villain. Instead, evidence gradually creates doubt:

Rhea + Garvit photograph → call records → meeting/location records → financial connection → Rhea's suspicious death → Garvit's connection to Case 001

Then: **GARVIT IS NOT HELPING THE INVESTIGATION. He's protecting himself.**

## 18. The Kabir reveal

Kabir remains the first obvious suspect. Evidence shows his vehicle near Shivvya, GPS anomalies, CCTV, calls and suspicious statements.

Then **Garvit → Kabir**: financial transfers and communication records.

Eventually, **surveillance**: Kabir travels to a warehouse. Garvit arrives. They meet. Something is exchanged. The player watches. Then:

> *"We need those files before anyone else finds them."*

Now the player finally understands.

## 19. Final verdict

The player doesn't simply select GARVIT. They have to reconstruct the case.

**Final questions:**

1. What happened to Shivvya?
2. Why was she investigating Case 001?
3. What happened to Rhea?
4. What was Garvit's role?
5. What was Kabir's role?
6. Why did Shivvya disappear?

**Support your verdict:** the player selects the evidence supporting their conclusion (e.g. CCTV, bank transfer, GPS record, Rhea's phone, Shivvya's notes, Kabir's contradictory statement). Then: **CASE SOLVED.**

## 20. The ending

The final screen shouldn't be loud. Everything becomes quiet. Black screen. One line:

> THE TRUTH WAS NEVER MISSING.
> *(pause)*
> IT WAS BURIED.

Then:

```
CASE STATUS
SHIVVYA                        FOUND
RHEA MALHOTRA                  CASE REOPENED
CHILD TRAFFICKING CASE 001     REOPENED
GARVIT                         ARRESTED
KABIR                          ARRESTED
```

`CASE CLOSED`, and underneath: *Or is it?* (the possibility of Case 002 later).

## 21. Overall game flow

```
THE GREY DISTRICT
  → CASE BRIEFING
  → MEET YOUR TEAM
  → SHIVVYA MISSING
  → EVIDENCE + RECORDS
  → TEAM ASSISTANCE (Forensics · Cyber · Surveillance)
  → CASE BOARD
  → TIMELINE
  → INTERROGATION
  → CHILD TRAFFICKING CASE 001
  → RHEA MALHOTRA
  → ACP GARVIT
  → GARVIT → KABIR
  → FINAL EVIDENCE
  → FINAL VERDICT
  → CASE CLOSED
```

## 22. The design principle

**The game should never tell the player the answer before they earn it.**

Every major discovery should come from:

Evidence → Team → Analysis → Connection → Contradiction → Investigation → Deduction

That's what makes The Grey District feel like an actual detective game rather than an interactive storybook.
