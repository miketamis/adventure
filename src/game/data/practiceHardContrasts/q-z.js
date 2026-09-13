import { DICT } from '../../dictionary.js'
import { isTrainableSense } from '../../lexicalTrainability.js'
import { sensesMayShareAnswer } from '../../practiceAnswerValidity.js'

// Editorial hard lexical contrasts for canonical dictionary ids Q-Z.
//
// These rows describe useful confusions, not globally valid answer banks. The
// runtime planner must still check the exact activity context, answer validity,
// and the learner's evidence before presenting any candidate. Forms whose job
// cannot be identified safely from a bare English cue are explicitly kept for
// authored contextual practice.

const ids = (value) => value.trim().split(/\s+/u).filter(Boolean)
const registry = {}

const review = ({ targets, candidates, relation, reason }) => {
  const candidateIds = ids(candidates)
  for (const targetId of ids(targets)) {
    if (!DICT[targetId] || !isTrainableSense(targetId)) continue
    const prior = registry[targetId]?.status === 'reviewed' ? registry[targetId].contrasts : []
    const additions = candidateIds
      .filter((candidateId) => (
        candidateId !== targetId &&
        DICT[candidateId] &&
        isTrainableSense(candidateId) &&
        !sensesMayShareAnswer(targetId, candidateId)
      ))
      .map((candidateId) => Object.freeze({ candidateId, relation, reason }))
    const seen = new Set()
    const contrasts = [...prior, ...additions]
      .filter(({ candidateId }) => !seen.has(candidateId) && seen.add(candidateId))
      .slice(0, 6)
    registry[targetId] = Object.freeze({ status: 'reviewed', contrasts: Object.freeze(contrasts) })
  }
}

const contextOnly = (targets, reason) => {
  for (const targetId of ids(targets)) {
    registry[targetId] = Object.freeze({ status: 'context-only', reason })
  }
}

// People, relationships, identity, and person reference.
review({ targets: 'vajze', candidates: 'djale grua burre femije plake mike', relation: 'person-kind contrast', reason: 'Each candidate names a different age, gender, or social category of person.' })
review({ targets: 'vella', candidates: 'motra baba nene teto bir bije', relation: 'family-role contrast', reason: 'Each candidate names a different family relationship.' })
review({ targets: 'teto', candidates: 'nene motra gjyshe mama njerke nuse', relation: 'family-role contrast', reason: 'Auntie is distinct from mother, sister, grandmother, stepmother, and bride.' })
review({ targets: 'sherbetore sherues tabak tregtar roje udhetar', candidates: 'mjek mesues bari polici prift mjeshter', relation: 'occupation-or-role contrast', reason: 'Each candidate names a different occupation or social role.' })
review({ targets: 'trim', candidates: 'frikacak mbret princ luftetar roje udhetar', relation: 'person-role contrast', reason: 'A brave hero is distinct from a coward, ruler, soldier, guard, or traveller.' })
review({ targets: 'shok', candidates: 'armik mik zoteri tregtar prind udhetar', relation: 'social-relationship contrast', reason: 'A male friend or companion has a different relationship from each candidate.' })
review({ targets: 'zoteri zonje', candidates: 'djale vajze femije mik sherbetore tregtar', relation: 'address-and-person contrast', reason: 'The adult title or form of address differs from the other person descriptions.' })
review({ targets: 'shqiptar', candidates: 'udhetar tregtar bari mbret mik i_huaj', relation: 'identity contrast', reason: 'Nationality is distinct from occupation, rank, relationship, or foreignness.' })

// Pronouns and possessive forms with genuinely different person or number.
review({ targets: 'ti une', candidates: 'ai ajo ne_pron ju ata ato', relation: 'personal-pronoun contrast', reason: 'Each option identifies a different grammatical person, gender, or number.' })
review({ targets: 'tij saj tyre', candidates: 'im yt yne juaj', relation: 'possessor contrast', reason: 'Each possessive points to a different possessor or number.' })
review({ targets: 'yt tuaj tone tona yne', candidates: 'im tij saj tyre juaj', relation: 'possessor contrast', reason: 'Each possessive contrasts the person, gender, or number of the possessor.' })
review({ targets: 'vete', candidates: 'une ti ai ajo ata dikush', relation: 'reference contrast', reason: 'The reflexive self-reference is distinct from an ordinary personal or indefinite pronoun.' })

// Animals and animal anatomy.
review({ targets: 'ujk qen tiger qengj zog shqiponje sokol', candidates: 'dhelpra dhi kale gjel breshka gjarper luan_noun', relation: 'animal-kind contrast', reason: 'Each candidate names a different animal species.' })
review({ targets: 'vitore', candidates: 'gjarper ujk dhelpra dragua kulshedra bolla', relation: 'animal-or-mythic-kind contrast', reason: 'The household guardian serpent is distinct from ordinary animals and other mythic beings.' })
review({ targets: 'sqep', candidates: 'bisht bri krah pende kembe lekure', relation: 'animal-body-part contrast', reason: 'Each candidate names a different visible part of an animal.' })

