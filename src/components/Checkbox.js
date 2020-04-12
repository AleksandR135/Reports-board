import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MUICheckbox from '@material-ui/core/Checkbox'


const Checkbox = ({ label, handleFilterChange }) => (
  <FormControlLabel
    control={<MUICheckbox
      onChange={handleFilterChange}
      value={label}
    />}
    label={label}
  />
)

export default React.memo(Checkbox)