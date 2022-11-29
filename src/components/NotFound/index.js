import {Component} from 'react'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="w-25 h-25"
        />
        <h1>Page Not Found</h1>
        <p>we're sorry, the page you requested could not be found</p>
      </div>
    )
  }
}

export default NotFound
