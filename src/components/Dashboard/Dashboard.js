import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import LanguageService from '../../services/language-service'
import config from '../../config'
import TokenService from '../../services/token-service'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import './Dashboard.css'


class Dashboard extends Component {

  static contextType = UserContext

  state = { 
    language: {},
    words: [],
    error: null }

  componentDidMount() {
    this.context.grabLanguage()
  }

  render () {
    let vocabCards = this.context.words ? (this.context.words.map((word) => {
      return (
        <li className="vocab-card" key={word.id}>
          <h4>{word.original}</h4>
          <p>correct answer count: {word.correct_count}</p>
          <p>incorrect answer count: {word.incorrect_count}</p>
        </li>
      )
    }
    )) : '';
    
    
    return (
      <div className="dashboard-header">
        <h2 className="language-title">{this.context.language ? this.context.language.name : ''}</h2>
        
        <section className="poor-little-guy">
          Total correct answers: {' '}
          {this.context.language ? this.context.language.total_score : ''}
        </section>

        <Link to="/learn"><button className="header-login-button">Start practicing</button></Link>
        <h3>Words to practice</h3>
        <ul className="vocab-list">
          {vocabCards}
        </ul>
      </div>
    )
  }
}


export default Dashboard