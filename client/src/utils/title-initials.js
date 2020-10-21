export default function titleInitials(title) {
  try {
    return title
      .split(' ')
      .map(word => word[0])
      .map(char => char.toUpperCase())
      .slice(0, 2)
      .join('');
  // "hardik joshi" becomes "HJ"
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
    return 'error';
  }
}
