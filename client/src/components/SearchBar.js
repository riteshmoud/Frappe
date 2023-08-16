import React from 'react';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';

import '../css/searchbar.css'

const SearchBar = ({item}) => {

    return(
            <FormControl variant="filled" className='search-input'>
                <InputLabel  htmlFor="filled-adornment-search">Search</InputLabel>
                <FilledInput
                    id="filled-adornment-search"
                    type='text'
                    endAdornment={
                    <InputAdornment position="end">
                        <Search/>
                    </InputAdornment>
                    }
                />
            </FormControl>

    )
}

export default SearchBar