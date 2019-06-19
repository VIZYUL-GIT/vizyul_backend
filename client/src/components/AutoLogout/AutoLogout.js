import React, { Component } from 'react';

const LOGIN_TIMEOUT = 15;
const TIMER_TICK = 60000;

class AutoLogout extends Component {
  componentDidMount() {
    this.timer = setInterval(
      () => this.tick(),
      TIMER_TICK,
    );
  }

  idleTime = 0;

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  _onMouseMove = () => {
    this.idleTime = 0;
  };

  _onKeyPress = () => {
    this.idleTime = 0;
  };

  tick() {
    this.idleTime += 1;
    console.log('tick', this.idleTime);
    if (this.idleTime > LOGIN_TIMEOUT) {
      const { logoutUser } = this.props;
      logoutUser();
    }
  }

  render() {
    const { children } = this.props;
    
    return (
      <div onMouseMove={this._onMouseMove} onKeyPress={this._onKeyPress}>
        {children}
      </div>
    );
  }
}

export default AutoLogout;
