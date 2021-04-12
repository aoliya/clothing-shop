import React from 'react';

import './form-input.styles.scss';

const FormInput =({ handleChange, label, ...otherProps }) => (
<div className="group">
   <input className="form-input" onChange={handleChange} {...otherProps} />
   { 
      label ?
      //if we have value then we r going to apply the class of 'shrink' otherwise it will be an empty string
      (<label className={`${otherProps.value.lengh ? 'shrink' : ''} form-input-label`}>
         {label}
      </label>)
      : null
   }
</div>
)

export default FormInput;

