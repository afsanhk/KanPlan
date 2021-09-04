export default function avatarBGColor (userID) {
  if (userID % 2 === 0 && userID % 3 === 0) {
    return '#ffce96'
  } else if (userID % 5 === 0) {
    return '#ed9393'
  } else if (userID % 4 === 0) {
    return '#ffe969'
  } else if (userID % 3 === 0) {
    return '#b5a7d6'
  } else if (userID % 2 === 0) {
    return '#7bbf5e'
  } else {
    return '#95c5f0'
  }
}
