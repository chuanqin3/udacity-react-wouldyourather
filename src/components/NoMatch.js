import React from 'react';
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

const NoMatch = (props) => (
  <Link to={`/`} className='center'>
    <Image
      src="https://www.lifewire.com/thmb/qLv10Pgd30kCy7OxXacwOWKxZ8M=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/shutterstock_325494917-5a68d8403418c600190a3e1f.jpg"
      alt="sorry!"
      width="400"
      height="300"
      centered
    />
    <p>Sorry! This page doesn't exist. Did you type the correct url?</p>
  </Link>
);
export default NoMatch;
