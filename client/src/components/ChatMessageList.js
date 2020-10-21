/* eslint no-underscore-dangle: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import ChatMessage from './ChatMessage';

const styles = theme => ({
  messagesWrapper: {
    overflowX: 'scroll',
    height: '100%',
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: '120px',
  },
  paper: {
    padding: theme.spacing.unit * 3,
  },
});

class ChatMessageList extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
      chatId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      sender: PropTypes.instanceOf(Object).isRequired,
      createdAt: PropTypes.string.isRequired,
    })),
    match: PropTypes.shape({
      params: PropTypes.instanceOf(Object).isRequired,
    }).isRequired,
    activeUser: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
      isMember: PropTypes.bool.isRequired,
      isCreator: PropTypes.bool.isRequired,
      isChatMember: PropTypes.bool.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    messages: [],
  };
  // scroll to the bottom when the chat is accessed
  componentDidMount() {
    this.scrollDownHistory();
  }
  // scroll to the bottom whenever new message appears
  componentDidUpdate() {
    this.scrollDownHistory();
  }
  // Element.scrollTop value is the
  // length which need to be scrolled to reach the top of the element
  // When an element's content does not generate a vertical scrollbar,
  // then its scrollTop value is 0.
  // Element.scrollHeight read-only property is a measurement of the height
  // of an element's content, including content not visible on the screen due to overflow.
  scrollDownHistory() {
    if (this.messagesWrapper) {
      this.messagesWrapper.scrollTop = this.messagesWrapper.scrollHeight;
      // scrolls to the bottom
    }
  }

  render() {
    const {
      classes, messages, match, activeUser,
    } = this.props;

    // If there's no active chat, then show a tip
    if (!match.params.chatId) {
      return (
        <Paper className={classes.paper}>
          <Typography variant="display1" gutterBottom>
            Start messaging …
          </Typography>
          <Typography variant="body1" gutterBottom>
            Use <strong>Global</strong> to explore communities around here.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Use <strong>Recents</strong> to see your recent conversations.
          </Typography>
        </Paper>
      );
    }

    // if messages are present, display all the msgs otherwise display there
    // There are no messages yet...
    return messages && messages.length ? (
      <div
        className={classes.messagesWrapper}
        ref={(wrapper) => {
          this.messagesWrapper = wrapper;
        }}
      >
        {messages.map(message => (
          <ChatMessage key={message._id} activeUser={activeUser} {...message} />
        ))}
      </div>
    ) : (
      <Typography variant="display1">There are no messages yet ...</Typography>
    );
  }
}

export default withRouter(withStyles(styles)(ChatMessageList));
