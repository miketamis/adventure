// NPCs: Nastradin Hoxha (the trickster sage) — see ../npcs/_SCHEMA.md.

export default {
  nastradini: {
    name: 'Nastradin Hoxha', glyph: '🧿', kind: 'human',
    role: 'the wise-fool hodja — poor, quick, never out-tricked',
    backstory: 'The pan-Balkan Nasreddin on Albanian soil: a poor hoxha of ready wit whose foolery is always the sane answer wearing a clown\'s hat. He borrows a cauldron and returns it "with a baby pot it bore in the night"; when it is his turn he mourns that the cauldron "died"; three grand townsmen set out to cheat him and go home cheated. In the 1954 Gheg anecdotes he is never once out-tricked.',
    folklore: ['nastradin'],
    location: { status: 'placed', node: 'nastradin1' },
    tales: { 'nastradin': 'nastradini' },
  },
  veziriKalase: {
    name: 'Veziri', glyph: '👳', kind: 'human',
    role: 'the Vezir of the fortress — power whose favour has a tail',
    backstory: 'The lord of the castle above the bazaar. His friendship is a gift that costs: he lends and expects, tests and takes offence, and Nastradin must out-think the powerful without ever seeming to. The Vezir is the straight man the joke is built against.',
    folklore: ['nastradin'],
    location: { status: 'planning', plan: 'rules the Vezir\'s fortress (reuses kala1); the bazaar sits under his walls — staged when the Nastradin cycle is built' },
    tales: { 'nastradin': 'veziriKalase' },
  },
  gjindjaPazarit: {
    name: 'gjindja e pazarit', glyph: '👥', kind: 'collective',
    role: 'the bazaar crowd — the town that sees everything',
    backstory: 'The townsfolk under the fortress who witness each of Nastradin\'s turns and always ask the one question that lets him land the punchline. They are the chorus of the anecdote cycle — the reason a private joke becomes a proverb.',
    folklore: ['nastradin'],
    location: { status: 'planning', plan: 'the proposed bazaar under the castle (near kala1); the same pazar the tregtari trades in — staged when the cycle is built' },
    tales: { 'nastradin': 'gjindjaPazarit' },
  },
  treZotnit: {
    name: 'tre zotnitë', glyph: '💰', kind: 'collective',
    role: 'the three grand townsmen who set out to cheat the uncheatable',
    backstory: 'Three gold-stiff gentlemen who wager they can make a fool of the hoxha and walk home the fools — the marks of the cheat-the-cheater anecdote. Their pride is the lever Nastradin pulls.',
    folklore: ['nastradin'],
    location: { status: 'planning', plan: 'come from the town/bazaar (near kala1); passing antagonists, staged with the cycle' },
    tales: { 'nastradin': 'treZotnit' },
  },
}
