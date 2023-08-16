import React, { useContext, useEffect, useState } from 'react'
import BooksTable from './BooksTable'
import ImportBooksModal from './ImportBooksModal'
import Button from '@mui/material/Button';
import Input from '@mui/joy/Input';
import Search from '@mui/icons-material/Search';
import '../../css/searchbar.css'
import IssueBookModal from './IssueBookModal';
import ReturnBookModal from './ReturnBookModal';
import '../../css/table.css' 
import NotFound from '../../assets/notFound.png'
import MyContext from '../Context';

const Books = () => {

    const [isModalOpen,setModalOpen] = useState(false)
    const [issueModal,setIssueModal] = useState(false)
    const [returnModal,setReturnModal] = useState(false)
    const [searchTerm,setSearchTerm] = useState('')
    const {booksList} = useContext(MyContext)
    const [tempBooks,setTempBooks] = useState(booksList)

    useEffect(()=>{
        setTempBooks(booksList)
    },booksList)

    const onInputChange = (e)=>{
        const term = e.target.value
        setSearchTerm(term)
        if(term === ''){
            setTempBooks(booksList)
            return
        }
        const ls = booksList.filter((book)=>{
            console.log(book);
            return book.title.toLowerCase().includes(term.toLowerCase()) || book.authors.toLowerCase().includes(term.toLowerCase())
        })
        setTempBooks(ls)
    }

    return (
        <div className='main-container'>
            
            {/* Books search bar header */}
            <div className='search-bar-div'>
                <Input sx={{flexGrow: 1}} endDecorator={<Search />} placeholder='Search' value={searchTerm} onChange={onInputChange}/>
                <div>
                    <Button sx={{marginLeft: '1rem', backgroundColor: '#011627', borderRadius: '10px'}} className='btn' variant="contained" onClick={()=>setIssueModal(true)}>Issue book</Button>
                    <Button sx={{marginLeft: '1rem', backgroundColor: '#011627', borderRadius: '10px'}} className='btn' variant="contained" onClick={()=>setModalOpen(true)}>Import Books</Button>
                    <Button sx={{marginLeft: '1rem', backgroundColor: '#011627', borderRadius: '10px'}} className='btn' variant="contained" onClick={()=>setReturnModal(true)}>Issue Return</Button>
                </div>
                <IssueBookModal isModalOpen={issueModal} setModal={setIssueModal}/>
                <ReturnBookModal isModalOpen={returnModal} setModal={setReturnModal}/>
            </div>

            <div className='table-div'>
                {tempBooks?.length == 0 ? 
                    <div className='not-found-div'>
                        <img src={NotFound}></img>
                        <h2>No records found</h2>
                    </div>
                :   <BooksTable temp={tempBooks}/>
                }
                <ImportBooksModal isModalOpen={isModalOpen} setModal={setModalOpen}/>
            </div>
        </div>
    )
}

export default Books