// Editorial hard lexical contrasts for stable dictionary ids I-P.
//
// These are candidate relationships, not permission to place a word into any
// arbitrary sentence. The shared planner must still apply its exact answer-
// validity and learner-familiarity gates for the activity being built.

const ids = (value) => value.trim().split(/\s+/).filter(Boolean)

const registry = {}

const CONTEXT_REQUIRED_RELATIONS = new Set([
  'demonstrative agreement contrast',
  'same-surface grammatical contrast',
  'same-surface discourse contrast',
  'connector-function contrast',
  'person/case/possession contrast',
  'time-unit contrast',
  'movement-action contrast',
  'mental/perceptual contrast',
])

const review = ({ targets, candidates, relation, reason }) => {
  const targetIds = ids(targets)
  const candidateIds = ids(candidates)
  for (const targetId of targetIds) {
    const prior = registry[targetId]?.status === 'reviewed' ? registry[targetId].contrasts : []
    const additions = candidateIds
      .filter((candidateId) => candidateId !== targetId)
      .map((candidateId) => Object.freeze({
        candidateId,
        relation,
        reason,
        requiresContext: CONTEXT_REQUIRED_RELATIONS.has(relation),
      }))
    const seen = new Set()
    const contrasts = [...prior, ...additions]
      .filter(({ candidateId }) => !seen.has(candidateId) && seen.add(candidateId))
      .slice(0, 6)
    registry[targetId] = Object.freeze({ status: 'reviewed', contrasts: Object.freeze(contrasts) })
  }
}

const notApplicable = (targets, reason) => {
  for (const targetId of ids(targets)) {
    registry[targetId] = Object.freeze({ status: 'not-applicable', reason })
  }
}

// Grammatical and conversational roles.
review({ targets: 'je jam ka ke mund mungon pelqen', candidates: 'eshte duhet do di rri', relation: 'clause-role contrast', reason: 'A different high-frequency predicate changes the grammatical or semantic job of the clause.' })
review({ targets: 'ne mbi nga per pa me neper prej nen kunder permes mes prane matane pas', candidates: 'deri rreth para jashte brenda poshte', relation: 'spatial-relation contrast', reason: 'Each candidate expresses a different spatial, directional, source, accompaniment, or temporal relation.' })
review({ targets: 'nje ndonje', candidates: 'cdo asnje pak shume kaq', relation: 'quantity/determiner contrast', reason: 'The candidates differ in singularity, indefiniteness, universality, or quantity.' })
review({ targets: 'ky kjo keto keta kesaj', candidates: 'ai ajo kush nje ky keto', relation: 'demonstrative agreement contrast', reason: 'The candidates contrast gender, number, case, or deixis rather than repeat the same form.' })
review({ targets: 'i_art i_link i_obj', candidates: 'i_art i_link i_obj e_art e_link e_obj', relation: 'same-surface grammatical contrast', reason: 'The identical surface i must be distinguished by its reviewed grammatical function in context.' })
review({ targets: 'po_yes po_prog po_but po_turn', candidates: 'po_yes po_prog po_but po_turn', relation: 'same-surface discourse contrast', reason: 'The identical surface po must be distinguished by its reviewed conversational or grammatical job.' })
review({ targets: 'mos nuk jo', candidates: 'po_yes a_q do_fut as', relation: 'polarity contrast', reason: 'The candidates contrast prohibition, verbal negation, a negative reply, affirmation, question, or future marking.' })
review({ targets: 'por po_but ndersa nese pra prandaj ose', candidates: 'dhe edhe apo sepse qe sikur', relation: 'connector-function contrast', reason: 'Each connector establishes a different logical or discourse relationship.' })
review({ targets: 'ku kush pse kur perse', candidates: 'cfare cili sa si', relation: 'question-word contrast', reason: 'Each interrogative asks for a different kind of information.' })
review({ targets: 'mua ju na ma ia juaj im me_obj ne_we', candidates: 'une ti ai ajo ata tyre saj yt', relation: 'person/case/possession contrast', reason: 'The candidates contrast person, number, case, clitic role, or possession.' })
review({ targets: 'mjaft pak kaq me_more pothuajse', candidates: 'shume aq teper fare gjithcka', relation: 'degree/quantity contrast', reason: 'The candidates express different amounts, limits, or degrees.' })
review({ targets: 'patjeter natyrisht pikerisht', candidates: 'ndoshta mbase pothuajse vertet', relation: 'certainty/precision contrast', reason: 'The candidates contrast certainty, possibility, approximation, and exactness.' })
review({ targets: 'ndoshta', candidates: 'sigurisht patjeter pikerisht vertet', relation: 'certainty contrast', reason: 'Maybe contrasts with certainty and exact assertion.' })
review({ targets: 'mbase', candidates: 'sigurisht natyrisht pikerisht vertet', relation: 'certainty contrast', reason: 'Maybe contrasts with certainty and exact assertion.' })
review({ targets: 'nejse', candidates: 'prandaj por sepse pikerisht', relation: 'discourse-marker contrast', reason: 'Anyway changes or closes the topic rather than giving a cause, result, or exact confirmation.' })
review({ targets: 'oh o mjeri ja lumte mashallah', candidates: 'hej urime faleminderit urdhero epo', relation: 'social-interjection contrast', reason: 'Each formula performs a different social or emotional act.' })

