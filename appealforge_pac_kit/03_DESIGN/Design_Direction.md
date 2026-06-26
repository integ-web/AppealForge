# Design Direction — Make It Lovable, Not Bland

## North star

AppealForge PAC should feel like a premium clinical command center: calm, precise, credible, and quietly beautiful.

The user should feel:
- "I know exactly what needs my attention."
- "This app respects the seriousness of the work."
- "This is faster than my old workflow."
- "I trust what it is showing me because I can inspect the source."
- "I do not dread logging in."

## Brand personality

- Clinical without being cold.
- Premium without being flashy.
- Fast without being frantic.
- Human-reviewed, not AI-magic.
- Evidence-first, not claim-first.
- Warm precision.

## Visual mood

Think:
- a modern medical operations room;
- a legal evidence board;
- a premium fintech dashboard;
- a calm dark-mode command center;
- paper, ink, and signal lights.

Avoid:
- generic SaaS blue gradients;
- flat white tables everywhere;
- default shadcn look with no brand;
- hospital clip art;
- cartoon doctors;
- neon AI gimmicks;
- overwhelming red alerts.

## Design theme

**"Midnight clinical atelier."**

A rich dark shell frames warm paper-like content areas. Evidence cards and packet pages feel tactile. Important actions use clinical teal and signal amber. Risk states are precise and restrained.

## Palette

| Token | Hex | Use |
|---|---|---|
| Ink 950 | `#08111F` | App background |
| Ink 900 | `#0D1B2A` | Sidebar/header |
| Harbor 800 | `#123047` | Panels |
| Harbor 700 | `#174866` | Active nav |
| Teal 500 | `#00A88E` | Primary actions |
| Teal 300 | `#5EEAD4` | Glow/accent |
| Amber 400 | `#F6B44B` | Deadline/warning |
| Coral 500 | `#E76F51` | Danger |
| Green 500 | `#2FBF71` | Won/reviewed |
| Paper 50 | `#F8F5EF` | Document surface |
| Paper 100 | `#EFE8DC` | Document border |
| Mist 200 | `#DCE5EA` | Dividers |
| Slate 500 | `#708090` | Secondary text |
| White | `#FFFFFF` | Critical contrast |

## Typography

Use system fonts initially:
- Product UI: `Inter`, `ui-sans-serif`, `system-ui`
- Document/packet preview: `Georgia`, `Charter`, serif
- Numbers/data: `JetBrains Mono`, `SFMono-Regular`, monospace

If no custom fonts are installed, the fallback still feels deliberate.

## Signature UI elements

### 1. Evidence confidence rail
A thin vertical rail on evidence cards:
- teal = reviewed/supportive;
- amber = needs review;
- coral = missing/blocked.

### 2. Deadline glow
Urgent cases have a subtle amber rim, not a screaming red badge.

### 3. Source quote drawer
A right-side drawer shows the exact document page, quote, and why it supports the criterion.

### 4. Packet paper
The packet preview uses a warm paper canvas with subtle shadow. It should feel like a real document being forged from evidence.

### 5. Calm login
The login screen should be memorable:
- dark gradient background;
- beautiful product mark;
- left-side value story;
- right-side elegant login card;
- tiny "Synthetic demo mode" trust tag.

## Motion

Use restrained motion:
- cards rise 2px on hover;
- evidence drawer slides in;
- completion states fade;
- progress indicators move gently;
- no bouncing mascots.

## Microcopy voice

Use plain, operational language:
- "Evidence found"
- "Needs source"
- "Physician review required"
- "Unsupported claim blocked"
- "Deadline confirmed from notice"
- "Export draft packet"
- "Mark as sent"

Avoid vague AI language:
- "Magic appeal"
- "Let AI decide"
- "Guaranteed overturn"
- "Automated medical necessity"

## UX emotional promise

The user logs in and sees a queue that feels manageable. The product guides them from denial to packet without judgment, confusion, or clutter.
