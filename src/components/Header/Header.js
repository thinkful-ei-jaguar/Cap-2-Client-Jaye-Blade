import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div>
        <span>
          <h2 className="welcome-message">Welcome back, {this.context.user.name}!</h2>
        </span>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            <button className="header-login-button">Logout</button>
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link className="header-login-link" to='/login'><button className="header-login-button">Login</button></Link>
        {' '}
        <Link className="header-signup-link" to='/register'><button className="header-signup-button">Sign up</button></Link>
      </nav>
    )
  }

  render() {
    return (
      <header>
        <div className='headerback'></div>
        <div className='box'></div>
        <div className='words'>
        <h1>
          <Link className="header-title-link" to='/'>
            Weebify
          </Link>
        </h1>
        <p className="header-paragraph">
          Practice learning a language with the spaced repetition revision technique.
        </p>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
          </div>
      </header>    
    );
  }
}

export default Header
