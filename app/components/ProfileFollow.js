import React, { useEffect, useState, useContext } from 'react'
import Axios from 'axios'
import { useParams, Link } from 'react-router-dom'

import LoadingDotsIcon from './LoadingDotsIcon'
import StateContext from '../StateContext'

function ProfileFollow( props ) {
  const [ isLoading, setIsLoading ] = useState( true );
  const [ posts, setPosts ] = useState( [] );
  const { username } = useParams();
  const appState = useContext( StateContext )

  useEffect( () => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchPosts() {
      try {
        const response = await Axios.get( `/profile/${ username }/${ props.action }`, { cancelToken: ourRequest.token } )
        setPosts( response.data )
        setIsLoading( false );
      } catch ( e ) {
        console.log( 'There was a problem or the reques was cancelled' )
      }
    }
    fetchPosts();
    return () => {
      ourRequest.cancel();
    }
  }, [ username, props.action ] )

  if ( isLoading ) return <LoadingDotsIcon />


  return (
    <div className="list-group">
      { appState.user.username === username && !posts.length && props.action === "followers" && <p className="lead text-muted text-center">You don&rsquo;t have any followers yet.</p> }
      { appState.user.username !== username && !posts.length && props.action === "followers" && <p className="lead text-muted text-center">
        { username } doesn&rsquo;t have any followers yet.
          { appState.loggedIn && " Be the first to follow them!" }
        { !appState.loggedIn && (
          <>
            { " " }
              If you want to follow them you need to <Link to="/">sign up</Link> for an account first.{ " " }
          </>
        ) }
      </p> }
      { appState.user.username === username && !posts.length && props.action === "following" && <p className="lead text-muted text-center">You aren&rsquo;t following anyone yet.</p> }
      { appState.user.username !== username && !posts.length && props.action === "following" && <p className="lead text-muted text-center">{ username } isn&rsquo;t following anyone yet.</p> }

      { posts.map( ( follower, index ) => {

        return (
          <Link key={ index } to={ `/profile/${ follower.username }` } className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={ follower.avatar } /> { follower.username }
          </Link>
        )
      } ) }
    </div>
  )
}

export default ProfileFollow