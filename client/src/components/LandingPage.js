import React from 'react'
import Logo from '../assets/logo.png'
import LandingImage from '../assets/landingPic.png'
import '../css/landingpage.css'
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';

const LandingPage = () => {
    return (
        <div className='landing-container'>
            <div>
                <img src={LandingImage}></img>
            </div>
            <div>
                <div>
                    <img src={Logo}></img>
                </div>
                <div>
                    <Button sx={{backgroundColor: '#011627', borderRadius: '10px'}} variant="contained">
                        <NavLink className='go-to-lib-btn' to='/books'>Go to library</NavLink>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage