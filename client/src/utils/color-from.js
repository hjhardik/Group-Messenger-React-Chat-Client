import red from 'material-ui/colors/red';
import pink from 'material-ui/colors/pink';
import purple from 'material-ui/colors/purple';
import indigo from 'material-ui/colors/indigo';
import blue from 'material-ui/colors/blue';
import teal from 'material-ui/colors/teal';
import green from 'material-ui/colors/green';
import lightGreen from 'material-ui/colors/lightGreen';
import amber from 'material-ui/colors/amber';
import orange from 'material-ui/colors/orange';
import deepOrange from 'material-ui/colors/deepOrange';
import deepPurple from 'material-ui/colors/deepPurple';
import blueGrey from 'material-ui/colors/blueGrey';

const colors = [
  red,
  pink,
  purple,
  indigo,
  blue,
  teal,
  green,
  lightGreen,
  amber,
  orange,
  deepOrange,
  deepPurple,
  blueGrey,
];

export default function colorFrom(string) {
  try {
    // index is the sum of unicdoe values of string letters
    const index = string
      .toString()
      .split('')
      .map(char => char.charCodeAt())
      .reduce((sum, num) => sum + num, 0);
    // The charCodeAt() method returns the Unicode of the character
    // at the specified index in a string.
    // reduce will loop through an array adding
    // each element to an accumulator(sum) and returning it
    // The 0 at the end initializes accumulator to start at 0
    const colorIndex = index % colors.length;
    // will select the index from colors array
    return colors[colorIndex][500];
    // 500 is the colour shade value
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
    return blueGrey[500];
    // default color value
  }
}
