import React from 'react'

import LoadingSpinner from '../loading-spinner/loading-spinner.component'

const WithSpinner = WrappedComponent => ({ isFetching, ...otherProps }) => {
		console.log(isFetching, 'test condition')
		return !isFetching ? (
			<LoadingSpinner />
		) : (
			<WrappedComponent { ...otherProps } />
		)
}
export default WithSpinner
