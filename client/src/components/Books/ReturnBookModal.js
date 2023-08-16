import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import axios from 'axios'
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import List from '@mui/joy/List';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Checkbox from '@mui/joy/Checkbox';
import ListItemButton from '@mui/joy/ListItemButton';

import '../../css/issueBookModal.css'
import MyContext from '../Context';
import { toast } from 'react-toastify';

const ReturnBookModal = ({isModalOpen,setModal}) => {

    const onClose = () => {
        setMember('')
        setBooksIssued([])
        setModal(false)
        setSelectedBooks([])
    }

    const [member,setMember] = useState('')
    const {membersList, booksList} = useContext(MyContext)
    const [booksIssued, setBooksIssued] = useState([])
    const [selectedBooks, setSelectedBooks] = useState([])

    const getBooks = () => {
        if(member === ''){
            return
        }
        let books = []
        member.books_issued['books'].map((id)=>{
            let book = booksList.filter((book)=>book.book_id === id)[0]
            books.push(book)
        })
        console.log(books);
        setBooksIssued(books)
    }

    const onBookClick = (e,book) => {
       if(e.target.checked){
        setSelectedBooks([...selectedBooks,book])
       }else{
        const newList = selectedBooks.filter((b)=>b.book_id != book.book_id)
        setSelectedBooks(newList)
       }
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
                Book Return
            </Typography>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();
                    try{
                        const res = await axios.post(`http://127.0.0.1:8000/issue_return`,{
                            books: selectedBooks,
                            member: member
                        })
                        toast.success('Return issued',{position: 'top-right',autoClose: 1500})
                        setTimeout(()=>{
                            window.location.pathname = '/books'
                            onClose()
                        },1800)
                    }catch (e){
                        toast.error(e.message,{position:'top-right',autoClose:1500})
                    }
                }}
            >
                <Stack spacing={2}>
                    <FormControl>
                        <Select
                        placeholder="Select a member"
                        className='select'
                        indicator={<KeyboardArrowDown />}
                        onChange={(_,newValue)=>{
                            const mem = membersList.filter((m)=>m.member_id === newValue)[0]
                            setMember(mem)
                        }}
                        renderValue={(e)=>e?.label}
                        sx={{
                            width: '100%',
                            [`& .${selectClasses.indicator}`]: {
                            transition: '0.2s',
                            [`&.${selectClasses.expanded}`]: {
                                transform: 'rotate(-180deg)',
                            },
                            },
                        }}
                        defaultValue='Select a member'
                        >
                            {membersList?.map((member)=>{
                                return <Option sx={{width: '100%'}} value={member.member_id} className='select-option'>{member.name}</Option>
                            })}
                        </Select>
                    </FormControl>

                    <List component="ul" sx={{ width: 'fit-content', }}>
                        {booksIssued.map((book)=>{
                            return (
                            <ListItemButton key={book.book_id} onChange={(e)=>onBookClick(e,book)}>
                                <Checkbox label={book.title}/>
                            </ListItemButton>
                            )
                        })}
                    </List>
                    <Stack sx={{justifyContent: 'space-between'}} direction='row' spacing={2}>
                        <Button sx={{flex: 1}} onClick={getBooks}>Show books</Button>
                        <Button sx={{flex: 1}} variant='outlined' color='danger' onClick={onClose}>Cancel</Button>
                    </Stack>
                    <Button type='submit' sx={{flex: 1,fontSize: '1rem',borderWidth: '2px'}} variant='outlined' color='success'>Issue Return</Button>
                </Stack>
            </form>
            </ModalDialog>
        </Modal>
        </React.Fragment>
    );
}

export default ReturnBookModal