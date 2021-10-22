import React from 'react'
import { connect } from 'react-redux'
import flv from 'flv.js' // act as axios but for videos
import { fetchStream } from '../../actions'

class StreamShow extends React.Component {
  constructor(props) {
    super(props)

    this.videoRef = React.createRef()
  }
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchStream(id)
    this.buildPlayer()
  }
  // this is for when the stream is not fetched during the componentDidMount but got fetched after sometime so we need to call the buildPlayer when the stream is fetched
  componentDidUpdate() {
    this.buildPlayer()
  }

  buildPlayer() {
    // we need this if statement beacause when the stream is not fetched than there is no video element (look in the return part )in the page so it will give an error
    // we also don't want to make a player when it is already created

    if (this.player || !this.props.stream) return

    const { id } = this.props.match.params

    if (flv.isSupported()) {
      this.player = flv.createPlayer({
        type: 'flv',
        url: `http://localhost:8000/live/${id}.flv`,
      })

      this.player.attachMediaElement(this.videoRef.current)
      this.player.load()
      // this.player.on(flv.Events.ERROR, (errorType, errorDetail, errorInfo) => { console.log('errorType:', errorType); console.log('errorDetail:', errorDetail);  console.log('errorInfo:', errorInfo); });
    }
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    const { title, description } = this.props.stream
    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)
