import React, { Fragment } from 'react';
import { Grid, Typography, Avatar, Card, CardContent } from '@material-ui/core';
import ItemCard from '../../components/ItemCard';
import Gravatar from 'react-gravatar';

const Profile = ({ classes, profile }) => {
  console.log(profile);

  return (
    <Fragment>
      <div>
        <Card className={classes.profileContainer}>
          <CardContent>
            <div className={classes.profileInfo}>
              <Avatar className={classes.profileAvatar}>
                <Gravatar email={profile.email} />
              </Avatar>
              <Typography className={classes.profileName}>
                {profile.fullname}
              </Typography>
            </div>
            <div>
              <Typography className={classes.profileStats}>
                <span className={classes.infoNum}>{profile.items.length}</span>{' '}
                Shared Items{' '}
                <span className={classes.infoNum}>
                  {profile.borrowed.length}
                </span>{' '}
                Borrowed Items
              </Typography>
              <p>{profile.bio}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Typography className={classes.shareTitle}>Shared Items </Typography>
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
