import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

const Errors = (props) => false

class Shortner extends React.Component {
  constructor(props) {
    super(props)
    this.state = { url: "", shortcode: "", errors: {} }
  }

  postUrl() {
    const {url} = this.state

    axios.post('/urls', { url: url })
      .then(response => {
        const { shortcode } = response
        this.setState({ shortcode })
      })
      .catch(error => {
        const { errors } = response
        this.setState({ errors })
      })
  }

  inputChanged(event) {
    this.setState({url: event.target.value})
  }

  hasErrors() {
    return false
  }

  render() {
    return (
      <div>
        {this.hasErrors() && <Errors errors={this.state.errors} />}
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
