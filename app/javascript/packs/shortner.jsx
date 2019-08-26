import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Errors = ({errors}) => {
  if (!!Object.keys(errors).length) {
    const error_elements = errors.url.map(error => <li key={error}>{error}</li>)

    return (<div> <ul>{error_elements}</ul></div>)
  } else {
    return null
  }
}

const Form = ({onSubmit, url, onChange, errors}) => {
  return (
    <form onSubmit={onSubmit}>
      <input value={url} placeholder="https://foo.example.com" onChange={onChange} />
      <button>Shorten Me!</button>
      <Errors errors={errors} />
    </form>
  )
}

class Shortner extends React.Component {
  constructor(props) {
    const host = props.host || ""
    const protocol = props.protocol || ""
    super(props)

    this.state = {
      url: "", shortcode: "", errors: {}, host: host, protocol: protocol
    }
  }

  postUrl() {
    const {url} = this.state

    axios.post('/urls', { url: url })
      .then(response => {
        console.log(response)
        const { shortcode } = response.data
        this.setState({ shortcode: shortcode, errors: {} })
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

  mainComponent() {
    if(!!this.state.shortcode) {
      const short_url = `${this.state.protocol}//${this.state.host}/${this.state.shortcode}`

      return (
        <div>
          <h2>Your short URL is:</h2>
          <p>
            <a href={ short_url } target="_blank">{ short_url }</a>
          </p>
        </div>
      )
    } else {
      return (
        <Form
          onSubmit={(event) => this.formSubmitted(event)}
          url={this.state.url}
          onChange={(event) => this.inputChanged(event)}
          errors={this.state.errors} />
      )
    }
  }

  render() {
    return (
      <div>
        <h1>Genius URL Shortener</h1>
        {this.mainComponent()}
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Shortner host={window.location.host} protocol={window.location.protocol} />,
    document.body.appendChild(document.createElement('div')),
  )
})
