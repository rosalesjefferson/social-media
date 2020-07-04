import React from 'react'
import { connect } from 'react-redux'

import LoadingSpinner from '../loading-spinner/loading-spinner.component'

const WithSpinner = WrappedComponent => ({ isFetching, ...otherProps }) => {
		return !isFetching ? (
			<LoadingSpinner />
		) : (
			<WrappedComponent { ...otherProps } />
		)
}

export default WithSpinner
