export default function GuideView() {
  return (
    <article className="card guide-view" aria-labelledby="guide-title">
      <header>
        <h2 id="guide-title">How to travel through Aventura Shqip</h2>
        <p>
          Read, learn, choose, and live the folklore. The game never expects you to guess what
          its symbols mean.
        </p>
      </header>

      <section className="guide-section" aria-labelledby="guide-loop">
        <h3 id="guide-loop">The learning loop</h3>
        <ol>
          <li><b>Read the scene.</b> Unknown words appear as English meanings.</li>
          <li>
            <b>Discover a word.</b> Activate it to hear and reveal its Albanian form. That is the
            guided introduction, so its first Train question asks you to recognise it among four
            meanings instead of repeating the reveal. This costs nothing.
          </li>
          <li>
            <b>Train it.</b> Rebuild, hear, complete, type, and match the everyday phrases you
            meet in the story. Finishing a phrase earns one token for every different learned word
            it reinforces; a mistake costs one heart.
          </li>
          <li><b>Choose a path.</b> A real choice spends one token for each different word it uses.</li>
        </ol>
        <p>
          A path marked 📜 is hidden in a described sentence. Discover that complete sentence to
          reveal the direction it names.
        </p>
      </section>

      <section className="guide-section" aria-labelledby="guide-map">
        <h3 id="guide-map">Reading the world</h3>
        <p>
          Time, weather, travelling people, and the consequences of completed tales appear in the
          places and conversations around you. Pay attention to what the world tells you: the
          ordinary player interface does not expose a map or a conditions dashboard.
        </p>
      </section>

      <section className="guide-section" aria-labelledby="guide-roles">
        <h3 id="guide-roles">Character tales</h3>
        <p>
          A 🎭 choice asks for confirmation before moving or spending tokens. Once confirmed, you
          are that character until the tale reaches an ending. You may still explore the public
          roads and places, but tale-only scenes, endings, unrelated deeds, and other character
          roles remain locked. The focus card always names who you are, what you feel called to do,
          and where the waiting scene lies. If you step out to explore, that scene's tale hour,
          arrival, and conditions wait exactly as you left them while the living world's date,
          weather, roads, and travelling people continue forward. Returning resumes the waiting
          scene; it never rewinds or replays the living world. Your traveller's pack and health
          wait outside the role. The character begins at full role health with only belongings
          granted inside that tale, and a surviving ending restores your exact traveller pack and
          health.
        </p>
      </section>

      <section className="guide-section" aria-labelledby="guide-collection">
        <h3 id="guide-collection">Finishing the anthology</h3>
        <p>
          Good and secret conclusions become achievements after a comprehension check. Regional
          discoveries count too. Complete every achievement to finish the Living Chronicle; bad
          fates are optional records and are never required for completion.
        </p>
      </section>

      <section className="guide-section" aria-labelledby="guide-sources">
        <h3 id="guide-sources">Folklore and sources</h3>
        <p>
          Before you enter a character role, expand <b>Sources for this tale</b> to open every
          role-labelled reference for that tale. After a successful ending, its earned lore card
          shows those tale references again alongside direct, supplemental, and corpus evidence.
          Source labels distinguish primary witnesses, translations, variants, scholarly context,
          modern attestations, declared syntheses, and material whose Albanian original is
          unavailable. Missing evidence is labelled rather than reconstructed.
        </p>
      </section>
    </article>
  )
}
