import React from 'react';

import Auxillary from '../../hoc/Auxillary';
import AppBar from './AppBar/AppBar';
import styleClasses from './Layout.css';

const layout = (props) => (

    <Auxillary>
      <AppBar/>
      <div className={styleClasses.clearNav}>
      </div>
      <main>
        {props.children}
      </main>
    </Auxillary>

  );

export default layout;
