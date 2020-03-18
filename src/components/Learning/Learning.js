import React, { Component } from 'react'
import './Learning.css'
import UserContext from '../../contexts/UserContext'


export default class Learning extends Component {
  
  static contextType = UserContext

  componentDidMount() {
    this.context.grabNextWord()
  }

  render() {
    return (
      <div>
        <h2>Translate the word:</h2>
        <span className="learn-word">
          {this.context.nextWord ? this.context.nextWord : ''}  
        </span>
        <p className="total-score">Your total score is: {this.context.totalScore}</p>
        <form className="learning-form">

        </form>
      </div>
    )
  }
}
