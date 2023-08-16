import {React, useEffect, useState} from 'react'
import {BrowserRouter,Route,NavLink,Routes} from 'react-router-dom'
import Header from './Header'
import Books from './Books/Books'
import LandingPage from './LandingPage'
import MyContext from './Context'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBooks, getMembers, getTxn } from './LoadContext'
import Members from './Members/Members'

import '../css/app.css'
import TransactionsTable from './Transactions/TransactionsTable'

const App = () => {

    const [contextData,setContextData] = useState({})

    useEffect(()=>{
        const getContext = async () => {
            const books = await getBooks()
            const members = await getMembers()
            const txn = await getTxn()
            setContextData({
                booksList: books,
                membersList: members,
                txnList: txn
            })
        }
        getContext()
    },[])

    console.log(contextData);

    return (
        <div className='app-container'>
            <BrowserRouter>
                <MyContext.Provider value={contextData}>
                    <Routes>
                        <Route path='/' exact element={<LandingPage/>}/>
                        <Route path='/' element={<Header/>}>
                            <Route path='books' element={<Books/>}/>
                            <Route path='members' element={<Members/>}/>
                            <Route path='transactions' element={<TransactionsTable/>}/>
                        </Route>
                    </Routes>
                </MyContext.Provider>
            </BrowserRouter>

            <ToastContainer/>
        </div>
    )
}

export default App