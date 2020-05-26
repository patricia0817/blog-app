import React, { useEffect } from 'react'

function FlashMessages( props ) {
  return (
    <div className='floating-alerts'>
      { props.messages.map( ( msg, index ) => {
        return (
          <div className={ 'alert text-center floating-alert shadow-sm ' + `${ msg.messageType }` } key={ index }>
            { msg.value }
          </div>
        )
      } ) }
    </div>
  )
}

export default FlashMessages