// Albanian folklore beings.
review({ targets: 'zane shtojzovalle stihi shtrige xhind verbti', candidates: 'dragua kulshedra bolla ora peri lugat', relation: 'Albanian-lore-being contrast', reason: 'Each candidate is a distinct being or title in Albanian folklore, not another name for the target.' })

// Places, buildings, routes, and built features.
review({ targets: 'rruge udhe udhekryq ure shesh qoshe vrime', candidates: 'shteg hyrje dalje porte prag gardh hendek', relation: 'route-or-spatial-feature contrast', reason: 'Each candidate names a different route, junction, opening, boundary, or spatial feature.' })
review({ targets: 'shtepi shkolle restorant xhami teqe', candidates: 'dyqan han hotel kishe kafene bujtine', relation: 'building-function contrast', reason: 'Each candidate names a building or venue with a different ordinary or religious function.' })
review({ targets: 'shpelle', candidates: 'pyll mal fushe lume liqen det zgaver', relation: 'landscape-place contrast', reason: 'A cave is a different natural place from each landscape candidate.' })
review({ targets: 'qytet vend treg', candidates: 'fshat shesh dyqan rruge shkolle kala', relation: 'settlement-or-public-place contrast', reason: 'Each candidate identifies a different scale or function of inhabited place.' })
review({ targets: 'toke', candidates: 'qiell det lume mal fushe rruge', relation: 'large-scale-place contrast', reason: 'Ground or land is distinct from sky, water, terrain, and a constructed route.' })

// Weather, sky, seasons, and natural light.
review({ targets: 'shi stuhi rrufe re vese', candidates: 'bore ere_wind mjegull acar bubullime ylber', relation: 'weather-phenomenon contrast', reason: 'Each candidate names a different weather condition or atmospheric phenomenon.' })
review({ targets: 'qiell yll ylber', candidates: 'hene diell re rrufe drite rreze', relation: 'sky-object-or-light contrast', reason: 'Each candidate names a different visible sky object, light, or atmospheric event.' })
review({ targets: 'rreze', candidates: 'drite hije flake tym yll ylber', relation: 'light-phenomenon contrast', reason: 'A ray is distinct from general light, shadow, flame, smoke, star, and rainbow.' })
review({ targets: 'vere vjeshte', candidates: 'pranvere dimer muaj vit dite', relation: 'season-and-calendar contrast', reason: 'Each option denotes a different season or unit of calendar time.' })
review({ targets: 'sot sonte tani vone tashme', candidates: 'dje neser mengjes mbreme menjehere mepare', relation: 'time-reference contrast', reason: 'Each candidate locates an event at a different day, time, or temporal relation.' })
review({ targets: 'vit takim rast', candidates: 'muaj jave dite ore moment here', relation: 'time-or-occasion contrast', reason: 'A year, meeting, or occasion differs from the other time spans and event references.' })

// Foods, drinks, and kitchen or table objects.
review({ targets: 'uje qumesht raki', candidates: 'caj kafe birre leng vere_wine pije', relation: 'drink contrast', reason: 'Each candidate names a different everyday drink.' })
review({ targets: 'ushqim', candidates: 'buke mish djathe perime frut embelsire', relation: 'food-category contrast', reason: 'The general category food is distinct from each particular food or ingredient.' })
review({ targets: 'shishe', candidates: 'gote filxhan kove shtambe pjate tenxhere', relation: 'container-or-vessel contrast', reason: 'Each candidate is a different container, drinking vessel, or serving object.' })
review({ targets: 'sofer', candidates: 'tavoline karrige shtrat dollap pjate tenxhere', relation: 'household-furnishing contrast', reason: 'A low dining table is distinct from other furniture, vessels, and kitchen objects.' })

