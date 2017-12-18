import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Typography, Card, CardActions, CardContent, Button,
  FormControl, RadioGroup, FormControlLabel, FormLabel, Radio, Switch, Grid } from 'material-ui';
import styleClasses from './FilterModal.css';

const filterModal = ({modalToggle, show, filterState, filterChanged, onFilterRequest}) => {

const filterChangedHandler = (event, value) => {
  filterChanged(event.target.name, value);
}

  return (
    <Modal  show={show} onBackdropClick={modalToggle(false)}>
    <div className={styleClasses.modal}>
         <Card>
           <CardContent>
             <Typography type='title'>Filter</Typography>
            <FormControl className={styleClasses.formContainer}>
            <Grid container>
              <Grid item md={6} xs={12}>
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
            </Grid>
            <Grid item md={6} xs={12}>
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

            <FormControlLabel name="mature"
              control={
                <Switch
                  checked={filterState.mature}
                  onChange={filterChangedHandler}
                  />
              } label="Allow NSFW Posts"
             />
             <FormControlLabel name="viral"
               control={
                 <Switch
                   checked={filterState.viral}
                   onChange={filterChangedHandler}
                   />
               } label="Show Viral Posts"
              />
              </Grid>
              </Grid>
            </FormControl>
           </CardContent>
           <CardActions>
            <div className={styleClasses.formButtonContainer}>
               <Button dense className={styleClasses.formButton} onClick={onFilterRequest}>Go!</Button>
            </div>
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
  onFilterRequest: PropTypes.func.isRequired //callback that initates imgur api call with new filer
};


export default filterModal;
