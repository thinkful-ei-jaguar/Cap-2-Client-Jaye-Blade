import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'
import config from '../config'

const UserContext = React.createContext({
  user: {},
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
  grabLanguage: () => {},
  grabNextWord: () => {},
  postGuess: () => {},
  language: {},
  words: [],
  nextWord: '',
  totalScore: 0,
  answer: '',
  wordCorrectCount: 0,
  wordIncorrectCount: 0,
  isCorrect: false
})

export default UserContext

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    const state = { user: {}, error: null }

    const jwtPayload = TokenService.parseAuthToken()

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      }

    this.state = state;
    IdleService.setIdleCallback(this.logoutBecauseIdle)
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setUser = user => {
    this.setState({ user })
  }

  processLogin = authToken => {
    TokenService.saveAuthToken(authToken)
    const jwtPayload = TokenService.parseAuthToken()
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
    })
    IdleService.regiserIdleTimerResets()
    TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken()
    })
  }

  processLogout = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.setUser({})
  }

  logoutBecauseIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.setUser({ idle: true })
  }

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken()
        })
      })
      .catch(err => {
        this.setError(err)
      })
  }

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

  grabNextWord = () => {
    fetch(`${config.API_ENDPOINT}/language/head`, {
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
        console.log(response)
        this.setState({
          ...response
        })
      })
  }

  postGuess = (guess) => {
    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(guess)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(response => {
        console.log(response.answer)
        this.setState({
          nextWord: response.nextWord,
          wordCorrectCount: response.wordCorrectCount,
          wordIncorrectCount: response.wordIncorrectCount,
          answer: response.answer,
          isCorrect: response.isCorrect,
          totalScore: response.totalScore
        })
      })
  }

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      grabLanguage: this.grabLanguage,
      grabNextWord: this.grabNextWord,
      postGuess: this.postGuess,
      language: this.state.language,
      words: this.state.words,
      nextWord: this.state.nextWord,
      totalScore: this.state.totalScore,
      wordCorrectCount: this.state.wordCorrectCount,
      wordIncorrectCount: this.state.wordIncorrectCount,
      isCorrect: this.state.isCorrect,
      answer: this.state.answer
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
