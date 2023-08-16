import React from 'react'
import logo from '../assets/logo.png'
import {NavLink, Outlet} from 'react-router-dom'
import '../css/header.css'
import booksImg from '../assets/books.png'

const Header = () => {

    const style = (isActive) => {
        return ({
            backgroundColor: isActive ? '#eef0f2' : '',
            textDecoration: 'none',
            color: isActive ? 'black' : 'white',
            borderRadius: '10px'
        })
    }

    return (
        <div className='main-div'>
            <div className='sidebar'>
                <header>
                    <div className='logo-div'>
                        <img src={logo} alt='Frappe'></img>  
                    </div>
                    <div>
                        <ul>
                            <NavLink className='link' to='/books' style={({isActive})=>style(isActive)}>
                                <li>Books</li>
                            </NavLink>
                            <NavLink className='link' to='/members' style={({isActive})=>style(isActive)}>
                                <li>Members</li>
                            </NavLink>
                            <NavLink className='link' to='/transactions' style={({isActive})=>style(isActive)}>
                                <li>Transactions</li>
                            </NavLink>
                        </ul>
                    </div>
                </header> 
                <div className='header-img-div'>
                    <img src={booksImg}></img>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default Header