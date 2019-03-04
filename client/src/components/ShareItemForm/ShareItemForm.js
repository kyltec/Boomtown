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
  Checkbox,
  Typography
} from '@material-ui/core/';
import PropTypes from 'prop-types';
import {
  updateItem,
  resetItem,
  resetImage
} from '../../redux/modules/ShareItem';
import { connect } from 'react-redux';
import { validate } from './helpers/validation';
import { Mutation } from 'react-apollo';
import { ADD_ITEM_MUTATION, ALL_ITEMS_QUERY } from '../../apollo/queries';

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

    return (
      <div>
        <Typography className={classes.shareFormTitle}>
          Share. Borrow. Prosper.
        </Typography>
        <Mutation mutation={ADD_ITEM_MUTATION}>
          {addItemMutation => {
            return (
              <Form
                onSubmit={async values => {
                  addItemMutation({
                    variables: {
                      item: {
                        ...values,
                        tags: this.state.selectedTags.map(tag => ({
                          id: tag,
                          title: ''
                        }))
                      }
                    },
                    refetchQueries: [
                      {
                        query: ALL_ITEMS_QUERY
                      }
                    ]
                  });
                }}
                validate={values => {
                  return validate(
                    values,
                    this.state.fileSelected,
                    this.state.selectedTags
                  );
                }}
                render={({
                  handleSubmit,
                  pristine,
                  submitting,
                  invalid,
                  form
                }) => (
                  <form
                    onSubmit={event => {
                      handleSubmit(event).then(() => {
                        form.reset();
                        this.fileInput.current.value = '';
                        this.setState({ fileSelected: false });
                        this.setState({ selectedTags: [] });
                        resetItem();
                      });
                    }}
                  >
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
                        className={classes.addImageButton}
                        onClick={() => {
                          this.fileInput.current.click();
                        }}
                      >
                        Select An Image
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        fullWidth
                        color="white"
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
                              fullWidth
                              margin="normal"
                              type="text"
                              {...input}
                            />
                            {meta.touched &&
                              meta.invalid && (
                                <Typography className={classes.errorText}>
                                  {meta.error}
                                </Typography>
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
                            fullWidth
                            placeholder="Describe Your Item"
                            multiline
                            maxLength="6"
                            rows="4"
                          />
                          {meta.touched &&
                            meta.invalid && (
                              <div
                                className="error"
                                style={{ color: 'red', fontSize: '10px' }}
                              >
                                <Typography className={classes.errorText}>
                                  {meta.error}
                                </Typography>
                              </div>
                            )}
                        </div>
                      )}
                    />
                    <Field
                      name="tags"
                      render={({ classes, meta }) => (
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
                                      this.state.selectedTags.indexOf(tag.id) >
                                      -1
                                    }
                                  />
                                  <ListItemText primary={tag.title} />
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                    <div>
                      <Button
                        variant="contained"
                        type="submit"
                        className={classes.shareItemButton}
                        disabled={submitting || pristine || invalid}
                        color="primary"
                      >
                        Share
                      </Button>
                    </div>
                  </form>
                )}
              />
            );
          }}
        </Mutation>
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
    console.log('hhihihihi');
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
