import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function AddGig(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  const history = useHistory();

  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  const goBack = () => {
    history.push('/dashboard')
  }
  const newRep = () => {
    history.push('/addrep')
  }

  return (
    <div>
      <Button variant="contained" className="navButton" onClick={newRep}>New Rep</Button>
      <Button variant="contained" className="navButton" onClick={goBack}>Cancel</Button>
      <h2>{heading}</h2>
    </div>
  );
}

export default AddGig;