// Place, environment, and time.
review({ targets: 'pyll lume mal liqen krua pus maja', candidates: 'det fushe shpelle fshat qytet', relation: 'landscape contrast', reason: 'The candidates are distinct natural places or landforms a learner must discriminate.' })
review({ targets: 'kala pallat kulle oda kishe kafene mulli kopsht', candidates: 'shtepi han hotel dyqan shkolle', relation: 'place/building contrast', reason: 'The candidates denote distinct buildings or inhabited places with different functions.' })
review({ targets: 'mur porta prag kafaz kurth', candidates: 'dere gardh hendek vrime hyrje dalje', relation: 'boundary/containment contrast', reason: 'The candidates contrast a wall, opening, threshold, enclosure, trap, or passage.' })
review({ targets: 'muzg mesdite mesnate mengjes mbremje pasdite naten', candidates: 'agim dite sonte dje neser', relation: 'time-of-day contrast', reason: 'The candidates identify different times or temporal frames.' })
review({ targets: 'kohe moment minuta ore jave muaj', candidates: 'vit dite here takim', relation: 'time-unit contrast', reason: 'The candidates distinguish general time, moments, and calendar or clock units.' })
review({ targets: 'perseri', candidates: 'tani neser mepare kurre', relation: 'temporal-frequency contrast', reason: 'Again contrasts with now, tomorrow, before, and never.' })
review({ targets: 'prape', candidates: 'tani sonte pastaj kurre', relation: 'temporal-frequency contrast', reason: 'Again contrasts with current, later, and never-time references.' })
review({ targets: 'mepare', candidates: 'pastaj tani neser menjehere', relation: 'temporal-order contrast', reason: 'Before contrasts with later, present, future, and immediate timing.' })
review({ targets: 'pastaj', candidates: 'mepare tani menjehere mbreme', relation: 'temporal-order contrast', reason: 'Then contrasts with before, now, immediately, and last night.' })
review({ targets: 'ndonjehere', candidates: 'kurre gjithmone tani menjehere', relation: 'frequency contrast', reason: 'Sometimes contrasts with never, always, current time, and immediacy.' })
review({ targets: 'mbreme', candidates: 'neser sonte tani mengjes', relation: 'day-reference contrast', reason: 'Last night contrasts with tomorrow, tonight, now, and morning.' })
review({ targets: 'neser', candidates: 'dje sonte tani mbreme', relation: 'day-reference contrast', reason: 'Tomorrow contrasts with yesterday, tonight, now, and last night.' })
review({ targets: 'menjehere', candidates: 'me_vone pastaj ndonjehere neser', relation: 'timing contrast', reason: 'At once contrasts with later, then, sometimes, and tomorrow.' })
review({ targets: 'me_vone', candidates: 'menjehere tani heret mepare', relation: 'timing contrast', reason: 'Later contrasts with immediately, now, early, and before.' })
review({ targets: 'pasi', candidates: 'para derisa nese sepse', relation: 'clause-timing contrast', reason: 'After contrasts with before, until, condition, and cause.' })
review({ targets: 'ketu lart poshte jashte larg para perpara mbrapa prapa ketej majtas', candidates: 'atje brenda afer djathtas drejt matane', relation: 'location/direction contrast', reason: 'The candidates distinguish locations and directions rather than paraphrase one another.' })

