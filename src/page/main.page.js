import React, {useState} from 'react'
import QRCodeGenerator from '../components/QRCodeGenerator'
import * as data from '../feed.json';
import { NubankApi } from 'nubank-connector'

import distribute, { monthsMapping } from '../services/distribute'
import TransactionList from '../components/TransactionList';

const api = new NubankApi()
const LASTS_BILLS = 1000

const Authenticate = async (user, pass, authcode) => {
    await api.auth.authenticateWithQrCode(user, pass, authcode)
    console.log('You are authenticated !')
}

const GetTransactions = async () => {
    //const transactions = await api.card.getFeed()
    //const trs = transactions.slice(0,LASTS_BILLS)
    //return transactions
    return data.default
}

const MainPage = () => {
    const [content, setContent] = useState()
    const [authCode, setAuthCode] = useState()

    const now = new Date(Date.now())
    const year = now.getFullYear()
    const month = monthsMapping[now.getMonth() + 1]

    const executeQuery = async () => {
      //if(!cache.get("authenticated")){
        try{
          //await Authenticate(cpf, pass, authCode)
          const transactions = await GetTransactions()
          const distributed = distribute(transactions)
          console.log(distributed)
          setContent(distributed)
        }catch(e){
          console.error("Authentication Error ========", e)
        }
      //}
    }


    return (
        <React.Fragment>
            <QRCodeGenerator onUpdate={setAuthCode}/>
            <button onClick={executeQuery}> Fetch Data </button>
            <div>
                {content && <div>
                        <TransactionList month={month} year={year} data={content}/>
                </div>} 
            </div>
        </React.Fragment>
    )
}

export default MainPage