// Clothing, carried objects, tools, and household things.
review({ targets: 'rrobe rroba shami xhublete', candidates: 'kemishe fund pantallona pallto kapelë kepuce', relation: 'clothing contrast', reason: 'Each candidate names a different garment or category of clothing.' })
review({ targets: 'qilim', candidates: 'batanije perde jastek carcaf rrobe shami', relation: 'textile-object contrast', reason: 'A rug is distinct from bedding, curtains, clothes, and other fabric objects.' })
review({ targets: 'samar', candidates: 'shalë karroce litar thes cante kove', relation: 'carrying-or-travel-object contrast', reason: 'A packsaddle differs from a saddle, cart, rope, sack, bag, and bucket.' })
review({ targets: 'sapun', candidates: 'peshqir furce uje shampo legen fshese', relation: 'washing-object contrast', reason: 'Soap is distinct from the other objects and materials used for washing or cleaning.' })
review({ targets: 'shkop thuper', candidates: 'litar cekic lopate furke kose thike', relation: 'handheld-object contrast', reason: 'Each candidate is a different handheld tool, implement, or flexible switch.' })
review({ targets: 'shpate thike top', candidates: 'arme pushke cekic shkop barut mburoje', relation: 'weapon-or-combat-object contrast', reason: 'Each candidate has a different combat form or practical function.' })
review({ targets: 'qiri', candidates: 'pishtar cakmak shkrepse fitil llambe zjarr', relation: 'light-or-ignition-object contrast', reason: 'A candle differs from the source, component, or device used to make light or fire.' })
review({ targets: 'zjarr tym', candidates: 'flake drite qiri pishtar avull hi', relation: 'fire-and-combustion contrast', reason: 'Fire and smoke are distinct from flame, light, an illumination object, vapour, and ash.' })
review({ targets: 'vatra', candidates: 'furre oxhak sobe zjarr sofer oborr', relation: 'hearth-or-house-feature contrast', reason: 'A hearth is distinct from an oven, chimney, stove, fire itself, dining table, and courtyard.' })
review({ targets: 'thes shporte', candidates: 'cante kove shishe kuti valixhe qese', relation: 'portable-container contrast', reason: 'Each candidate is a different type of portable container.' })
review({ targets: 'unaze', candidates: 'varëse byzylyk kurorë monedhe celes ore', relation: 'small-worn-object contrast', reason: 'A ring differs from the other jewellery, money, key, and timepiece objects.' })
review({ targets: 'thesar', candidates: 'pasuri ar argjend flori para_money monedhe', relation: 'valuable-thing contrast', reason: 'Treasure is distinct from wealth as a concept and particular metals or money.' })

// Body parts, health, sensation, and human conditions.
review({ targets: 'sy thua zemer trup', candidates: 'koke dore kembe goje fytyre gju', relation: 'body-part contrast', reason: 'Each candidate names a different body part or the body as a whole.' })
review({ targets: 'ze zhurme', candidates: 'heshtje kenge zile trokitje fishkellime fryme', relation: 'sound contrast', reason: 'A voice or noise is distinct from silence and from other identifiable sounds.' })
review({ targets: 'shendet rrezik shpetim vdekje', candidates: 'semundje plage dhimbje jete siguri frike', relation: 'health-or-survival-concept contrast', reason: 'Each candidate denotes a different condition, danger, rescue, life, or bodily harm.' })
review({ targets: 'uritur semur shendoshe zgjuar qete', candidates: 'etur lodhur ftohte nxehte frikesuar lumtur', relation: 'physical-or-emotional-state contrast', reason: 'Each candidate describes a different bodily or emotional state.' })
review({ targets: 'skuqem shqetesohem', candidates: 'qesh qaj frikesohem gezohem zemerohen lodhem', relation: 'experienced-reaction contrast', reason: 'Blushing or worrying is a different bodily or emotional reaction from each candidate.' })

// Colours, dimensions, qualities, and evaluations.
review({ targets: 'zi verdhe', candidates: 'bardhe kuq gjelber kalter arte erret', relation: 'colour contrast', reason: 'Each candidate names a different colour or colour quality.' })
review({ targets: 'vogel thelle shtrember', candidates: 'madh gjate shkurter larte drejte gjere', relation: 'dimension-or-shape contrast', reason: 'Each adjective describes a different size, depth, direction, or shape.' })
review({ targets: 'thate', candidates: 'lagur njome ftohte ngrohte paster piste', relation: 'surface-condition contrast', reason: 'Dry contrasts with wetness, freshness, temperature, and cleanliness states.' })
review({ targets: 'sane', candidates: 'kashte bar dru miell drithe ushqim', relation: 'farm-material contrast', reason: 'Hay is distinct from straw, grass, wood, flour, grain, and food as a general category.' })
review({ targets: 'sigurt', candidates: 'rrezikshem pasigurt humbur frikesuar semur gabim', relation: 'safety-state contrast', reason: 'Safe differs from dangerous, uncertain, lost, frightened, sick, and wrong.' })
review({ targets: 'varfer shtrenjte', candidates: 'pasur lire kushtueshem boll lire_adv', relation: 'money-and-value contrast', reason: 'Poverty or high price differs from wealth, cheapness, abundance, and freedom.' })
review({ targets: 'shenjte', candidates: 'zakonshem i_keq i_mire mallkuar huaj vjeter', relation: 'status-or-evaluation contrast', reason: 'Holy is distinct from ordinary, moral, cursed, foreign, and old qualities.' })
review({ targets: 'rende veshtire rendesishem rendesi', candidates: 'lehte thjeshte vogel parendesishem qarte sakte', relation: 'difficulty-weight-or-importance contrast', reason: 'The target meaning differs from ease, simplicity, size, clarity, and correctness.' })
review({ targets: 'vjeter ri', candidates: 'i_ri lashte modern i_vjeter i_moshuar i_vogel', relation: 'age-or-newness contrast', reason: 'Old, new, or young must be distinguished from other age and newness descriptions.' })
review({ targets: 'vertete vertet sigurisht sakte qarte seriozisht tamam', candidates: 'gabim ndoshta mbase afersisht paqartë shaka', relation: 'truth-certainty-or-precision contrast', reason: 'The target differs from error, uncertainty, approximation, lack of clarity, and joking.' })
review({ targets: 'qesharak tmerrshem vecante', candidates: 'serioz bukur zakonshem merzitshem frikshem mire', relation: 'evaluation-quality contrast', reason: 'Funny, terrible, or special differs from each candidate evaluation or quality.' })
review({ targets: 'verber', candidates: 'shurdher memec zgjuar semur shendoshe i_hapur', relation: 'human-condition contrast', reason: 'Blind is distinct from other sensory, health, awareness, and access states.' })