// People, roles, kinship, and beings.
review({ targets: 'mik mike', candidates: 'armik zoteri zonje udhetar prind', relation: 'social-role contrast', reason: 'A friend or guest is distinct from an enemy, stranger-role, adult title, traveller, or parent.' })
review({ targets: 'plak plake pleq', candidates: 'vajze djale femije burra gra', relation: 'age/gender/number contrast', reason: 'The candidates contrast age, gender, and number in person descriptions.' })
review({ targets: 'nene mama njerke motra nuse prind', candidates: 'baba vella bije bir teto', relation: 'kinship-role contrast', reason: 'Each candidate names a different family or marital role.' })
notApplicable('meme', 'This poetic synonym of nënë needs a register-aware context; bare lexical foils would test style rather than meaning.')
review({ targets: 'mbret mbreteresha princ krajl kapidan mjeshter polici prift', candidates: 'tregtar sherues hoxha bari roje', relation: 'human-role contrast', reason: 'The candidates denote distinct occupations, ranks, or social roles.' })
review({ targets: 'kuzhinier mami magjistare', candidates: 'mjek sherues sherbetore tregtar prift', relation: 'occupation contrast', reason: 'Each candidate names a different practical or story-world occupation.' })
review({ targets: 'njeri kafshe', candidates: 'burre grua femije zog gje', relation: 'living-kind contrast', reason: 'The candidates distinguish a person, animal, adult, child, bird, or thing.' })
review({ targets: 'kulshedra karkanxholl peri ora lugat katallan lubia kukudh perendi', candidates: 'zane stihi xhind shtrige djall dragua', relation: 'mythic-being contrast', reason: 'The candidates are distinct beings in Albanian folklore and must not be treated as interchangeable.' })

// Animals and body.
review({ targets: 'peshk pate mushkonje mi merimanga kale luan_noun', candidates: 'qen ujk zog dhi dhelpra bretkose', relation: 'animal-kind contrast', reason: 'Each candidate names a different animal.' })
review({ targets: 'plesht morra', candidates: 'mushkonje merimanga bleta flutur', relation: 'small-creature contrast', reason: 'The candidates distinguish different insects or small creatures.' })
review({ targets: 'koke kembe krah_arm mjeker lekure', candidates: 'dore gju sy goje fytyre', relation: 'body-part contrast', reason: 'Each candidate identifies a different body part or body surface.' })
review({ targets: 'krah pende', candidates: 'sqep bisht bri pende', relation: 'animal-body contrast', reason: 'The candidates contrast wing, feather, beak, tail, and horn.' })
review({ targets: 'plage lot', candidates: 'gjak dhimbje zemer fryme', relation: 'body-state contrast', reason: 'The candidates distinguish wound, tears, blood, pain, heart, and breath.' })

// Food, materials, tools, and everyday objects.
review({ targets: 'mish laker kripe kafe miell kungull perime mjalte pije', candidates: 'buke djathe qumesht caj birre ushqim', relation: 'food/drink contrast', reason: 'The candidates denote distinct foods, ingredients, or drinks.' })
review({ targets: 'kashte mermer li lekure pluhur', candidates: 'dru balte hekur barut dylle', relation: 'material contrast', reason: 'The candidates identify different materials or substances.' })
review({ targets: 'pishtar kose kukull liber litar pe karroce kepuce kazan pranga luge peshqir kove plis plumb', candidates: 'qiri thike cekic shkop gershere shishe', relation: 'object/tool contrast', reason: 'The candidates are distinct portable objects, tools, containers, garments, or restraints.' })
review({ targets: 'loja prove pagezim kuror mejdan kurban', candidates: 'dasme feste takim lufte pagezim', relation: 'event/ritual contrast', reason: 'The candidates distinguish games, tests, rites, combat, sacrifice, and social events.' })
review({ targets: 'mbreteri pasuri', candidates: 'para_money ar flori vend nder', relation: 'wealth/domain contrast', reason: 'A kingdom or wealth is distinct from money, gold, coin, place, or honour.' })
review({ targets: 'lajm liber pyetje ide kuptim keshille perralle', candidates: 'fjale histori gjegjeza fakt enderr', relation: 'information/text contrast', reason: 'The candidates distinguish news, books, questions, ideas, meanings, advice, tales, and other information forms.' })

