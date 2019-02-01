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

import styles from './styles';

const ItemCard = ({ classes, item }) => {
  return (
    <Card className={classes.card}>
      <Fragment>
        <CardMedia
          className={classes.media}
          title={item.title}
          image={item.imageurl}
        />
        <CardContent>
          <Typography gutterBottom variant="title" component="h1">
            {item.title}
          </Typography>
          <Typography
            glutterBottom
            variant="body1"
            className={classes.descriptionField}
          >
            {item.description}
          </Typography>
          <Typography glutterBottom component="p">
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

ItemCard.defaultProps = {
  item: {
    title: 'Name Item',
    description: 'Describe Your Item',
    tags: [],
    imageurl: 'http://via.placeholder.com/350x250?text=Please select an image',
    itemowner: {},
    created: new Date()
  }
};
export default withStyles(styles)(ItemCard);
