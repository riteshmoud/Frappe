import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Input from '@mui/joy/Input';
import Search from '@mui/icons-material/Search';
import '../../css/table.css'
import '../../css/searchbar.css'
import MembersTable from './MembersTable'
import AddMemberModal from './AddMemberModal'
import NotFound from '../../assets/notFound.png'
import MyContext from '../Context';

const Members = () => {

    const [isModalOpen,setModalOpen] = useState(false)
    const [searchTerm,setSearchTerm] = useState('')
    const {membersList} = useContext(MyContext)
    const [tempMembers,setTempMembers] = useState(membersList)

    useEffect(()=>{
        setTempMembers(membersList)
    },membersList)

    const onInputChange = (e)=>{
        const term = e.target.value
        setSearchTerm(term)
        if(term === ''){
            setTempMembers(membersList)
            return
        }
        const ls = membersList.filter((member)=>{
            return member.name.toLowerCase().includes(term.toLowerCase()) || member.contact.toLowerCase().includes(term.toLowerCase())
        })
        setTempMembers(ls)
    }

    const onAddClick = () => {
        setModalOpen(true)
    }

    return(
        <div className='main-container'>

            <div className='search-bar-div'>
                <Input sx={{flexGrow: 1}} endDecorator={<Search />} placeholder='Search' value={searchTerm} onChange={onInputChange}/>
                <div>
                    <Button sx={{marginLeft: '1rem',backgroundColor: '#011627', borderRadius: '10px'}} className='btn' variant="contained" onClick={onAddClick}>Add Member</Button>
                </div>
            </div>

            <div className='table-div'>
                {tempMembers?.length == 0 ? 
                    <div className='not-found-div'>
                        <img src={NotFound}></img>
                        <h2>No records found</h2>
                    </div>
                :   <MembersTable temp={tempMembers}/>
                }
                <AddMemberModal isModalOpen={isModalOpen} setModal={setModalOpen}/>
            </div>
        </div>
    )
}

export default Members