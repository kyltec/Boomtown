import ItemCard from '../ItemCard';
import React from 'react';
import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview }) => {
  return <ItemCard item={shareItemPreview} />;
};

const mapStateToProps = state => ({
  shareItemPreview: state.shareItemPreview
});

export default connect(mapStateToProps)(ShareItemPreview);