// Abstract nouns and social concepts.
review({ targets: 'jete pune mundim nevoje nder kenaqesi problem menyre lidhje pjese mundesi kujdes pushim lufte mekat', candidates: 'vdekje besim dashuri frike faj shendet', relation: 'abstract-concept contrast', reason: 'The candidates are distinct abstract concepts or conditions rather than synonyms.' })

// Descriptions and states.
review({ targets: 'madh', candidates: 'vogel gjate thelle rende', relation: 'dimension contrast', reason: 'The candidates express different physical dimensions or scales.' })
review({ targets: 'kuq kalter', candidates: 'bardhe zi gjelber verdhe', relation: 'colour contrast', reason: 'Each candidate names a different colour.' })
review({ targets: 'ngrohte', candidates: 'ftohte nxehte fresket lagesht', relation: 'temperature/feel contrast', reason: 'The candidates distinguish warm, cold, hot, fresh-cool, and damp conditions.' })
review({ targets: 'keq', candidates: 'mire bukur sigurt drejte', relation: 'evaluation contrast', reason: 'Bad contrasts with positive, safe, correct, or beautiful evaluations.' })
review({ targets: 'mire', candidates: 'keq semur lodhur gabim', relation: 'wellness/evaluation contrast', reason: 'Well or good contrasts with bad, sick, tired, and wrong.' })
review({ targets: 'mbare', candidates: 'keq gabim shtrember fatkeqesi', relation: 'positive-state contrast', reason: 'Good contrasts with bad, wrong, crooked, and unfortunate states.' })
review({ targets: 'lumtur', candidates: 'keq krenar lodhur semur', relation: 'emotional-state contrast', reason: 'Happy contrasts with bad, proud, tired, and sick states.' })
review({ targets: 'larg', candidates: 'afer ketu prane matane', relation: 'distance contrast', reason: 'Far contrasts with near, here, nearby, and across-side locations.' })
review({ targets: 'lehte', candidates: 'veshtire rende forte ngadale', relation: 'difficulty/weight contrast', reason: 'Easy or light contrasts with difficult, heavy, strong, and slow.' })
review({ targets: 'lodhur', candidates: 'shendoshe zgjuar uritur etur', relation: 'physical-state contrast', reason: 'Tired contrasts with healthy, awake, hungry, and thirsty states.' })
review({ targets: 'njejte', candidates: 'tjeter ndryshe vecante ashtu', relation: 'identity/difference contrast', reason: 'Same contrasts with other, different, distinct, and that-way descriptions.' })
review({ targets: 'krenar', candidates: 'turperuar frikesuar lumtur varfer', relation: 'personal-state contrast', reason: 'Proud contrasts with ashamed, afraid, happy, and poor states.' })
review({ targets: 'lagur', candidates: 'thate paster ngrohte ftohte', relation: 'surface-condition contrast', reason: 'Wet contrasts with dry, clean, warm, and cold.' })
review({ targets: 'kycur mbyllur', candidates: 'hapur lire lagur paster', relation: 'access-state contrast', reason: 'Locked or closed contrasts with open, free, wet, and clean states.' })
review({ targets: 'plot', candidates: 'pak gjysme mjaft shume', relation: 'capacity contrast', reason: 'Full contrasts with little, half, enough, and much.' })

// Motion and location-changing verbs.
review({ targets: 'ik kalo ngjit kthehu largohem nisem leviz', candidates: 'shko vjen zbrit hyr qendroj ndalo', relation: 'movement-action contrast', reason: 'The candidates encode different directions or phases of movement.' })
review({ targets: 'ndalo', candidates: 'vazhdo leviz nisem ik prit', relation: 'motion-phase contrast', reason: 'Stop contrasts with continuing, moving, setting off, leaving, and waiting.' })
review({ targets: 'marto lind', candidates: 'vdes ndahet jeton rritet', relation: 'life-event contrast', reason: 'The candidates denote different life events or changes of state.' })

