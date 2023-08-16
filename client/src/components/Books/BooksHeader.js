import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/joy/Input';
import Search from '@mui/icons-material/Search';
import '../../css/searchbar.css'
import IssueBookModal from './IssueBookModal';
import ReturnBookModal from './ReturnBookModal';

const BooksHeader = ({isModalOpen, setModal}) => {

    const [issueModal,setIssueModal] = useState(false)
    const [returnModal,setReturnModal] = useState(false)

    return(
        <div className='search-bar-div'>
            <Input sx={{flexGrow: 1}} endDecorator={<Search />} placeholder='Search'/>
            <div>
                <Button sx={{marginLeft: '1rem', backgroundColor: '#011627', borderRadius: '10px'}} className='btn' variant="contained" onClick={()=>setIssueModal(true)}>Issue book</Button>
                <Button sx={{marginLeft: '1rem', backgroundColor: '#011627', borderRadius: '10px'}} className='btn' variant="contained" onClick={()=>setModal(true)}>Import Books</Button>
                <Button sx={{marginLeft: '1rem', backgroundColor: '#011627', borderRadius: '10px'}} className='btn' variant="contained" onClick={()=>setReturnModal(true)}>Issue Return</Button>
            </div>
            <IssueBookModal isModalOpen={issueModal} setModal={setIssueModal}/>
            <ReturnBookModal isModalOpen={returnModal} setModal={setReturnModal}/>
        </div>
        
    )
}

export default BooksHeader