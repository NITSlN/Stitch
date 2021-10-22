import React from 'react';
import Modal from '../Modal';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../history';
import { fetchStream,deleteStream } from '../../actions';

class StreamDelete extends React.Component {


    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    actions() {
        return (
            <React.Fragment>
                <button onClick={()=>this.props.deleteStream(this.props.match.params.id)} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    render() {
        // first its undefined therefore we show null
        if (!this.props.stream) {
            return null
        }
        return (

            <Modal
                title="Delete Stream"
                content={`Are you sure you want to delete "${this.props.stream.title}" stream?`}
                actions={this.actions()}
                onDismiss={() => history.push('/')}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream,deleteStream })(StreamDelete);