// Quantities and exact numbers.
review({ targets: 'tre shtate tete tridhjete treqind teteqind zero', candidates: 'nje dy kater pese gjashte nente dhjete njeqind', relation: 'exact-number contrast', reason: 'Each candidate has a different exact numerical value.' })
review({ targets: 'shume teper', candidates: 'pak mjaft ca asgje gjysme pothuajse', relation: 'quantity-or-degree contrast', reason: 'The candidates express different amounts, limits, or degrees.' })
review({ targets: 'tere', candidates: 'gjysme pjese pak disa asnje dyfish', relation: 'whole-versus-part contrast', reason: 'Whole contrasts with halves, parts, limited quantities, absence, and multiplication.' })
review({ targets: 'sa', candidates: 'ku kush kur pse si cfare', relation: 'question-word contrast', reason: 'Each candidate asks for a different kind of information.' })

// Movement, position, and travel actions.
review({ targets: 'shko vjen zbrit vrapo zhytet', candidates: 'ec hip hyr dil kthehu qendroj', relation: 'movement-direction contrast', reason: 'Each candidate expresses a different direction, manner, or phase of movement.' })
review({ targets: 'rri qendroj ulu shtrihet', candidates: 'ngrihu ec vrapo ik hyr zbrit', relation: 'posture-or-location-action contrast', reason: 'Staying, standing, sitting, and lying differ from the movement alternatives.' })
review({ targets: 'zgjohu', candidates: 'fle ulu shtrihu pusho rri ik', relation: 'wake-and-rest contrast', reason: 'Waking is distinct from sleeping, sitting, lying down, resting, staying, and leaving.' })
review({ targets: 'shoqeron', candidates: 'ndjek largohet braktis pret dergon takohet', relation: 'social-movement contrast', reason: 'Accompanying or escorting differs from following, leaving, waiting, sending, and meeting.' })
review({ targets: 'takohem', candidates: 'ndahem largohem pres shoqeroj ndjek njoh', relation: 'encounter-action contrast', reason: 'Meeting differs from parting, leaving, waiting, accompanying, following, and knowing.' })

// Speech, perception, cognition, and social interaction.
review({ targets: 'sheh shiko', candidates: 'degjo prek nuhat shijoj kerko gjej', relation: 'perception-or-attention contrast', reason: 'Seeing or looking differs from the other sensory and search actions.' })
review({ targets: 'thote thirr tregoj shkruaj', candidates: 'degjo pyes pergjigjet pershperit hesht lexoj', relation: 'communication-action contrast', reason: 'Each candidate performs a different speaking, listening, or writing action.' })
review({ targets: 'quhem', candidates: 'jam kam vij rri punoj jetoj', relation: 'identity-statement contrast', reason: 'Being called a name differs from being, having, coming, staying, working, and living.' })
review({ targets: 'qesh qaj vajto', candidates: 'buzeqesh bertet kendon hesht gezohem zemerohem', relation: 'vocal-or-emotional-action contrast', reason: 'Laughing, crying, and mourning differ from the other vocal and emotional acts.' })
review({ targets: 'shaka', candidates: 'lajm pyetje pergjigje keshille genjeshter histori', relation: 'utterance-or-information contrast', reason: 'A joke is distinct from news, a question, an answer, advice, a lie, and a story.' })
review({ targets: 'shpresoj', candidates: 'besoj di mendoj kujtoj dyshoj harroj', relation: 'mental-attitude contrast', reason: 'Hoping differs from believing, knowing, thinking, remembering, doubting, and forgetting.' })
review({ targets: 'zgjedh vendos', candidates: 'pranoj refuzoj pyes pres provoj harroj', relation: 'decision-action contrast', reason: 'Choosing or deciding differs from accepting, refusing, asking, waiting, trying, and forgetting.' })
review({ targets: 'tremb', candidates: 'qetesoj gezoj ndihmo paralajmeroj sulmo shpeto', relation: 'interpersonal-effect contrast', reason: 'Frightening differs from calming, pleasing, helping, warning, attacking, and saving.' })
review({ targets: 'urdhero tung urime', candidates: 'faleminderit pershendetje mirupafshim lutem ckemi hajde', relation: 'social-formula contrast', reason: 'Each formula performs a different greeting, thanks, request, welcome, wish, or handover.' })
review({ targets: 'qetesohu', candidates: 'zgjohu nxito ndalo ulu vazhdo prit', relation: 'imperative-action contrast', reason: 'Calm down differs from waking, hurrying, stopping, sitting, continuing, and waiting.' })

