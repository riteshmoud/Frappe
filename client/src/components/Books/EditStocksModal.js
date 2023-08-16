import React, { useEffect, useState } from 'react'
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

const EditStocksModal = ({isModalOpen,setModal,book}) => {

    const onClose = () => {
        setModal(false)
    }

    const [stocks,setStocks] = useState(book.stocks)

    useEffect(()=>{
        setStocks(book.stocks)
    },[isModalOpen])

    return (
        <React.Fragment>
        <Modal open={isModalOpen} onClose={onClose}>
            <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ minWidth: 400}}
            >
            <Typography id="basic-modal-dialog-title" level="h2">
                Update Stocks
            </Typography>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();
                    try{
                        const res = await axios.put(`http://127.0.0.1:8000/update_stocks/${book.book_id}`,{
                            new_stocks: stocks
                        })
                        toast.success('Stocks updated',{position:'top-right',autoClose:1500})
                        setTimeout(()=>{
                            window.location.pathname = '/books'
                            onClose()
                        },1800)
                    }catch(e){
                        console.log(e);
                        toast.error(e.response.data,{position:'top-right',autoClose:1500})
                    }
                }}
            >
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Title of the book</FormLabel>
                        <Input value={book.title} readOnly sx={{backgroundColor: 'whitesmoke', color: 'black'}}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Stocks</FormLabel>
                        <Input type='number' required value={stocks} onChange={(e)=>setStocks(e.target.value)} placeholder='Ex. 20'/>
                    </FormControl>
                    <Stack sx={{justifyContent: 'space-between'}} direction='row' spacing={2}>
                        <Button sx={{flex: 1}} type="submit">Update</Button>
                        <Button sx={{flex: 1}} variant='outlined' color='danger' onClick={onClose}>Cancel</Button>
                    </Stack>
                </Stack>
            </form>
            </ModalDialog>
        </Modal>
        </React.Fragment>
    );
}

export default EditStocksModal