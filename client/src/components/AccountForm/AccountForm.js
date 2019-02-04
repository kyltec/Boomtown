import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { Form, Field } from 'react-final-form';
import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY
} from '../../apollo/queries';
import { Mutation } from 'react-apollo';
import { graphql, compose } from 'react-apollo';
import validate from './helpers/validation';
import styles from './styles';

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Mutation mutation={SIGNUP_MUTATION}>
          {signupMutation => {
            return (
              <Form
                onSubmit={async values => {
                  signupMutation({
                    variables: {
                      user: {
                        ...values
                      }
                    }
                  });
                }}
                validate={values => validate(values, this.state.formToggle)}
                render={({
                  handleSubmit,
                  pristine,
                  submitting,
                  invalid,
                  values,
                  form
                }) => (
                  <form
                    onSubmit={() => {
                      console.log('Submitted');
                    }}
                    className={classes.accountForm}
                  >
                    {!this.state.formToggle && (
                      <Field
                        name="fullname"
                        render={({ input, meta }) => (
                          <FormControl
                            fullWidth
                            className={classes.formControl}
                          >
                            <InputLabel htmlFor="fullname">Username</InputLabel>
                            <Input
                              id="fullname"
                              type="text"
                              inputProps={{
                                autoComplete: 'off'
                              }}
                              value={''}
                              {...input}
                            />
                            {meta.touched &&
                              meta.invalid && (
                                <div
                                  className="error"
                                  style={{ color: 'red', fontsize: '10px' }}
                                >
                                  {meta.error}
                                </div>
                              )}
                          </FormControl>
                        )}
                      />
                    )}
                    <Field
                      name="email"
                      render={({ input, meta }) => (
                        <FormControl fullWidth className={classes.formControl}>
                          <InputLabel htmlFor="email">Email</InputLabel>
                          <Input
                            id="email"
                            type="text"
                            inputProps={{
                              autoComplete: 'off'
                            }}
                            value={''}
                            {...input}
                          />
                          {meta.touched &&
                            meta.invalid && (
                              <div
                                className="error"
                                style={{ color: 'red', fontsize: '10px' }}
                              >
                                {meta.error}
                              </div>
                            )}
                        </FormControl>
                      )}
                    />
                    <Field
                      name="password"
                      render={({ input, meta }) => (
                        <FormControl fullWidth className={classes.formControl}>
                          <InputLabel htmlFor="password">Password</InputLabel>
                          <Input
                            id="password"
                            type="password"
                            inputProps={{
                              autoComplete: 'off'
                            }}
                            value={''}
                            {...input}
                          />
                          {meta.touched &&
                            meta.invalid && (
                              <div
                                className="error"
                                style={{ color: 'red', fontsize: '10px' }}
                              >
                                {meta.error}
                              </div>
                            )}
                        </FormControl>
                      )}
                    />
                    <FormControl className={classes.formControl}>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Button
                          type="submit"
                          className={classes.formButton}
                          variant="contained"
                          size="large"
                          color="secondary"
                          onClick={e => {
                            e.preventDefault();

                            if (this.state.formToggle) {
                              this.props.loginMutation({
                                variables: {
                                  user: {
                                    email: values.email,
                                    password: values.password
                                  }
                                }
                              });
                            } else {
                              this.props.signupMutation({
                                variables: {
                                  user: {
                                    fullname: values.fullname,
                                    password: values.password,
                                    email: values.email
                                  }
                                }
                              });
                            }
                          }}
                          disabled={submitting || pristine || invalid}
                        >
                          {this.state.formToggle ? 'Enter' : 'Create Account'}
                        </Button>
                        <Typography>
                          <button
                            className={classes.formToggle}
                            type="button"
                            onClick={() => {
                              form.reset();
                              this.setState({
                                formToggle: !this.state.formToggle
                              });
                            }}
                          >
                            {this.state.formToggle
                              ? 'Create an account.'
                              : 'Login to existing account.'}
                          </button>
                        </Typography>
                      </Grid>
                    </FormControl>
                    <Typography className={classes.errorMessage}>
                      {/* @TODO: Display sign-up and login errors */}
                    </Typography>
                  </form>
                )}
              />
            );
          }}
        </Mutation>
      </Fragment>
    );
  }
}
const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];
export default compose(
  graphql(SIGNUP_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'signupMutation'
  }),
  graphql(LOGIN_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'loginMutation'
  }),
  withStyles(styles)
)(AccountForm);
