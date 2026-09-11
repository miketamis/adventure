// Rich ending prose is deliberately separate from the eager story graph.
// Runtime rules and save validation need only each ending's id/kind; this copy
// is loaded when the player actually reaches an ending or opens a codex/debug
// surface that presents it. Keep this as the single source for all rich ending
// titles and blurbs.
export const ENDING_COPY = Object.freeze({
  "syriKeqFund": {
    "title": "The Evil Eye",
    "blurb": "A child too openly admired, the old people warn, draws the syri i keq — the evil eye, the envious or even the loving gaze that sickens what it praises. So a wise mouth says \"mashallah\" over a fair child, and a wise hand answers the eye with garlic. The mother pressed her garlic into your hand; you gave it to the child, and the fever broke. Never praise a child, a bride, or a fat lamb without a charm — the eye does not mean to harm, and harms all the same."
  },
  "breshkaMire": {
    "title": "Bread for the Guest",
    "blurb": "A hungry traveller came to your fire. You gave him the bread and salt owed to every guest, then shared the meat simmering in your earthen pot as well. The old telling remembers the wife who did less: she observed the letter of hospitality but hid the meat for herself, and God made that pot the shell she must carry forever. You chose the heart of hospitality, not merely its minimum. The traveller ate, blessed your house and your hand, and that blessing outlasted the meal."
  },
  "breshkaFund": {
    "title": "Why the Tortoise Carries her House",
    "blurb": "You gave the hungry guest bread and salt, but hid the meat simmering in your earthen pot and kept the richer food for yourself. His cry carried the broken heart of hospitality to heaven. God — not the guest — pronounced the sentence: the pot fixed itself to your back as a shell, and you became the first tortoise, carrying forever the house and meal you would not truly share."
  },
  "agaYmerStay": {
    "title": "The Broken Word",
    "blurb": "You stayed. After nine years in chains, who could blame you for taking your wife’s hand and your own hearth again? But a besa is a besa, and word spread that Aga Ymer had given his sworn word to return and had not — and in the old country a man is only as good as his besa. You lived out your days warm and fed and quietly unforgiven, your name left out of the songs that should have carried it forever. Some prisons have no walls."
  },
  "agaYmerFund": {
    "title": "Aga Ymer’s Besa",
    "blurb": "His wife had sworn to wait for him nine years and nine days; held captive far from home, Aga Ymer of Ulcinj was freed at last only on his besa to return. He reached his door as that vow ran out and she was about to be wed to another, and an old scar on his arm proved who he was — and then, his word unbroken, he mounted and rode all the way back to his chains — and the captor-king, awed that a man would ride back to prison to keep his word, set him free for good. Not even a homecoming outweighs a sworn besa; and a besa kept can open even a prison door."
  },
  "prespaLiri": {
    "title": "The Warning Heeded",
    "blurb": "Nereida the forest-nymph warned the king’s son that if he married her a great water would drown his whole country. Where the prince of the old legend would not hear it — had her seized, wed her, and lost his town to the flood that made Lake Prespa — you let her go back into her woods. You never won her, and you ruled alone; but the great town by the water stood, and your people lived out their ordinary days, and no lake ever closed over their roofs. Some loves are a country, and cost one."
  },
  "prespaFund": {
    "title": "The Lake Where the Town Was",
    "blurb": "You would not hear Nereida’s warning. Blinded by love, you had the forest-nymph seized and held in your town until she consented, and you married her — and no sooner were you wed than the sky broke open, and the rain would not stop until the whole town lay underwater and every last soul had drowned: you, your father the king, and all your people together. That water stands there yet, and men call it Lake Prespa; and the old people say Nereida, the one life the flood spared, keeps the lake to this day."
  },
  "argjiroFund": {
    "title": "Argjiro’s Leap",
    "blurb": "Argjiro ruled Gjirokastër as the prince’s wife, and when the Ottoman host laid siege she took up the castle’s defense herself — until it fell, not to arms but to betrayal from within. Rather than be taken alive you climbed the highest tower and leapt with your infant son held against you, the very first road you ever walked together. You struck the rock and were broken, but the boy lived — and the stone itself, as if moved to bless him, wept milk that kept him alive. The city has carried your name ever since: Gjirokastër, Argjiro’s castle. Some are remembered for how they would not be taken."
  },
  "argjiroRob": {
    "title": "Taken Alive",
    "blurb": "You waited, and the enemy came over the fallen wall and took you alive — you, your son, and the castle whole. In the old legend Argjiro would not be taken: she leapt from the tower and the city kept her name for it. You were led away instead, and the fortress above the city carries some other name now, and no rock ever wept milk, and the poets who might have likened you to the morning star sing of someone else. A city remembers the leap, not the surrender."
  },
  "gbMujiFund": {
    "title": "Mujo Rises Again",
    "blurb": "Nine shots felled Gjeto Basho Mujo at the twin trees, and his oracular grey courser refused its oats and wept — until three Zanas heard the grief and came down with milk and strength. You drank, and rose whole, and paid your old blood-oath once more: you rode home and cut down the man who had gloated over a dying hero. The mountain-hero does not die of nine wounds while the Zanas keep the peaks."
  },
  "gbMujiVdes": {
    "title": "The Death-Wail",
    "blurb": "You would not take the Zanas’ milk; you turned from the wound and fled the field, and it took you all the same. At Jutbina the men made the gjâmë, the death-wail, over a hero — and the song that should have told of your rising told instead of your falling. Even a Kreshnik dies if he will not let the mountain heal him."
  },
  "aliPashaVdes": {
    "title": "The Lion Dies Unbroken",
    "blurb": "You would not surrender. When the Sultan’s men crossed the water claiming to carry his pardon, you knew the paper for the lie it was — the old lion had drowned too many rivals in this same lake to be caught by one now. You took up arms in your own tower and fought them from the floor, and they killed you there, gun in hand, over the false firman you refused to trust. They cut off your head and carried it on a silver platter through Ioannina and on to the Sultan’s own gate; but the water that once closed over a girl who chose it rather than obey you closed, in the end, over the Lion himself — and the mountains still sing that he died the way he lived, unbroken and unforgiving, and gave the Sultan nothing but a corpse."
  },
  "aliPashaRob": {
    "title": "The False Pardon Trusted",
    "blurb": "You chose to believe the Sultan’s besë. You laid down your arms, gave up your treasury as a show of good faith, and trusted the pardon carried across the water — and it was a lie from the first word. The Sultan never meant to spare the man who had ruled a quarter of the Balkans as if it were his own; his officers took you unresisting, shot you all the same, and sent your head to the palace gate beside your sons’. No song remembers a Lion who surrendered on a false word and was killed anyway — only that a man who taught his whole country never to forgive a debt forgot, at the very end, that the Sultan owed him nothing but death."
  },
  "binoshetHije": {
    "title": "The River Stays Dry",
    "blurb": "You are Zjerma, and at the dry river you turned your horse away from the kulshedra. Bardhakuqja — the river-king’s daughter, not the Earthly Beauty of Handa’s later road — remained bound in the black gorge. The monster kept the spring, the river stayed dry, and the city’s daily toll continued. This is an explicit counterfactual failure, not Schirò’s path: the old prose wonder-tale requires Zjerma to cut the crowned head before either twin can reach the trials still ahead."
  },
  "binoshetDyKurorat": {
    "title": "The Two Crowns of the Twins",
    "blurb": "Zjerma killed the seven-headed kulshedra, restored the river, and proved the crowned head and seven tongues against Wolfbelly’s false claim. As his crowning with Bardhakuqja was beginning, the warning ring darkened; he left his promised bride for one year, one month and one day to find Handa. He followed Handa past the warning hut and the white-clad maidens in the Field of the Ladies. Handa had failed the hedge-keeper’s riddle, cord-cut and horse-jump and been turned to stone; Zjerma passed all three, bound the witch, and used a white lily’s dew to revive his twin, their animals and every petrified nobleman. The witch became a black bolla and tore herself in two against the tree. The freed nobles yielded the Earthly Beauty to Handa, and nine days of celebration followed. Over several months of war they reclaimed their parents’ kingdom; Handa killed its foreign king, received the ancestral crown, and restored their mother. On the promised day, sickness made Zjerma send Handa to Bardhakuqja in his place. Handa told her the truth and laid his sword between them. Zjerma arrived the next morning, saw the sword before jealousy became murder, and laughed. Bardhakuqja then walked through the fire to prove her innocence and emerged more beautiful. The reunited company visited the twins’ mother; after Zjerma and Bardhakuqja stayed there three months, they returned to the river kingdom, where her aging father gave Zjerma his staff and crown. Schirò’s prose wonder-tale reaches both women, both brothers and both crowns without making one Beauty out of two."
  },
  "aliBajrFund": {
    "title": "The Word Kept Twice",
    "blurb": "The false Ali never passed the bride’s test at the barred door. Three years later you came to Jutbina in a beggar’s rags and told the household that Ali was dead; only your bride saw the old mark beneath your hair and knew you. You escaped together, and Mujo turned the chase into six days of feasting. Yet the Krajl’s daughter had stood bail for the promise that freed you, so on the sixth day you left everything you had recovered and rode back into captivity. The Krajl met you at his door, called you faithful, and released you for good. Your word was kept twice: first at home, then before the king."
  },
  "aliBajrKeq": {
    "title": "The Besa Left Behind",
    "blurb": "You kept the bride, the house, and the freedom you had recovered, but not the word that made any of them yours with honour. The Krajl’s daughter had pledged to bear your sentence if you failed to return after six days; by staying home, you abandoned her to the price of the trust she placed in you. The surviving song takes the harder road: Ali returns exactly when sworn, and the astonished king frees him for being faithful. This is the road outside that song—the standard-bearer safe at his own hearth, with his besa broken behind him."
  },
  "mujoKaleFund": {
    "title": "The Courser Won",
    "blurb": "You dreamed a foal white as snow with a star set on its brow, and raised it three years behind a locked door — and when an enemy across the frontier stole it away and shut it deep in his own guarded stable, you would not turn from it. You fought your way to the courser and broke his hold, and rode it home to Jutbina at last. No horse like it exists: it clears hedges three shoulders high and the river in a single leap, and it will carry you through every song still to come. Some things are worth the whole of a war, and this grey courser was one."
  },
  "mujoKaleLarg": {
    "title": "The Horse That Stayed Far",
    "blurb": "The courser you dreamed was held far off, deep in an enemy's guarded stable, and the way to it ran through him. You would not take that road — you turned your back and rode far, and left the grey horse where it stood. The enemy keeps it still, locked at the far end of his stable behind a barred door, and no rider it will ever suffer; you go on without it. Every later Kreshnik song is ridden on a courser you never won, and Jutbina remembers a warhorse that was only ever dreamed."
  },
  "halilGarriaFund": {
    "title": "The Oath Beyond Death",
    "blurb": "Seven years after your sister sent the mountain bird, it found your grave and God raised you for the unpaid besa. You rode nine days to her house and would not stop even for coffee. On the homeward road she smelled earth on you; your flute was silent; the birds said that the living travelled with the dead. You answered each omen with a merciful lie. Beyond the ruined houses and nine white graves, you gave her the horse and returned to your earth. She reached home alone, learned that all nine brothers were dead, and took your mother by the hand to find you. At your grave mother and daughter embraced and fell dead together. The oath was kept, but the old betrayal had already taken everything."
  },
  "halilGarriaKeq": {
    "title": "Seven Years Become Eight",
    "blurb": "You stayed beneath the earth. Your sister had already waited seven years for the brother who promised to visit within nine days and bring her home within nine weeks. The mountain bird found the right grave at last, but its message woke no rider. She remained at the distant house, never learning that all nine brothers were dead, while your mother waited among nine white graves. This is the counterfactual the ballad refuses: the first oath sold for gold, and the second left unpaid even by the dead."
  },
  "osmaniZbuluar": {
    "title": "The Dead Man Moves",
    "blurb": "You moved before the shackles came off. The Krajl saw life in the supposed corpse, doubled the guard, and sent you and the other eleven Agas back below. Osmani’s ordeal works only because he holds still through every test until the naked sabre hangs within reach; courage released one heartbeat too soon becomes another lock."
  },
  "osmaniLiri": {
    "title": "The Blame Owned",
    "blurb": "Nine years in a foreign Krajl’s dungeon, and when he demanded to know who had burned his palace, you — Arnaut Osmani, youngest of the twelve chained Agas — took every crime on yourself alone to spare your companions, and earned six more years for the boast. Where a lesser man would have broken, you laid a trick: you feigned your own death, lay still as your brothers keened over you, and gave no flicker through serpents, fire, and the nail. When the shackles came off at last you sprang up whole, tore the sabre from the guard’s hand, and cut your way out — freeing all eleven of your companions and riding home to Jutbina. Some men win their freedom; you won everyone’s."
  },
  "osmaniRob": {
    "title": "Caught Alone",
    "blurb": "You tried to slip the dungeon alone. But the Krajl’s men were quicker: they ran you down before you cleared the wall and dragged you back into the dark. In the song, Arnaut Osmani frees the whole company by owning every crime and playing dead — a trick that wins eleven men their freedom. You tried to save only yourself, and saved no one: the shackles went back on for years more, and your companions stayed chained beside the empty space where you had lain. A man who flees alone frees no one."
  },
  "haliliMejdan": {
    "title": "A Warning Kept",
    "blurb": "Arnaut Osmani, who bore Mujo a private grudge, woke you with a lie: your brother lay dead, and a duel waited. You did not doubt it — you sprang up and rode out to the mejdan, and Zadran of Tetova, who kills with a fair warning kept, met you there. His rifle struck true however crookedly he aimed it, and young Sokol Halili dropped dead on the field for a summons that was never real. Back at Jutbina, Mujo raised the gjëmë over a brother he could no longer bring home. That is how the song sings it: the boy rides out on a lie, and neither the warning nor the courage can turn the shot."
  },
  "haliliJeton": {
    "title": "The Lie Refused",
    "blurb": "You would not take Osmani at his word. A brother dead, a duel called, and no one to vouch for either — you weighed the man against the message, and the message did not hold: Osmani, you knew, does not keep his besa. So you stayed among the towers of Jutbina, and Zadran of Tetova waited out the day at the mejdan alone, his fair warning wasted on a rider who never came. Mujo came home whole, and young Sokol Halili lived — the one turn the song of «Deka e Halilit» never lets its boy take. A brother saved is worth a duel unfought."
  },
  "stihiDjeg": {
    "title": "The Fire of the Stihi",
    "blurb": "You reached for the hoard, and the Stihi woke. She is no common serpent but a Stihi — from stuhí, the storm — a fire-breathing she-dragon of the southern Albanian and Arbëresh tales, close kin to the kulshedra, set to guard a treasure. Her breath is a sheet of flame, and a hoard kept by a Stihi is not taken by any hand: it is hers, and now so are your ashes."
  },
  "stihiFund": {
    "title": "What the Stihi Keeps",
    "blurb": "You took your hand from the gold and stepped back, and the Stihi lowered her head and let the fire die in her throat. A Stihi is a fire-breathing she-dragon set over a hoard; her treasure is no more for the taking than the lightning is, and the only ones who leave her cave are the ones who leave it empty-handed. You went out alive into the cool of the forest: the wisest wealth, by that fire, was the wealth you did not reach for."
  },
  "mujoHakFund": {
    "title": "Halili Avenges Mujo",
    "blurb": "In “Halili merr gjakun e Mujit,” Llabutani’s men ambush Mujo and leave ten spear wounds in him, but they do not kill or imprison him. An ora, a serpent and a wolf guard his sickbed while young Halili rides with the çeta, kills Llabutani at the mouth of a mountain cave, and takes back his wounded brother’s blood. The zanas then heal Mujo, who reaches the cave alive and rides home beside Halili. The song belongs to Halili’s vengeance for a living, wounded Mujo — not to Mujo avenging a dead Halili."
  },
  "mujoHakKeq": {
    "title": "The Blood Unanswered",
    "blurb": "You held Halili back while Mujo lay alive but badly wounded at Jutbina. Llabutani, the king who ordered the ambush, rode home untouched, and the blood-debt remained open. The canonical song sends the younger brother to the mountain cave, where he kills Llabutani and returns beside a healed Mujo; this branch is the failure that song refuses."
  },
  "mejdanKeq": {
    "title": "The Broken Mejdan",
    "blurb": "A mejdan is single combat — one champion against one, sacred among the kreshniks. You set the agas on a lone challenger who came to fight you fairly, and won by numbers what your own arm could not. The lahutë does not sing such a victory; the frontier remembers it only as the day Jutbina paid for a head with its honour."
  },
  "besaVella": {
    "title": "The Besa Between Warriors",
    "blurb": "You beat the Krajl’s champion in fair single combat — a mejdan, the sacred one-against-one — and when he fell and asked your besa you gave it, and the man who rode out to kill you rode home alive under your word. That is the besa: the pledge sworn \"by sun, moon, sky and earth, by fire, stone and thunderstone,\" held above life itself — the word that powers Rozafa and Constantine and the whole moral universe of the songs — and it binds even across the battle-line, turning a beaten foe into a friend. In the lived world it worked as a truce too: a village would swear a besa so blood-foes could meet as friends at a festival, and even a killer walked safe, under a day’s besa, to his victim’s funeral. To break a given word — or to win by numbers what your own arm could not — is the one thing the songs leave a name out for."
  },
  "besaThyer": {
    "title": "The Besa Betrayed",
    "blurb": "He fell, he asked your besa, and you cut him down anyway. There is no act a kreshnik holds lower than breaking the besa he has given — even to an enemy, even to a beaten one. The songs leave such a name out on purpose, so that it will be forgotten. You won the duel and threw away the one thing that made you worth singing about."
  },
  "vajtimFund": {
    "title": "The Wail for the Dead",
    "blurb": "You stood with the men in the gjâmë — the men-only death-wail of the Dukagjin and Gjakovë highlands, held to be as old as the Illyrians: ten men or more ranged in a line, striking their chests, raking their faces with their nails, crying the dead man’s name and deeds in one slow synchronised wail — the loudest grief a mountain man is ever allowed, the male answer to the women’s sung vajtim. To mourn rightly is itself a besa kept with the dead. You gave the fallen man his due, and the mountains carried the cry."
  },
  "veraDiteFund": {
    "title": "The Day of Summer",
    "blurb": "You kept Dita e Verës, the Day of Summer — the old spring-new-year the Albanians still hold on the fourteenth of March, the oldest feast of the pagan calendar. The children leapt the bonfires and ate the round ballokume cookie; the cold of winter went out of the land and Dielli the Sun climbed stronger into the sky; and on the holy mountain the Zana of the heights showed herself, as she does on this one day alone. Earth and Sun and fairy turn together toward the green half of the year."
  },
  "flockaFund": {
    "title": "The Maiden of the Lake",
    "blurb": "In the lakes and the hidden mountain tarns, the old people say, live the Floçka — water-maidens named for their long flowing hair, who do not know human speech until a mortal teaches it to them. You sat on the shore of Lake Shkodra, the wide water below Rozafa's castle where the Shkodër country has always set these tales, and taught her your words, one by one, until she could answer. In the old tales a Floçka is caught and kept by a man, bound to his house by a besa and silent for years, and the day the oath is broken she takes back what bound her and slips beneath the water again. You bound her with nothing — you only gave her speech — and so she helped you freely and went as she came. Of all the powers in these mountains, she is the one you win not by the sword but by a word."
  },
  "detiNuse": {
    "title": "The Bride of the Sea",
    "blurb": "e Bukura e Detit — the Beauty of the Sea, sister of the Earthly and the Sky Beauties, the sea-fairy of beauty and danger and mystery, kin to all the maidens of the water. You did not seize her gold nor force her hand; you took a single strand of her golden hair, and it was the gentleness itself that won her: she rose with you out of the deep into the light. The sea yields up its Beauty only to the hand that will not grab."
  },
  "detiStuhi": {
    "title": "Drowned in the Storm",
    "blurb": "The Kuçedra e Detit, the sea-dragon that brews the storms and breaks the ships, met you in its own black element — and no one fights the sea and wins. It loosed a storm, the dark water closed over your head, and the deep kept you. Some powers a wise traveller goes around, never through."
  },
  "portaVdes": {
    "title": "The Hungry Lion",
    "blurb": "At the gate to the Beauty’s chamber stood a lion and a lamb, set there to devour whoever fed them wrongly. The trick the old tale teaches is simple: give the meat to the lion and the grass to the lamb, and both, fed at last, let you pass. You gave the meat to the lamb instead; the lion stayed ravenous, and a ravenous lion at a narrow door is the end of the road. The wise traveller gives each creature the food that is truly its own."
  },
  "kalaFundBesa": {
    "title": "The Word Kept",
    "blurb": "You were the youngest — the one brother who kept his besa — so it was your own wife, never warned, who climbed the hill with the morning meal, and your own hands that sealed her into the wall she asked only to go on nursing her son from. The castle rose that day and never fell again. Low on its stone the wall still runs damp to this hour, with her milk and her tears for the boy she left below. You kept your word, and it cost you everything you had; but the fortress carries her name — Rozafat — and the old songs will remember that a man once loved his besa more than his own life."
  },
  "kalaFundTurp": {
    "title": "The Word Broken",
    "blurb": "You warned your wife in the night, and at dawn she pleaded illness and stayed by the hearth — so it was the youngest brother, who alone kept his besa, whose wife came with the meal and went into the wall. Your own wife lives. But you broke the word you swore under the old man's eye, and you stood on the scaffold while another man's wife was sealed in stone for it. The castle stands, and the songs will name the youngest the honourable one and give his wife's name to the walls — and they will not remember you at all."
  },
  "shtepia": {
    "title": "Home Again",
    "blurb": "You went down into the world below and did what the old songs promise of a dragua: you broke the drought. And know what it was you beat: the Kulshedra, the old dark itself — the many-headed, fire-spitting she-dragon who withholds the rain and hoards the springs, who demands a maiden to release the waters, and who began, they say, as a mere snake that no human eye saw for too many years. The water ran red, then clean, up through every well to the dying villages above. There is no crown and no king’s daughter waiting — only your own fshat, its wells brimming and its children alive. But that is the whole of it, and it is enough: for a hundred years they will sing your name at the spring."
  },
  "dranguasi": {
    "title": "The Drangue Awakens",
    "blurb": "You hurled the thunder-stone — the kokerr rrufeje — the way the Drangue strike the Kulshedra in the storm-clouds, and lightning answered your open hand. The crowned head fell, and below you the springs the dragon had hoarded broke loose and ran red, then clear, up through the well-shafts to the parched villages above. You were born with the caul; you were born for exactly this. The rains will come now, and come again every year the dragon’s brood crawls back — for there will always be a Drangue, and now the land knows your name."
  },
  "mishiVetes": {
    "title": "Flesh for the Eagle",
    "blurb": "There was no meat left, and the eagle would not fly without it — so you drew your knife across your own thigh and fed the great bird your own flesh — the hard old bargain of the deep places, where the hero feeds the eagle piece by piece from his own leg. Wing-beat by wing-beat it bore you up the black shaft toward the daylight. You reach the living world torn and limping, but you reach it — alive, scarred, and not forgotten. Some buy their way out of the underworld with gold; you bought yours with your body."
  },
  "lemoshaFund": {
    "title": "Lëmosha — the Open Hand",
    "blurb": "The man at the great door had neither bread nor lek, and you put one hundred lek in his hand without being asked. That is lëmosha, the alms-giving that sits beside hospitality at the root of the old code: the guest is sent by God, and so is the man at your door with nothing. Dora që jep s’mbetet zbrazët, the old people say — the hand that gives is never left empty. Yours already isn’t: you gave money in Albanian and were thanked in it, and no phrasebook sells that."
  },
  "plisiFund": {
    "title": "The Plis — a White Cap Older than Rome",
    "blurb": "The trader set the plis on your head — the brimless white skullcap felted by hand from sheep’s wool, the most iconic single piece of Albanian men’s dress, older than any of the empires that marched past it. White wool on a walker’s head — you will pass for a friend of the country now, wherever the road takes you."
  },
  "xhubletaFund": {
    "title": "The Xhubleta — the Bell of the Alps",
    "blurb": "The trader unfolded a xhubleta — the undulating, bell-shaped dress of the northern Alps, black above all, embroidered with suns, moons, stars, eagles and serpents whose meanings are older than any church. A girl put it on at womanhood and it announced her standing ever after. You did not buy it — some things a traveller only gets to look at — but you know now what walked the mountain paths for a thousand years."
  },
  "kafejaFund": {
    "title": "Kafeja — the Slow Cup",
    "blurb": "The woman of the inn made you kafe turke — ground fine, boiled slow in the little copper xhezve, served small and strong with a glass of water on the side — and you drank it the only correct way: avash-avash, slowly, slowly, in no hurry at all. Coffee is the social ritual of Albanian life; a single cup can anchor a whole afternoon of friends, business and gossip, and to set one before a guest is as much a part of the welcome as bread and salt. You did not just drink a coffee. You kept somebody company."
  },
  "fallFund": {
    "title": "Fall — the Fortune in the Cup",
    "blurb": "When the cup was done the woman turned it over on the saucer to cool, righted it, and read your fortune in the shapes the grounds had left — love in one quarter of the cup, the far future in another, all of it told half-laughing, the way the fall is always told. Reading the coffee is a routine, sociable little magic done by women of every background, kept up even where belief has gone loose; Tuesday and Friday are its lucky days, and Sunday is left alone. \"A guest is coming down your road,\" she said. She was right before she said it — you had already come down hers."
  },
  "gezuarFund": {
    "title": "Gëzuar! — the Raki of Welcome",
    "blurb": "The woman set out the little glass of raki — the home-distilled grape spirit that is the drink of welcome, of celebration and of mourning alike — and you met her eye and answered the only right way: Gëzuar! To offer raki is to offer trust. In the north the coffee and the raki arrive together, and nobody thinks that strange. You drank to the house, and the house drank to you."
  },
  "besimeFund": {
    "title": "Shenjat — What the Kitchen Mutters",
    "blurb": "The healer talked signs while the herbs steeped, and every one is still said reflexively in Albanian houses: an itching palm means money on the move; a dropped knife brings a male guest, and a dropped spoon a female one. There are dozens more where those came from, and all of them are genuinely still said. You now know what the kitchen is muttering about."
  },
  "kurbetiFund": {
    "title": "Kurbeti — Work Far Away, Heart at Home",
    "blurb": "The young traveller is going where so many have gone before him: në kurbet — out into the world for work, while the family stays behind. The kurbet is centuries old and has a whole songbook of its own, songs of the road, of longing, of the mother waiting at the gate — and it is not history — the roads still lead out, the money still comes home, and the songs are still being lived. He told you he will come back one day. They all say it — and a remarkable number of them mean it."
  },
  "thesarKthyer": {
    "title": "The Untouched Bazaar",
    "blurb": "Your torch lit the whole heaped bazaar of the dead city — gold, jewels, fair raiment laid out just as in Durham’s telling of the Gjakova cavern — and you did not lay a hand on one single thing. So the flame stayed bright, the coiled Orë let you pass, and you climbed back into the daylight with empty hands and your life still your own. They say no man has ever carried so much as a coin out of that cavern; the wise are the ones who walk out exactly as they came in. (Edith Durham, High Albania, 1909.)"
  },
  "gjarperVrare": {
    "title": "The Serpent’s Hoard",
    "blurb": "You cut down the guardian serpent and the gold of the dead city was yours — but a hoard-serpent is an Ora in beast-shape, set over the treasure to watch it, and gold taken over her body never comes clean. The old people tell the same doom of the vitore, the golden house-snake that dwells in a house’s walls and lays its luck coin by coin: a greedy family killed theirs once, to seize the gold at a stroke — their house burned and their line failed, and now their doom was yours. You dug your hundred wells and the village drank — yet the water ran brackish, the cattle sickened, and at night a cold hiss followed you. Some serpents are not for killing."
  },
  "gjarperNgrene": {
    "title": "Greed in the Dark",
    "blurb": "You reached out and closed your hand on the gold — and it happened exactly as the old man warned. Your torch went out as though a fist had shut on the flame, and in the blind dark the heaped bazaar woke: the Orë of the dead city, no true serpents but spirits in serpent-shape, sprang up and devoured you where you stood. In Durham’s Gjakova they say no man who ever touched one single thing came back out of the cavern. Now you are one of them."
  },
  "djegur": {
    "title": "Burned by the Kulshedra",
    "blurb": "You ran, but the Kulshedra breathes fire. The dark world keeps the Beauty and the water both."
  },
  "detiUp": {
    "title": "The Beauty of the Sea",
    "blurb": "At the bottom of the black water you found Bukura e Detit, the Beauty of the Sea, and she bore you up through the dark to the light and set you again upon the living earth. You did not climb out a conqueror — the eagle’s road was never yours — but you came up alive, and the springs the Kulshedra once hoarded were already running green through the valleys above. Some heroes are carried home by the deep itself; the sea, this once, was merciful."
  },
  "detiNgrene": {
    "title": "The Black Sea",
    "blurb": "You stepped into the black water and it closed over you. Not every deep has a Beauty waiting; some hold only the dark."
  },
  "oraBardhe": {
    "title": "Led Home by your Ora",
    "blurb": "Lost in the dark, you met your own — for every Albanian is born with an Ora, a fate-spirit assigned for life, a personal fortune-keeper who may walk as a bird, a beast, a woman or a serpent. Yours came as e Bardha, the White, the one who deals out good luck, and she led you out of the dark and home, alive. The old people say a man rarely sees his Ora even once — but she sees him all his days."
  },
  "oraZeze": {
    "title": "The Black Ora",
    "blurb": "You fled the light, deeper into the dark. There are three Fates; the one that found you there was e Zeza, the Black — the Fate who decides death."
  },
  "eaten": {
    "title": "Eaten by the Wolf",
    "blurb": "A starving wolf is all teeth, and the only thing that gentles it is bread — shared, not withheld. With a loaf in hand you might have won a companion instead of a grave; with empty hands, your legs would have served you better than your fists. You chose to fight, and a hungry wolf does not lose. The songs are older and crueller than the village tells."
  },
  "shtojzovalleVallja": {
    "title": "The Endless Round",
    "blurb": "The Shtojzovalle — \"may God increase their dance\" — are the airy ones, the half-seen fairies who come out under the moon to sing and turn in their ring. You stepped into their round; and the old people could have warned you — whoever joins the dance of the fairies dances on. You turn yet beneath that moon, beautiful and tireless and no longer quite a man, while the years you were meant to live spool away in another’s hands."
  },
  "shtojzovalleLot": {
    "title": "The Fairies’ Tears",
    "blurb": "You laid hands on a Shtojzovalle maiden, and she wept — and the old people say a fairy’s tears are death: let a single one fall upon a mortal, and he dies. Hers fell upon you. The airy ones are not for the grasping hand; they are seen at all only by grace, and never kept by force."
  },
  "shtojzovalleNuse": {
    "title": "The Airy Bride",
    "blurb": "There is one way to keep a Shtojzovalle, the old tales hold: give her clothes of your own to wear, and she will stay. You laid your shirt across her shoulders, and the airy maiden came home with you — a wife out of the moonlight, who spins good fortune into the house so long as she is treated with unfailing gentleness. The fairy-wife is kept by gentleness, or she is not kept at all."
  },
  "shtojzovalleBekim": {
    "title": "Blessed of the Moon",
    "blurb": "You came upon the Shtojzovalle at their moonlit round and did the wise thing: you watched in silence and drew back without breaking their ring or treading on the unseen. The airy ones, who spin the thread of every human life, were pleased — and into your own thread they wove a little more length and a little more luck. Some powers you do not seize and do not join; you honour them, and you step back."
  },
  "besaFire": {
    "title": "The Sacred Guest",
    "blurb": "The cold stranger at your night-fire was an Ora in an old woman’s shape — for in the old country a guest is sent by God, and to feed a traveller is a besa sacred above all. She blessed you; and rather than carry her blessing on into the dark, you chose to rest by her fire, and woke at dawn safe and strong, your hospitality repaid the way the songs promise."
  },
  "shtrigaIkur": {
    "title": "Salt in the Flames",
    "blurb": "You cast salt into the fire as the old ones taught. The Shtriga shrieked, shrank to a moth, and fled before the dawn. You kept your years — and the night-witch will not come again."
  },
  "kreshnikRrembimiFund": {
    "title": "The Youngest Kreshnik",
    "blurb": "Halili brought Mujo’s own courser to the Krajl’s iron door. The horse struck it apart, and the younger brother led the elder out of captivity. You rode beside Halili on the rescue road, but the feat remains his: when Jutbina had no other champion, its youngest kreshnik answered at midnight and brought Mujo home alive."
  },
  "kreshnikRrembimiHumbur": {
    "title": "The Guard Hears You",
    "blurb": "You called the guard and lost your place beside Halili. He escaped the alarm, circled back alone with Mujo’s courser, and completed the rescue the song fixes: the horse broke the iron door and the brothers rode home. Jutbina remembers Halili, while your shout survives only as a warning about choosing whom to call."
  },
  "kreshnikRrembimiRefuz": {
    "title": "Halili Rides Alone",
    "blurb": "At Halili’s door you said you could not come. He did not leave his brother in chains: the young kreshnik took Mujo’s courser and rode alone, just as the song requires. By dawn the horse had broken the iron door and both brothers were riding home. Jutbina remembers Halili’s rescue; it simply has no verse about you beside him."
  },
  "behuriFund": {
    "title": "Mujo and Behuri",
    "blurb": "Mujo asked for a last look at the sun. Behuri turned his face for an instant; Mujo found the poisoned dagger, killed him, and cut off his head. Behind them Behuri’s tower fell in fire. The song ends harshly, with Behuri’s captive daughters taken toward marriages in Jutbina; the game names that coercion plainly and does not recast it as a chosen romance. You return as Mujo’s companion, not the owner of his victory."
  },
  "behuriKotorHumbur": {
    "title": "The Wrong Road",
    "blurb": "You followed Dizdar Osman toward New Kotor after Mujo’s courser wept its warning. That company never returned. Behuri met it beyond the pass and hung its heads in his tower. The song lets the horse know what men refuse to hear; the wrong road begins with “I do not agree” and ends far from home."
  },
  "behuriBurimHumbur": {
    "title": "Water from the Ambush",
    "blurb": "At Xhuri’s spring you drank after Mujo’s Ora said not to. The warning came one breath before Behuri’s hidden men rose from behind the stones. In the song Mujo lives because he listens to what no one else can hear; the clear water is only the surface of the trap."
  },
  "behuriKullaHumbur": {
    "title": "Behuri Comes Home",
    "blurb": "You waited inside Behuri’s own tower after Mujo smelled the powder and told you to leave. Behuri came through the gate with blood on his saddle. A hostile kulla is not a refuge: its rooms, doors, and hidden men all belong to the man riding home."
  },
  "behuriMejdanHumbur": {
    "title": "The Last Light Lost",
    "blurb": "On the mejdan you told Mujo to surrender instead of repeating his Ora’s sun-trick. Behuri did not grant a besa. The last low light passed, the poisoned dagger stayed hidden, and the kreshnik who might have turned the duel was held against the earth."
  },
  "mujiFund": {
    "title": "The Strength of Mujo",
    "blurb": "This is how Gjeto Basho Muji of Jutbina came by his strength, and how you came by yours: in the night you found two cradles by a great stone, two infants crying, and you rocked them till dawn though no one had asked you. Their mothers were Zana, and they gave you their own breast to suckle; you rose able to lift the very stone you had slept beside. Around that herdsman-made-hero the whole epic turns, and the strength the fairies fed him is the strength the lahutë has been singing ever since."
  },
  "mujiPasuri": {
    "title": "Gold, but no Strength",
    "blurb": "The Zana offered you strength, wealth, or wisdom, and you chose the gold. You went away rich — but no stronger than any man; and the day a Baloz rises from the sea or a Kulshedra coils on the spring, gold lifts no sword. The kreshnik in the old songs knew to choose otherwise."
  },
  "mujiDije": {
    "title": "The Speech of Birds",
    "blurb": "You asked the Zana not for strength but for knowledge, and they taught you the speech of the birds and the hidden names of things. It is a rare and a quiet gift — but it is not the gift that hurls a Baloz into the sea. Mujo, the songs say, chose strength; you chose to understand."
  },
  "shqipeFund": {
    "title": "Son of the Eagle",
    "blurb": "On the long road home you came upon what the family story begins with: a great eagle carrying an apparently dead serpent to its nest and flying off — and the serpent not dead at all, but ready to kill the chick. You killed it as the hunter in the legend did, carried the young eagle off — and when the mother caught you on the road and offered her bargain, you gave her child back. So she gave you the sharpness of her eyes and the strength of her wings. The rescued eagle stayed bound to you and, when both of you were grown, followed over your hunts and battles. You became king and bore the eagle’s name — Shqiptar, Son of the Eagle — in Shqipëria, the Land of Eagles. You had already broken the drought; this was the blessing that named the hero you became."
  },
  "shqipeKapur": {
    "title": "A Hunter, No More",
    "blurb": "The eagle offered you everything — her eyes, her wings, her name — for the one thing you had taken. You kept the eaglet instead. She wheeled once above you and was gone, and the bargain with her. You have a captive bird and a good bow, and the wild game still falls to your arrows; but you never receive the name the family story remembers. You are only a hunter — a good one — where you might have been the first Son of the Eagle."
  },
  "sariFund": {
    "title": "Sari Salltëk’s Tongues",
    "blurb": "The dervish Sari Salltëk slew the seven-headed Kulshedra at Krujë with a wooden sword and cut out its seven tongues. When a false hero claimed the deed, the seven tongues proved who had truly done it. Cut the tongues, the old dervishes say, lest another steal your glory. They say the saint himself has seven graves in seven lands."
  },
  "gjarperBurrVdes": {
    "title": "The Broken Silence",
    "blurb": "You could not hold your tongue, and his secret was spoken aloud. The spell snapped shut: the youth was a serpent again, and slid away into the dark to stay one forever. Some secrets a bride — or a friend — must carry to the grave."
  },
  "gjarperRefuz": {
    "title": "The Suitor Refused",
    "blurb": "An old woman’s snake-son raised a palace overnight and asked for the king’s daughter, and you turned from it as a monster. So you never saw what the wedding night would have shown — that under the cold skin slept a young man held by a spell. In the tale it is the bride who weds the snake who breaks the curse; the one who flees only leaves a man enchanted forever, and never even knows it."
  },
  "gjarperKulVdes": {
    "title": "Beyond the Sea",
    "blurb": "The Kulshedra who held your husband beyond the sea was never going to fall to a sword — she is older than the heroes, and the tale frees him not by force but by wit, by answering her impossible chores with cleverer tricks. You drew steel instead, and the sea kept you both."
  },
  "gjarperBurrFund": {
    "title": "The Serpent Bridegroom",
    "blurb": "By night the serpent shed his skin and stood as Shpejti, a young man who begged you never to tell. Later, goaded at a wedding, you blurted out his secret and he vanished. You put on iron shoes and searched through the houses of the Sun, Moon and Wind until you found him captive beyond the sea. There Shpejti supplied every saving trick: the bread-crust sweep, salt water for cauldrons of tears, and finally the coffin in which he trapped and burned the Kulshedra. Your long search found him; his wit freed you both; together you came home, and he remained a man for good."
  },
  "nastradinFund": {
    "title": "Nastradin’s Cauldron",
    "blurb": "You lent Nastradin Hoxha your cauldron, and he returned it with a little pot inside — \"your cauldron gave birth.\" Next time he kept it: \"the cauldron died.\" When you protested, he shrugged: \"if a cauldron can give birth, it can die.\" You laughed, and let the hodja keep it."
  },
  "kostandinFund": {
    "title": "The Besa Beyond Death",
    "blurb": "A son had sworn his mother a besa — dead or alive, he would bring her far-married daughter Doruntine home whenever she wished — and then he and all his brothers died in the war. At the lonely mother’s curse the dead Kostandin rose from his grave — no lugat, but a brother bound by his besa — and rode the night roads to keep his word. He found Doruntine, set her on his horse, brought her to the door, and returned to his grave. In the Chameria ballad followed by this scene, mother and daughter both die when the truth is spoken. A 1954 Albanian prose telling preserves a different ending: only the mother dies, while Doruntine remains alive outside the door. Both are attested tellings; this scene names its two-death variant instead of silently merging them."
  },
  "gjizarKap": {
    "title": "Caught in the Palace",
    "blurb": "You woke the Earthly Beauty. In her own palace, far down the road of no return, she keeps Gjizar the nightingale in a golden cage — and the thief who reaches for it loudly, instead of slipping the cage away after lighting the four unlit lamps and extinguishing the four dying ones while she sleeps, she catches in her own hands. Some birds are only won quietly."
  },
  "gjizarPus": {
    "title": "Silent in the Cage",
    "blurb": "You stayed in the well, and let your brothers carry Gjizar off and claim him for the king. But the nightingale will not sing for the false hands that stole him from the one who truly won him — so they had a silent bird in a golden cage, and you the dark at the bottom of a well. A bird won by treachery never sings."
  },
  "gjizarFund": {
    "title": "Gjizar the Nightingale",
    "blurb": "A king’s three sons sought Gjizar the nightingale for his mosque. Down the road of no return, you combed the lice from a wild woman’s hair, saved the tiger-wife from the oven’s embers by moving them with leaves, befriended the tiger, and opened the blind lion’s eyes. Three eagles attacked; you cut a wing, a leg and a beak. Their mother hid you in her field-house, where you saw them bathe into three maidens. Each swore by the stranger who had wounded her. Pedersen’s source makes their price a month as husband to each; this age-suitable staging says plainly that you stay one month with each sister before their one-hour flight. You lit the Beauty’s four unlit lamps, extinguished the four that were dying, and quietly took Gjizar. The sisters returned you to the three stones; the rings led you to one brother’s barber shop and the other’s coffee house. On the road home they cut the well-rope, stole the cage and lied. Gjizar fell silent. The Earthly Beauty came by warship, disproved the eldest brother’s cypress-tree claim, had him killed, and fired a cannon into half the palace until the frightened middle brother confessed. The king pulled you from the well; when you could speak, Gjizar sang. You told the Beauty exactly how you won the bird, and married her. (Pedersen, pp. 30–35; Elsie tale 14.) A nightingale sings only for the one who truly won it."
  },
  "tsFundTomor": {
    "title": "The Mountain That Remains",
    "blurb": "You took the Earthly Beauty to wife and guarded the city you loved; when the rival crept down at dawn, your four eagles woke you, and your first thought was to send her home on the wind before you ever took up the scythe. You fell of the wounds you and the rival gave each other — but a giant’s death is only his becoming the mountain forever. Your snow-bearded peak still stands over Berat, still sworn by above Bible or Qur’an, still arming the heroes who climb to you; and the Beauty’s tears run down below as the river Osum."
  },
  "shpiragFund": {
    "title": "The Furrowed Ridge",
    "blurb": "You reached for the city that was never yours and slipped down at dawn to seize it while the old man lingered with his bride — but his eagles cried the alarm, and his scythe found you again and again. Both of you died of the other’s blows. You are the mountain still, but the beaten one: the long furrows a scythe gouged down your flank are read in the rock to this day, and the Earthly Beauty’s tears run past your foot as the river Osum. The land keeps the honorable giant’s name — and forgets yours."
  },
  "dhiaFund": {
    "title": "The Golden-Horned Goats",
    "blurb": "A wedding party stood frozen to stone — the work of the wild Zanas. Their strength, as Mujo learned, was hidden in goats with golden horns. Seizing the goats, you held the Zanas’ very power in your hands and forced them to swear a binding besa: free the guests and never harm them again. Bound by the oath no Zana dares break, the stone wedding drew breath once more. It was never the gold that saved them — it was the oath."
  },
  "balozFitore": {
    "title": "Gjergj Elez Alia",
    "blurb": "You found Gjergj Elez Alia in his tower as the oldest song tells it: nine years bedridden with nine wounds, kept alive only by his sister, who for nine years washed his wounds and dried his blood with her own hair. When the Black Baloz that had taken the coast’s yearly tribute of a maiden from each house came at last for her, her tears woke him, and though his nine wounds still bled he rose, took the sword you put in his hand, and went down to the shore himself. The sea-ogre mocked him for a dead man come from the grave; he dodged its hurled stone and struck its head from its shoulders, and freed the coast of its tribute forever. Then, the danger past, brother and sister embraced — and in that one breath both their hearts stopped together, the way the song says they must, and you laid the two of them in a single grave under one stone. The lahutë sang Gjergj and his faithful sister for five hundred years; now it sings you beside them."
  },
  "bregFle": {
    "title": "The Sea’s Tribute",
    "blurb": "You did not take up the fight, and the Baloz took the maiden it came for. The coast still pays its yearly tribute to the dark water, and the wounded hero you might have stood for grieves alone. No song is sung for the one who turns away."
  },
  "bregHumb": {
    "title": "Lost to the Sea",
    "blurb": "You fled instead of standing by Gjergj, and the Baloz caught you at the water’s edge. The sea is older than any hero, and it keeps what it takes."
  },
  "zanaGold": {
    "title": "The Lesser Gifts",
    "blurb": "By the boulder the Zanas offered you what they once offered the young Mujo — wealth, knowledge, or a hero’s strength — and you reached for the gold. You went home the richest man in the valley, and the Kulshedra kept the water. Remember whose gold it was: the zana of the mountain is no petting fairy — she whose milk makes heroes, as she told you herself. Her gifts are real, and so is the cost of choosing the smallest of them."
  },
  "zanaDije": {
    "title": "The Zanas’ Wisdom",
    "blurb": "By the boulder the Zanas offered you wealth, knowledge, or a hero’s strength, and you chose knowledge. You went home the wisest man in the valley — wise enough to know what you had refused: for it is zana-milk that makes the kreshniks, the strength that suckled Mujo himself to a might matched only by a drangue’s. Wise enough, at last, to understand that you had held that very choice in your hand and let it pass. Some gifts are a quiet kind of grief."
  },
  "periFund": {
    "title": "The White Fairy of the Heights",
    "blurb": "On the mountain you met a perí — and learned a traveller’s lesson in words as well as spirits: peri is simply another of the names the Albanians lay on the same white fairies the highlands call zana and orë — not a separate folk, but another word for them. Like all the fairies she watches how mortals treat bread: you broke yours and gave her a share, and for that she let her grace fall on you — the road open and her good will, which is worth having and dangerous to lose. Honour your bread, whatever name the fairy goes by."
  },
  "periKeq": {
    "title": "The Wasted Bread",
    "blurb": "You threw your bread to the ground before a Peri — a white-clad fairy of the heights — and of all things the perí cannot forgive the wasting of bread. They bend the squanderer into a crooked hunchback and wither the careless hand. You went down the mountain twisted and cursed; the old people would have shared the last crust with a stranger sooner than let one crumb fall to waste."
  },
  "nenaDiellFund": {
    "title": "The Funeral of the Sun’s Mother",
    "blurb": "You kept the strangest and gentlest of the old spring rites: the funeral of Nëna e Diellit, the Mother of the Sun — a mother-goddess of the sky, the fields and the herds. At the close of the spring cycle, near Pentecost, the girls of the village mould a little doll of clay, name her the Sun’s Mother, and carry her out beyond the houses to bury her with real weeping and a real lament — \"Mother, oh Mother, the Sun came and did not find you.\" It is the goddess’s own death and burial, so that, mourned and laid to rest, she may return green with the turning year. You wept her down into the earth, and summer climbed up behind her."
  },
  "karkanxhollFund": {
    "title": "The Caller at the Door",
    "blurb": "In the dead of the twelve dark nights between Christmas and Epiphany, the karkanxholl walks — a small iron-shirted revenant dragging its chains through the snow. It knocks and it calls; whoever opens the door or answers the name is cursed or carried off. You kept the door barred, held your tongue, and gave it nothing, and at cock-crow it went back into the dark."
  },
  "karkanxhollKeq": {
    "title": "Answered in the Night",
    "blurb": "It called your name through the door, and you answered — the one thing the old people forbid on those twelve haunted nights. The karkanxholl, the iron-shirted thing that walks between Christmas and Epiphany, takes those who answer it. You were never seen again; in the spring they found only your name, worn smooth on everyone’s lips, and no one left to wear it."
  },
  "dhelpraFund": {
    "title": "Kuma Lisa Caught Out",
    "blurb": "The fox and the wolf bought a field together and hid a tub of honey and a basket of white loaves in a bush for their work. Three times the fox pretended she was called to a christening; three times she ate from the cache, naming each imaginary child for the falling level of the honey. When the wolf found the tub empty and upside down, the fox denied everything and sent him to search again. You saw through the lie — but while the wolf searched she slipped into a hole, fooled his hooked stick by calling roots her leg and her leg a root, and escaped."
  },
  "dhelpraKeq": {
    "title": "The Fox’s Christening",
    "blurb": "You believed the fox’s bare denial and told the wolf that he must have searched badly. While he turned the bush over again, the fox slipped into a hole and escaped. The tub had held honey, not butter, and nothing was smeared on anyone’s mouth: as von Hahn tells it, Kuma Lisa survives by invented christenings, brazen denial and the root-or-leg trick at her burrow."
  },
  "nastradinGjyqFund": {
    "title": "The Sound of the Coin",
    "blurb": "A poor man had warmed his dry bread in the steam of the cook’s pot, breathing the smell of the soup, and the cook hauled him before Nastradin Hoxha demanding to be paid for the aroma. The hodja heard them out, drew a coin from his pocket, shook it so it rang beside the cook’s ear, and pocketed it again: \"The sound of the coin pays for the smell of the food.\" A debt of nothing, settled with a coin of nothing — and the whole bazaar laughed the greedy cook home."
  },
  "nastradinGjyqKeq": {
    "title": "Paid for the Smell",
    "blurb": "You took the cook’s side and made the poor man pay real gold for a smell he could not help breathing. The cook went home rich on nothing, and a hungry man went home poorer — the very injustice Nastradin’s ringing coin was invented to mock. Some judgments cost more than they settle."
  },
  "rushaFund": {
    "title": "Rusha of the Krajl",
    "blurb": "Like Zuku Bajraktar in the old song, you rode into the Krajl’s tower for Rusha, his daughter across the frontier; and when she brought you coffee you would not take her away until she swore you the besa — God’s own oath — that she came of her free will. She gave her word, climbed up behind you, and you rode for Jutbina — a bride won not by the sword but by the sworn word. (What Muji made of it when you came home, the old singers leave for another night.)"
  },
  "rushaKeq": {
    "title": "Taken Without the Oath",
    "blurb": "You reached for Rusha without waiting for her besa, and a maiden carried off by force from the Krajl’s tower is a war, not a wedding. Her cry brought the Krajl and all his guard; you were cut down on his own stair, your boast unkept and your head left behind just as you swore it would be. The kreshnik wins the enemy’s daughter by binding her with the sacred oath — never by the grab that any brigand could make."
  },
  "pallatiKthim": {
    "title": "The Maiden Brought Home",
    "blurb": "You brought the queen’s daughter home. A childless queen had prayed to the Sun and promised her girl at twelve; when the day came the Sun carried her off to his house in the sky, and her grieving mother had the whole palace painted black and shut her door on the world. You read the old book, walked the road that runs on the Sun’s own rays from the peak of Tomorr, and out of his house — past the Kulshedra that would have devoured her — you brought her home on the antlers of a stag. The black is washed from the walls now; the door that had not opened in years swings wide, and the queen carries out to the stag the three okas of fresh hay it asked in return. In this old tale the Sun is no tyrant: he rejects the hungry Kulshedra and tells the maiden to call another creature; she herself summons the stag that bears her safely home."
  },
  "diellKulVdes": {
    "title": "The Wrong Beast",
    "blurb": "The maiden called the creatures herself. The Sun added the Kulshedra to the line and tested it — “If you were hungry, what would you eat?” “I’d eat her.” “And if you were thirsty?” “I’d drink her blood.” He rejected that carrier and told the maiden to call another creature; she chose the stag herself. You overruled them both and kept the Kulshedra, which carried her off exactly as it had promised: into its own belly."
  },
  "pemaVdes": {
    "title": "Down From the Tree",
    "blurb": "The Kulshedra called sweetly — \"Come on down, so that we can talk\" — and the maiden came down. In the old tale she knows better: she stalls it (\"You run home first and I’ll climb down when you return\") and waits for the stag. Down from the tree there was no stag to save her, only the open jaws that had followed them the whole road home."
  },
  "mbretiDrejtesi": {
    "title": "The Goose-Girl and the Marble King",
    "blurb": "A locked garden opened for one girl alone and shut her in among people and beasts of marble, with a marble king and his scroll: whoever stays awake three days, three nights and three weeks will bring him back to life. You kept the long vigil — but worn out at the last, you bought a maidservant to watch while you slept, and she stole your place: dressed in your clothes, she told the waking king she was the one who had kept watch, and he married her. Demoted to goose-girl, you wept your true tale in your little hut until the king himself overheard, learned who had really woken him, took you for his wife, and had the false bride executed. The patient one is known in the end, however long the lie wears her clothes."
  },
  "patatHesht": {
    "title": "The Silent Goose-Girl",
    "blurb": "You held your tongue. In the old tale the goose-girl weeps her woes aloud in her hut, and the king overhears and the truth comes out; you kept yours behind your teeth, and a truth never spoken changes nothing. The false bride kept her stolen crown, and you kept the geese — for the rest of your days, a queen’s daughter in a hut at the edge of the yard, known to no one."
  },
  "mermerSli": {
    "title": "Asleep in the Marble Garden",
    "blurb": "You slept, and the vigil was broken. The marble king the scroll promised you could wake stayed cold stone forever, and the garden that opened for you only once never opened again. They say a girl who fails the three-weeks’ watch joins the marble — one more grey figure in a garden of the almost-living."
  },
  "djepiKeq": {
    "title": "The Yellow One’s Gift",
    "blurb": "The Fates asked you one question over the cradle, and its answer had just left their own lips: the White gives good, the Yellow gives ill, and it is the Black who deals the end. You answered wrongly — and it was e Verdha, the Yellow, who smiled. She is the Fate of bad luck and crooked spells, and a wrong word before the three sisters is exactly the opening she waits for. The old people set out bread for the Fates and keep their mouths careful; you gave the bread, and then gave her the opening anyway."
  },
  "djepiFund": {
    "title": "The Three Fates at the Cradle",
    "blurb": "In the night after a child is born, the old people say, the three fate-women — the Fatí, the northern Orë — come to the cradle to settle its whole life: e Bardha, the White, deals out good fortune; e Verdha, the Yellow, ill luck; e Zeza, the Black, the hour of death. So the house is swept and bread set out for them, that they go away pleased and bless the newborn rather than curse it. You kept the custom — laid out the bread — and the White Fate smiled on the cradle; the child will carry a white-faced Ora at its shoulder all its days, and meet its share of luck."
  },
  "gjysmegjelFund": {
    "title": "The Half-Rooster",
    "blurb": "Gjysmëkokoshi, the Half-Rooster — one leg, one wing, half a bird and all cunning — is the hero of a beloved Albanian children’s tale. Hungry after swallowing a frog, a fox, a wolf and a mouse along the road, he entered the king’s cabbage garden and crowed until the servants caught him. The king tried four times to kill him, and each belly-companion answered: the frog drowned the oven fire, the wolf fell on the horses, the fox on the geese, and the mouse gnawed open the gold-chest. The Half-Rooster swallowed the king’s gold and hopped home crowing. No king had seized a coin from him at the opening; the one lost coin comes only later, on the road home. The smallest and half-made outwits the mighty."
  },
  "kulleFal": {
    "title": "The Blood Forgiven",
    "blurb": "You carried the besa between the towers, and the man who had not stepped out of his kullë in years walked into the lane a free man. Look at the house that held him: the kulla, the fortified stone tower-house of the northern highlands, walls an arm thick and one guarded door. Under the Kanun it was home and inviolable refuge in one: a man \"in blood\" could shut himself inside for years and no enemy might touch him within its walls — a besa built in stone, keeping its word for as long as the feud lasted. Two families that had been counting their dead stopped counting."
  },
  "kulleGjak": {
    "title": "Blood for Blood",
    "blurb": "You urged the old law, and the old law fed itself — blood for blood, a life for a life, and the tower stayed shut and the children grew up indoors. The feud you might have closed with a single word ran on into another generation. The Kanun grants a man his right to revenge; but the wise old ones always say the brave thing is to forgive the blood, not to take it."
  },
  "bijaHeneFund": {
    "title": "Daughter of the Moon and Sun",
    "blurb": "Down from the sky came E Bija e Hënës dhe e Diellit — the Daughter of the Moon and the Sun, the lightning-maiden born of the married Sun and Moon and sent down against pride and evil. She stood with you until the last head fell and the rain came back."
  },
  "ujkuUje": {
    "title": "Brother Wolf",
    "blurb": "The starving wolf you fed was no wolf at all — it was a drangue in a wolf’s hide, one of the storm-heroes born among men to do battle with the kulshedra. When the drought bit cruellest it shed its shape, rose into the black clouds and gave battle, and the rain it loosed there ran down to every parched village. You never knew the hero whose bread you shared — the old people only say a guest is sent by God, and the bread you break is never wasted."
  },
  "syriFund": {
    "title": "Syri i Kaltër",
    "blurb": "You knelt and drank where the serpent’s eye had fallen, and the water ran sweeter and colder than any well — an endless deep-blue spring welling out of the earth, the Syri i Kalter the old people say still weeps near Saranda. You never slew the Kulshedra nor freed the Beauty; you simply found water that would never run dry, and cut a channel to lead it home to your village. Sometimes the drought breaks not by the hero’s sword but by the patient miracle of a spring that does not stop."
  },
  "nenaShtrige": {
    "title": "The Night-Mother’s Lure",
    "blurb": "She was no grieving mother but a shtriga — one of the night-witches of Albanian belief — and the \"lost child\" was only her lure to draw a kind traveller off the road into the dark. Kindness is a virtue, but the old people warned of exactly this: on the night road, you do not follow a weeping woman into the dark."
  },
  "dasmaFund": {
    "title": "Dasma — the Bride Who Crosses Over",
    "blurb": "A dasma in the old style ran for days, and at its heart is one crossing: the bride leaves her father’s house veiled and wept over in ritual sorrow, for she is passing out of one household forever and into another. You watched the bride come in on horseback, silent and still as custom asks. The old people watched a river changing its bed."
  },
  "valleFund": {
    "title": "The Valle — the Line that Teaches You",
    "blurb": "They pulled you into the valle — the chain dance of every Albanian wedding and festival, an open or closed circle behind a first dancer who improvises while the whole line answers his steps. No one asks whether you know the steps; the line teaches you as it turns. You danced at a stranger’s wedding — which, in this country, makes you a stranger no longer."
  },
  "dordolecSyriFund": {
    "title": "The Dordolec on the New House",
    "blurb": "The children’s rain-doll has a sterner cousin: on the new house hung a dordolec — a stuffed figure set there so that the syri i keq, the envious eye, fixes on the odd thing instead of on the thing worth envying. Scarecrow or doll, garlic or blue bead — the old decoy still hangs wherever something enviable rises. Envy looks; the dordolec looks back; the house gets built."
  },
  "dordolecFund": {
    "title": "The Rain-Caller",
    "blurb": "You did not slay the Kulshedra; you called the rain the old way. The children clad the Dordolec head to foot in green — elder and fern and oak — and led him singing through the parched lanes, sprinkling water as they went, their faces turned to Shendelli, the Holy Sun mountain. Old Perendia heard, as the rite promises, and the first fat drops struck the dust. Sometimes a drought breaks not by a hero’s sword but by the village’s own song."
  },
  "bollaFund": {
    "title": "The Dragon Slain Young",
    "blurb": "You waited for Shëngjergj — Saint George’s Day, the one day in the year the saint’s curse lifts and a Bolla unseals its eyes to look on the world and devour — and you struck before it could look on you. The old people say a Bolla left to live grows and grows, sprouts wings, and becomes at last a Kulshedra to swallow the springs. You killed the dragon while it was still small: a drought that would have come in your grandchildren’s day will now never come at all."
  },
  "katallanFund": {
    "title": "The One-Eyed Giant",
    "blurb": "The Katallan — the one-eyed, knee-less giant who eats the travellers that stray into his cave — never saw you coming, for you put out his single eye while he slept; and when he groped for you at the cave-mouth you slipped past clinging to the belly of his own ram, the oldest trick in the world. Homer told it of the Cyclops; the Albanians tell it of the Katallan, and on the mountain road they still warn you never to trust a giant with one eye."
  },
  "katallanVdes": {
    "title": "Eaten by the Katallan",
    "blurb": "You raised your blade to a giant twice your height, and he simply ate you. The Katallan is never beaten with strength — only the cunning that blinds his one eye and rides out under his ram. Force was the wrong answer, as it always is with the one-eyed giant."
  },
  "gjakFund": {
    "title": "The Peacemaker",
    "blurb": "Two houses were locked in gjakmarrja — blood for blood, koka për kokë, head for head — and the road would not open until it ended. You did what the pleqësia of elders do under the Kanun: you brokered the besa, and pleaded the pardon, the falja e gjakut, until the killer and the avenger drank together and became new brothers. A besa kept is worth more than a head taken."
  },
  "zukuFund": {
    "title": "Zuku Bajraktar",
    "blurb": "You found Zuku Bajraktar — a kreshnik, one of the giant border-warriors of the old highland songs, blinded by his own mother after she sided with Baloz Sedelija, the human enemy captain her son had captured. As an Ora once did in the old song, you healed his eyes with her mountain herb; and seeing again, he swore you his besa. The mountain now remembers him as a sworn friend, without turning that promise into an invented battle or a companion the source never sends on your road."
  },
  "kordhaMoatVdes": {
    "title": "The Moat",
    "blurb": "The king’s moat was too wide for any man to clear alone — that was the whole cruelty of his challenge, and the heads along his wall proved it. Ylli the Star could have carried all of you over in a single leap; you tried it on your own, and the dark water closed over your head. A sworn brother’s gift is no use to the one too proud to take it."
  },
  "kordhaZjarr": {
    "title": "The Palace Guard",
    "blurb": "The Earthly Beauty’s palace was guarded by a Kulshedra and her brood, and no single sword could pass them — which is exactly why heroes go to win her sworn together, not alone. You rushed the gate by yourself, and the she-dragon’s fire was the last thing you saw."
  },
  "kordhaProvaVdes": {
    "title": "The Trial of the Spring",
    "blurb": "The Earthly Beauty is not won by force but by passing her trials her own way — and the first is to drink from her spring without ever touching it with your hands. You reached in with both hands like any thirsty man, and the palace closed over you. Her hand is earned by the one who heeds her rule, not the one who grabs."
  },
  "kordhaFund": {
    "title": "The Three Sworn Brothers",
    "blurb": "You held your tongue. The crone never learned that, like Kordha of the old tale, a hero may keep his very life hidden in his blade — so no one could steal your strength and cast it in the sea. Kordha the Sword, Ylli the Star who clears the castle moat with all three on his back, and Deti the Sea who dives to its floor swore you brotherhood, and four such men go down against the Kulshedra as one."
  },
  "kordhaDeti": {
    "title": "Deti’s Dive",
    "blurb": "You told the crone where your strength was kept — as Kordha, in the old tale, once let his own secret slip — and she stole the blade and flung it into the sea, and you sickened unto death. But Deti, the brother who can dive to the floor of any water, went down into the dark and brought your soul back to you. You live, barely, and you have learned the oldest rule of the heroes: never tell a living soul where your own is hidden."
  },
  "shurdhiFund": {
    "title": "Shurdhi’s Storm",
    "blurb": "High in the hail-clouds rides Shurdhi, the northern storm-god who hurls thunder and lightning and looses the crops-killing hail; he is no giver of gentle rain. The old people knew only one answer to him — to bang on iron and fire their guns into the sky and drive him away — and so you beat the iron until he turned his black storm aside, and the village was spared the hail. Some storms you do not pray to; you drive them off."
  },
  "kaliFund": {
    "title": "Mujo’s Horse",
    "blurb": "You did not seize the horse by force — for Mujo’s courser shies from a cruel or unworthy hand — but spoke to it gently and earned its trust. Now the oracular horse that foretells the future, grieves for a fallen rider, and runs swift as the wind, bears you toward the Kulshedra, and warns you of every danger before it comes."
  },
  "thesarLeave": {
    "title": "The Gold Left Buried",
    "blurb": "You heeded the old man and never set foot in the cavern. In the tale the old men tell, men do go down with torches to look — the bazaar of the dead city heaped with fruit and flesh, jewels and fair raiment — but let one hand close on one thing and the torch goes out, and the serpent-Oras devour the thief in the dark; no man has ever carried out so much as a coin. The only ones who come back are the ones who walk out exactly as they came in, empty-handed and alive. You never even went down — and the old people say that is the wisest walk of all."
  },
  "oraVerdhe": {
    "title": "The Yellow Ora",
    "blurb": "You had no offering for her, but you did not flee her either. The Fate who met you in the dark was e Verdha, the Yellow — of the three Fates, the one who deals out bad luck and hard spells. She let you keep your life; but hers is the cold gift, and ill-fortune followed you out of the dark."
  },
  "nastradinUrte": {
    "title": "If a Cauldron Can Be Born",
    "blurb": "You demanded your cauldron back. Nastradin Hoxha only spread his hands: last time it gave birth, and you pocketed the little pot gladly enough — so if a cauldron can give birth, surely it can also die. You had no answer, having kept the child. That is Nastradin all over — the wise-fool hodja whose absurd logic is a mirror: it shows each man the exact size of his own greed."
  },
  "kostandinPushim": {
    "title": "Let the Dead Rest",
    "blurb": "You did not let the old woman speak the curse that would tear her son from his grave. You sat with her grief until the bitterness passed, and she let Kostandin lie still in the earth. No lugat — no dead man risen from his grave — rode the night roads; Doruntine, the far-married sister, never came home across the mountains, and the besa went unkept — but no one fell dead upon the threshold, and the dead slept on in peace. Some say a besa unkept is a wound that never heals; some say the living were owed their lives."
  },
  "lahutaFund": {
    "title": "The Lahuta — a Thousand Songs on One String",
    "blurb": "The traveller sang all night over the lahutë — the old lute of the highlands — and what he sang was no entertainment but a library: the Këngë Kreshnike, the songs of Mujo and Halili, thousands of lines carried in the head and re-made at every singing. Kush këndon, nuk vdes — who is sung, does not die."
  },
  "burrneshaFund": {
    "title": "The Burrneshë — an Oath Instead of a Life",
    "blurb": "The one who sat armed among the men of the oda was a burrneshë — a sworn virgin. Under the Kanun a woman could swear a lifelong oath of celibacy before the village elders and from that day live socially as a man: head of the household, a rifle on her shoulder, a man’s name, a man’s dress, a man’s seat in the oda. The vow was sworn most often when a house was left without a male heir. It was irreversible, and it was never about desire: it was the one legitimate door out of a woman’s fixed lot, and the old people held a burrneshë in full honour. You drank her coffee and heard her out; her house has a head, and her father’s name lives."
  },
  "skenderFund": {
    "title": "The Goat-Candles of Krujë",
    "blurb": "Gjergj Kastrioti — Skënderbeu — held the Ottoman empire off this land for a lifetime of war, and later popular tradition gathered many legends around him. The traveller tells the candle-goat episode: the castle of Krujë besieged and its defenders few, and the hero tying lit candles to the horns of a herd of goats and driving them up by night, so that the enemy mistook the moving lights for a force and broke formation in fear. This is presented as a later popular legend, not a documented event and not the separate Kuteli tale of Skanderbeg and Ballaban preserved in the source board."
  },
  "skenderKeq": {
    "title": "Krujë Falls",
    "blurb": "You would not stoop to a trick. With the enemy at the walls you led your handful of men out into open battle — steel against a host that had no end. The old people tell this legend the other way: there the hero ties lit candles to the horns of a herd of goats and drives them up the ramparts by night, so the besiegers count a thousand watch-fires along the dark walls and break camp before dawn in fear. You gave them no such fright. Your few were cut down in the open, the gate went unheld, and the castle of Krujë — the one stronghold the empire never took in the songs — fell in a single night to the men outside it. A hero is remembered for the ruse that saved the walls, not the charge that lost them."
  },
  "mujoFund": {
    "title": "The Marriage of Halili",
    "blurb": "From the songs of the frontier warriors: Mujo, taunted that his young brother Halil was still unwed, sent him to carry off Tanusha, daughter of the Krajl of Kotor — guarded on the road by the Sun, the Moon and the Zana. Halil reached the Danube and slipped in among her three hundred maidens; Tanusha knew him by a ring that bore his likeness, but the affair was found out and the king cast Halil into the dungeon. From his cell Halil sang on the lahutë, and the song carried to Jutbina and summoned Mujo and the thirty agas, who stormed the king’s hall — Halil cut down the king himself — and carried home both Halil and his bride. One of the rare frontier songs that ends not in a grave but a wedding."
  },
  "ujkuFund": {
    "title": "Why the Wolf Devours",
    "blurb": "In von Hahn’s Albanian myth-note, the Devil kneaded a wolf out of dough and blew until his breath failed, but could not make it live. God, tired of watching, struck the figure in the side with a switch and ordered it to devour its creator. The wolf lived, swallowed the Devil, and carried the switch-mark as the kink in every wolf’s back. The telling explains the old curse that calls on wolf and Saint Michael."
  },
  "verbtiFund": {
    "title": "The Blind Fire-God",
    "blurb": "High in the storm rides i Verbti, the Blind One — the fire-and-wind god the old people held more powerful even than the Christian God, who punishes a foul mouth and an unclean hand. You kept a clean tongue before his flame, and he blessed you: he fanned the fire on the dead hearths and turned the storm’s water back onto the thirsting fields."
  },
  "verbtiVdes": {
    "title": "Blinded by Fire",
    "blurb": "i Verbti punishes foul speech above all, and the old fear was plain: to invoke the Blind One wrongly is to be blinded with fire. You cursed before his flame, and the flame answered — it took your eyes, and you wander the mountain sightless as the god himself."
  },
  "omerFund": {
    "title": "Ajkuna’s Lament",
    "blurb": "Omer, Mujo’s son, barely thirteen, was cornered in a churchyard and fought there to the death; Mujo buried him under a mountain fir, beneath a stone thirty men could not lift, and hid the death from the boy’s mother. But Ajkuna — Omer’s mother, Mujo’s wife — learned of it, and her lament for Omer swelled into a cry for every mother who loses a son to war. The song does not leave her dead beside him: the mountain Oras can bear her grief no longer, hush her lament, dry her tears, and lead her home to Jutbina."
  },
  "lubiaFund": {
    "title": "The Lubia Burned",
    "blurb": "The Lubia is the southern sister of the Kulshedra — a she-demon of seven, of seventy, of a hundred heads, who dries the springs and devours little girls until a maiden is given to her. The old people told that her heads grow back the instant they are cut, just as the Greeks across the water told of their Lernaean Hydra; and so, as Herakles did to that beast, you seared each neck with fire as you struck, until no head could grow again and the southern springs ran free."
  },
  "prendeFund": {
    "title": "The Lady of Beauty",
    "blurb": "Prende — Zoja e Bukurisë, the Lady of Beauty, goddess of love and of the green that returns. She is the morning star that rides up ahead of the sun, and the swallows, the Lady’s Birds, draw her chariot up the dawn sky. You did her honour, and where she sets her foot the earth flowers and the springs remember how to run; she blessed your road and the freeing of the Beauty both."
  },
  "riddleFund": {
    "title": "The Tortoise’s Answer",
    "blurb": "The old man’s riddle — \"it has a packsaddle, but it is no donkey\" — is the tortoise (breshka), who carries her own house-saddle on her back wherever she goes. You read the clue and answered, and the elder, well pleased, blessed your road across the bridge. In the mountains a quick wit is prized as highly as a strong arm."
  },
  "cuckooFund": {
    "title": "Gjon and the Cuckoo",
    "blurb": "You had two brothers and both were named Gjon. By a terrible accident at your sewing, your scissors struck one Gjon dead. Grief changed you into the cuckoo, crying “Ku? Ku?” — “Where? Where?” — by day; it changed the surviving Gjon into the little night-bird that calls the shared name “Gjon! Gjon!” The living brother and sister call across the same woods but, divided by day and night, never meet."
  },
  "cuckooLule": {
    "title": "The Cuckoo-Flower",
    "blurb": "In the other telling, your grief gave you not wings but roots: you lay down in the field and became the little blue flower they call the cuckoo-flower. And when the women come upon you there and sing your own name back to you three times over — asking if you saw yourself, if you saw Gjon your brother — the flower bows its small head down into their open palms, of its own accord, and is still."
  },
  "arusheFund": {
    "title": "The Bear and the Dervish",
    "blurb": "The little dervish could never beat the bear by strength, so he beat it by wit: he crushed a white cheese in his fist and swore it was a stone he had squeezed the water from; he shrugged off the bear’s mightiest cuffs as mere fleabites; and at the last he coaxed the great beast into a cauldron and boiled it in milk. In the mountains the cunning man outlives the strong one."
  },
  "dhampirFund": {
    "title": "The Dhampir",
    "blurb": "The lugat walks invisible, and only the dhampir can see it — the half-living son a revenant fathered on a widow, \"the dhampir knows the lugat.\" (Where no dhampir is at hand, the lugat’s grave is found by leading a virgin boy on a white stallion through the churchyard: the horse balks at the unquiet grave.) He knew the undead thing by sight, wrestled it down in the dark, and unmade it; and the night road was clean again."
  },
  "gjinkallaFund": {
    "title": "Sing Until You Die",
    "blurb": "Your mother lay very sick and called you, and you answered that you could not break off your song. \"Sing, then,\" she said — \"sing until you die of it.\" And so you are the cicada: you sing your one long song through the summer and die of it, dried out, your back fastened to a little stem of grass — the daughter who would not set down her own pleasure to tend the one who bore her."
  },
  "bletaFund": {
    "title": "The Bee",
    "blurb": "A very old, sick mother called her three daughters, and the dutiful one came, tended her and baked a little cake that comforted her. The mother blessed her: “you shall be the light of the ancestors and the food of the living.” So the bee was made — honey for the living and wax for the candles of the dead — and that is why one must never blaspheme in a house that keeps a hive."
  },
  "merimangaFund": {
    "title": "The Spider",
    "blurb": "The sister who would not leave her loom, and the idle one, earned the mother’s other word: one became the spider, condemned to spin a web she can never finish, the other the cicada, to sing her one summer and die parched on a stem. Only the dutiful sister was blessed as the bee. Idleness earns a thankless thread."
  },
  "dallendysheFund": {
    "title": "The Swallow, Friend of Man",
    "blurb": "A ship’s hull tore open without warning. The serpent offered to coil itself into the hole and save everyone aboard, but demanded to learn whose blood was sweetest as its price — and the answer was man’s. The swallow bit out the mosquito’s tongue before it could finish the word, so mankind was spared. The cheated serpent cursed every nest she might build; the swallow answered that she would nest at the head of man, under human protection. Ever after she has nested above our doors, dear as bread, and it is a sin to harm her. This telling gives no blow and no origin for her forked tail."
  },
  "dallendysheGjak": {
    "title": "The Word Let Slip",
    "blurb": "You held still, and the mosquito finished its cry: man’s blood is the sweetest of all. Now the serpent knows what it never should have, and turns its hunger on man for good — striking at him alone down all the years. You flew on, but never earned the protected nesting-place at the head of man and were never held dear as bread. The one moment that could have made you the friend of every house, you let pass."
  },
  "kukudhFund": {
    "title": "The Kukudh Strangled",
    "blurb": "When a lugat is left too long unburned it hardens — around Mount Tomorr above all — into a kukudh: squat and goat-tailed and proof against any blade. Steel is wasted on it; the old people knew it could be killed only one way, strangled with a noose of green vine. You looped the vine about its neck and choked the revenant still."
  },
  "zojzBekim": {
    "title": "The Sky-Father’s Blessing",
    "blurb": "You climbed Tomorr the way the pilgrims still climb it, and gave the sky-father the offering of the old songs — the white bull carried to the summit. Zojz, an old man white-bearded to his belt, the she-eagles wheeling about him and the winds for his servants, found no pride in you to burn. He blessed you, and the winds bore you home. (The mountain is climbed to this day, each August — though the kurban the pilgrims share at the tekke now is a lamb, not a bull for the old god.) The thunderbolt seeks the tall tree and the tall tower; it never finds the one who kneels."
  },
  "diellShenjt": {
    "title": "The Beauty of the Sky",
    "blurb": "Before the all-seeing one you did the hardest thing the Kanun allows — falja e gjakut, the forgiving of blood: you let a feud die rather than feed it. And the sky opened. Dielli, the Sun, is the eye no deed escapes, and that is why he is the witness the old people swear by — për këtë diell, \"by this sun\" — the oath that cannot be taken back, for that witness never sets without having seen. You forgave in the sight of that eye, and it was not ashamed of you."
  },
  "zojzRrufe": {
    "title": "Struck by the Thunderbolt",
    "blurb": "You stood tall before the sky-father and would not bow. But Zojz watches the deeds of men, and the proud he burns: he hurls the thunderbolt on the tall tree and the high tower, and so he hurled it on you. In the old country they tell it to children as a warning — the bolt always finds the one who will not bow."
  },
  "demKeq": {
    "title": "The Offering Seized",
    "blurb": "You did not lead the white bull up — you took it, wrestled it from an old shepherd and dragged it to the holy stone by force. But a gift carried in anger is no gift, and the sky-father knows the difference. The proud hand that seizes the offering is the very hand the thunderbolt seeks; Zojz struck, and the bull and the man who stole it were ash on the rock."
  },
  "ereHumbur": {
    "title": "Lost in the Winds",
    "blurb": "The winds are the sky-father’s own servants, and you raised your fists at them. No one fights the wind. Shurdhi’s hail drove you blind off the path and the storm walked you in circles until the cold had you. The pilgrims who bang the iron and bow their heads come down the mountain again; those who battle the air do not."
  },
  "qiellVerbuar": {
    "title": "Blinded by the Blind One",
    "blurb": "You looked on i Verbti, the Blind One — the fire-and-wind god who burns whatever meets his eye. The old people say you must never look at him, only cover your face and let him pass. You looked. The fire took your sight, and a blind man does not walk down off a mountain."
  },
  "prendeBekim": {
    "title": "Prende’s Blessing",
    "blurb": "You bowed your head, and Zojz let you up into his court — where his daughter waited. Prende, Zoja e Bukurisë: the dawn-goddess, protector of women and giver of love and health, whose name the week itself still keeps — Friday, e premtja, is Prende’s day. She laid her blessing on you, and you came down the mountain whole, and lucky, and loved. Not every gift of the sky is a thunderbolt."
  },
  "ylberKaprcim": {
    "title": "Over the Rainbow",
    "blurb": "The rainbow is Prende’s belt, and the old people tell it plainly: whoever leaps over the rainbow comes down changed — a man a woman, a woman a man. You leapt. You landed on the far slope in a body not the one you carried up, and walked back into the world to learn it new. The sky keeps stranger gifts than blessings."
  },
  "diellApex": {
    "title": "i Bukuri i Qiellit",
    "blurb": "You stood full in the light and the Sun looked back — i Bukuri i Qiellit, the Beauty of the Sky: giver of life and health and energy, the all-seeing eye that misses no deed done beneath heaven. The Earth hides her Beauty in the dark spring and the Sea keeps hers in the deep, but this one rides the open day where every soul can see it. You stood in its light and were counted among the just — the highest of the three Beauties, and the only one that never sets for long."
  },
  "henaPaqe": {
    "title": "The Moon’s Quiet",
    "blurb": "You turned from the burning Sun and asked instead for the Moon — Hëna, who rides the night as the Sun rides the day, mother of the lightning-maiden, the cool eye that does not judge but only watches. She gave you no blessing and no fortune, only quiet: a night without fear, and the road home shown to you in silver — for the old people sowed by the waxing moon and reaped by the full, and carved her crescent beside the sun on their grave-stones. Some who climb all the way to heaven do not want its fire — only to come down again in peace."
  },
  "uraArtesShpetim": {
    "title": "The Bride Warned",
    "blurb": "You were Kiço, the youngest of the three masons of Lluri — the one brother the ballad says was faithful — and you broke the besa anyway. Whether you whispered it in the night as your brothers did to their own wives, or cried out at the pit's very edge with the ring-lie already on your tongue, the price was the same: a besa that buys a bridge with an innocent life is no besa at all, and the old people honoured mercy above stone. The bridge of Arta never stood in this telling. Travellers ford the Arachthos and curse the crossing; the forty apprentices scattered to other work; and no song was ever made — for songs grow from graves, and your wife has none. She raised your son with both her hands free, and only you know what the river was never given."
  },
  "uraArtesMur": {
    "title": "The Bridge of Arta",
    "blurb": "You were Kiço, and you were faithful — the only one of the three. Your brothers whispered in the night; you kept the old wayfarer's besa, and so it was your own unwarned wife who came down to the river with the bread when the other two brides begged off. You told her your ring had fallen into the pit, and she climbed down for it gladly, and the stones closed over her protesting — never sick a day, never hurt, buried alive. From inside the wall she cursed the bridge to tremble as she trembled, then left her last wishes like a blessing: her breast free of the stone, a white fig tree over the pier, its first fruit for her son. They honoured all of it. A silver spring runs from the wall to this day — it raised your boy, and the sick who drink it mend — and the bridge of Arta stands on her bones and has never fallen since. It only trembles when the suffering cross. The besa was kept, as at Rozafa's wall; but the songs of the south do not call you honourable for it — they only teach her curse to the children, so no mason ever sleeps easy again."
  },
  "mulliFund": {
    "title": "The Fair Measure",
    "blurb": "The mill grinds for the whole village, and you took your own share and no more — and the miller and the mothers of the village blessed your hand. That is no small thing in the old country: the mill, the pasture, the water and the boundary-stone all lie under the Kanun, the unwritten code of the mountains, whose one principle is that a man’s given word outweighs his life. Fair dealing is not a courtesy here; it is the law of the land, older than any court."
  },
  "mulliKeq": {
    "title": "The Thief at the Mill",
    "blurb": "You took far more than your share of the flour — the grain other houses had carried down to the river on their own backs. A thief at the mill, the old people say, is cursed to the third house: the village turned its face from you, and the bread stolen from it was ash in the mouth. Greed at the common stone is never forgiven."
  },
  "xhindMulliFund": {
    "title": "The Night Mill",
    "blurb": "The old miller shuts his sacks at dusk and never stays past dark, for the mill at night belongs to the xhindet — the unseen night-spirits who grind their own grain by the turning stone. You stood still in the dark and took nothing that was not yours, and they let you be; by cockcrow they were gone, and the flour lay white and untouched as you had found it. The wise share the world with what they cannot see, and keep the mill’s one law: take little, not much."
  },
  "xhindMulliKeq": {
    "title": "The Thief in the Dark",
    "blurb": "You reached for the flour heaped white on the stone — but it was not yours, and it was not the miller’s either. The xhindet do not forgive a hand that takes from them in the dark. The miller found the door open at dawn, and the mill empty, and no sign of you but flour-dust on the sill."
  },
  "maroDoraFalje": {
    "title": "The Pardoned Hand",
    "blurb": "One rude word to the unseen ones, and your hand bent like old wood. But where the tale's Lilo cursed on to her ruin, you swallowed the second insult and gave them instead the whole patient toil of flax, sowing to shirt, and the xhindet listened to the end without a sound. They laid no gold on you — insolence has no wage — but when the rooster sang and they fled, the hand they had bent was straight again. The unseen ones weigh every answer, the old people say, and they can unmake what they make: a humble tongue bought your hand back."
  },
  "maroPrincesha": {
    "title": "The Wary Princess",
    "blurb": "The shoes fit, the golden clothes fit, and the prince named you his before the whole road — and when your stepmother's daughters wept their big dry-eyed tears and begged to be taken along, you looked at the hands that had loaded you for the xhindet's mill and left without a word. In the tale, Maro forgives: she brings them near, and her mercy carries a bewitched needle to her childbed. You were warier than the tale, and no needle ever came near your boy. The old people would say you lost a little of her goodness and kept all of her gold — the story is kinder, but yours is safer, and both are true of the same night at the mill."
  },
  "maroFundi": {
    "title": "To This Very Day",
    "blurb": "You lived the whole of it — the name answered at dusk, the night mill and the litany that gilded you, the pumpkin coach and the shoes cut to a dream, the mercy that brought your stepmother near, the needle in the childbed and the wings it gave you. You sang «ciu-ciu, djal' i mëmës» at your own son's window while another slept in your bed, fled the guns your husband raised at you, and then — when he walked out unarmed — you crossed the whole distance of the tale and landed in his open hands. He felt the needle under his stroking fingers and drew it out, and his wife stood in his arms. In the tale the four who did it — stepmother, sister, sorceress and midwife — are put living into the earth to their necks; the prince's justice here is no gentler, and the teller does not flinch from it. And they lived, as every teller of this tale has always ended it, to this very day."
  },
  "maroCiuCiu": {
    "title": "Cheep, Cheep",
    "blurb": "The needle made you a bird, and fear kept you one. The prince stood in his garden with open, empty hands, and you watched from the high branch and did not come down — the guns had taught you too well. So the needle stayed in the little feathered head, and the palace kept its false wife, and every morning a bird came to a window where a boy was growing up motherless, and sang the only words it had: «ciu-ciu, djal' i mëmës». The old people say you can hear her still — that is why the song at the window is never chased away, and never answered. Of all the tale's endings, the teller says, this is the one that costs nothing and loses everything: the unseen can be answered, and needles can be drawn, but only by those who light on an open hand."
  },
  "maroNataHumbur": {
    "title": "The Lost Night",
    "blurb": "Sent into the dark with the grain on your back, you stood in the mill's open door — the door no one locks, because no thief in the village dares the xhindet's hours — and your courage failed. You walked home through the black lanes with the sack still full, and the stepmother met you at the door without a word, which was worse than any. Nothing was lost but the night, and nothing won: the unseen ones neither gild nor twist the one who runs from the question. The mill grinds for the patient; the tale went on without you."
  },
  "maroDoraShtember": {
    "title": "The Crooked Hand",
    "blurb": "One rude word to the unseen ones, and they took your hand and bent it like old wood. You had the sense not to give them a second: you sat wordless — or told the flax's toil too late for gold — until the rooster sang them back into the dark, and walked home at dawn ground-grain poor and crooked-handed. The old people know this mark and what it means: the xhindet of the night mill weigh every answer, and a healer in the city may straighten, for a price, what an insolent tongue has bent."
  },
  "maroShtrember": {
    "title": "Twisted",
    "blurb": "They asked, and you cursed them; they asked again, and you cursed again — and the unseen ones answered as they answered rude Lilo in the tale: the other hand, the feet, and at last the head turned to look behind you. The rooster sang, the xhindet fled, and the millers found you at first light among the sacks, set you on a horse and led you home, where doctors and priests with all their chanting could barely bring your face halfway back. In the tale it is the stepmother's own daughter who earns this night; you took her part, and her wage. The xhindet gild the patient tongue and bend the insolent one — to the bone."
  },
  "kroiFund": {
    "title": "The Girl at the Spring",
    "blurb": "The well in the square is dead and dry, but below the village the old spring still runs cold and clear, and a girl filling her jug gave the thirsty stranger the first cup without being asked. That is mikpritja, the first law of the old country: the guest is sent by God, and is owed bread, salt and heart — fire, water and a bed — at any hour, unasked. You drank, and thanked her and the spring; and the old people say a stranger served so may be more than a stranger, for an Ora walks in homespun, and blesses the hand that pours."
  },
  "tabakFund": {
    "title": "The Tanners’ Bridge",
    "blurb": "The tanner told you plainly what the whole quarter lives by: the herds come in over the old stone bridge, the hides are worked on the bank below it, and the bridge keeps the tanners’ name. That bridge is real. Ura e Tabakëve — the Tanners’ Bridge — still stands in the middle of Tirana: an eighteenth-century Ottoman stone footbridge over the Lana stream, on the old road that brought livestock and produce in from the eastern highlands, named for the guild of tanners whose workshops and slaughterhouses lined the bank beside it. When the Lana was rerouted the bridge was left dry and half-forgotten among the traffic, until it was restored as a footbridge; today you can walk the game’s first crossing yourself — a few steps of humpbacked stone between the ministries and the mosques of the capital."
  },
  "kishaFund": {
    "title": "The Priest’s Blessing",
    "blurb": "The little church keeps the rise above the village, half between the living houses and the graves behind it, and the priest laid his blessing on the traveller as the old country lays it on everyone who passes — for a road walked with a blessing is a road half-guarded. Whether the call to it was a church-bell or the drum of a teqe, the same grace was asked: that you go and come again in peace, and that the earth of this place remember you kindly."
  },
  "varretFund": {
    "title": "A Candle for the Dead",
    "blurb": "You lit a candle at the graves, as the old country keeps its dead: a candle kept burning forty days, for forty days the soul is on its road. The dead here are not left at the grave’s edge; they are walked out of the world slowly, and in company. You kept faith with the dead, and the dead keep faith with you."
  }
})

const EMPTY_ENDING_COPY = Object.freeze({ title: '', blurb: '' })
export const endingCopyFor = (id) => ENDING_COPY[id] || EMPTY_ENDING_COPY
