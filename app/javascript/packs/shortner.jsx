import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Errors = ({errors}) => {
  if (!!Object.keys(errors).length) {
    const error_elements = errors.url.map(error => <li key={error}>{error}</li>)

    return (<div class="m-2 text-xs uppercase"><ul className="mb-2 text-red-900">{error_elements}</ul></div>)
  } else {
    return null
  }
}

const Form = ({onSubmit, url, onChange, errors}) => {
  return (
    <div>
      <h1 className="font-bold text-xl mb-2">Genius URL Shortener</h1>
      <form onSubmit={onSubmit} className="inline-flex">
        <input className="shadow-md bg-white p-4 mr-2" value={url} placeholder="https://foo.example.com" onChange={onChange} />
        <button className="block uppercase mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10">Shorten Me!</button>
      </form>
      <Errors errors={errors} />
    </div>
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
          <h1 className="font-bold text-xl mb-2">Your short URL is:</h1>
          <p>
            <a className="text-2xl" href={ short_url } target="_blank">{ short_url }</a>
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
      <div className="m-auto my-64 w-1/3">
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
