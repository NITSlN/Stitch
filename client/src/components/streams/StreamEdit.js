import _ from 'lodash'
import React from "react";
import { connect } from 'react-redux'
import { fetchStream, editStream } from "../../actions";
import StreamForms from "./StreamForms";

class StreamEdit extends React.Component{
    
    // we need to fetch or own data because when we reload then redux re-render itself and we will get undefined first because no data is present at first
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }
    
    onSubmit = (formValues)=> {
        this.props.editStream(this.props.match.params.id,formValues);
    }

    render(){

        if(!this.props.stream){
            return <div>Loading...</div>
        }
        return (
        <div>
            <h3>Edit Stream</h3>
            <StreamForms
            // initialValues is a specific keyword. This initial Values will be the values of the fields with specified name of the field

            initialValues={_.pick(this.props.stream,'title','description')} // we are only sending data of title and description
            onSubmit={this.onSubmit}/>
        </div>
            )
    }
}
// ownProps is a reference to the props argument above

const mapStateToProps = (state,ownProps) =>{     //ownProps have information about id only because we have used <Route> tag in App.js

    // getting the stream details of the appropriate id

    return { stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchStream,editStream})(StreamEdit)