// Communication, cognition, and social action verbs.
review({ targets: 'kerko lut pershperit pergjigjet premto kendo pyet perserit', candidates: 'thote tregoj degjo shkruaj qaj fol', relation: 'communication-act contrast', reason: 'Each candidate performs a different speech, listening, or communication act.' })
review({ targets: 'meso mendoj kuptoj kujtoj njoh ndiej', candidates: 'di beso harron sheh degjo provo', relation: 'mental/perceptual contrast', reason: 'The candidates distinguish learning, thinking, understanding, remembering, knowing, and feeling.' })
review({ targets: 'ndihmo', candidates: 'ndalo lufto shpeto mashtro mallko', relation: 'social-action contrast', reason: 'Helping contrasts with stopping, fighting, saving, tricking, and cursing.' })
review({ targets: 'marto mallko', candidates: 'bekoj fal premto denoj perqafon', relation: 'interpersonal-act contrast', reason: 'The candidates express different consequential acts toward another person.' })

// Handling, making, and changing things.
review({ targets: 'jep merr mbush mbulon ngul prek kap mban nxjerr mbjell mbledh laj pres paguaj lidh perdor', candidates: 'hap mbyll shtyj terheq heq ve', relation: 'object-action contrast', reason: 'The candidates are distinct physical or transactional actions on an object.' })
review({ targets: 'ndiz', candidates: 'shuaj djeg fik mbulon hap', relation: 'fire/light action contrast', reason: 'Lighting contrasts with extinguishing, burning, covering, or opening.' })
review({ targets: 'ngre', candidates: 'ul shtyj terheq hidh mban', relation: 'force/direction contrast', reason: 'Raising contrasts with lowering, pushing, pulling, throwing, and holding.' })
review({ targets: 'pre', candidates: 'qep lidh thyen shtrydh mbush', relation: 'craft-action contrast', reason: 'Cutting contrasts with sewing, tying, breaking, squeezing, and filling.' })
review({ targets: 'krijoj', candidates: 'prish thyen djeg mbledh perdor', relation: 'creation/destruction contrast', reason: 'Creating contrasts with breaking, destroying, burning, gathering, and using.' })
review({ targets: 'prish', candidates: 'krijoj lidh hap mbyll mbulon', relation: 'damage/action contrast', reason: 'Breaking contrasts with creating, binding, opening, closing, and covering.' })
review({ targets: 'mbyll', candidates: 'hap kycur shtyj terheq mbulon', relation: 'closure action contrast', reason: 'Closing contrasts with opening, locking, pushing, pulling, and covering.' })

