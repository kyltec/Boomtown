import ItemCard from '../ItemCard';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ShareItemPreview = ({ shareItemPreview }) => {
  return <ItemCard item={shareItemPreview} />;
};

const mapStateToProps = state => {
  return {
    ...state
  };
};

ShareItemPreview.propTypes = {
  shareItemPreview: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(ShareItemPreview);
