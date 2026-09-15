import { DICT } from '../../dictionary.js'
import { lexicalTrainability } from '../../lexicalTrainability.js'
import { sensesMayShareAnswer } from '../../practiceAnswerValidity.js'

// Editorial hard-contrast coverage for trainable dictionary senses A-H.
//
// A cluster is deliberately a small semantic field whose members remain
// incompatible as bare answers. It is not a bag of similarly spelt words.
// Every emitted contrast carries the reviewed relation and the reason it is a
// safe wrong answer. Context-dependent particles are disposed explicitly
// below: they require an authored sentence/job contrast rather than a bare
// lexical bank.

const rows = (value) => value.trim().split(/\s+/u).filter(Boolean)

const CLUSTERS = Object.freeze([
  {
    relation: 'contrasting movement action',
    reason: 'A different physical movement with a distinct destination or manner.',
    ids: rows('ec hip hyr dil fluturo arrij kthehu zbrit'),
  },
  {
    relation: 'contrasting everyday action',
    reason: 'A familiar action, but not the action named by the target.',
    ids: rows('fle ha hap bej fus heq hidh mbush'),
  },
  {
    relation: 'contrasting perception or communication action',
    reason: 'A different perceptual or communicative act.',
    ids: rows('degjo flet sheh thote thirr shkruaj lexoj'),
  },
  {
    relation: 'contrasting search or knowledge action',
    reason: 'A related information-seeking act with a distinct meaning.',
    ids: rows('gjen di beso fsheh pyes kuptoj mendoj'),
  },
  {
    relation: 'contrasting search or knowledge action',
    reason: 'A related information-seeking act with a distinct meaning.',
    ids: rows('gjej kerko tregoj kujtoj mesoj pyes'),
  },
  {
    relation: 'contrasting change or event verb',
    reason: 'A different change or event, so it cannot name the target event.',
    ids: rows('behet humbet digjet bie duket filloj mbaroj ndodh'),
  },
  {
    relation: 'contrasting forceful action',
    reason: 'A different forceful act with a distinct result.',
    ids: rows('godit djeg dorezohem lufto vrit denoj rrethoj'),
  },
  {
    relation: 'contrasting directed action',
    reason: 'A different action involving movement or transfer.',
    ids: rows('dergon con blej sjell jep merr jap'),
  },
  {
    relation: 'contrasting path-changing action',
    reason: 'A different action affecting direction or position.',
    ids: rows('dredh kthehu kalo ngjit ulet ngrihet'),
  },
  {
    relation: 'contrasting bodily action or state',
    reason: 'A different bodily action or condition.',
    ids: rows('dhemb fryj buzeqesh dridhet fishkellen qesh qaj'),
  },
  {
    relation: 'contrasting commitment or error action',
    reason: 'A distinct intentional act or failure.',
    ids: rows('gaboj fal betohem harron premtoj refuzoj pranoj'),
  },

  {
    relation: 'contrasting settlement or public place',
    reason: 'A different kind of inhabited or public place.',
    ids: rows('fshat burg dyqan hotel shkolle treg qytet kala'),
  },
  {
    relation: 'contrasting travel-related noun',
    reason: 'A different travel entity, not the target vehicle or place.',
    ids: rows('anije kale karroce han rruge ure'),
  },
  {
    relation: 'contrasting lodging or room',
    reason: 'A different place used for shelter, lodging, or an interior space.',
    ids: rows('han bujtine dhome shtepi ahur kasolle kuzhine'),
  },
  {
    relation: 'contrasting structural feature',
    reason: 'A different built feature with a distinct physical function.',
    ids: rows('dere dritare hyrje dalje gardh hendek mur ure porta'),
  },
  {
    relation: 'contrasting purpose-built place',
    reason: 'A different place or structure with another everyday function.',
    ids: rows('ahur dyqan shkolle kuzhine punishte han'),
  },
  {
    relation: 'contrasting animal shelter',
    reason: 'A different shelter or dwelling.',
    ids: rows('fole ahur shtepi shpelle kasolle zgaver'),
  },
  {
    relation: 'contrasting landscape place',
    reason: 'A different natural place or terrain feature.',
    ids: rows('det fushe are burim pyll lume mal shpelle'),
  },
  {
    relation: 'contrasting large-scale place',
    reason: 'A different spatial or geographical concept.',
    ids: rows('bote vend toke qiell det qytet fshat'),
  },

  {
    relation: 'contrasting staple food',
    reason: 'A different everyday food, not an alternative name for the target.',
    ids: rows('buke gjalpe djathe mish peshk veze oriz'),
  },
  {
    relation: 'contrasting ingredient or prepared food',
    reason: 'A different ingredient or prepared food.',
    ids: rows('brum hudher drithe ballokume laker kripe sheqer mish'),
  },
  {
    relation: 'contrasting drink',
    reason: 'A different drink with a distinct ordinary meaning.',
    ids: rows('caj birre uje qumesht kafe leng'),
  },
  {
    relation: 'contrasting eating or serving vessel',
    reason: 'A different kitchen or serving object.',
    ids: rows('filxhan gote pjate luge tenxhere shishe'),
  },
  {
    relation: 'contrasting kitchen object',
    reason: 'A different kitchen object with another function.',
    ids: rows('furre tenxhere pjate filxhan gote luge thike'),
  },

  {
    relation: 'contrasting hand tool',
    reason: 'A different hand tool used for another task.',
    ids: rows('gershere cekic gjilpere furke kose lopate thike'),
  },
  {
    relation: 'contrasting small practical object',
    reason: 'A different portable object with a distinct use.',
    ids: rows('cakmak celes bilete harte fatura telefon laps'),
  },
  {
    relation: 'contrasting carried or protective object',
    reason: 'A different carried or protective everyday object.',
    ids: rows('cader batanije cante fashe pallto kapelë kepuce'),
  },
  {
    relation: 'contrasting fastening or ignition object',
    reason: 'A different small object used to fasten, support, or ignite.',
    ids: rows('gozhde fitil hu qiri litar shkrepse celes'),
  },
  {
    relation: 'contrasting weapon or combat object',
    reason: 'A different object used in combat.',
    ids: rows('arme shpate top thike barut cekic'),
  },
  {
    relation: 'contrasting child or household object',
    reason: 'A different household object or child-related item.',
    ids: rows('djep kukull liber shtrat sofer luge'),
  },

  {
    relation: 'contrasting natural material',
    reason: 'A different physical material, not an alternate label for the target.',
    ids: rows('dhe_earth dru gur hekur ar argjend dylle balte'),
  },
  {
    relation: 'contrasting combustion material',
    reason: 'A distinct material or component associated with fire.',
    ids: rows('barut fitil dru qymyr vaj dylle'),
  },
  {
    relation: 'contrasting fire or light noun',
    reason: 'A different fire or illumination concept.',
    ids: rows('flake drite erresire tym qiri pishtar zjarr'),
  },
  {
    relation: 'contrasting precious material or money',
    reason: 'A distinct valuable material or monetary object.',
    ids: rows('ar argjend flori lek monedhe kartemonedhe'),
  },

  {
    relation: 'contrasting body part',
    reason: 'A different human body part.',
    ids: rows('goje fytyre gju gji dore gjuhe flok balle koke kembe'),
  },
  {
    relation: 'contrasting animal body part',
    reason: 'A different visible animal body part.',
    ids: rows('bisht bri sqep krah kembe lekure goje'),
  },
  {
    relation: 'contrasting bodily substance or trace',
    reason: 'A different bodily substance, sensation, or physical trace.',
    ids: rows('gjak eshtra fryme djerse lot dhimbje ze'),
  },

  {
    relation: 'contrasting wild or small animal',
    reason: 'A different animal species.',
    ids: rows('gjarper gjinkalla flutur dre bretkose dhelpra breshka arushe'),
  },
  {
    relation: 'contrasting farm animal',
    reason: 'A different domestic animal species.',
    ids: rows('dash dhi gomar dem gjel dele lope kale'),
  },
  {
    relation: 'contrasting bird or insect',
    reason: 'A different bird or insect species.',
    ids: rows('bleta dallendyshe gjel gjinkalla shqiponje zog flutur'),
  },
  {
    relation: 'contrasting folklore being',
    reason: 'A different folklore being with a distinct identity and role.',
    ids: rows('dragua flocka baloz bolla dordolec dhampir kulshedra zane'),
  },
  {
    relation: 'contrasting folklore being',
    reason: 'A different folklore being with a distinct identity and role.',
    ids: rows('bukura djall ora peri xhind lubia stihi'),
  },
  {
    relation: 'contrasting folklore being',
    reason: 'A different folklore being with a distinct identity and role.',
    ids: rows('dreq perendi verbti karkanxholl zana dragua'),
  },

  {
    relation: 'contrasting person by age or sex',
    reason: 'A different ordinary person category.',
    ids: rows('femije grua burre djale djalosh burra gra plak plake'),
  },
  {
    relation: 'contrasting family relationship',
    reason: 'A different family relationship.',
    ids: rows('baba nene bir bije moter vella gjyshe gjysh'),
  },
  {
    relation: 'contrasting family relationship',
    reason: 'A different family relationship; the synonym “baba” is deliberately excluded.',
    ids: rows('babi nene bir bije moter vella gjyshe gjysh'),
  },
  {
    relation: 'contrasting social or religious role',
    reason: 'A different social or religious role.',
    ids: rows('aga hoxha dervish bari berber kuzhinier mbret kapidan'),
  },
  {
    relation: 'contrasting social identity',
    reason: 'A different social identity or relationship.',
    ids: rows('burrneshe armik mik mike shok fqinj udhetar'),
  },

  {
    relation: 'contrasting time of day',
    reason: 'A different time-of-day period.',
    ids: rows('agim dite mengjes mesdite mbremje nate muzg'),
  },
  {
    relation: 'contrasting weather or season noun',
    reason: 'A different weather event or season.',
    ids: rows('bresher bore dimer shi vere pranvere vjeshte ere'),
  },
  {
    relation: 'contrasting sky or light noun',
    reason: 'A different visible sky or light phenomenon.',
    ids: rows('hije drite erresire diell hene yll re rrufe'),
  },
  {
    relation: 'contrasting plant or plant part',
    reason: 'A different plant, crop, or plant part.',
    ids: rows('gjethe hardhi bar drithe fik lule peme dege'),
  },

  {
    relation: 'contrasting language or information noun',
    reason: 'A different unit or kind of information.',
    ids: rows('emer fjale dije gjegjeza fakt arsye histori lajm'),
  },
  {
    relation: 'contrasting beginning or ending noun',
    reason: 'A distinct part or boundary of an event.',
    ids: rows('fillim fund ane mes fillim kreu vazhdim'),
  },
  {
    relation: 'contrasting belief or commitment noun',
    reason: 'A different belief, promise, or mental commitment.',
    ids: rows('bese besim bekim fe dashje mendim premtim'),
  },
  {
    relation: 'contrasting emotion or personal quality noun',
    reason: 'A different emotion, attitude, or personal quality.',
    ids: rows('dashuri frike fat durim zemer gezim trishtim'),
  },
  {
    relation: 'contrasting problem or consequence noun',
    reason: 'A different problem, error, or harmful consequence.',
    ids: rows('gabim faj fatkeqesi dem_harm gjeme problem rrezik'),
  },
  {
    relation: 'contrasting event or occasion',
    reason: 'A different event or social occasion.',
    ids: rows('feste ditelindje dasme pagezim takim histori'),
  },
  {
    relation: 'contrasting meal or food noun',
    reason: 'A different meal, food, or dining concept.',
    ids: rows('darke ushqim buke mish djathe peshk mengjes'),
  },
  {
    relation: 'contrasting mental experience',
    reason: 'A different thought, memory, or mental experience.',
    ids: rows('enderr mendim kujtim dije ide frike shprese'),
  },
  {
    relation: 'contrasting human group',
    reason: 'A different kind of human group or relationship unit.',
    ids: rows('familje cete pleq burra gra femije'),
  },
  {
    relation: 'contrasting state or capacity noun',
    reason: 'A different state, capacity, or abstract property.',
    ids: rows('gjendje fuqi gjume e_vertete shendet mundesi fat'),
  },
  {
    relation: 'contrasting abstract capacity or condition',
    reason: 'A different abstract capacity, condition, or personal resource.',
    ids: rows('force durim shendet rrezik fat gjendje besim'),
  },
  {
    relation: 'contrasting general noun',
    reason: 'A distinct high-frequency abstract or general noun.',
    ids: rows('gje here ane fakt fjale vend kohe menyre'),
  },

  {
    relation: 'contrasting visible property',
    reason: 'A different visible property or colour.',
    ids: rows('erret bardhe gjelber arte kuq zi kalter verdhe'),
  },
  {
    relation: 'contrasting evaluation or quality',
    reason: 'A different evaluation or descriptive quality.',
    ids: rows('bukur mire keq eger forte embel dashur shtrenjte'),
  },
  {
    relation: 'contrasting physical condition',
    reason: 'A different physical condition.',
    ids: rows('etur ftohte gjalle gurezuar hapur fresket uritur lodhur'),
  },
  {
    relation: 'contrasting personal quality',
    reason: 'A different personal quality or evaluation.',
    ids: rows('eger forte huaj gati cmendur besnik embel dashur'),
  },
  {
    relation: 'contrasting dimension or orientation',
    reason: 'A different dimension or orientation.',
    ids: rows('gjate drejte drejt djathte madh vogel larte ulet'),
  },
  {
    relation: 'contrasting material adjective',
    reason: 'A different material or colour description.',
    ids: rows('hekurt arte bardhe gjelber gurezuar erret'),
  },

  {
    relation: 'contrasting personal pronoun',
    reason: 'A different person or number in the pronoun system.',
    ids: rows('ai ajo ata une ti ne_pron ju'),
  },
  {
    relation: 'contrasting fraction or part',
    reason: 'A different exact part or fraction.',
    ids: rows('gjysme edyta ane pjese pari tere'),
  },
  {
    relation: 'contrasting cardinal number',
    reason: 'A different exact number.',
    ids: rows('dy gjashte dhjete dymbedhjete dyzet nente njeqind'),
  },
  {
    relation: 'contrasting large cardinal number',
    reason: 'A different exact hundreds value.',
    ids: rows('dyqind gjashteqind njeqind treqind peseqind teteqind'),
  },
  {
    relation: 'contrasting ordinal',
    reason: 'A different exact ordinal value.',
    ids: rows('edyta epara etreta ekaterta epesta'),
  },
  {
    relation: 'contrasting quantity expression',
    reason: 'A different quantity or scope.',
    ids: rows('disa cdo aq gjithe pak shume asnje'),
  },
  {
    relation: 'contrasting indefinite reference',
    reason: 'A different indefinite person, thing, or place reference.',
    ids: rows('dicka asgje gjithcka dikush askush diku askund'),
  },
  {
    relation: 'contrasting question word',
    reason: 'It asks for a different kind of information.',
    ids: rows('cfare cili ku kush kur pse si'),
  },
  {
    relation: 'contrasting question word',
    reason: 'It asks for a different kind of information.',
    ids: rows('cka cili ku kush kur pse si'),
  },
  {
    relation: 'contrasting location or direction expression',
    reason: 'A different spatial relation or direction.',
    ids: rows('brenda atje afer ashtu diku djathtas majtas perpara prane'),
  },
  {
    relation: 'contrasting location or direction expression',
    reason: 'A different spatial relation or direction; synonymous “atje” is excluded.',
    ids: rows('aty afer ashtu diku djathtas majtas perpara prane'),
  },
  {
    relation: 'contrasting time expression',
    reason: 'A different temporal relation or time reference.',
    ids: rows('deri atehere dje dikur heret tani neser sonte'),
  },
  {
    relation: 'contrasting persistence or frequency expression',
    reason: 'A different frequency or persistence meaning.',
    ids: rows('akoma gjithmone perseri shpesh kurre nganjehere tani'),
  },
  {
    relation: 'contrasting persistence or frequency expression',
    reason: 'A different frequency meaning; synonymous “akoma” is excluded.',
    ids: rows('ende gjithmone perseri shpesh kurre nganjehere tani'),
  },
  {
    relation: 'contrasting discourse response',
    reason: 'A different short social or discourse response.',
    ids: rows('hej faleminderit hajde dakord ckemi mirupafshim lutem'),
  },
  {
    relation: 'contrasting discourse stance',
    reason: 'A different conversational stance or degree expression.',
    ids: rows('epo he cuditshem gjithsesi goxha vertet ndoshta'),
  },
  {
    relation: 'contrasting audible signal',
    reason: 'A different recognisable sound or audible signal.',
    ids: rows('ciu ze fishkellen troket bertet kenge zile'),
  },
  {
    relation: 'contrasting sensory phenomenon',
    reason: 'A different sensory phenomenon, not another name for the target sensation.',
    ids: rows('ere_smell ze drite shije prekje ngjyre tym'),
  },
  {
    relation: 'contrasting togetherness or arrangement',
    reason: 'A different relation between people or objects.',
    ids: rows('bashke vetem ndare prane larg perballe rreth'),
  },
  {
    relation: 'contrasting state verb',
    reason: 'A different state or existence predicate.',
    ids: rows('eshte ka duket behet mbetet jeton mungon'),
  },
  {
    relation: 'contrasting transformation verb',
    reason: 'A different physical transformation or change.',
    ids: rows('gurezohet digjet shkrihet thyhet ngrin thahet prishet'),
  },
  {
    relation: 'contrasting speaking action',
    reason: 'A different communicative action; the synonymous inflected form “flet” is deliberately excluded.',
    ids: rows('fol degjo pyes pergjigjet perserit bertet hesht'),
  },
  {
    relation: 'contrasting distinctive animal',
    reason: 'A different animal or folklore animal form.',
    ids: rows('gjysmegjel gjel dragua gjarper dhelpra breshka ujk'),
  },
  {
    relation: 'contrasting degree or scope expression',
    reason: 'A different degree or scope meaning.',
    ids: rows('fare dot ca goxha aq shume pak krejt'),
  },
])

