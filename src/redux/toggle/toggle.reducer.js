import toggleTypes from './toggle.types'

const INITIAL_STATE = {
	// isButtonDropdownHidden: false,
	isPostModalHidden: false
}

const toggleReducer = (state=INITIAL_STATE, action) =>{
	switch(action.type){
		case toggleTypes.UPDATE_POST_MODAL_VISIBILITY:
		return{
			...state,
			isPostModalHidden: true
		}

		default:
		return state
	}
}

export default toggleReducer