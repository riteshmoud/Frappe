import React, { useState } from 'react'
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import {toast} from 'react-toastify'
import axios from 'axios'

const AddMemberModal = ({isModalOpen,setModal}) => {

    const [memberData,setMemberData] = useState({
        name: '',
        contact: ''
    })

    const onClose = () => {
        setMemberData({
            name: '',
            contact: ''
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
                Add Member
            </Typography>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();
                    try{
                        await axios.post('http://127.0.0.1:8000/add_member',{
                            name: memberData.name,
                            contact: memberData.contact
                        })
                        toast.success('Member added',{position: 'top-right',autoClose: 1500})
                        setTimeout(()=>{
                            window.location.pathname = '/members'
                            onClose()
                        },1800)
                    }catch (e){
                        toast.error(e.message,{position:'top-right',autoClose:1500})
                    }
                        
                }}
            >
                <Stack spacing={2}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input autoFocus required value={memberData.name} onChange={(e)=>setMemberData({...memberData,name: e.target.value})} placeholder='Ex. John Doe'/>
                </FormControl>
                <FormControl>
                    <FormLabel>Contact</FormLabel>
                    <Input type='number' required value={memberData.contact} onChange={(e)=>setMemberData({...memberData,contact: e.target.value})} placeholder='Ex. 9287419635'/>
                </FormControl>
                <Stack sx={{justifyContent: 'space-between'}} direction='row' spacing={2}>
                    <Button sx={{flex: 1}} type="submit">Add</Button>
                    <Button sx={{flex: 1}} variant='outlined' color='danger' onClick={onClose}>Cancel</Button>
                </Stack>
                </Stack>
            </form>
            </ModalDialog>
        </Modal>
        </React.Fragment>
    );
}

export default AddMemberModal