// Handling, craft, force, and object-change actions.
review({ targets: 'qep tjerr shtrydh', candidates: 'pre lidh thye mbush laj gatuaj', relation: 'making-or-handling-action contrast', reason: 'Sewing, spinning, and squeezing differ from the other craft and object-handling actions.' })
review({ targets: 'sjell ve', candidates: 'merr jep dergon con heq mban', relation: 'transfer-or-placement contrast', reason: 'Bringing or putting differs from taking, giving, sending, removing, and holding.' })
review({ targets: 'shtyj terheq tund ul', candidates: 'ngre mbaj hidh kap prek rrotulloj', relation: 'force-and-direction contrast', reason: 'Each action applies a different direction or kind of physical force.' })
review({ targets: 'rrethoj', candidates: 'hap mbyll lidh ndaj mbulon largon', relation: 'spatial-manipulation contrast', reason: 'Surrounding differs from opening, closing, tying, dividing, covering, and removing.' })
review({ targets: 'varros', candidates: 'nxjerr ngre hap mbulon djeg hedh', relation: 'placement-and-disposal contrast', reason: 'Burying differs from taking out, lifting, opening, covering, burning, and throwing.' })
review({ targets: 'vesh', candidates: 'zhvesh laj qep mbaj heq blej', relation: 'clothing-action contrast', reason: 'Putting on clothes differs from undressing, washing, sewing, holding, removing, and buying.' })

// Conflict, protection, life events, and fire actions.
review({ targets: 'ruan sulmo vrit shpeto', candidates: 'ndihmo mbroj lufto ik dorezohem denoj', relation: 'conflict-or-protection-action contrast', reason: 'Guarding, attacking, killing, and saving are distinct conflict or protection actions.' })
review({ targets: 'varr', candidates: 'shpelle vrime pus hendek kopsht varrezë', relation: 'burial-place contrast', reason: 'A grave is distinct from a cave, hole, well, ditch, garden, and cemetery as a larger place.' })
review({ targets: 'vdes semure', candidates: 'jeton sherohet lind rritet zgjohet pushon', relation: 'life-or-health-event contrast', reason: 'Dying or becoming sick differs from living, healing, birth, growth, waking, and resting.' })
review({ targets: 'verbo', candidates: 'shikon sheron zgjon tremb vret ndihmon', relation: 'bodily-effect action contrast', reason: 'Blinding differs from seeing, healing, waking, frightening, killing, and helping.' })
review({ targets: 'shuaj shkimet', candidates: 'ndiz digjet flakeron tymos shkelqen ngroh', relation: 'fire-state contrast', reason: 'Extinguishing differs from lighting, burning, flaming, smoking, shining, and warming.' })

