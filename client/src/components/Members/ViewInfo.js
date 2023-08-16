import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/joy/Button/Button';
import Typography from '@mui/joy/Typography';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import MyContext from '../Context';

const ViewInfo = ({isModalOpen, setModal, member}) => {

    const [issuedList,setIssuedList] = useState([])
    const {booksList,txnList} = useContext(MyContext)

    console.log(member);
    console.log(booksList);

    const onClose = () => {
        setModal(false)
    }

    useEffect(()=>{
        const ls = booksList?.filter((book)=>member?.books_issued?.books.includes(book.book_id))
        setIssuedList(ls)
    },[isModalOpen])

    const getDate = (id) => {
        const txn = txnList.filter((txn)=>txn.book_id === id && txn.txn_category === 'Book Issued')
        return txn[0].date.split('.')[0].replace('T',' ')
    }

    return (
        <React.Fragment>
        <Modal open={isModalOpen} onClose={onClose}>
            <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ minWidth: 400}}
            >
            <Typography id="basic-modal-dialog-title" level="h2">
                Books issued to {member?.name}
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead sx={{backgroundColor: '#011627'}}>
                    <TableRow>
                    <TableCell sx={{color: 'white'}}>Title</TableCell>
                    <TableCell sx={{color: 'white'}}>Date Issued</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {issuedList?.length !== 0 ? issuedList?.map((book) => {
                    return <TableRow key={book.book_id}>
                        <TableCell component="th" scope="row">
                            {book.title}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {getDate(book.book_id)}
                        </TableCell>
                    </TableRow>
                    })
                    : <TableCell component="th" scope="row">No books issued</TableCell>
                    }
                </TableBody>
                </Table>
            </TableContainer>
                <Button sx={{padding: '1rem',marginTop: '1rem'}} variant='outlined' color='danger' onClick={onClose}>Cancel</Button>
            </ModalDialog>
        </Modal>
        </React.Fragment>
    );
  }

export default ViewInfo