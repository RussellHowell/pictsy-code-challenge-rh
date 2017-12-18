import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Modal, Typography, Card, CardActions, CardContent, Button, FormGroup, FormControl, RadioGroup, FormControlLabel, FormLabel, Radio } from 'material-ui';
import styleClasses from './FilterModal.css';



const filterModal = ({modalToggle, show, filterState, filterChanged}) => {

const filterChangedHandler = (event, value) => {
  filterChanged(event.target.name, value);
}


  return (
    <Modal  show={show} onBackdropClick={modalToggle(false)}>
    <div className={styleClasses.modal}>
         <Card>
           <CardContent>
             <Typography type='title'>Filter</Typography>
            <FormControl>
                <FormLabel component="legend">Post Type</FormLabel>
                <RadioGroup
                aria-label="post-type"
                name="section"
                value={filterState.section}
                onChange={filterChangedHandler}>
                  <FormControlLabel value="hot" disabled={(filterState.sort==="rising") ? true : false} control={<Radio />} label="Hot" />
                  <FormControlLabel value="top" disabled={(filterState.sort==="rising") ? true : false} control={<Radio />} label="Top" />
                  <FormControlLabel value="user" control={<Radio />} label="User" />
              </RadioGroup>
              <FormLabel component="legend">Sort By</FormLabel>
              <RadioGroup
              aria-label="sort"
              name="sort"
              value={filterState.sort}
              onChange={filterChangedHandler}>
                <FormControlLabel value="viral" control={<Radio />} label="Viral" />
                <FormControlLabel value="top" control={<Radio />} label="Top" />
                <FormControlLabel value="time" control={<Radio />} label="Time Posted" />
                <FormControlLabel value="rising" disabled={(filterState.section==="user") ? false : true} control={<Radio />} label="Rising" />
            </RadioGroup>
            <FormLabel component="legend">Top Posts By</FormLabel>
            <RadioGroup
            aria-label="window"
            name="window"
            value={filterState.window}
            onChange={filterChangedHandler}>
              <FormControlLabel value="day" disabled={(filterState.section === "top") ? false : true} control={<Radio />} label="Day" />
              <FormControlLabel value="week" disabled={(filterState.section === "top") ? false : true} control={<Radio />} label="Week" />
              <FormControlLabel value="month" disabled={(filterState.section === "top") ? false : true} control={<Radio />} label="Month" />
              <FormControlLabel value="year" disabled={(filterState.section === "top") ? false : true} control={<Radio />} label="Year" />
              <FormControlLabel value="all" disabled={(filterState.section === "top") ? false : true} control={<Radio />} label="All Time" />
            </RadioGroup>
            </FormControl>
           </CardContent>
           <CardActions>
             <Button dense>Go!</Button>
           </CardActions>
         </Card>
       </div>
    </Modal>
  );
}



filterModal.propTypes = {
  modalToggle: PropTypes.func.isRequired, //callback for toggling modal
  show: PropTypes.bool.isRequired, //boolean for showing the modal
  filterState: PropTypes.object.isRequired, //filter
  filterChanged: PropTypes.func.isRequired, //callback for updating filter in parent state
};


export default filterModal;
