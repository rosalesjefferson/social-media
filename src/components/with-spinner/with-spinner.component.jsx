import React from 'react'

import LoadingSpiner from '../loading-spinner/loading-spinner.component'

const WithSpinner = WrappedComponent => ({ currentUser, ...otherProps }) => {
		return currentUser ? (
			<WrappedComponent { ...otherProps } />
		) : (
			<LoadingSpiner substitution='true' />
		)
}

export default WithSpinner
