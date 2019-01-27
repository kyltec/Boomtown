import React, { Component } from 'react';
import Share from './Share';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Mutation } from 'react-apollo';
import { ADD_ITEM_MUTATION } from '../../apollo/queries';

class ShareContainer extends Component {
  render() {
    return (
      <Mutation mutation={ADD_ITEM_MUTATION}>
        {({ loading, error, data }) => {
          if (loading) return <FullScreenLoader inverted />;
          if (error) return <p>{`Error! ${error.message}`}</p>;
          console.log(data);
          return <Share classes={this.props.classes} addItem={data} />;
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(ShareContainer);
