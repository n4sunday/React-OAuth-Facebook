import React, { Component } from 'react';
import styled from 'styled-components';

const Contenedor = styled.div`
  color: green;
  text-align: center;
`;


class FacebookLogin extends Component {

  constructor(props){
    super(props);
    this.state = {
      id:'',
      picurl:'',
      loggedStatus: false
    }
  }

  componentDidMount(){
    window.fbAsyncInit = () => {
      window.FB.init({
        appId      : 'APP_ID',
        xfbml      : true,
        version    : 'v2.11'
      });

      window.FB.Event.subscribe("auth.statusChange", response => {
        this.statusChangeCallback(response);
      });

      this.checkLoginStatus();
    };
  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  statusChangeCallback(response){
    console.log(response);
    if(response.status == "connected"){
      this.setState({
        loggedStatus: true,
        userID: response.authResponse.userID
      });
      this.getPersonalData();
    } else {
      this.setState({
        loggedStatus: false
      });
    }
  }

  checkLoginStatus(){
    window.FB.getLoginStatus(response => this.statusChangeCallback(response));
  }

  getPersonalData(){
      var url = "/me"
      window.FB.api(url, response => {
          console.log(response)
          this.setState({ 
            name: response.name,
            id: response.id, 
          })
        })
        

    // var url = "/" + this.state.userID + "?fields=name,picture";
    // window.FB.api(url, response => {
    //   console.log(response);
    //   this.setState({
    //     name: response.name,
    //     picture: response.picture.data.url
    //   });
    // });
  }

  showPersonalData(){
    if(this.state.loggedStatus){
      return (
        <div>
          <p>Name:  {this.state.name}</p>
          <p>ID:  {this.state.id}</p>
          <img src={`https://graph.facebook.com/${this.state.id}/picture?width=200`} alt="Picture Profile" />
        </div>
      );
    } else {
      return (
        <p>Leading</p>
      )
    }
  }

  render() {
    return (
      <Contenedor>
        <h1>React Login/Logout con Facebook</h1>
        {this.showPersonalData()}
        <div className="fb-login-button" 
             data-max-rows="1" 
             data-size="large" 
             data-button-type="continue_with" 
             data-show-faces="false" 
             data-auto-logout-link="true" 
             data-use-continue-as="false">
          </div>
      </Contenedor>
    );
  }
}

export default FacebookLogin;
//https://graph.facebook.com/1086920518156791/picture?width=800
