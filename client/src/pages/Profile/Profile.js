import React, { Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import ItemCard from '../../components/ItemCard';

const Profile = ({ classes, profile }) => {
  console.log(profile);

  return (
    <Fragment>
      <div className={classes.profileContainer}>
        <div>
          <Typography className={classes.profileName}>
            {profile.fullname}
          </Typography>
          <Typography className={classes.profileStats}>
            {profile.items.length} Shared Items {profile.borrowed.length}{' '}
            Borrowed Items
          </Typography>
          <p>{profile.bio}</p>
        </div>
      </div>

      <div>
        <Typography className={classes.shareTitle}>Shared Items</Typography>
      </div>
      <Grid container className={classes.profileItemContainer}>
        <Grid item />
        {profile.items.map(item => {
          return (
            <Grid item xs={12} sm={6} md={4} className={classes.profileItems}>
              <ItemCard item={item} />
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
};

export default Profile;