// Dynamic states and natural processes.
review({ targets: 'mbaroi mbaroj', candidates: 'filloj vazhdon nisem ndalo', relation: 'event-phase contrast', reason: 'Ending or finishing contrasts with beginning, continuing, setting off, and stopping.' })
review({ targets: 'ndahet perkulet plas', candidates: 'mbetem ndryshon mbaroi filloj mbulon', relation: 'shape/change contrast', reason: 'The candidates name distinct physical changes or contrasting persistence.' })
review({ targets: 'kerce pikon mbyt pikon ngrin lekundet lulezon', candidates: 'bie rrjedh fluturo digjet shkrihet vyshket', relation: 'natural-process contrast', reason: 'The candidates denote different motions or natural processes.' })
review({ targets: 'perqafon', candidates: 'godit shtyj kap largohem ndihmo', relation: 'contact-action contrast', reason: 'Embracing contrasts with striking, pushing, grabbing, leaving, and helping.' })
review({ targets: 'luan', candidates: 'punon fle meso kendo lufto', relation: 'human-activity contrast', reason: 'Playing contrasts with working, sleeping, learning, singing, and fighting.' })
review({ targets: 'punon', candidates: 'luan pushim fle meso nisem', relation: 'human-activity contrast', reason: 'Working contrasts with playing, resting, sleeping, learning, and setting off.' })
review({ targets: 'lufto', candidates: 'ndihmo shpeto ik fal dorezohem', relation: 'conflict-action contrast', reason: 'Fighting contrasts with helping, saving, fleeing, forgiving, and surrendering.' })
review({ targets: 'prit', candidates: 'nisem vazhdo ik kthehu shpejt', relation: 'movement-timing contrast', reason: 'Waiting contrasts with setting off, continuing, leaving, returning, and hurrying.' })
review({ targets: 'pi', candidates: 'ha mbush merr laj pije', relation: 'consumption/action contrast', reason: 'Drinking contrasts with eating, filling, taking, washing, and a beverage noun.' })
review({ targets: 'le', candidates: 'merr mban vendos kthehu kap', relation: 'possession/departure contrast', reason: 'Leaving or letting contrasts with taking, keeping, placing, returning, and catching.' })
review({ targets: 'ngadale', candidates: 'shpejt menjehere qete drejt', relation: 'manner contrast', reason: 'Slowly contrasts with quickly, immediately, calmly, and straight.' })
review({ targets: 'ndryshe', candidates: 'njejte keshtu ashtu pikerisht', relation: 'manner/identity contrast', reason: 'Differently contrasts with the same way, this way, that way, and exactly.' })
review({ targets: 'perdor', candidates: 'ruaj blej shes prish krijoj', relation: 'object-purpose contrast', reason: 'Using contrasts with keeping, buying, selling, breaking, and creating.' })
review({ targets: 'provo', candidates: 'dorezohem ndalo vendos di pres', relation: 'attempt/action contrast', reason: 'Trying contrasts with surrendering, stopping, deciding, knowing, and waiting.' })
review({ targets: 'mashtro', candidates: 'tregoj drejt ndihmo thirr fal', relation: 'social-intent contrast', reason: 'Tricking contrasts with telling, acting honestly, helping, calling, and forgiving.' })
review({ targets: 'kercet', candidates: 'fishkellen pikon rrjedh vezullon lulezon', relation: 'sensory-process contrast', reason: 'Creaking contrasts with whistling, dripping, flowing, shimmering, and blooming.' })
review({ targets: 'pasqyrohet', candidates: 'vezullon shkelqen mungon rrjedh ngrin', relation: 'visible-process contrast', reason: 'Being reflected contrasts with shimmering, shining, being absent, flowing, and freezing.' })
review({ targets: 'ndryshon', candidates: 'mbetem vazhdon filloj mbaroj perserit', relation: 'state-change contrast', reason: 'Changing contrasts with remaining, continuing, starting, ending, and repeating.' })

// Numbers, greetings, and practical language.
review({ targets: 'nente pese kater njezet njeqind peseqind', candidates: 'dy tre gjashte shtate tete dhjete', relation: 'number-value contrast', reason: 'Each candidate has a different exact numerical value.' })
review({ targets: 'mirmengjes mirdita mirembrema natenmire mirupafshim mireseerdhe pershendetje lutem', candidates: 'faleminderit urime tung ckemi hajde', relation: 'social-formula contrast', reason: 'The candidates perform different greetings, farewells, invitations, thanks, wishes, or requests.' })
review({ targets: 'kushton paguaj para_money lek kusur', candidates: 'blej shes fatura lire shtrenjte', relation: 'transaction contrast', reason: 'The candidates distinguish price, payment, money, currency, change, buying, selling, and a bill.' })

