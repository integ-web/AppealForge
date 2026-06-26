# Design System — AppealForge PAC

## Design tokens

See `tokens.json` and `appealforge_theme.css`.

## Layout

### App shell
- Left sidebar: 280px desktop.
- Top header: case search, facility switcher, user menu.
- Main surface: dark app background.
- Content panels: deep harbor cards.
- Packet preview: warm paper card.

### Grid
- 12-column content grid.
- Max width: 1440px.
- Case pages: 60/40 split for evidence map + source drawer.
- Packet editor: 55/45 split for editor + preview.

## Components

### Brand mark
A shield/forge motif:
- shield = protection/appeals;
- spark = evidence;
- page = packet.

### Buttons
Primary:
- teal fill;
- white text;
- soft teal shadow;
- clear disabled state.

Secondary:
- transparent harbor surface;
- mist border;
- white/mist text.

Danger:
- coral border or fill only when destructive.

### Cards
Case card:
- plan;
- facility;
- service;
- denial reason;
- deadline badge;
- status;
- owner;
- next action.

Evidence card:
- criterion;
- status;
- summary;
- citation pill;
- confidence;
- reviewer action.

Packet section card:
- section title;
- support status;
- edit controls;
- linked evidence ids.

### Badges
- New: slate
- Parsing: blue
- Needs Review: amber
- Drafted: purple
- Approved: teal
- Sent: blue
- Won: green
- Lost: coral
- Escalated: amber/coral

### Tables
Do not use raw default tables. Use:
- sticky header;
- soft row separators;
- row hover;
- status chips;
- deadline visual indicator;
- spacious row height.

### Forms
- Labels above input.
- Helper text below.
- Error text in coral.
- PHI warning when live mode is off/on.
- Autofill-friendly but privacy-conscious.

### Empty states
Good empty state:
- title;
- short explanation;
- one primary action;
- sample/demo CTA.

Example:
> No appeal cases yet. Upload a denial letter and clinical packet to build your first evidence map.

### Loading states
Use skeletons, not spinners alone:
- document cards;
- evidence rows;
- packet page.

### Error states
Make errors actionable:
- "This PDF had no extractable text. Upload a searchable PDF or run OCR."
- "This claim has no citation. Add evidence or remove the sentence."

## Screen-level taste notes

### Login
The login should sell the product before authentication:
- visual stats card;
- quote/citation preview;
- refined brand mark;
- dark background;
- warm login card.

### Dashboard
Use a command-center layout:
- KPI strip on top;
- urgent queue left;
- case list center;
- payer pattern sidebar right.

### Evidence map
This is the hero screen.
- rows should feel like an evidence board;
- each criterion has a clear support state;
- right drawer makes the quote inspectable;
- missing items are not buried.

### Packet editor
Make it feel like a legal/clinical document forge.
- left: structured sections;
- right: paper preview;
- citations visible;
- unsupported claims blocked inline.

## Accessibility

- Minimum body text contrast 4.5:1.
- Focus visible on dark and light surfaces.
- Do not rely on color alone for status.
- Use `aria-label` for icon buttons.
- Keyboard navigation for evidence map and drawer.
- Packet preview text should be selectable.

## Responsive

Desktop first for v1, but support tablet:
- sidebar collapses;
- evidence drawer becomes bottom sheet;
- packet editor stacks.

## Iconography

Use line icons:
- file text;
- shield;
- clock;
- check circle;
- alert triangle;
- quote;
- user check;
- history;
- upload cloud.

## Implementation hint

Use Tailwind CSS variables and shadcn/ui components only as raw material. Override heavily with the AppealForge theme so it does not look like a template.
