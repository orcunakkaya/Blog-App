import React from 'react'
import icon from '../assets/images/navbar-icon.svg'
import addPlus from '../assets/images/add-plus.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
        <Link to={'/'} className='navbar-header'>
            <img src={icon} alt="navbar-icon" className='navbar-header__icon' />
            <div className='navbar-header__text'>Blog</div>
        </Link>

        <Link className='navbar__add-blog' to={'/add-blog'}>
            <img src={addPlus} alt='add-blog-icon' />
            <span>Blog Ekle</span>
        </Link>
    </div>
  )
}

export default Navbar