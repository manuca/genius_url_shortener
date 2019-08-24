import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Shortner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "" };
  }

  postUrl() {
    console.log("Posting");
  }

  render() {
    return (
      <div>
        <input />
        <button onClick={() => this.postUrl()}>Shorten Me!</button>
      </div>
    );
  }
}

Shortner.propTypes = {
  url: PropTypes.string
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Shortner />,
    document.body.appendChild(document.createElement('div')),
  )
});
