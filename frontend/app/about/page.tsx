import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';

export const metadata: Metadata = {
  title: 'About & Mission',
  description:
    'Who made Daddy Bear and why: three women, a grant, and a mission to celebrate fathers who show up.',
};

export default function AboutPage() {
  return (
    <>
      <Section tone="navy" eyebrow="About & Mission">
        <h1 className="max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
          Who made this, and why.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/90">
          Daddy Bear began with three women, a grant, and a mission: to celebrate the fathers who
          show up — quietly, consistently, without asking for recognition. Cardinal Productions
          Limited exists to tell that story well, and to build the audience and the platform that
          keeps telling it long after the credits roll.
        </p>
      </Section>

      <Section tone="cream" eyebrow="The mission">
        <Card className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            Full mission story — from Cardinal Productions
          </p>
          <p className="mt-2 text-base leading-relaxed text-ink/80">
            This is where the complete origin story goes once Cardinal delivers it: how the grant
            came together, why fatherhood, and what the team wants audiences to feel walking out of
            a screening. Placeholder copy only — nothing here should be treated as final.
          </p>
        </Card>
      </Section>

      <Section tone="cream-alt" eyebrow="The team">
        <div className="flex flex-wrap gap-3">
          <Badge>Founder, Producer & Co-Director — Korede Azeez</Badge>
          <Badge>More credits from Cardinal Productions</Badge>
        </div>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink/70">
          Cardinal Productions Limited is based in Gwagwalada, FCT, Abuja. Full team credits and
          photography land here once supplied — the press and partners page grows from this
          section as those relationships form.
        </p>
      </Section>
    </>
  );
}
