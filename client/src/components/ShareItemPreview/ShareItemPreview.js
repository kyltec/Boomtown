import ItemCard from '../ItemCard';
import React from 'react';
import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview }) => {
  console.log('>>>>>>>>>>>>>', shareItemPreview);
  return <ItemCard item={shareItemPreview} />;
};

const mapStateToProps = state => {
  console.log('hololololol >>', state);
  return {
    ...state
  };
};
export default connect(mapStateToProps)(ShareItemPreview);
