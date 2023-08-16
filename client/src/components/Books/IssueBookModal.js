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

import '../../css/issueBookModal.css'
import MyContext from '../Context';
import { toast } from 'react-toastify';

const IssueBookModal = ({isModalOpen,setModal}) => {

    const onClose = () => {
        setBook('')
        setMember('')
        setModal(false)
    }

    const [book,setBook] = useState('')
    const [member,setMember] = useState('')
    const {membersList, booksList} = useContext(MyContext)

    return (
        <React.Fragment>
        <Modal open={isModalOpen} onClose={onClose}>
            <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ minWidth: 400}}
            >
            <Typography id="basic-modal-dialog-title" level="h2">
                Issue a book
            </Typography>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();
                    // code here
                    if(book.stocks == 0 || member.issued_books_number == 3 || member.due >= 500){
                        alert('Cannot issue the book')
                        return
                    }
                    const stocks = booksList.filter((b)=>b.book_id == book)[0].stocks
                    try{
                        const res = await axios.post(`http://127.0.0.1:8000/issue_book`,{
                            bookID: book,
                            memberID: member,
                            old_stocks: stocks
                        })
                        toast.success(res.data.data,{position:'top-right',autoClose:1500})
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
                        <Select
                        placeholder="Select a book"
                        className='select'
                        indicator={<KeyboardArrowDown />}
                        onChange={(_,newValue)=>setBook(newValue)}
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
                        defaultValue='Select a book'
                        >
                            {booksList?.map((book)=>{
                                return <Option sx={{width: '100%'}} value={book.book_id} className='select-option'>{book.title}</Option>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <Select
                            placeholder="Select a member"
                            className='select'
                            indicator={<KeyboardArrowDown />}
                            onChange={(_,newValue)=>setMember(newValue)}
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
                    <Stack sx={{justifyContent: 'space-between'}} direction='row' spacing={2}>
                        <Button sx={{flex: 1}} type="submit">Issue</Button>
                        <Button sx={{flex: 1}} variant='outlined' color='danger' onClick={onClose}>Cancel</Button>
                    </Stack>
                </Stack>
            </form>
            </ModalDialog>
        </Modal>
        </React.Fragment>
    );
}

export default IssueBookModal