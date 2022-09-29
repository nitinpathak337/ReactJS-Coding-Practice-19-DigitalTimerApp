// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    limit: 25,
    isStart: false,
    totalSec: 1500,
    sec: 0,
    minusDisable: false,
    plusDisable: false,
  }

  startTimer = () => {
    const {limit, sec} = this.state
    this.setState({totalSec: limit * 60 + sec - 1})
    this.timerId = setInterval(() => this.timer(), 1000)
  }

  timer = () => {
    this.setState(prevState => ({
      totalSec: prevState.totalSec - 1,
      min: Math.floor(prevState.totalSec / 60),
      sec: prevState.totalSec % 60,
    }))
  }

  reduceLimit = () => {
    this.setState(prevState => ({limit: prevState.limit - 1}))
  }

  increaseLimit = () => {
    this.setState(prevState => ({limit: prevState.limit + 1}))
  }

  changeStatus = () => {
    const {isStart} = this.state
    if (isStart === false) {
      this.startTimer()
    } else {
      clearInterval(this.timerId)
    }
    this.setState(prevState => ({
      isStart: !prevState.isStart,
      minusDisable: true,
      plusDisable: true,
    }))
  }

  resetTimer = () => {
    this.setState({
      limit: 25,
      isStart: false,
      minusDisable: false,
      plusDisable: false,
      totalSec: 0,
      sec: 0,
      min: 25,
    })
    clearInterval(this.timerId)
  }

  render() {
    const {limit, isStart, sec, min, minusDisable, plusDisable} = this.state
    const status = isStart ? 'Running' : 'Paused'
    const icon = isStart
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const alt = isStart ? 'pause icon' : 'play icon'
    const text = isStart ? 'Pause' : 'Start'
    // const minusBtn = minusDisable ? '' : this.reduceLimit
    const plusBtn = plusDisable ? ' ' : this.increaseLimit

    const m = min === undefined ? limit : min
    const dispMin = m > 9 ? m : `0${m}`
    const dispSec = sec > 9 ? sec : `0${sec}`
    return (
      <div className="bg">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-details-container">
          <div className="timer-bg">
            <div className="timer-card">
              <h1 className="timer">
                {dispMin}:{dispSec}
              </h1>
              <p className="status">{status}</p>
            </div>
          </div>
          <div>
            <div className="play-reset-button-container">
              <button
                type="button"
                className="play-reset-button cont"
                onClick={this.changeStatus}
              >
                <img src={icon} alt={alt} className="play-reset-icon" />
                <p className="para">{text}</p>
              </button>

              <button
                type="button"
                className="play-reset-button cont"
                id="reset"
                onClick={this.resetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="play-reset-icon"
                />
                <p className="para">Reset</p>
              </button>
            </div>
            <p className="set-timer-limit">Set Timer Limit</p>
            <div className="minus-plus-container">
              <button
                type="button"
                className="minus-plus-button"
                onClick={minusDisable ? '' : this.reduceLimit}
              >
                -
              </button>
              <p className="limit">{limit}</p>

              <button
                type="button"
                className="minus-plus-button"
                onClick={plusBtn}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
