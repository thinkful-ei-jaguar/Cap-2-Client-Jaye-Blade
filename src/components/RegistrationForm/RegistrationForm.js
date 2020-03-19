import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      
      <form className="registration-form"
        onSubmit={this.handleSubmit}
      >
        
        <h2 className='sign-up-h2'>Sign up</h2>
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div className="registration-form-div">
          <Label 
          className='registration-label'
          htmlFor='registration-name-input'>
            Enter your name<Required />
          </Label>
          <Input
            ref={this.firstInput}
            id='registration-name-input'
            name='name'
            className='registration-input'
            required
          />
        </div>
        <div className="registration-form-div">
          <Label 
          htmlFor='registration-username-input'
          className='registration-label'>
            Choose a username<Required />
          </Label>
          <Input
            id='registration-username-input'
            name='username'
            className='registration-input'
            required
          />
        </div>
        <div className="registration-form-div">
          <Label 
          htmlFor='registration-password-input'
          className='registration-label'>
            Choose a password<Required />
          </Label>
          <Input
            id='registration-password-input'
            name='password'
            type='password'
            className='registration-input'
            required
          />
        </div>
        <footer className="registration-footer">
          <Button className="registration-button-create" type='submit'>
            Sign up
          </Button>
          {' '}
          <Link className='already-have' to='/login'>Already have an account?</Link>
        </footer>
      </form>
    )
  }
}

export default RegistrationForm
