import { FIND_SUB } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case FIND_SUB:
            return {
                ...state,
                name: action.sub.name,
                surename: action.sub.surename,
                degree: action.sub.degree,
                code: action.sub.code
            };
    
        default:
            return state;
    }
}

