import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Avatar
} from '@material-ui/core/';
import Gravatar from 'react-gravatar';
import { Link, withRouter } from 'react-router-dom';

import styles from './styles';

const ItemCard = ({ classes, item }) => {
  return (
    <Card className={classes.card}>
      <Fragment>
        <CardMedia
          className={classes.media}
          title={item.title}
          image={item.imageurl}
          component={Link}
          to={`/profile/${item.itemowner.id}`}
        />
        <CardContent>
          <div className={classes.itemOwnerContainer}>
            <div>
              <Avatar aria-label="user" className={classes.avatar}>
                {item.itemowner && <Gravatar email={item.itemowner.email} />}
              </Avatar>
            </div>
            <div>
              <Typography className={classes.itemOwnerName}>
                {item.itemowner.fullname}
              </Typography>
            </div>
          </div>
          <Typography variant="title">{item.title}</Typography>

          <Typography variant="body1" className={classes.descriptionField}>
            {item.description}
          </Typography>
          <Typography component="p">
            {item.tags.map(tag => tag.title).join(', ')}
          </Typography>
        </CardContent>
      </Fragment>
      <CardActions>
        <Button size="small" color="primary">
          Borrow
        </Button>
      </CardActions>
    </Card>
  );
};

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ItemCard));
