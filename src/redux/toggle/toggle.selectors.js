import { createSelector } from 'reselect'

const selectorToggle = (state) => state.toggle

export const selectIsPostModalHidden = createSelector([selectorToggle], toggle => {
	return toggle.isPostModalHidden
})

