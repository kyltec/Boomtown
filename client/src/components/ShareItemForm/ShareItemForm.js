import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';

class ShareItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="email-form">
        <h3>Email Form</h3>
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="name"
                render={({ input, meta }) => {
                  console.log('Inside name: ', meta);
                  return (
                    <div className="field">
                      <label for="name">Name:</label>
                      <TextField inputProps={input} />
                      {/*<input type="text" {...input} />*/}
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
                name="email"
                render={({ input, meta }) => (
                  <div className="field">
                    <label for="name">Email:</label>
                    <input type="text" {...input} />
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
            </form>
          )}
        />
      </div>
    );
  }
}

export default ShareItemForm;
