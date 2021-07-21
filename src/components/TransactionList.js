import React from 'react'
import styled from 'styled-components'
import {Accordion,AccordionSummary,AccordionDetails} from '@material-ui/core'

const Container = styled.div`
    max-width: 90%;
    display: block;
    margin: 0px auto;
`

const Transaction = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
    margin-bottom: 15px;
    margin-left: 8px;
    p {
        text-align: left;
    }
`


const TransactionList = (props) => {
    const { data = [], month, year } = props
    const total = Object.values(data[year][month]).map(k => k.amount).reduce((cur, acc) => cur + acc, 0).toBRL()
    return (
        <Container>
            <Accordion>
                <AccordionSummary  aria-controls="panel1a-content" id="panel1a-header">
                    <h5>Fatura de {month} / {year} | Total = {total}</h5>    
                </AccordionSummary>
                <AccordionDetails style={{display:  "block"}}>
                    {    
                        data[year][month].map(transaction => (
                                <Transaction key={transaction.id}>
                                    <p>{transaction.description} </p>
                                    <p>{transaction.amount.toBRL()}</p>
                                </Transaction>
                        ))
                    }
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}

export default TransactionList