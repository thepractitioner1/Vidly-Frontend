import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./componenets/movies";
import Rentals from "./componenets/rentals";
import Customer from "./componenets/customers";
import NotFound from "./componenets/not-found";
import Navbar from "./componenets/navBar";
import MovieForm from './componenets/movieForm';
import RegistrationForm from './componenets/registrationForm';
import ProtectedRoute from './componenets/common/protectedRoute';
import Logout from './componenets/logout';
import LoginForm from './componenets/loginForm';
import RentalForm from './componenets/rentalForm';
import auth from "./services/authService"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import "./App.css";

class App extends Component {
  state = {

  }
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegistrationForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute
              path="/movies/:id" component={MovieForm} />
            <ProtectedRoute path="/rent/getMovie/:id" component = {RentalForm}/>
            <Route path="/rentals" component={Rentals} />
            <Route path="/movies" render={props => <Movies {...props} user={this.state.user} />} />
            <Route path="/customers" component={Customer} />
            <Route path="/notFound" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/notFound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