// Remaining reviewed I-P senses, kept explicit so range coverage cannot grow
// silently when the dictionary gains another entry.
review({ targets: 'peme lule', candidates: 'bar hardhi zambak pyll laker', relation: 'plant-kind contrast', reason: 'The candidates distinguish a tree or fruit, a flower, grass, vine, lily, forest, and cabbage.' })
review({ targets: 'leng', candidates: 'uje qumesht mjalte pluhur tym', relation: 'substance-state contrast', reason: 'Liquid contrasts with specific drinks, honey, dry dust, and smoke.' })
review({ targets: 'mjegull', candidates: 're shi bore bresher tym', relation: 'weather/air contrast', reason: 'Mist contrasts with cloud, rain, snow, hail, and smoke.' })
review({ targets: 'kemishe plis', candidates: 'rrobe kepuce shami xhublete cante', relation: 'clothing contrast', reason: 'The candidates denote different garments, footwear, headwear, or carried apparel.' })
review({ targets: 'lahute kenge', candidates: 'ze valle gjegjeza qaj fishkellen', relation: 'music/performance contrast', reason: 'The candidates distinguish an instrument, song, voice, dance, riddle, weeping, and whistling.' })
review({ targets: 'mend', candidates: 'zemer koke ide dije kuptim', relation: 'mind/concept contrast', reason: 'Mind contrasts with heart, head, idea, knowledge, and meaning.' })
review({ targets: 'lloj', candidates: 'pjese menyre gje rast ide', relation: 'classification contrast', reason: 'Kind contrasts with part, way, thing, case, and idea.' })
review({ targets: 'mije', candidates: 'njeqind peseqind dyqind dhjete zero', relation: 'number-value contrast', reason: 'Each candidate has a different exact numerical value.' })
review({ targets: 'mjek ilac', candidates: 'sherues dhimbje fashe sapun pushim', relation: 'health-care contrast', reason: 'The candidates distinguish a practitioner, medicine, symptom, dressing, hygiene item, and rest.' })
review({ targets: 'pranvere', candidates: 'vere vjeshte dimer muaj vit', relation: 'season contrast', reason: 'Spring contrasts with the other seasons and with broader calendar units.' })
review({ targets: 'kanal', candidates: 'lume krua pus liqen hendek', relation: 'waterway contrast', reason: 'A canal contrasts with a river, spring, well, lake, and ditch.' })
review({ targets: 'kurbet', candidates: 'pune shtepi familje pushim takim', relation: 'life-situation contrast', reason: 'Working away from home contrasts with local work, home, family, rest, and a meeting.' })
review({ targets: 'premte', candidates: 'dje neser jave muaj vit', relation: 'calendar contrast', reason: 'Friday contrasts with relative days and broader calendar units.' })
review({ targets: 'lire', candidates: 'shtrenjte kushton para_money kusur fatura', relation: 'price contrast', reason: 'Cheap contrasts with expensive, costing, money, change, and a bill.' })
review({ targets: 'nxehte', candidates: 'ftohte ngrohte fresket lagesht', relation: 'temperature contrast', reason: 'Hot contrasts with cold, warm, pleasantly cool, and damp.' })
review({ targets: 'paster', candidates: 'lagur pluhur mjegull tym balte', relation: 'cleanliness/clarity contrast', reason: 'Clean or clear contrasts with wet, dusty, misty, smoky, and muddy conditions.' })
review({ targets: 'lagesht', candidates: 'thate lagur paster nxehte ftohte', relation: 'moisture contrast', reason: 'Damp contrasts with dry, wet, clean, hot, and cold.' })
review({ targets: 'mrekullueshem', candidates: 'tmerrshem qesharak cuditshem keq mire', relation: 'evaluation contrast', reason: 'Wonderful contrasts with terrible, ridiculous, strange, bad, and merely good evaluations.' })
review({ targets: 'jeto', candidates: 'vdes lind punon fle ndalo', relation: 'life/activity contrast', reason: 'Living contrasts with dying, being born, working, sleeping, and stopping.' })
review({ targets: 'ndodh mbetem', candidates: 'ndryshon mbaroj filloj vazhdon mungon', relation: 'event/state contrast', reason: 'Happening or remaining contrasts with changing, ending, beginning, continuing, and being absent.' })
review({ targets: 'lejoj', candidates: 'ndalohet duhet ndalo ndihmo kerko', relation: 'permission/action contrast', reason: 'Allowing contrasts with prohibition, obligation, stopping, help, and requesting.' })
review({ targets: 'ndalohet', candidates: 'lejoj duhet mund hapur mbyllur', relation: 'rule/permission contrast', reason: 'Being forbidden contrasts with being allowed, required, possible, open, and closed.' })
review({ targets: 'mplaket', candidates: 'lind vdes ndryshon lulezon ngre', relation: 'life-change contrast', reason: 'Growing old contrasts with birth, death, general change, blooming, and raising.' })
review({ targets: 'lan', candidates: 'laj mbush mbulon prek thyen', relation: 'cleaning/action contrast', reason: 'Washes contrasts with filling, covering, touching, and breaking.' })
review({ targets: 'leh kafshon', candidates: 'vrapo fle luan sulmo pi', relation: 'animal-action contrast', reason: 'Barking or biting contrasts with running, sleeping, playing, attacking, and drinking.' })
review({ targets: 'pergjithmone', candidates: 'kurre ndonjehere sot neser me_vone', relation: 'duration/frequency contrast', reason: 'Forever contrasts with never, sometimes, today, tomorrow, and later.' })
review({ targets: 'kurre', candidates: 'gjithmone ndonjehere tani neser perseri', relation: 'frequency contrast', reason: 'Never contrasts with always, sometimes, now, tomorrow, and again.' })
review({ targets: 'keshtu', candidates: 'ashtu ndryshe njejte drejt ngadale', relation: 'manner/deixis contrast', reason: 'Like this contrasts with like that, differently, the same, straight, and slowly.' })
review({ targets: 'pari', candidates: 'edyta tjeter pastaj mepare tani', relation: 'order contrast', reason: 'First contrasts with second, another, then, before, and now.' })
review({ targets: 'pervec', candidates: 'bashke me pa kunder mes', relation: 'inclusion/relation contrast', reason: 'Except contrasts with together, with, without, against, and among.' })
review({ targets: 'kudo', candidates: 'ketu atje diku jashte larg', relation: 'place-extent contrast', reason: 'Everywhere contrasts with here, there, somewhere, outside, and far away.' })

