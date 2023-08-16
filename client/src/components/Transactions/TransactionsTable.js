import React, { useContext, useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/joy/Input';
import Search from '@mui/icons-material/Search';
import NotFound from '../../assets/notFound.png'

import '../../css/table.css'
import MyContext from '../Context';

const TransactionsTable = () => {

    const {txnList} = useContext(MyContext)
    const [searchTerm,setSearchTerm] = useState('')
    const [tempTxns,setTempTxns] = useState(txnList)

    useEffect(()=>{
        setTempTxns(txnList)
    },[txnList])

    const onInputChange = (e)=>{
        const term = e.target.value
        setSearchTerm(term)
        if(term === ''){
            setTempTxns(txnList)
            return
        }
        const ls = txnList.filter((txn)=>{
            return txn.txn_id === parseInt(term)
        })
        setTempTxns(ls)
    }

    return(
        <div className='main-container'>
            <div className='search-bar'>
                <Input sx={{flexGrow: 1}} endDecorator={<Search />} placeholder='Search' value={searchTerm} onChange={onInputChange}/>
            </div>
            <div className='table-div'>
                {tempTxns?.length === 0 ? 
                    <div className='not-found-div'>
                        <img src={NotFound}></img>
                        <h2>No records found</h2>
                    </div>
                :    <TableContainer component={Paper} sx={{width: '100%', overflow: 'auto'}}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead sx={{backgroundColor: '#011627'}}>
                        <TableRow>
                            <TableCell sx={{color: 'white', padding: '0.8rem 1.2rem'}}>Transaction ID</TableCell>
                            <TableCell sx={{color: 'white', padding: '0.8rem 1.2rem'}}>Category</TableCell>
                            <TableCell sx={{color: 'white', padding: '0.8rem 1.2rem'}}>Book ID</TableCell>
                            <TableCell sx={{color: 'white', padding: '0.8rem 1.2rem'}}>Member ID</TableCell>
                            <TableCell sx={{color: 'white', padding: '0.8rem 1.2rem'}}>Details</TableCell>
                            <TableCell sx={{color: 'white', padding: '0.8rem 1.2rem'}}>Penalty</TableCell>
                            <TableCell sx={{color: 'white', padding: '0.8rem 1.2rem'}}>Amount</TableCell>
                            <TableCell sx={{color: 'white', padding: '0.8rem 1.2rem'}}>Date</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {tempTxns?.map((row) => {
                            row['date'] = row['date'].replace('T',' ').split('.')[0]
                            return <TableRow className='table-row' key={row['txn_id']}>
                                <TableCell sx={{color: 'black', padding: '0.8rem 1.2rem'}}>{row['txn_id']}</TableCell>
                                <TableCell sx={{color: 'black', padding: '0.8rem 1.2rem'}}>{row['txn_category']}</TableCell>
                                <TableCell sx={{color: 'black', padding: '0.8rem 1.2rem'}}>{row['book_id']}</TableCell>
                                <TableCell sx={{color: 'black', padding: '0.8rem 1.2rem'}}>{row['member_id']}</TableCell>
                                <TableCell sx={{color: 'black', padding: '0.8rem 1.2rem'}}>{row['txn_details']}</TableCell>
                                <TableCell sx={{color: 'black', padding: '0.8rem 1.2rem'}}>{row['penalty']}</TableCell>
                                <TableCell sx={{color: 'black', padding: '0.8rem 1.2rem'}}>{row['txn_amount']}</TableCell>
                                <TableCell sx={{color: 'black', padding: '0.8rem 1.2rem'}}>{row['date']}</TableCell>
                            </TableRow>
                            })
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                }
            </div>
        </div>
    )
}

export default TransactionsTable