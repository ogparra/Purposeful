import React, { Component } from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NavBar from '../NavBar/NavBar.js';
import SignupContent from '../SignupContent/SignupContent.js';
import BelieveContent from '../BelieveContent/BelieveContent.js';
import DoContent from '../DoContent/DoContent.js';
import ContactContent from '../ContactContent/ContactContent.js';

import * as firebase from 'firebase';



// Initialize Firebase
var config = {
  apiKey: "AIzaSyBPzk2vEV34o31xN-uJNt8BqMcc9hlVyv4",
  authDomain: "purposeful-718b4.firebaseapp.com",
  databaseURL: "https://purposeful-718b4.firebaseio.com",
  projectId: "purposeful-718b4",
  storageBucket: "purposeful-718b4.appspot.com",
  messagingSenderId: "842888689213"
};
firebase.initializeApp(config);


class App extends Component {

  constructor () {
    super();
    this.state = {
      mailingListRef: null,
      isFormShowing: false,
    };
    this.handleFormShow = this.handleFormShow.bind(this);
      
  }


  /* called once app is rendered. set up refs to the Firebase mailing list */
  componentWillMount() {
    const dbRootRef = firebase.database().ref();
    const mlRef = dbRootRef.child('mailing_list');

    this.dbRootRef = dbRootRef;
    this.setState({ mailingListRef: mlRef });
  }

  /* show the form if the user wants to sign up */
  handleFormShow() {
    this.setState({
      isFormShowing: true,
    });
  }

  render() {
    /* actual DOM rendering */
    return (
      <Router>
        <section className="App">


          <section className="App-main">
            <NavBar />
            <h1 className="p-title"> <span className="purposeCSS">Purpose</span>ful</h1>
            { 
              !this.state.isFormShowing &&
              <div className="learn-div"><button className="learn-btn" id="show-form" onClick={this.handleFormShow} >Learn more</button></div>
            }
            
            
            <Route exact path="/" render={() => <SignupContent mlRef={this.state.mailingListRef} 
              isFormShowing={this.state.isFormShowing} /> } />
            <Route path="/mailingList" render={() => <SignupContent mlRef={this.state.mailingListRef} 
              isFormShowing={this.state.isFormShowing} /> } />
            <Route path="/whatWeDo" render={() => <DoContent />} />
            <Route path="/whatWeBelieve" render={() => <BelieveContent />} />
            <Route path="/contact" render={() => <ContactContent />} />
         
          </section>
        
        </section>
      </Router>
    );
  }
}

export default App;
