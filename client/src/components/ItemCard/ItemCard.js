import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core/';
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
          <Typography variant="title" component="h1">
            {item.title}
          </Typography>
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
