import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import { Button, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './styles';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit(o) {
    console.log('Submitting:', o);
  }

  validate(o) {
    console.log('Validating:', o);
    const error = {};
    if (!o.name) {
      error.name = 'Name is required';
    }
    if (!o.email) {
      error.email = 'Email is required';
    } else if (!/.*@.*\..*/.test(o.email)) {
      error.email = 'Email invalid';
    }
    return error;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, tags } = this.props;
    return (
      <div className="share-form">
        <h1>Share. Borrow. Prosper. </h1>
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Button variant="contained" color="primary">
                Select An Image
              </Button>
              <Field
                name="item-name"
                render={({ input, meta }) => {
                  return (
                    <div className="field">
                      <TextField
                        inputProps={input}
                        placeholder={'Name Your Item'}
                        fullWidth
                      />
                    </div>
                  );
                }}
              />
              <Field
                name="item-description"
                render={({ input, meta }) => (
                  <div className="field">
                    <TextField
                      type="text"
                      {...input}
                      placeholder={'Describe Your Item'}
                      fullWidth
                    />
                  </div>
                )}
              />
              <Field
                name="tag-select"
                render={({ classes, meta }) => (
                  <div>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="age-simple">Add Tags</InputLabel>
                      <Select
                        value={tags}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'item-tags',
                          id: 'tags'
                        }}
                      >
                        {tags.map(tag => (
                          <MenuItem key={tag.id} value={tag.title}>
                            <ListItemText primary={tag.title} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                )}
              />
              <Button variant="contained" type="submit">
                Share
              </Button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ShareItemForm);
