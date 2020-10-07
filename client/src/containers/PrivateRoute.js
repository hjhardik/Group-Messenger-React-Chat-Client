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
        render={props =>
          (isAuthenticated ? (
            <Component {...props} />
          ) : (
              <Redirect
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

//since private route is not a route component, we use withRouter()
//in order for it to get access to this.props.history
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));
