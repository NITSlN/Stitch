import React from "react";
import { connect } from 'react-redux'
import { createStream } from '../../actions'
import StreamForms from "./StreamForms";

// using class based for better organization using helper method
class StreamCreate extends React.Component {

    onSubmit = (formValues) => {  // handleSubmit then passes the form values as argument 
        this.props.createStream(formValues)
    }


    render() {
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreamForms onSubmit={this.onSubmit}/>
            </div>

        )
    }

}

// Field component does behind the scene things with store


export default connect(null, { createStream })(StreamCreate)
