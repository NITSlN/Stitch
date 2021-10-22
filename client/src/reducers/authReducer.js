const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};
// This to keep track that user is logged in or not
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return { ...INITIAL_STATE, isSignedIn: true, userId: action.payload }
        case 'SIGN_OUT':
            return { ...INITIAL_STATE, isSignedIn: false, userId: null }
        default:
            return state
    }
}
