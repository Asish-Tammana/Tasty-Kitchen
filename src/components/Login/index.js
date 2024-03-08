import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const Login = props => {
  const [usernameInput, updateUsernameInput] = useState('')
  const [passwordInput, updatePasswordInput] = useState('')
  const [errMsg, updateErrorMsg] = useState('')

  const getJwtToken = Cookies.get('jwt_token')
  if (getJwtToken !== undefined) {
    return <Redirect to="/" />
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })

    const {history} = props

    history.replace('/')
  }

  const onSubmitFailure = errorMsg => {
    updateErrorMsg(errorMsg)
  }

  const loginClicked = async event => {
    event.preventDefault()

    const url = 'https://apis.ccbp.in/login'

    const userDetails = {
      username: usernameInput,
      password: passwordInput,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const jwtToken = data.jwt_token
      onSubmitSuccess(jwtToken)
      updateErrorMsg('')
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  return (
    <div className="login-bg-container">
      <div className="login-left-side">
        <div className="login-box-container">
          <img
            src="https://res.cloudinary.com/dyglzqdrl/image/upload/v1709359867/Frame_274logo_pcjbhm.png"
            alt="website logo"
          />
          <h1 className="login-title">Tasty Kitchens</h1>
          <h1 className="login-text">Login</h1>
          <form className="login-form-container" onSubmit={loginClicked}>
            <label htmlFor="usernameInput" className="label-input">
              USERNAME
            </label>{' '}
            <br />
            <input
              type="text"
              id="usernameInput"
              className="text-input"
              value={usernameInput}
              onChange={event => updateUsernameInput(event.target.value)}
            />
            <label htmlFor="passwordInput" className="label-input">
              password
            </label>{' '}
            <br />
            <input
              type="password"
              id="passwordInput"
              className="text-input"
              value={passwordInput}
              onChange={event => updatePasswordInput(event.target.value)}
            />
            <p className="errMsg">{errMsg}</p>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
      <img
        src="https://res.cloudinary.com/dyglzqdrl/image/upload/v1709359870/Rectangle_1456loginImage_hi1efm.png"
        alt="website login"
        className="login-img"
      />
    </div>
  )
}

export default Login
