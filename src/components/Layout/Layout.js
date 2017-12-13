import React from 'react';

import Auxillary from '../../hoc/Auxillary';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const layout = (props) => (

    <MuiThemeProvider>
    <Auxillary>
      <div>
        App Bar
      </div>
      <main>
        {props.children}
      </main>
    </Auxillary>
    </MuiThemeProvider>

  );

export default layout;
