import streams from "../apis/streams"
import history from "../history"
export const signIn = (userId) => {
    return {
        type: 'SIGN_IN',
        payload: userId
    }
}
export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}

// Alternate of createStream

// export const createStream = (formValues) =>{
//     return async dispatch =>{
//         //post updates and return the values
//         const response = await streams.post('/streams',formValues)
//         dispatch({
//             type:'CREATE_STREAM',
//             payload:response.data
//         })
//
// }}

export const createStream = (formValues) => async (dispatch, getState) => {

    const { userId } = getState().auth
    const res = await streams.post('/streams', { ...formValues, userId })
    dispatch({ type: 'CREATE_STREAM', payload: res.data })
    // we do programatic navigation or should say automatic navigation after a stream is created
    history.push('/')


}

// fetches all the records ( Arrays of records)
export const fetchStreams = () => async dispatch => {
    //post updates and return the values
    const res = await streams.get('/streams')
    dispatch({ type: 'FETCH_STREAMS', payload: res.data }) //paload has all the list of streams in the form of array of objects
}


// fetch one record
export const fetchStream = (id) => async dispatch => {
    const res = await streams.get(`/streams/${id}`)
    dispatch({ type: 'FETCH_STREAM', payload: res.data })
}

// Edit  takes the data also to it
export const editStream = (id, formValues) => async dispatch => {

    // Use patch instead of put. Why?
    // Ans - put overwrites everything of a particular data while patch just updates a part of the data.
    // So  when i used put and edited the data then edit and delete buttons were gone cause the data no longer had the userId and id property
    // becuase I had only sent the title and description values

    const res = await streams.patch(`/streams/${id}`, formValues)
    dispatch({ type: 'EDIT_STREAM', payload: res.data })
    history.push('/')
}


// delete return nothing as a response
export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`)
    dispatch({ type: 'DELETE_STREAM', payload: id })
    history.push('/')
}





// export const createStream = formValues => async dispatch =>{

// }