const CONTEXT_ONLY = Object.freeze({
  dhe: 'Bare “and” must be contrasted only in a reviewed sentence; “edhe” and the epic e-conjunction can also be valid English “and”.',
  a_q: 'The yes/no question marker has no safe bare lexical contrast; use the reviewed grammatical-job context family.',
  e_art: 'The written form e is homographic; it must be tested through its reviewed feminine-adjective context.',
  e_link: 'The written form e is homographic; it must be tested through its reviewed noun-link context.',
  e_obj: 'The written form e is homographic; it must be tested through its reviewed object-clitic context.',
  e_conj: 'Epic e can overlap English “and”; it needs its reviewed epic-name context rather than a bare gloss bank.',
  do_fut: 'The written form do is homographic with “wants”; future marking must be identified in a reviewed verb phrase.',
  edhe: '“Also / and / even” overlaps several particles in short cues; use an authored sentence that fixes its exact job.',
  apo: 'Apo and ose can both render “or”; test their question/statement distribution in reviewed context.',
  duke: 'The gerund marker is a grammatical construction, so hard alternatives must be sentence-bound.',
  gjithe: 'The surface has inflectional and quantifier uses; use a reviewed noun phrase rather than a bare generated bank.',
  gjitheve: 'This inflected quantifier phrase must be tested in its reviewed dative context.',
  gjitha: 'This gendered plural quantifier form must be tested in a reviewed noun phrase.',
  gjithashtu: '“Also” overlaps edhe; it requires an authored sentence that makes its discourse role explicit.',
  as: 'The negative coordinator depends on a negative construction; bare “nor” alternatives are unsafe.',
  derisa: 'Its “until/while” reading is clause-dependent and may overlap deri in an underspecified cue.',
  dhe_gave: 'This is a homographic verb form (“gave”), so it requires its reviewed verbal context rather than bare dhe alternatives.',
  do: 'Do overlaps dua and dëshiron as “want”; its person/tense contrast belongs in an authored clause.',
  duhet: 'Modal meanings and English paraphrases overlap; test duhet through an authored clause and grammatical job.',
  deshiron: 'Dëshiron overlaps do/dua as “want”; use a person-marked, reviewed clause rather than scoring one synonym wrong.',
  dua: 'Dua overlaps do/dëshiron as “want”; use a person-marked, reviewed clause rather than scoring one synonym wrong.',
  gezohem: 'The fixed first-person expression needs an authored social context, not decontextualised lexical foils.',
  gezuar: 'The social formula has several situation-dependent readings; use a birthday/toast context.',
  betohem: 'The first-person fixed form should be tested in a reviewed oath clause, not against unrelated bare verbs.',
  boll: 'Conversational boll marks that an amount or action is enough; its reviewed stop-and-rest situation keeps the standard synonym mjaft from becoming a false distractor.',
  ckemi: 'The greeting checks how things are going; its conversational function belongs in the reviewed greeting situation rather than a bare hard-contrast bank.',
  domethene: 'This discourse marker clarifies or reformulates a preceding thought, so its meaning must be identified in the complete reviewed utterance.',
  fiks: 'Conversational fiks can express exactness or confirmation; the reviewed time statement fixes its intended everyday meaning safely.',
  gjoja: 'Gjoja distances the speaker from a claim and can carry irony; only the authored claim context identifies that stance reliably.',
})

