import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';

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

export default Share;