// Natural motion, visible change, and event phases.
review({ targets: 'troket', candidates: 'fishkellen bertet kercet pikon kumbon hesht', relation: 'sound-producing-action contrast', reason: 'Knocking differs from whistling, shouting, creaking, dripping, ringing, and silence.' })
review({ targets: 'rrjedh rreshqet zhytet', candidates: 'pikon bie noton ngrin shkrihet ngjitet', relation: 'water-or-motion-process contrast', reason: 'Flowing, slipping, and diving differ from the other directions and physical processes.' })
review({ targets: 'thyhet thyen shembet', candidates: 'nderton rregullon hapet mbyllet perkulet zgjatet', relation: 'breakage-or-structure-change contrast', reason: 'Breaking or collapsing differs from building, repairing, opening, closing, bending, and stretching.' })
review({ targets: 'varen', candidates: 'qendrojne bien ngrihen shtrihen levizin zhduken', relation: 'position-or-motion-state contrast', reason: 'Hanging differs from standing, falling, rising, lying, moving, and disappearing.' })
review({ targets: 'shkelqen vezullon', candidates: 'erresohet shuhet digjet tymos pasqyrohet zbardh', relation: 'visible-light-process contrast', reason: 'Shining or shimmering differs from darkening, extinguishing, burning, smoking, reflecting, and whitening.' })
review({ targets: 'shkrihet', candidates: 'ngrin digjet thahet laget thyhet avullon', relation: 'material-state-change contrast', reason: 'Melting or thawing differs from freezing, burning, drying, wetting, breaking, and evaporating.' })
review({ targets: 'vyshket', candidates: 'lulezon rritet gjelberon thahet laget mbillet', relation: 'plant-state-change contrast', reason: 'Withering differs from flowering, growing, greening, drying, wetting, and being planted.' })
review({ targets: 'zbardh', candidates: 'erresohet nxihet skuqet zverdhet gjelberon shuhet', relation: 'colour-or-light-change contrast', reason: 'Turning white or bright differs from darkening and the other colour or light changes.' })
review({ targets: 'qetesohet', candidates: 'zemerohet trembet shqetesohet zgjohet nxiton bertet', relation: 'state-change contrast', reason: 'Calming down differs from becoming angry, afraid, worried, awake, hurried, or loud.' })
review({ targets: 'vazhdon vazhdo', candidates: 'ndalo mbaron fillon kthehu prit ik', relation: 'event-phase contrast', reason: 'Continuing differs from stopping, ending, beginning, returning, waiting, and leaving.' })
review({ targets: 'vonon', candidates: 'nxiton arrin nisem pret vazhdon mbaron', relation: 'timing-action contrast', reason: 'Delaying differs from hurrying, arriving, setting off, waiting, continuing, and finishing.' })
review({ targets: 'vonohem', candidates: 'arrij nisem nxitoj pres qendroj kthehem', relation: 'personal-timing-action contrast', reason: 'Being late differs from arriving, setting off, hurrying, waiting, staying, and returning.' })
review({ targets: 'rron', candidates: 'vdes lind fle punon udheton mbijeton', relation: 'life-state contrast', reason: 'Living differs from dying, being born, sleeping, working, travelling, and surviving.' })
review({ targets: 'trashegohet', candidates: 'blihet shitet dhurohet humbet vidhet fitohet', relation: 'possession-transfer contrast', reason: 'Being inherited differs from being bought, sold, gifted, lost, stolen, or won.' })

// Abstract concepts, feelings, events, and social objects.
review({ targets: 'vajtim zili telashe', candidates: 'gezim dashuri frike problem shprese paqe', relation: 'feeling-or-difficulty contrast', reason: 'Lament, envy, and trouble differ from the other emotions and life conditions.' })
review({ targets: 'shpirt', candidates: 'trup zemer mendje fryme ze hije', relation: 'personhood-or-inner-life contrast', reason: 'Spirit or soul is distinct from body, heart, mind, breath, voice, and shadow.' })
review({ targets: 'rregull', candidates: 'problem gabim kaos ligj zakon marreveshje', relation: 'order-or-agreement contrast', reason: 'Order or an all-right state differs from a problem, mistake, chaos, law, custom, or agreement.' })
review({ targets: 'shenje', candidates: 'fjale harte lajm gjurme rregull simbol', relation: 'information-or-mark contrast', reason: 'A sign or mark is distinct from a word, map, news item, trace, rule, and symbol.' })
review({ targets: 'valle', candidates: 'kenge loje dasme feste beteje takim', relation: 'performance-or-event contrast', reason: 'A round-dance is distinct from a song, game, wedding, festival, battle, and meeting.' })
review({ targets: 'zambak', candidates: 'trendafil lule bar peme lis molle', relation: 'plant-kind contrast', reason: 'A lily is distinct from a rose, flower as a category, grass, tree, oak, and apple.' })
review({ targets: 'zot', candidates: 'perendi mbret prift hoxha zoteri djall', relation: 'religious-or-authority-title contrast', reason: 'Lord or God is distinct from deity as a class, king, cleric, gentleman, and devil.' })
review({ targets: 'shtrat', candidates: 'karrige tavoline sofer dollap djep batanije', relation: 'furniture-or-bedding contrast', reason: 'A bed is distinct from seating, tables, storage furniture, a cradle, and a blanket.' })
review({ targets: 'shes', candidates: 'blej paguaj jap marr kushton porosis', relation: 'transaction-action contrast', reason: 'Selling differs from buying, paying, giving, taking, costing, and ordering.' })
review({ targets: 'telashe', candidates: 'zgjidhje ndihme fat qetesi pune takim', relation: 'problem-situation contrast', reason: 'Trouble differs from a solution, help, luck, calm, work, and a meeting.' })

