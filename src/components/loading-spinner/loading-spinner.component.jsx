import React from 'react'

import './loading-spinner.style.scss'

const LoadingSpinner = ({ size, substitution, substitutionSmall }) =>(
	<div className={ `loading__spinner-overlay 
					  ${substitution ? 'full-size' : ''}
					  ${substitutionSmall ? 'medium-size' : ''}
					  ` }>
		<span 
			className={ `loading__spinner 
						${size === 'small' ? 'small' : '' } 
						${size === 'medium' ? 'medium' : '' }
						${substitution ? 'full-size' : '' }
					` }>
		</span>
	</div>
)

export default LoadingSpinner
