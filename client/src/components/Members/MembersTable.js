import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Delete from '@mui/icons-material/Delete';
import axios from 'axios'
import { Button } from '@mui/material';
import ViewInfo from './ViewInfo';
import DeleteModal from '../DeleteModal';
import { toast } from 'react-toastify';

const MembersTable = ({temp}) => {

    const [membersList,setMembersList] = useState(temp)
    const [isModalOpen,setModalOpen] = useState(false)
    const [memberClicked,setMemberClicked] = useState({})
    const [deleteModal,setDeleteModal] = useState(false)
    const [memberToDelete,setMemberToDelete] = useState('')

    useEffect(()=>{
      setMembersList(temp)
    },[temp])

    const onViewClick = (member) => {
      setMemberClicked(member)
      setModalOpen(true)
    }

    const onDeleteClick = (id) =>{
      setMemberToDelete(id)
      setDeleteModal(true)
    }

    const deleteMember = async () => {
      try{
        const res = await axios.delete(`http://127.0.0.1:8000/delete_member/${memberToDelete}`)
        toast.success('Member deleted',{position: 'top-right',autoClose: 1500})
        setTimeout(()=>{
          window.location.pathname = '/members'
        },1800)
      }catch (e){
        toast.error(e.message,{position:'top-right',autoClose:1500})
      }
    }

    return (
        <TableContainer component={Paper} sx={{width: '100%'}}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead sx={{backgroundColor: '#011627'}}>
              <TableRow>
                <TableCell sx={{color: 'white', padding: '0.8rem 1.2rem'}}>Member ID</TableCell>
                <TableCell sx={{color: 'white', padding: '0.8rem 1.2rem'}}>Name</TableCell>
                <TableCell sx={{color: 'white', padding: '0.8rem 1.2rem'}}>Contact</TableCell>
                <TableCell sx={{color: 'white', padding: '0.8rem 1.2rem'}}>Number of books issued</TableCell>
                <TableCell sx={{color: 'white', padding: '0.8rem 1.2rem'}}>Outstanding Fee</TableCell>
                <TableCell sx={{color: 'white', padding: '0.8rem 1.2rem'}}></TableCell>
                <TableCell sx={{color: 'white', padding: '0.8rem 1.2rem'}}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {membersList?.map((row) => (
                <TableRow className='table-row' key={row.memberID}>
                    <TableCell sx={{color: 'black', padding: '0.8rem 1.2rem'}}>{row['member_id']}</TableCell>
                    <TableCell sx={{color: 'black', padding: '0.8rem 1.2rem'}}>{row['name']}</TableCell>
                    <TableCell sx={{color: 'black', padding: '0.8rem 1.2rem'}}>{row['contact']}</TableCell>
                    <TableCell sx={{color: 'black', padding: '0.8rem 1.2rem'}}>{row['issued_books_number']}</TableCell>
                    <TableCell sx={{color: 'black', padding: '0.8rem 1.2rem'}}>{row['due']}</TableCell>
                    <TableCell sx={{color: 'black', padding: '0.8rem 1.2rem'}}>
                        <Button variant='outlined' color='primary' onClick={()=>onViewClick(row)}>View More</Button>
                    </TableCell>
                    <TableCell sx={{color: 'black'}} onClick={()=>onDeleteClick(row['member_id'])}>
                        <Delete sx={{"&:hover":{color: 'red'},cursor: 'pointer'}}/>
                    </TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
          <ViewInfo isModalOpen={isModalOpen} setModal={setModalOpen} member={memberClicked}/>
          <DeleteModal isModalOpen={deleteModal} setModal={setDeleteModal} target='member' onDelete={deleteMember}/>
        </TableContainer>
    )
}

export default MembersTable