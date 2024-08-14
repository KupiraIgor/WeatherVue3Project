export const getWindDescription = (speed) => {
  if (speed <= 0.2) return 'Calm'
  if (speed <= 1.5) return 'Light air'
  if (speed <= 3.3) return 'Light breeze'
  if (speed <= 5.4) return 'Gentle breeze'
  if (speed <= 7.9) return 'Moderate breeze'
  if (speed <= 10.7) return 'Fresh breeze'
  return 'Strong wind'
}

export const upperCaseFirstLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1)
}
