import { adaptMovie } from '../utils/adaptMovie.js'
import lastOrbitPoster from '../assets/posters/ultima-orbita.svg'
import seaOfAshesPoster from '../assets/posters/mar-de-ceniza.svg'
import metropolisPoster from '../assets/posters/metropolis-2049.svg'
import lighthouseKeepersPoster from '../assets/posters/guardianes-del-faro.svg'
import mistwoodPoster from '../assets/posters/bosque-de-niebla.svg'
import zeroSpeedPoster from '../assets/posters/velocidad-cero.svg'
import lettersToTomorrowPoster from '../assets/posters/cartas-al-futuro.svg'
import sleepingVolcanoPoster from '../assets/posters/volcan-dormido.svg'

const movieRecords = [
  {
    id: 'last-orbit',
    name: 'La última órbita',
    poster: lastOrbitPoster,
    description: 'Una piloto recibe una señal inesperada mientras completa la última misión alrededor de la Tierra.',
    ageRating: 'Mayores de 12 años',
    score: '4.7',
    schedule: '14:00 | 17:10 | 20:20',
  },
  {
    id: 'sea-of-ashes',
    name: 'Mar de ceniza',
    poster: seaOfAshesPoster,
    description: 'Dos hermanos regresan a su pueblo costero para reconstruir la historia de su familia.',
    ageRating: 'Mayores de 14 años',
    score: '4.3',
    schedule: '13:30 | 16:40 | 19:50',
  },
  {
    id: 'metropolis-2049',
    name: 'Metrópolis 2049',
    poster: metropolisPoster,
    description: 'Una investigadora sigue pistas digitales que revelan quién controla la ciudad del futuro.',
    ageRating: 'Mayores de 14 años',
    score: '4.6',
    schedule: '15:00 | 18:15 | 21:30',
  },
  {
    id: 'lighthouse-keepers',
    name: 'Guardianes del faro',
    poster: lighthouseKeepersPoster,
    description: 'Un grupo de amigos protege un faro antiguo ante una tormenta que amenaza la costa.',
    ageRating: 'Apta para todos',
    score: '4.5',
    schedule: '12:20 | 15:10 | 18:00',
  },
  {
    id: 'mistwood',
    name: 'Bosque de niebla',
    poster: mistwoodPoster,
    description: 'Una joven cartógrafa descubre un sendero oculto en un bosque que cambia cada noche.',
    ageRating: 'Apta para todos',
    score: '4.4',
    schedule: '11:50 | 14:40 | 17:30',
  },
  {
    id: 'zero-speed',
    name: 'Velocidad cero',
    poster: zeroSpeedPoster,
    description: 'Una mecánica participa en una carrera nocturna para salvar el taller de su familia.',
    ageRating: 'Mayores de 12 años',
    score: '4.2',
    schedule: '16:00 | 19:10 | 22:15',
  },
  {
    id: 'letters-to-tomorrow',
    name: 'Cartas al futuro',
    poster: lettersToTomorrowPoster,
    description: 'Dos desconocidos intercambian cartas que parecen llegar desde distintos momentos de sus vidas.',
    ageRating: 'Mayores de 12 años',
    score: '4.8',
    schedule: '13:00 | 16:10 | 19:20',
  },
  {
    id: 'sleeping-volcano',
    name: 'Volcán dormido',
    poster: sleepingVolcanoPoster,
    description: 'Una expedición científica busca proteger una comunidad al detectar actividad bajo un volcán.',
    ageRating: 'Apta para todos',
    score: '4.1',
    schedule: '12:40 | 15:50 | 19:00',
  },
]

export const movies = movieRecords.map(adaptMovie)
