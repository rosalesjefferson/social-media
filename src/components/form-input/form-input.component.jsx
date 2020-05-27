import React from 'react'

import './form-input.component.scss'

const FormInput = ({label, hasError, ...otherprops }) =>(
	<div className='form-input'>
		<input className={ `${ hasError ? 'active': '' } form-input__field` } 
			{ ...otherprops }
		/>
		<label className={`${ otherprops.value.length ? 'has-value' : ''} form-input__label` }>{ label }</label>
		<label className={`${ otherprops.value.length ? 'has-value' : ''} form-input__label--2` }>{ label }</label>
	</div>
)

export default React.memo(FormInput)