// Safe explicit N/A dispositions for forms whose hard alternatives require an
// authored sentence or specialist register cue rather than a bare word task.
notApplicable('krajl', 'The historical title overlaps king-like meanings; it needs a lore/context contrast, not a bare lexical hard distractor.')
notApplicable('nese', 'Conditional nëse must be tested in a complete clause; bare connector alternatives can also be grammatical.')
notApplicable('ndersa', 'Ndërsa needs a two-clause context because several connectors can form valid sentences.')
notApplicable('perkulet', 'The inflected verb needs an authored subject and situation before close verb alternatives are safely wrong.')
notApplicable('pershperit', 'The inflected speech verb needs an audible or sentence context before close communication alternatives are safely wrong.')
notApplicable('pergjigjet', 'The inflected response verb needs a question-and-answer context before close speech alternatives are safely wrong.')
notApplicable('marto', 'This inflected/reflexive life-event sense needs a complete subject context for a hard contrast.')
notApplicable('mallko', 'This inflected curse sense needs an authored interpersonal context for a hard contrast.')
notApplicable('krenar', 'Proud is context-sensitive and its near emotional adjectives are not categorical opposites in isolation.')
notApplicable('lind', 'The dictionary sense deliberately covers birth and rising; hard lexical foils require the exact authored context.')
notApplicable('perendi', 'God/deity is a broad religious title; close mythic-being alternatives require a lore context.')
notApplicable('mashallah', 'This pragmatic formula requires a social situation; bare interjections do not safely identify its use.')
notApplicable('mjeri', 'This idiomatic lament must be recognised in a complete utterance, not against bare interjections.')
notApplicable('o', 'Vocative o has no independent lexical translation and must be tested in an addressed utterance.')
notApplicable('ma ia', 'Clitic clusters require a complete clause; bare pronoun choices cannot safely identify their grammatical role.')
notApplicable('pasi', 'Pasi has temporal and causal clause uses; a hard distinction requires the authored clause.')
notApplicable('piqet', 'This deliberately proverb-specific sense should only be tested inside its reviewed proverb context.')
notApplicable('kot', 'Kot changes force with the action it modifies; the reviewed speaking context distinguishes pointless or nonsensical talk from ordinary manner adverbs.')
notApplicable('kushedi', 'Kushedi is a complete uncertainty formula whose force comes from the unanswered question that follows, not from a safe bare lexical opposition.')
notApplicable('normal_response', 'Standalone conversational normal is an informal affirmative response; its reviewed promise context keeps it distinct from the ordinary adjective and standard synonyms.')

export const HARD_CONTRAST_REVIEWS_I_P = Object.freeze(registry)
