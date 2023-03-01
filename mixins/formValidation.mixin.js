export default {
  validateStrSize (value, size) {
    return (value || '').replaceAll(' ', '').trim().length >= size || `Should be at least ${size} characters`
  }
}
