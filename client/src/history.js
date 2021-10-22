import createHistory from 'history/createBrowserHistory'
// we take control of the url at the top of the bar instead of letting react-router-dom take control.
// we are doing this so that user can navigate back to the stream list when he/she successfully creates a stream . see action creator of CREATE_STREAM

export default createHistory();