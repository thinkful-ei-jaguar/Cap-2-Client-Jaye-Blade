import React, { Component } from 'react'
import './Learning.css'
import UserContext from '../../contexts/UserContext'


export default class Learning extends Component {
  
  static contextType = UserContext

  state = {
    guess: ''
  }

  componentDidMount() {
    this.context.grabNextWord()
  }

  updateGuess = (event) => {
    event.preventDefault()

    this.setState({
      guess: event.target.value
    })
  }

  submitGuess = (event) => {
    event.preventDefault()

    this.context.postGuess(this.state)
  }

  render() {
    return (
      <div className="learning-div">
        <h2>Translate the word:</h2>

        <span className="learn-word">
          {this.context.nextWord ? this.context.nextWord : ''}  
        </span>

        <div>You have answered this word correctly {this.context.wordCorrectCount} times.</div>

        <div>You have answered this word incorrectly {this.context.wordIncorrectCount} times.</div>

        <p className="DisplayScore">Your total score is: {this.context.totalScore}</p>

        <form className="learning-form" onSubmit={this.submitGuess}>
          <label htmlFor="learn-guess-input">
            What's the translation for this word?
          </label>
          <input type="text" id="learn-guess-input" name="guess" onChange={this.updateGuess} value={this.state.guess} required />  
          <button type="submit">
            Submit your answer
          </button>
        </form>
      </div>
    )
  }
}
