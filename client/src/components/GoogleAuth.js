import React from "react";
import { signIn,signOut } from "../actions";
import {connect} from 'react-redux'


class GoogleAuth extends React.Component{
    componentDidMount(){

        // loads the auth2 functions
        // second arg is called when the auth2 library is loaded
        window.gapi.load('client:auth2',()=>{

            window.gapi.client.init({
                clientId:CLIENT_ID,
                scope:'email' // this gives the information of what data to request
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();

                // To rerender and show the user is authenticated we use isSignedIn state
                // this.setState({ isSignedIn:this.auth.isSignedIn.get()})
                this.onAuthChange(this.auth.isSignedIn.get())
                // This setState function will only run for the first time therefore we had to reload again when we signed in or signed out
                //Therefore we will use a function which will invoke the callback function. This function always invoke whenever 
                this.auth.isSignedIn.listen(this.onAuthChange)
                //  this is passed as a reference 
            })
        })

    }
    // "this" refer to the GoogleAuth component

    // this is called with an argument 
    onAuthChange = (isSignedIn)=>{
        //calling action creator
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    }

    onSignOutClick = async ()=>{
        await this.auth.signOut();
    }
    onSignInClick = async ()=>{
        await this.auth.signIn();
    }
    

    renderAuthButton(){
        if(this.props.signedIn===null){
            return null
        }else if(this.props.signedIn){
            return (<div>
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon"/>
                    Sign Out</button>
            </div>)
        }else{
            return (<div>
                <button className="ui black google button" onClick={this.onSignInClick}>
                    <i className="google icon"/>
                    Sign In with Google</button>
            </div>)
        }
        // <button className="ui button" onClick={this.signIn}>Sign In</button>

    }
    render(){
        return (
            <div>
               {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return {signedIn:state.auth.isSignedIn}
}
export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth)


