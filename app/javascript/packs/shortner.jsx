import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

const Errors = ({errors}) => {
  const error_elements = errors.url.map(error => <li key={error}>{error}</li>)
  return <ul>{error_elements}</ul>
}

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
        const errors = error.response.data.errors
        this.setState({ errors })
      })
  }

  formSubmitted(event) {
    event.preventDefault()
    this.postUrl()
  }

  inputChanged(event) {
    this.setState({url: event.target.value})
  }

  hasErrors() {
    return !!Object.keys(this.state.errors).length
  }

  render() {
    return (
      <form onSubmit={(event) => this.formSubmitted(event)}>
        {this.hasErrors() && <Errors errors={this.state.errors} />}
        <input value={this.state.url} onChange={(event) => this.inputChanged(event)} />
        <button>Shorten Me!</button>
      </form>
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
