const BEST_DAY_TO_BUY = 25

export const monthsMapping = [
 "Janeiro" ,
 "Fevereiro" ,
 "Março" ,
 "Abril" ,
 "Maio" ,
 "Junho" ,
 "Julho" ,
 "Agosto" ,
 "Setembro" ,
 "Outubro" ,
 "Novembro" ,
 "Dezembro"
]

const processAmount = (amount, transactionCategory) => {
    if(isNaN(amount)){
      return 0.0
    }
    const stringValue = String(amount)
    const index = stringValue.length - 2
    const value = Number(stringValue.substring(0, index) + "." + stringValue.substring(index, stringValue.length));

    if(transactionCategory == 'payment'){
      return -value
    }

    return value
}

const formatTransactionDate = (transaction) => {
    const [year, month, rest] = transaction.time.split("-")
    const day = rest.split("T")[0]
    return new Date(Date.UTC(year, month, day, 3,0,0))
}

const sumMonths = (initialDate, qtd) => {
    return new Date(Date.UTC(initialDate.getFullYear(), initialDate.getMonth() + qtd, initialDate.getDate(), 3,0,0))
}

const generateMonthsStructure = () => {
    const months = {}
    monthsMapping.forEach(month => { months[month] = [] })
    return months
}

const pushTransaction = (data, year, month, transaction, {...override} = {}) => {
  data[year][month].push({
    ...transaction,
    ...override
  })
  return data
}

//TODO Refactor
const distribute = (transactions) => {
    let data = {}
  
    transactions.forEach(transaction => {
      const tTime = formatTransactionDate(transaction)

      let multiplier = 0 //current month
      if(tTime.getDate() + 1 >=  BEST_DAY_TO_BUY ) {
        multiplier = 1 //next month
      }
  
      const dueDate = sumMonths(tTime, multiplier)
      if(!data[dueDate.getFullYear()]){
        data[dueDate.getFullYear()] = generateMonthsStructure()
      }
  
      if(!transaction?.details?.charges){
        const year = dueDate.getFullYear()
        const month = monthsMapping[dueDate.getMonth()]
        data = pushTransaction(data, year, month, transaction, { amount: processAmount(transaction.amount, transaction.category)})
      }else {
        const {count, amount} = transaction.details.charges
        for(let i = 0; i < count ; i++ ){
          const parcelDate = sumMonths(dueDate, i)
          const year = parcelDate.getFullYear()
          const month = monthsMapping[parcelDate.getMonth()]
          if(!data[parcelDate.getFullYear()]){
            data[parcelDate.getFullYear()] = generateMonthsStructure()
          }
          data = pushTransaction(data, year, month, transaction, {
            description: `${transaction.description} ${i+1}/${count}`,
            amount: processAmount(amount, transaction.category),
            details: {
              ...transaction.details,
              charges: null
            }
          })
        }
      }
    })
  
    return data
  }

export default distribute