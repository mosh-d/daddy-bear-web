# Brand voice

## The rule

Daddy Bear reads as **considered, warm and unhurried**. Every screen should feel like it was made by someone who cares about the fathers this film celebrates — not by a marketing team chasing a deadline, even when we are chasing one.

In practice:

- **One idea per screen.** State the mission, the next action, or the story beat — not all three at once. Resist stacking CTAs.
- **Sentences, not slogans.** Copy reads like it's spoken to one person, not shouted at a crowd. Avoid ALL-CAPS headlines and exclamation marks as a default register (reserve them for genuine urgency, e.g. a screening selling out).
- **Show restraint before you show energy.** Motion, color and scale should support the words, not compete with them.

## Why this is written down explicitly

The brief is direct about this: *"Navy, cream and gold, restraint over noise, warmth over gloss... it should never feel like a template."* The nearest comparable site we have — [blackmarketmovie.com](https://blackmarketmovie.com) — is a genuinely effective piece of marketing, and its *structure* is worth studying (see `04-components/section-blocks.md`). But its tone is loud, high-contrast, countdown-driven street marketing: black backgrounds, electric-blue and orange color blocks, a distressed western wordmark, a ticking clock. That's the right register for a Guinness World Record stunt. It is the wrong register for a film about fathers who show up.

**The working test:** if a section would work equally well advertising a record-breaking event, it's probably too loud for Daddy Bear. If it would work read aloud at a family screening, it's on brand.

## How to apply it

- Reuse Black Market's *structural* confidence — full-bleed sections, one clear action per section, a real design system instead of default template styling — documented in `04-components/`.
- Photography and imagery should feel real and warm, not high-contrast/graphic — see `05-imagery-motion.md`.

### The one exception: the countdown

Phase 1 does use a countdown (`components/Countdown.tsx`, on Home) — an earlier version of this document ruled that out entirely as an urgency device borrowed from Black Market's tone. The distinction that changed it: Black Market's countdown counts down to a manufactured event (a record attempt built specifically to need a clock); ours counts down to something that's true regardless of whether we display it — principal photography starting. That's information, not hype, so it passes the working test above: it would still make sense read aloud at a family screening ("filming starts in six days").

Kept restrained on purpose: quiet navy-950 card, no "claim your seat" framing, numerals rather than a headline, and it switches to a plain sentence once the date arrives rather than sitting at `00:00:00:00`. If a future countdown target is ever a manufactured deadline rather than a real one, that's a sign it doesn't belong here.
