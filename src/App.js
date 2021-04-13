import React from 'react';
import {connect} from 'react-redux';
import {HomePage} from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/header/header.component';
import SignInAndSignUpPAge from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.js';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import './App.css';
import {setCurrentUser} from './redux/user/user.actions';


class App extends React.Component {
  
 
  unsubscribeFromAuth = null;

  // componentDidMount(){

  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
  //     // this.setState({currentUser: user})
  //     // createUserProfileDocument(user);
  //     // console.log(user)
  //   })
  // }

  componentDidMount(){
    const {setCurrentUser} = this.props

     this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
       //if userAuth exists
        if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);
         
          userRef.onSnapshot(snapShot => {
           setCurrentUser({ 
                id: snapShot.id,
                ...snapShot.data()
            
            });
           
          })
          
        }
        else{
          setCurrentUser(userAuth)
        }
        
      })
    }


  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  
  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact path="/shop" component= {ShopPage} />
          <Route 
            exact
            path="/signin" 
            render={()=> 
              this.props.currentUser ? (<Redirect to='./' />) : (<SignInAndSignUpPAge />)} 
              
            />
        </Switch>
         
      </div>
    );

  }
  
}


const mapStateToProps =({user})=> ({
   currentUser: user.currentUser
})

const mapDispatchToProps = (dispatch) =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps, mapDispatchToProps
  )(App);
