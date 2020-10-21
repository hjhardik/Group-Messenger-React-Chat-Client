export default function senderName({ username, firstName, lastName }) {
  return firstName && lastName ? `${firstName} ${lastName}` : username;
}
// if firstName and lastName is present, send it as it is otherwise
// send username
