import dayjs from 'dayjs'

export const getTime = () => {
  const h = +dayjs().format('HH')
  if (h >= 8 && h <= 9) {
    return 'one_two'
  } else if (h >= 10 && h <= 11) {
    return 'three_four'
  } else if (h >= 13 && h <= 14) {
    return 'five'
  } else if (h >= 14 && h <= 15) {
    return 'six_seven'
  } else if (h >= 16 && h <= 17) {
    return 'eight_nine'
  } else if (h >= 18 && h <= 20) {
    return 'ten_twi'
  } else {
    return false
  }
}
