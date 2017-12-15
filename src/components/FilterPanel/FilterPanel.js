import React from 'react';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};


const filterPanel = (props) => (
  <div>
    <Checkbox
      label="Allow NSFW"
      checked={props.filterState.showNsfw}
      styles={styles.checkbox}
      onCheck={(event, checked) => props.onFilterChanged({showNsfw: checked})}
    />
  </div>
);

export default filterPanel
