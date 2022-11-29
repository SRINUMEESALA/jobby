/* eslint-disable jsx-a11y/label-has-associated-control */
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  loggingIn = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 1})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  inputChanging = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    const {errorMsg, username, password} = this.state
    // console.log(username, password)
    return (
      <div className="text-white d-flex align-items-center justify-content-center loginParentCon bg-white min-vh-100">
        <form className="formCon p-4 pt-0 rounded" onSubmit={this.loggingIn}>
          <div className="text-center">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
              className="formLogo mb-4"
            />
          </div>
          <div className="form-group">
            <label htmlFor="USERNAME">USERNAME</label>
            <input
              type="text"
              id="USERNAME"
              value={username}
              onChange={this.inputChanging}
              name="username"
              placeholder="Username"
            />
            {/* <label htmlFor="USERNAME">USERNAME</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={this.inputChanging}
              id="USERNAME"
              name="username"
            /> */}
            {/* <small id="UsernameHelp" className="form-text text-muted">
              We&apos;ll never share your email with anyone else.
            </small> */}

            <label htmlFor="PASSWORD">PASSWORD</label>
            <input
              type="password"
              className="form-control"
              id="PASSWORD"
              onChange={this.inputChanging}
              value={password}
              name="password"
            />
            {/* <small id="passwordHelp" className="form-text text-muted">
              Keep strong password!
            </small> */}

            <button type="submit" className="btn btn-primary btn-block mt-2">
              Login
            </button>
            <p className="m-0 text-danger">
              {errorMsg !== '' && `*${errorMsg}`}
            </p>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