// Supplemental reviewed neighbours use only canonical senses present in the
// current dictionary. They complete sparse fields without inventing forms.
review({ targets: 'sofer', candidates: 'shtrat djep batanije pjate tenxhere furre', relation: 'household-furnishing contrast', reason: 'A low dining table is distinct from a bed, cradle, blanket, plate, pot, and oven.' })
review({ targets: 'sapun', candidates: 'peshqir uje kove shishe fasha furce', relation: 'washing-object contrast', reason: 'Soap is distinct from water, a towel, bucket, bottle, bandage, and brush.' })
review({ targets: 'unaze', candidates: 'celes ore monedhe cakmak gjilpere bilete', relation: 'small-portable-object contrast', reason: 'A ring is distinct from a key, clock, coin, lighter, needle, and ticket.' })
review({ targets: 'ze zhurme', candidates: 'kenge fryme drite ere_smell shije fishkellen', relation: 'sound-or-sense contrast', reason: 'Voice or noise differs from song, breath, light, smell, taste, and whistling.' })
review({ targets: 'sigurt', candidates: 'semur gabim rrezik veshtire keq lodhur', relation: 'condition-and-evaluation contrast', reason: 'Safe differs from sickness, error, danger, difficulty, badness, and tiredness.' })
review({ targets: 'varfer shtrenjte', candidates: 'lire pasuri shume pak ar kusur', relation: 'money-and-value contrast', reason: 'Poverty or expense differs from cheapness, wealth, quantity, gold, and change.' })
review({ targets: 'shenjte', candidates: 'huaj vjeter keq mire erret eger', relation: 'status-or-evaluation contrast', reason: 'Holy is distinct from foreignness, age, moral evaluation, darkness, and wildness.' })
review({ targets: 'vjeter', candidates: 'fresket vogel madh bukur gjalle erret', relation: 'age-and-condition contrast', reason: 'Old differs from fresh, small, large, beautiful, alive, and dark.' })
review({ targets: 'qesharak tmerrshem vecante', candidates: 'bukur mire keq cuditshem eger dashur', relation: 'evaluation-quality contrast', reason: 'Funny, terrible, or special differs from the other evaluations and personal qualities.' })
review({ targets: 'shoqeron', candidates: 'dergon largohem prit takohem vjen ik', relation: 'social-movement contrast', reason: 'Accompanying differs from sending, leaving, waiting, meeting, coming, and going away.' })
review({ targets: 'quhem', candidates: 'jam rri ka punon meso vjen', relation: 'identity-statement contrast', reason: 'Being called a name differs from being, staying, having, working, learning, and coming.' })
review({ targets: 'qesh qaj vajto', candidates: 'buzeqesh gezohem bertet kendo hesht thote', relation: 'vocal-or-emotional-action contrast', reason: 'Laughing, weeping, or mourning differs from smiling, rejoicing, shouting, singing, silence, and speaking.' })
review({ targets: 'zgjedh', candidates: 'pres pyes provoj mendoj kujtoj harroj', relation: 'decision-and-cognition contrast', reason: 'Choosing differs from waiting, asking, trying, thinking, remembering, and forgetting.' })
review({ targets: 'vdes semure', candidates: 'lind jeto gjalle sherues zgjuar shendoshe', relation: 'life-or-health-event contrast', reason: 'Dying or becoming ill differs from birth, living, being alive, healing, wakefulness, and health.' })
review({ targets: 'verbo', candidates: 'tremb vrit shpeto sheh shiko ndihmo', relation: 'bodily-effect action contrast', reason: 'Blinding differs from frightening, killing, saving, seeing, looking, and helping.' })
review({ targets: 'thyhet thyen shembet', candidates: 'perkulet prish hap mbyll lidh ngre', relation: 'structure-change contrast', reason: 'Breaking or collapsing differs from bending, damaging, opening, closing, tying, and raising.' })
review({ targets: 'varen', candidates: 'bie ngrihet shtrihet qendroj leviz ulet', relation: 'position-or-motion-state contrast', reason: 'Hanging differs from falling, rising, lying, standing, moving, and lowering.' })
review({ targets: 'vyshket', candidates: 'lulezon shkrihet ngrin digjet pikon rrjedh', relation: 'natural-process contrast', reason: 'Withering differs from flowering, melting, freezing, burning, dripping, and flowing.' })
review({ targets: 'zbardh', candidates: 'erret shkelqen shkimet skuqem digjet shkrihet', relation: 'colour-or-light-change contrast', reason: 'Whitening or brightening differs from darkness, shining, extinguishing, blushing, burning, and melting.' })
review({ targets: 'qetesohet', candidates: 'shqetesohem tremb zgjohu vazhdon bertet dridhet', relation: 'state-change contrast', reason: 'Calming down differs from worrying, frightening, waking, continuing, shouting, and trembling.' })
review({ targets: 'vonon', candidates: 'nisem vazhdon arrij prit shpejt menjehere', relation: 'timing-action contrast', reason: 'Delaying differs from setting off, continuing, arriving, waiting, speed, and immediacy.' })
review({ targets: 'trashegohet', candidates: 'humbet blej shes jep merr paguaj', relation: 'possession-transfer contrast', reason: 'Being inherited differs from being lost, bought, sold, given, taken, and paid for.' })

