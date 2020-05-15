import React from 'react';
import ReactDOM from 'react-dom';

//My Components
import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Footer from './components/Footer';

function Main() {
  return (
    <>
      <Header />
      <HomeGuest />
      <Footer />
    </>
  )
}

ReactDOM.render( <Main />, document.getElementById( 'app' ) );

if ( module.hot ) {
  module.hot.accept();
}