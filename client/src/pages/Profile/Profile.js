import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import ItemCard from '../../components/ItemCard';

const Profile = ({ classes, profile }) => {
  console.log(profile);

  return (
    <Fragment>
      <div className={classes.profileContainer}>
        <div>
          <h2>{profile.fullname}</h2>
          <p>
            {profile.items.length} Shared Items {profile.borrowed.length}
            Borrowed Items
          </p>
          <p>{profile.bio}</p>
        </div>
      </div>

      <div>
        <h2 className={classes.shareTitle}>Shared Items</h2>
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
