import React from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/joy/Input';
import Search from '@mui/icons-material/Search';

import '../../css/searchbar.css'

const MembersHeader = ({isModalOpen, setModal}) => {

    const onAddClick = () => {
        setModal(true)
    }

    return(
        <div className='search-bar-div'>
            <Input sx={{flexGrow: 1}} endDecorator={<Search />} placeholder='Search'/>
            <div>
                <Button sx={{marginLeft: '1rem',backgroundColor: '#011627', borderRadius: '10px'}} className='btn' variant="contained" onClick={onAddClick}>Add Member</Button>
            </div>
        </div>

    )
}

export default MembersHeader