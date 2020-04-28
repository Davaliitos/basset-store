import React from "react";
import { connect } from 'react-redux'

import FormInput from  './../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from './../../redux/user/user.actions'

import "./sign-in.style.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit =  async event => {
    event.preventDefault();
    const {emailSignInStart} = this.props;
    const {email,password} = this.state;

    emailSignInStart(email,password)
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { googleSigninStart } = this.props;
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput 
            name="email" 
            type="email" 
            value={this.state.email}
            label="Email"
            handleChange={this.handleChange}
            required />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            label="Password"
            handleChange={this.handleChange}
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton type="button" onClick={googleSigninStart} isGoogleSignIn>Sign In With Google</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  googleSigninStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})


export default connect(null,mapDispatchToProps)(SignIn);
