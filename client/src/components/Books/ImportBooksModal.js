import React, { useState } from 'react'
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import axios from 'axios'
import { toast } from 'react-toastify';

const ImportBooksModal = ({isModalOpen,setModal}) => {

    const [bookData,setBookData] = useState({
        title: '',
        booksQty: '',
        stocks: ''
    })

    const onClose = () => {
        setBookData({
            title: '',
            booksQty: '',
            stocks: ''
        })
        setModal(false)
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
                Import Books
            </Typography>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();
                    const toastid = toast.loading('Importing',{position: 'top-right'})
                    try{
                        await axios.post('http://127.0.0.1:8000/import',{
                            title: bookData.title,
                            booksQty: bookData.booksQty,
                            stocks: bookData.stocks
                        })
                        toast.dismiss(toastid)
                        toast.success('Books imported',{position: 'top-right',autoClose: 1500})
                        setTimeout(()=>{
                            window.location.pathname = '/books'
                            onClose()
                        },1800)
                    }catch(e){
                        toast.dismiss(toastid)
                        toast.error(e.message,{position:'top-right',autoClose:1500})
                    }
                }}
            >
                <Stack spacing={2}>
                <FormControl>
                    <FormLabel>Title of the book</FormLabel>
                    <Input autoFocus required value={bookData.title} onChange={(e)=>setBookData({...bookData,title: e.target.value})} placeholder='Ex. Harry Potter'/>
                </FormControl>
                <FormControl>
                    <FormLabel>Number of books to Import</FormLabel>
                    <Input type='number' required value={bookData.booksQty} onChange={(e)=>setBookData({...bookData,booksQty: e.target.value})} placeholder='Ex. 20'/>
                </FormControl>
                <FormControl>
                    <FormLabel>Stocks</FormLabel>
                    <Input type='number' required value={bookData.stocks} onChange={(e)=>setBookData({...bookData,stocks: e.target.value})} placeholder='Ex. 15'/>
                </FormControl>
                <Stack sx={{justifyContent: 'space-between'}} direction='row' spacing={2}>
                    <Button sx={{flex: 1}} type="submit">Submit</Button>
                    <Button sx={{flex: 1}} variant='outlined' color='danger' onClick={onClose}>Cancel</Button>
                </Stack>
                </Stack>
            </form>
            </ModalDialog>
        </Modal>
        </React.Fragment>
    );
}

export default ImportBooksModal