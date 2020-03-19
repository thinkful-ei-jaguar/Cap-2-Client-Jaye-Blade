import React, { Component } from 'react'
import './Learning.css'
import UserContext from '../../contexts/UserContext'


export default class Learning extends Component {
  
  static contextType = UserContext

  state = {
    guess: '',
    guessMade: false,
    previousWord: '',
    currentWord: ''
  }

  componentDidMount() {
    this.context.grabNextWord()
    this.setState({
      currentWord: this.context.nextWord
    })
  }

  updateGuess = (event) => {
    event.preventDefault()

    this.setState({
      guess: event.target.value
    })
  }

  submitGuess = (event) => {
    event.preventDefault()
    this.setState({
      guessMade: true,
      currentWord: this.context.nextWord
    })
    this.context.postGuess({guess: this.state.guess})
  }

  tryAnotherWord = (event) => {
    event.preventDefault()
    this.setState({
      guess: '',
      guessMade: false,
      currentWord: ''
    })
  }

  render() {
    return (
      <div className="learning-div">
        <h2>Translate the word:</h2>

        <span className="learn-word"> 
          {this.context.nextWord && !this.state.guessMade ? 
          this.context.nextWord 
          : 
          this.context.nextWord && this.state.currentWord && this.state.guessMade ? 
          this.state.currentWord : ''  
        }  
        </span>

        <div className="correctly-div">
          {!this.state.guessMade ? (`You have answered this word correctly ${this.context.wordCorrectCount} times.`) 
          : 'This would be haiku'}
        </div>

        <div className="incorrectly-div">
        {!this.state.guessMade ? (`You have answered this word incorrectly ${this.context.wordIncorrectCount} times.`) 
        : 'If the next line was not lame'}
        </div>

        <p className="DisplayScore">Your total score is: {this.context.totalScore}</p>

        <form className="learning-form" onSubmit={this.submitGuess}>
          <label htmlFor="learn-guess-input">
            What's the translation for this word?
          </label>
          <input type="text" id="learn-guess-input" name="guess" onChange={this.updateGuess} value={this.state.guess} required />  
          <button disabled={this.state.guessMade} type="submit">
            Submit your answer
          </button>
        </form>
        <h2 className="answer-response">
          {this.state.guessMade ? this.context.isCorrect ? 'You were correct! :D' : 'Good try, but not quite right :(' : ''}
        </h2>
      
          {this.state.guessMade ? 
          <><button className="try-another-button" onClick={this.tryAnotherWord}>Try another word!</button> 
          <p className="DisplayFeedback">The correct translation for {this.state.currentWord} was {this.context.answer ? this.context.answer : ''} and you chose {this.state.guess}!</p></>
          : ''}
      </div>
    )
  }
}
