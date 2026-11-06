import lastOrbitPoster from '../assets/posters/ultima-orbita.svg'
import seaOfAshesPoster from '../assets/posters/mar-de-ceniza.svg'
import metropolisPoster from '../assets/posters/metropolis-2049.svg'
import lighthouseKeepersPoster from '../assets/posters/guardianes-del-faro.svg'
import mistwoodPoster from '../assets/posters/bosque-de-niebla.svg'
import zeroSpeedPoster from '../assets/posters/velocidad-cero.svg'
import lettersToTomorrowPoster from '../assets/posters/cartas-al-futuro.svg'
import sleepingVolcanoPoster from '../assets/posters/volcan-dormido.svg'

export const movies = [
  {
    id: 'last-orbit',
    title: 'La última órbita',
    image: lastOrbitPoster,
    synopsis: 'Una piloto recibe una señal inesperada mientras completa la última misión alrededor de la Tierra.',
    classification: 'Mayores de 12 años',
    rating: 4.7,
    showtimes: ['14:00', '17:10', '20:20'],
  },
  {
    id: 'sea-of-ashes',
    title: 'Mar de ceniza',
    image: seaOfAshesPoster,
    synopsis: 'Dos hermanos regresan a su pueblo costero para reconstruir la historia de su familia.',
    classification: 'Mayores de 14 años',
    rating: 4.3,
    showtimes: ['13:30', '16:40', '19:50'],
  },
  {
    id: 'metropolis-2049',
    title: 'Metrópolis 2049',
    image: metropolisPoster,
    synopsis: 'Una investigadora sigue pistas digitales que revelan quién controla la ciudad del futuro.',
    classification: 'Mayores de 14 años',
    rating: 4.6,
    showtimes: ['15:00', '18:15', '21:30'],
  },
  {
    id: 'lighthouse-keepers',
    title: 'Guardianes del faro',
    image: lighthouseKeepersPoster,
    synopsis: 'Un grupo de amigos protege un faro antiguo ante una tormenta que amenaza la costa.',
    classification: 'Apta para todos',
    rating: 4.5,
    showtimes: ['12:20', '15:10', '18:00'],
  },
  {
    id: 'mistwood',
    title: 'Bosque de niebla',
    image: mistwoodPoster,
    synopsis: 'Una joven cartógrafa descubre un sendero oculto en un bosque que cambia cada noche.',
    classification: 'Apta para todos',
    rating: 4.4,
    showtimes: ['11:50', '14:40', '17:30'],
  },
  {
    id: 'zero-speed',
    title: 'Velocidad cero',
    image: zeroSpeedPoster,
    synopsis: 'Una mecánica participa en una carrera nocturna para salvar el taller de su familia.',
    classification: 'Mayores de 12 años',
    rating: 4.2,
    showtimes: ['16:00', '19:10', '22:15'],
  },
  {
    id: 'letters-to-tomorrow',
    title: 'Cartas al futuro',
    image: lettersToTomorrowPoster,
    synopsis: 'Dos desconocidos intercambian cartas que parecen llegar desde distintos momentos de sus vidas.',
    classification: 'Mayores de 12 años',
    rating: 4.8,
    showtimes: ['13:00', '16:10', '19:20'],
  },
  {
    id: 'sleeping-volcano',
    title: 'Volcán dormido',
    image: sleepingVolcanoPoster,
    synopsis: 'Una expedición científica busca proteger una comunidad al detectar actividad bajo un volcán.',
    classification: 'Apta para todos',
    rating: 4.1,
    showtimes: ['12:40', '15:50', '19:00'],
  },
]
