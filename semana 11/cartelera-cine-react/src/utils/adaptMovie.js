export function adaptMovie(record) {
  return {
    id: record.id,
    title: record.name.trim(),
    image: record.poster,
    synopsis: record.description,
    classification: record.ageRating,
    rating: Number(record.score),
    showtimes: record.schedule.split('|').map((time) => time.trim()),
  }
}
