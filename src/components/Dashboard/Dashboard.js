import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import LanguageService from '../../services/language-service'
import config from '../../config'
import TokenService from '../../services/token-service'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'


class Dashboard extends Component {

  static contextType = UserContext

  state = { 
    language: {},
    words: [],
    error: null }

  grabLanguage = () => {
    fetch(`${config.API_ENDPOINT}/language`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(response => {
        this.setState({
          ...response
        })
      })
      
  }


  componentDidMount() {
    this.grabLanguage()
  }

  

  render () {
    let vocabCards = this.state.words ? (this.state.words.map((word) => {
      console.log('Going through')
      return (
        <li key={word.id}>
          <h4>{word.original}</h4>
          <p>correct answer count: {word.correct_count}</p>
          <p>incorrect answer count: {word.incorrect_count}</p>
        </li>
      )
    }
    )) : '';
    
    return (
      <>
        <h2>{this.state.language.name}</h2>
        <section>Total correct answers: {this.state.language.total_score}</section>
        <Link to="/learn">Start practicing</Link>
        <h3>Words to practice</h3>
        <ul className="vocab-list">
          {vocabCards}
        </ul>
      </>
    )
  }
}


export default Dashboard