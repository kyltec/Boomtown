import React from 'react';
import ItemsGrid from '../../components/ItemsGrid/ItemsGrid';
import PropTypes from 'prop-types';

const Items = ({ classes, items }) => {
  return <ItemsGrid className={classes} items={items} />;
};

Items.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Items;
