// Explicit shared public-data imports keep the browser and Node audit on the
// same registry. The coverage gate checks that no partition is omitted.

import partition0 from './data/tales/aga-ymer.js'
import partition1 from './data/tales/ali-bajraktari.js'
import partition2 from './data/tales/ali-pashe-tepelena.js'
import partition3 from './data/tales/argjiro-gjirokastra.js'
import partition4 from './data/tales/arnaut-osmani.js'
import partition5 from './data/tales/bear-dervish.js'
import partition6 from './data/tales/bee-spider-cicada.js'
import partition7 from './data/tales/binoshet.js'
import partition8 from './data/tales/constantine-doruntine.js'
import partition9 from './data/tales/creation-wolf.js'
import partition10 from './data/tales/cuckoo.js'
import partition11 from './data/tales/death-of-omer.js'
import partition12 from './data/tales/gjakova-cavern.js'
import partition13 from './data/tales/gjergj-elez-alia.js'
import partition14 from './data/tales/gjeto-basho-muji.js'
import partition15 from './data/tales/gjizar.js'
import partition16 from './data/tales/goose-girl.js'
import partition17 from './data/tales/half-rooster.js'
import partition18 from './data/tales/halil-garria.js'
import partition19 from './data/tales/halil-marriage.js'
import partition20 from './data/tales/kostandini-i-vogel.js'
import partition21 from './data/tales/kreshnik-epic.js'
import partition22 from './data/tales/kuma-lisa.js'
import partition23 from './data/tales/legjenda-e-prespes.js'
import partition24 from './data/tales/maiden-promised-sun.js'
import partition25 from './data/tales/maro-perhitura.js'
import partition26 from './data/tales/muji-e-behuri.js'
import partition27 from './data/tales/mujo-avenges-halil.js'
import partition28 from './data/tales/mujo-courser.js'
import partition29 from './data/tales/mujo-strength.js'
import partition30 from './data/tales/mujo-zanas.js'
import partition31 from './data/tales/nastradin.js'
import partition32 from './data/tales/rozafa.js'
import partition33 from './data/tales/sari-salltek.js'
import partition34 from './data/tales/scurfhead.js'
import partition35 from './data/tales/skanderbeg-legjenda.js'
import partition36 from './data/tales/snake-bridegroom.js'
import partition37 from './data/tales/sokol-halili.js'
import partition38 from './data/tales/sons-of-eagle.js'
import partition39 from './data/tales/swallow.js'
import partition40 from './data/tales/syri-kalter.js'
import partition41 from './data/tales/three-friends.js'
import partition42 from './data/tales/tomor-shpirag.js'
import partition43 from './data/tales/tomorri-pilgrimage.js'
import partition44 from './data/tales/tortoise.js'
import partition45 from './data/tales/ura-e-artes.js'
import partition46 from './data/tales/zuku-bajraktar.js'

const partitions = [
  ['src/game/data/tales/aga-ymer.js', partition0],
  ['src/game/data/tales/ali-bajraktari.js', partition1],
  ['src/game/data/tales/ali-pashe-tepelena.js', partition2],
  ['src/game/data/tales/argjiro-gjirokastra.js', partition3],
  ['src/game/data/tales/arnaut-osmani.js', partition4],
  ['src/game/data/tales/bear-dervish.js', partition5],
  ['src/game/data/tales/bee-spider-cicada.js', partition6],
  ['src/game/data/tales/binoshet.js', partition7],
  ['src/game/data/tales/constantine-doruntine.js', partition8],
  ['src/game/data/tales/creation-wolf.js', partition9],
  ['src/game/data/tales/cuckoo.js', partition10],
  ['src/game/data/tales/death-of-omer.js', partition11],
  ['src/game/data/tales/gjakova-cavern.js', partition12],
  ['src/game/data/tales/gjergj-elez-alia.js', partition13],
  ['src/game/data/tales/gjeto-basho-muji.js', partition14],
  ['src/game/data/tales/gjizar.js', partition15],
  ['src/game/data/tales/goose-girl.js', partition16],
  ['src/game/data/tales/half-rooster.js', partition17],
  ['src/game/data/tales/halil-garria.js', partition18],
  ['src/game/data/tales/halil-marriage.js', partition19],
  ['src/game/data/tales/kostandini-i-vogel.js', partition20],
  ['src/game/data/tales/kreshnik-epic.js', partition21],
  ['src/game/data/tales/kuma-lisa.js', partition22],
  ['src/game/data/tales/legjenda-e-prespes.js', partition23],
  ['src/game/data/tales/maiden-promised-sun.js', partition24],
  ['src/game/data/tales/maro-perhitura.js', partition25],
  ['src/game/data/tales/muji-e-behuri.js', partition26],
  ['src/game/data/tales/mujo-avenges-halil.js', partition27],
  ['src/game/data/tales/mujo-courser.js', partition28],
  ['src/game/data/tales/mujo-strength.js', partition29],
  ['src/game/data/tales/mujo-zanas.js', partition30],
  ['src/game/data/tales/nastradin.js', partition31],
  ['src/game/data/tales/rozafa.js', partition32],
  ['src/game/data/tales/sari-salltek.js', partition33],
  ['src/game/data/tales/scurfhead.js', partition34],
  ['src/game/data/tales/skanderbeg-legjenda.js', partition35],
  ['src/game/data/tales/snake-bridegroom.js', partition36],
  ['src/game/data/tales/sokol-halili.js', partition37],
  ['src/game/data/tales/sons-of-eagle.js', partition38],
  ['src/game/data/tales/swallow.js', partition39],
  ['src/game/data/tales/syri-kalter.js', partition40],
  ['src/game/data/tales/three-friends.js', partition41],
  ['src/game/data/tales/tomor-shpirag.js', partition42],
  ['src/game/data/tales/tomorri-pilgrimage.js', partition43],
  ['src/game/data/tales/tortoise.js', partition44],
  ['src/game/data/tales/ura-e-artes.js', partition45],
  ['src/game/data/tales/zuku-bajraktar.js', partition46],
]

export const TALES_SOURCE_FILES = Object.freeze(partitions.map(([file]) => file))
export const TALES = {}
export const TALES_SOURCES = {}
for (const [file, partition] of partitions) {
  const id = partition.id
  if (!id || TALES[id]) throw new Error(`Missing or duplicate public tale id: ${id}`)
  TALES[id] = partition
  TALES_SOURCES[id] = file
}
