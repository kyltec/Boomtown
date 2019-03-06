import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';

const Share = ({ classes, tags }) => {
  return (
    <Grid container className={classes.shareFormContainer} spacing={32}>
      <Grid item className={classes.shareItemCard} xs={6}>
        <ShareItemPreview className={classes} tags={tags} />
      </Grid>
      <Grid item xs={5}>
        <ShareItemForm className={classes} tags={tags} />
      </Grid>
    </Grid>
  );
};

Share.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Share;