// Manner, direction, discourse degree, and temporal adverbs.
review({ targets: 'shpejt', candidates: 'ngadale vone heret qete menjehere drejt', relation: 'manner-or-speed contrast', reason: 'Quickly differs from slowly, late, early, quietly, immediately, and straight.' })
review({ targets: 'thjesht', candidates: 'veshtire seriozisht qarte sakte ndryshe fshehurazi', relation: 'manner contrast', reason: 'Simply differs from difficultly, seriously, clearly, correctly, differently, and secretly.' })
review({ targets: 'rreth', candidates: 'brenda jashte siper poshte permes matane', relation: 'spatial-relation contrast', reason: 'Around differs from inside, outside, above, below, through, and across.' })
review({ targets: 'vetem', candidates: 'bashke gjithmone shume gjithashtu perseri pothuajse', relation: 'scope-or-company contrast', reason: 'Only or alone differs from togetherness, frequency, quantity, addition, repetition, and approximation.' })

// These forms need an authored clause, agreement frame, or discourse situation
// before a close alternative can be declared unequivocally wrong.
contextOnly('te_link', 'The linking article të is homographic with the subjunctive marker and object clitic; only an authored noun or adjective phrase identifies this job safely.')
contextOnly('te_subj', 'The subjunctive marker të is homographic with a linking article and object clitic; it requires a complete reviewed verb phrase.')
contextOnly('te_obj', 'The object clitic të is homographic with a linking article and subjunctive marker; it requires a complete reviewed clause.')
contextOnly('qe', 'Që has complementizer, relative, and other clause-linking uses; a bare “that” cue cannot identify one reviewed job safely.')
contextOnly('se', 'Se is clause-dependent and overlaps English renderings of që and other connectors; it must be tested inside its reviewed sentence.')
contextOnly('ta', 'The clitic cluster ta requires its governing verb and object context; a bare “it” cue cannot distinguish its grammatical composition.')
contextOnly('ua', 'The clitic cluster ua requires an authored recipient and object context; bare pronoun alternatives would not test its real job.')
contextOnly('teje', 'The genitive or ablative pronoun teje needs a governing preposition or noun phrase before “of/from you” is unambiguous.')
contextOnly('qene', 'The participle qenë belongs in a complete perfect or copular construction; bare verb alternatives do not identify its tense or job.')
contextOnly('qenke', 'The admirative form qenke needs a complete utterance and evidential situation; a bare English paraphrase would erase the contrast being taught.')
contextOnly('sapo', 'Sapo can mark immediacy or introduce a temporal clause; its exact role must be fixed by an authored full sentence.')
contextOnly('sepse', 'The causal connector sepse needs two authored clauses; a bare “because” cue cannot make neighbouring explanatory connectors safely incompatible.')
contextOnly('si', 'Si deliberately covers interrogative “how” and comparative “as”; only a complete question or comparison identifies the intended job.')
contextOnly('sikur', 'Sikur introduces a comparison or hypothetical clause; several connectors can be valid until both sides of the clause are shown.')
contextOnly('sic', 'Siç is a clause-linking comparison form and needs an authored comparison; bare “as” alternatives are not reliably incompatible.')
contextOnly('tek', 'Tek can mark destination, location, or a person-associated place; a complete spatial sentence is required for a fair hard contrast.')
contextOnly('tij', 'Possessive and oblique uses of tij need a noun or governing construction; the exact grammatical role should be tested in context.')
contextOnly('zhveshur', 'The reviewed weapon-specific “drawn” sense needs its weapon noun; bare adjective alternatives would invite the ordinary “undressed” reading.')
contextOnly('vrafte', 'The optative vraftë encodes a person, mood, and formulaic wish; it must be contrasted inside its reviewed utterance.')
contextOnly('shkimet', 'This regional Gheg passive form should be tested only in its reviewed fire context, not as a decontextualized standard-form synonym task.')
contextOnly('zot', 'Zot can mean Lord, God, master, or occur in forms of address; its intended title and register require an authored social or religious context.')
contextOnly('ri', 'Ri deliberately covers both “new” and “young”; the intended reading must be fixed by its noun before close age or condition alternatives are safe.')
contextOnly('vendos', 'Vendos deliberately covers “decide” and “place”; the intended action must be fixed by an authored clause before hard alternatives are safe.')
contextOnly('rende', 'Rëndë spans weight, seriousness, and manner readings; its exact adjective or adverb sense must be fixed by the surrounding phrase.')
contextOnly('urime', 'Urim is represented across wish and congratulations uses; a social situation is required before nearby formulas become safely wrong.')
contextOnly('rregull', 'Rregull can name order or serve in an “all right” formula; the intended sense must be established by a full utterance.')
contextOnly('tjeter', 'Tjetër changes form and meaning with its noun and can mean other, another, or next; a reviewed noun phrase is needed for a fair close contrast.')
contextOnly('tille', 'Tillë expresses “such” through agreement with an understood or stated noun; its exact form and force require an authored noun phrase.')
contextOnly('vjec', 'Vjeç occurs in an age expression with a number and copular frame; it should not be treated as a freely translatable bare adjective.')

export const HARD_CONTRAST_REVIEWS_Q_Z = Object.freeze(registry)
