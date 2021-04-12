import React from 'react';
import {HomePage} from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import {Switch, Route} from 'react-router-dom';
import Header from './components/header/header.component';
import SignInAndSignUpPAge from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.js';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import './App.css';



class App extends React.Component {
  constructor(){
    super();

    this.state = {

      currentUser: null
    }

    
  }
 
  unsubscribeFromAuth = null;

  // componentDidMount(){

  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
  //     // this.setState({currentUser: user})
  //     // createUserProfileDocument(user);
  //     // console.log(user)
  //   })
  // }

  componentDidMount(){
     this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
       //if userAuth exists
        if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);
          userRef.onSnapshot(snapShot => {
            this.setState({ 
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
             
            });
            console.log(this.state)
          })
          
        }
        else{
          this.setState({currentUser:userAuth})
        }
        
      })
    }


  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  
  render(){
    return (
      <div>
        <Header currentUser = {this.state.currentUser} />
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact path="/shop" component= {ShopPage} />
          <Route exact path="/signin" component= {SignInAndSignUpPAge} />
        </Switch>
         
      </div>
    );

  }
  
}

export default App;
