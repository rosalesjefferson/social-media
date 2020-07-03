import React from 'react'

import './loading-spinner.style.scss'

const LoadingSpinner = ({ size }) =>(
	<div className='loading__spinner-overlay'>
		<span 
			className={ `loading__spinner 
						${size === 'small' ? 'small' : '' } 
						${size === 'medium' ? 'medium' : '' }
					` }>
		</span>
	</div>
)

export default LoadingSpinner