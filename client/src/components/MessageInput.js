import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';

const styles = theme => ({
  messageInputWrapper: {
    position: 'fixed',
    left: 'auto',
    right: 0,
    bottom: 0,
    width: 'calc(100% - 320px)',
    padding: theme.spacing.unit * 3,
  },
  messageInput: {
    padding: theme.spacing.unit * 2,
  },
});

class MessageInput extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    showJoinButton: PropTypes.bool.isRequired,
    onJoinButtonClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    sendMessage: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };
  // handles typing in msg input box
  handleValueChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };
  // handle enter in msg input box
  handleKeyPress = (event) => {
    const { value } = this.state;

    if (event.key === 'Enter' && value) {
      this.props.sendMessage(value); // sends the message
      this.setState({ value: '' }); // again makes the msg input box empty
    }
  };

  render() {
    const {
      classes, showJoinButton, onJoinButtonClick, disabled,
    } = this.props;
    // if chat is not joined, shows join button otherwise shows msg input box
    return (
      <div className={classes.messageInputWrapper}>
        <Paper className={classes.messageInput} elevation={6}>
          {showJoinButton ? (
            <Button
              fullWidth
              variant="raised"
              color="primary"
              disabled={disabled}
              onClick={onJoinButtonClick}
            >
              Join
            </Button>
          ) : (
            <Input
              fullWidth
              placeholder="Type your message…"
              disabled={disabled}
              value={this.state.value}
              onChange={this.handleValueChange}
              onKeyPress={this.handleKeyPress}
            />
          )}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(MessageInput);
