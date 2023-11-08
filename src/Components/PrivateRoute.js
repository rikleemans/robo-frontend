import { Component } from "react";
import { Route, Navigate } from "react-router-dom";

class PrivateRoute extends Component {
  state = { loading: true, access: false };
  componentDidMount() {
    if (localStorage.getItem("user") != null) {
      this.setState({ loading: false, access: true });
    } else {
      this.setState({ loading: false, access: false });
    }
  }
  render() {
    const { access, loading } = this.state;
    if (loading) {
      return <p>Loading</p>;
    }
    if (!access) {
      return <Navigate to='/login' />;
      //   <Route path='about' render={() => <Redirect to='s' />} />;
    }
    return <Route {...this.props} />;
  }
}
export default PrivateRoute;