const registry = {}
const provenance = new Map()

for (const cluster of CLUSTERS) {
  for (const [index, id] of cluster.ids.entries()) {
    if (
      !/^[a-h]/iu.test(id) ||
      !DICT[id] ||
      !lexicalTrainability(id).trainable ||
      CONTEXT_ONLY[id] ||
      provenance.has(id)
    ) continue
    const peers = []
    for (let offset = 1; offset < cluster.ids.length && peers.length < 4; offset += 1) {
      const peer = cluster.ids[(index + offset) % cluster.ids.length]
      if (
        peer !== id &&
        DICT[peer] &&
        lexicalTrainability(peer).trainable &&
        !sensesMayShareAnswer(id, peer) &&
        !peers.includes(peer)
      ) peers.push(peer)
    }
    registry[id] = Object.freeze({
      status: 'reviewed-contrasts',
      contrasts: Object.freeze(peers.map((peerId) => Object.freeze({
        id: peerId,
        relation: cluster.relation,
        reason: cluster.reason,
      }))),
    })
    provenance.set(id, cluster.relation)
  }
}

for (const [id, reason] of Object.entries(CONTEXT_ONLY)) {
  registry[id] = Object.freeze({
    status: 'context-only',
    reason,
  })
}

export const PRACTICE_HARD_CONTRASTS_A_H = Object.freeze(registry)
