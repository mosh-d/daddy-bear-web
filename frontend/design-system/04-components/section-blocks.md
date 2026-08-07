# Section blocks

Component: [`components/Section.tsx`](../../components/Section.tsx).

## The pattern, and where it comes from

Every page is built as a stack of full-bleed, alternating-background sections — hero, then a cream section, then a navy section, and so on — each one making a single point with a single optional call to action. This is the most useful structural idea to take from [blackmarketmovie.com](https://blackmarketmovie.com): full-width color blocks give a one-page, mobile-scroll site a strong sense of rhythm and progress as you scroll, and they make each idea easy to isolate and act on.

The difference from Black Market: **two tones, not four**, restrained per `01-color.md`, and no section manufactures urgency the way "the record has never been broken" does. The rhythm is the same; the register is Daddy Bear's own. (Home does include a countdown — see `00-brand-voice.md` for why counting down to a real production date isn't the same thing as manufactured urgency, and why it's styled quietly rather than as a headline event.)

## API

`<Section tone="navy" | "cream" | "cream-alt">` — full-bleed background, `Container` inside for content width, `py-16 sm:py-24` vertical rhythm (see `03-spacing-layout.md`). Optional `eyebrow` prop renders the small gold uppercase label above the section title, the one direct structural borrow from Black Market's "- SECTION LABEL" convention.

## Rule

One primary `Button` per `Section`, maximum. If a section needs two actions, one must be `variant="secondary"` or `"ghost"` — this is the code-level enforcement of the brand-voice rule "one idea per screen."
