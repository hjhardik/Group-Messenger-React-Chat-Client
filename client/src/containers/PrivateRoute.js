import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { recieveAuth } from '../actions/auth';

class PrivateRoute extends React.Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    recieveAuth: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.recieveAuth();
  }

  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;

    // if isAuthenticated, it will display the component with props.
    // Otherwise it will redirect back to welcome route
    return (
      <Route
        {...rest}
        render={props => // props will be the 'rest' key-value pairs
          (isAuthenticated ? (
            <Component {...props} />
          ) : (<Redirect
            to={{
              pathname: '/welcome',
              state: { from: props.location },
            }}
          />
            ))
        }
      />
    );
  }
}
// Your mapStateToProps function should return a plain object that contains
// the data the component needs:
// Each field in the object will become a prop for your actual component
// The values in the fields will be used to determine if your component needs to re-render
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      recieveAuth,
    },
    dispatch,
  );

// since private route is not enclosed by route component, we use withRouter()
// in order for it to get access to this.props.history
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));
