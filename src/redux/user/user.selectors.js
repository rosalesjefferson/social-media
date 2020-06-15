import { createSelector } from 'reselect'

const selectorUser = (state) => state.user  

export const selectCurrentUser = createSelector([selectorUser], user => user.currentUser)

export const selectUsers = createSelector([selectorUser], user => user.friends)