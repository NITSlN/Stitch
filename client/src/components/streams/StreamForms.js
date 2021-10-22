import React from "react";
import { Field, reduxForm } from 'redux-form'

// using class based for better organization using helper method
class StreamForm extends React.Component {

    // renderInput(formProps){
    //     console.log(formProps);
    //     return (
    // we need to wire onChange and value so that it can be wired up with redux
    //         <input onChange={formProps.input.onChange} value={formProps.input.value}/>
    //     )
    // }

    renderError({ error, touched }) {

        if (error && touched) {
            return (
                <div className="ui red message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            )
        }
    }

    //   Above function can be modified as -

    renderInput = ({ input, label, meta }) => {
        // console.log(meta);
        // meta has a touched property which tells if the field is touched or not 
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            // means pass everything inside input as props
            <div className={className}>
                <label>{label}</label> 
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }


    onSubmit = (formValues) => { // handleSubmit then passes the form values as argument 
        this.props.onSubmit(formValues)
    }


    render() {
        return (
            // we don't handleSubmit function is feature of redux-form it does the work of e.preventDefault() 
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui error form">
                <Field name="title" component={this.renderInput} label="Title" /> {/* extra props are passed inside the renderInput */}
                <Field name="description" component={this.renderInput} label="Description" />
                <button className='ui button black'>Submit</button>
            </form>

        )
    }

}

// Field component does behind the scene things with store

const validate = (formValues) => {
    //redux form checks if rturn object is empty or not if its empty then everything is ok. if not empty then its not ok
    const error = {}
    // .title is used here because we gave name="title"
    if (!formValues.title) {
        error.title = 'You must enter a title'
    }
    // .description is used here because we gave name="description"
    if (!formValues.description) {
        error.description = 'You must enter a description'
    }
    return error
}


export default reduxForm({
    form: 'streamForm', // this is the name of this form
    validate //validate:validate
})(StreamForm)



