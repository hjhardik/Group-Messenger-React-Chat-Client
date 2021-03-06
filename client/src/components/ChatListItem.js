import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'; // date and time
import { withStyles } from 'material-ui';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from './Avatar';

const styles = theme => ({
  activeItem: {
    backgroundColor: theme.palette.grey[200],
    // makes the active chat color in the list to grey[200]
  },
});
// shows the list of chats along with creation times from now
const ChatListItem = ({
  classes, disabled, title, chatId, active, createdAt,
}) => (
  <ListItem
    button
    component={Link}
    to={`/chat/${chatId}`}
    className={active ? classes.activeItem : ''}
    disabled={disabled}
  >
    <Avatar colorFrom={chatId}>{title}</Avatar>
    <ListItemText primary={title} secondary={moment(createdAt).fromNow()} />
  </ListItem>
);

ChatListItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  chatId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default withStyles(styles)(ChatListItem);
