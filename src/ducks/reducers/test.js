//
const initialState = {
    username: '',
    testState: 0
}
// Actions
const TEST_ACTION = 'TEST_ACTION'

// Action Builders
export function testAction() {
    return {
        type: TEST_ACTION,
        payload: 1
    }
}

// Reducer
export default function (state = initialState, action) {
    switch (action.type) {
        case TEST_ACTION:
            return Object.assign({}, state, { testState: state.testState + action.payload })
        default:
            return state;
    }
}