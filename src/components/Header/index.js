import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const loggingOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navParentCon d-flex justify-content-center text-white">
      <div className="navCon  d-flex justify-content-between align-items-center p-2">
        <div className="">
          <Link className="linkComp" to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="websiteLogo"
            />
          </Link>
        </div>
        <ul className="list-unstyled d-flex m-0">
          <li className="m-0 h5">
            <Link className="linkComp" to="/">
              Home
            </Link>
          </li>
          <li className="m-0 ml-3 h5">
            <Link className="linkComp" to="/jobs">
              Jobs
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="btn btn-primary"
              onClick={loggingOut}
            >
              Logout
            </button>
          </li>
          {/* place button here */}
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
