import _ from 'lodash'

export default (state = {}, action) => {
    switch (action.type) {

        case 'FETCH_STREAMS':
            // mapkeys function takes an array of objects and return an object of objects. All the objects have the key,whose value is the value of the  property passed as the second argument // Watch 24->12
            return { ...state, ..._.mapKeys(action.payload,'id')} 

        case 'FETCH_STREAM':
            return { ...state, [action.payload.id]: action.payload } // THIS FORMAT RETURNs a new object so that redux know to rerender

        case 'CREATE_STREAM':
            return { ...state, [action.payload.id]: action.payload }

        case 'EDIT_STREAM':
            return { ...state, [action.payload.id]: action.payload }

        case 'DELETE_STREAM':
            return _.omit(state,action.payload) // for delete action.payload is id itself and omit function returns a new object

        default:
            return state;

    }
}


// REMEMBER THAT WE ARE STORING IT AS -
// {
//     id:{
//         stream object with id of id
//     },
//     5:{
//          title:"abc",
//          description:"efc",
//          id:5
//      }
//
// }














