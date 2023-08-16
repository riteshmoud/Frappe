import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import axios from 'axios'
import EditStocksModal from './EditStocksModal'
import MyContext from '../Context';
import DeleteModal from '../DeleteModal';
import { toast } from 'react-toastify';

import '../../css/table.css'

const BooksTable = ({temp}) => {

    const [booksList,setBooksList] = useState(temp)
    const [isEditModal,setIsEditModal] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false)
    const [editBook,setEditBook] = useState({})
    const [bookToDelete,setBookToDelete] = useState('')

    useEffect(()=>{
      setBooksList(temp)
    },[temp])

    const deleteBook = async (id) => {
      try{
        await axios.delete(`http://127.0.0.1:8000/deleteBook/${bookToDelete}`)
        toast.success('Book deleted',{position: 'top-right',autoClose: 1500})
        setTimeout(()=>{
          window.location.pathname = '/books'
        },1800)
      }catch(e){
        toast.error(e.message,{position:'top-right',autoClose:1500})
      }
    }

    const onDeleteClick = (id) => {
      setBookToDelete(id)
      setDeleteModal(true)
    }

    const onEditClick = (book) => {
      setEditBook(book)
      setIsEditModal(true)
    }

    return (
      <React.Fragment>
        <div className='table-div'>
        <TableContainer component={Paper} sx={{width: '100%'}}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead sx={{backgroundColor: '#011627'}}>
              <TableRow>
                <TableCell sx={{color: 'white',padding: '0.8rem 0.6rem'}}>Book ID</TableCell>
                <TableCell sx={{color: 'white',padding: '0.8rem 0.6rem'}}>Title</TableCell>
                <TableCell sx={{color: 'white',padding: '0.8rem 0.6rem'}}>Authors</TableCell>
                <TableCell sx={{color: 'white',padding: '0.8rem 0.6rem'}}>ISBN No.</TableCell>
                <TableCell sx={{color: 'white',padding: '0.8rem 0.6rem'}}>Publisher</TableCell>
                <TableCell sx={{color: 'white',padding: '0.8rem 0.6rem'}}>Rating</TableCell>
                <TableCell sx={{color: 'white',padding: '0.8rem 0.6rem'}}>Available stocks</TableCell>
                <TableCell sx={{color: 'white'}}></TableCell>
                <TableCell sx={{color: 'white'}}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {booksList?.map((row) => {
                return <TableRow className='table-row' key={row.book_id}>
                    <TableCell sx={{color: 'black', padding: '0.8rem 0.6rem'}}>{row.book_id}</TableCell>
                    <TableCell sx={{color: 'black', padding: '0.8rem 0.6rem'}}>{row.title}</TableCell>
                    <TableCell sx={{color: 'black', padding: '0.8rem 0.6rem'}}>{row.authors}</TableCell>
                    <TableCell sx={{color: 'black', padding: '0.8rem 0.6rem'}}>{row.isbn}</TableCell>
                    <TableCell sx={{color: 'black', padding: '0.8rem 0.6rem'}}>{row.publisher}</TableCell>
                    <TableCell sx={{color: 'black', padding: '0.8rem 0.6rem'}}>{row.rating}</TableCell>
                    <TableCell sx={{color: 'black', padding: '0.8rem 0.6rem'}}>{row.stocks}</TableCell>
                    <TableCell sx={{color: 'black'}}>
                        <Edit sx={{"&:hover":{color: 'purple'},cursor: 'pointer'}} onClick={()=>onEditClick(row)}/>
                    </TableCell>
                    <TableCell sx={{color: 'black'}} onClick={()=>onDeleteClick(row.book_id)}>
                        <Delete sx={{"&:hover":{color: 'red'},cursor: 'pointer'}}/>
                    </TableCell>
                </TableRow>})
              }
            </TableBody>
          </Table>
        </TableContainer>

        </div>
        <EditStocksModal isModalOpen={isEditModal} setModal={setIsEditModal} book={editBook}/>
        <DeleteModal isModalOpen={deleteModal} setModal={setDeleteModal} target='book' onDelete={deleteBook}/>
      </React.Fragment>
      );
}

export default BooksTable