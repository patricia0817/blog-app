import React, { useEffect, useState, useContext, useRef } from 'react'
import Axios from 'axios'

import DispatchContext from '../DispatchContext'

function HeaderLoggedOut( props ) {
  const appDispatch = useContext( DispatchContext );

  const [ username, setUsername ] = useState();
  const [ password, setPassword ] = useState();

  const usernameInput = useRef( null );
  const passwordInput = useRef( null )

  async function handleSubmit( e ) {
    e.preventDefault();
    try {
      if ( username && password ) {
        const response = await Axios.post( '/login', {
          username,
          password
        } )
        if ( response.data ) {
          appDispatch( { type: 'login', data: response.data } );
          appDispatch( { type: 'flashMessage', messageType: 'alert-success', value: 'You have successfully logged in.' } )
        } else {
          console.log( 'Incorrect user/password' )
          appDispatch( { type: 'flashMessage', messageType: 'alert-danger', value: 'Invalid username/password.' } )
        }
      } else {
        usernameInput.current.classList.add( 'is-invalid' )
        passwordInput.current.classList.add( 'is-invalid' )
      }
    } catch ( e ) {
      console.log( 'There was a problem' )
    }
  }

  function handleSetUser( e ) {
    usernameInput.current.classList.remove( 'is-invalid' )
    setUsername( e.target.value )
  }

  function handleSetPassword( e ) {
    passwordInput.current.classList.remove( 'is-invalid' )
    setPassword( e.target.value )
  }


  return (
    <form onSubmit={ handleSubmit } className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          {/* <input ref={ usernameInput } onChange={ ( e ) => setUsername( e.target.value ) } name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username"
            autoComplete="off" /> */}
          <input ref={ usernameInput } onChange={ handleSetUser } name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username"
            autoComplete="off" />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          {/* <input ref={ passwordInput } onChange={ ( e ) => setPassword( e.target.value ) } name="password" className="form-control form-control-sm input-dark" type="password"
            placeholder="Password" /> */}
          <input ref={ passwordInput } onChange={ handleSetPassword } name="password" className="form-control form-control-sm input-dark" type="password"
            placeholder="Password" />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  )
}

export default HeaderLoggedOut