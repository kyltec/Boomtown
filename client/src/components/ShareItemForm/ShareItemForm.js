import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import {
  TextField,
  Button,
  ListItemText,
  withStyles,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Checkbox
} from '@material-ui/core/';
import PropTypes from 'prop-types';
import {
  updateItem,
  resetItem,
  resetImage
} from '../../redux/modules/ShareItem';
import { connect } from 'react-redux';
import { validate } from './helpers/validation';

import styles from './styles';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: []
    };
  }

  onSubmit(o) {
    console.log('Submitting:', o);
  }

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }

  handleChange = event => {
    this.setState({ selectedTags: event.target.value });
  };

  handleFileSelected = () => {
    this.setState({ fileSelected: this.fileInput.current.files[0] });
  };

  dispatchUpdate(values, tags, updateItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateItem({
          imageurl
        });
      });
    }
    updateItem({
      ...values,
      tags: this.applyTags(tags)
    });
  }

  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }

  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }

  render() {
    const { classes, tags, updateItem, resetImage, resetItem } = this.props;
    console.log(this.props);
    console.log(this.state.selectedTags);
    return (
      <div className="share-form">
        <h1>Share. Borrow. Prosper.</h1>
        <Form
          onSubmit={this.onSubmit}
          validate={values => {
            return validate(
              values,
              this.state.fileSelected,
              this.state.selectedTags
            );
          }}
          render={({ handleSubmit, pristine, submitting, invalid }) => (
            <form onSubmit={handleSubmit}>
              <FormSpy
                subscription={{ values: true }}
                component={({ values }) => {
                  if (values) {
                    this.dispatchUpdate(values, tags, updateItem);
                  }
                  return '';
                }}
              />

              {!this.state.fileSelected ? (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    this.fileInput.current.click();
                  }}
                >
                  Select An Image
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    this.fileInput.current.value = '';
                    this.setState({ fileSelected: false });
                    resetImage();
                  }}
                >
                  Reset Image
                </Button>
              )}
              <input
                hidden
                type="file"
                id="fileInput"
                ref={this.fileInput}
                accept="image/*"
                onChange={event => {
                  this.handleFileSelected();
                }}
              />
              <Field
                name="title"
                render={({ input, meta }) => {
                  return (
                    <div>
                      <TextField
                        id="standard-textarea"
                        label="Name Your Item"
                        multiline
                        margin="normal"
                        fullWidth
                        className={classes.textField}
                        type="text"
                        {...input}
                      />
                      {meta.touched &&
                        meta.invalid && (
                          <div
                            className="error"
                            style={{ color: 'red', fontSize: '10px' }}
                          >
                            {meta.error}
                          </div>
                        )}
                    </div>
                  );
                }}
              />
              <Field
                name="description"
                render={({ input, meta }) => (
                  <div className="field">
                    <TextField
                      type="text"
                      {...input}
                      placeholder="Describe Your Item"
                      multiline
                      fullWidth
                      rows="4"
                    />
                    {meta.touched &&
                      meta.invalid && (
                        <div
                          className="error"
                          style={{ color: 'red', fontSize: '10px' }}
                        >
                          {meta.error}
                        </div>
                      )}
                  </div>
                )}
              />
              <Field
                name="tags"
                render={({ classes, meta }) => (
                  <div>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="tagid">Add Tags</InputLabel>
                      <Select
                        multiple
                        value={this.state.selectedTags}
                        onChange={this.handleChange}
                        renderValue={selected => {
                          return this.generateTagsText(tags, selected);
                        }}
                      >
                        {tags &&
                          tags.map(tag => (
                            <MenuItem key={tag.id} value={tag.id}>
                              <Checkbox
                                checked={
                                  this.state.selectedTags.indexOf(tag.id) > -1
                                }
                              />
                              <ListItemText primary={tag.title} />
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                )}
              />
              <Button
                variant="contained"
                type="submit"
                disabled={submitting || pristine || invalid}
                color="primary"
              >
                Share
              </Button>
            </form>
          )}
        />
      </div>
    );
  }
}

ShareItemForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  updateItem(item) {
    dispatch(updateItem(item));
  },
  resetItem() {
    dispatch(resetItem());
  },
  resetImage() {
    dispatch(resetImage());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ShareItemForm));
