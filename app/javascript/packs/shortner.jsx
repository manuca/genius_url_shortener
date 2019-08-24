import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

class Shortner extends React.Component {
  constructor(props) {
    super(props)
    this.state = { url: "", shortened_url: "" }
  }

  postUrl() {
    const {url} = this.state

    axios.post('/urls', { url: url })
      .then(response => console.log("Ok: " +  response))
      .catch(error => console.log("Error: " +  error))
  }

  inputChanged(event) {
    this.setState({url: event.target.value})
  }

  render() {
    return (
      <div>
        <input value={this.state.url} onChange={(event) => this.inputChanged(event)} />
        <button onClick={() => this.postUrl()}>Shorten Me!</button>
      </div>
    )
  }
}

Shortner.propTypes = {
  url: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Shortner />,
    document.body.appendChild(document.createElement('div')),
  )
})
