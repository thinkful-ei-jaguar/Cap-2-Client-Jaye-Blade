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
          {this.context.user.name}
        </span>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link className="header-login-link" to='/login'><button className="header-login-button">Login Page</button></Link>
        {' '}
        <Link className="header-signup-link" to='/register'><button className="header-signup-button">Sign up</button></Link>
      </nav>
    )
  }

  render() {
    return (
      <header>
        <h1>
          <Link className="header-title-link" to='/'>
            Spaced repetition
          </Link>
        </h1>
        <p className="header-paragraph">
          Practice learning a language with the spaced repetition revision technique.
        </p>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
