import * as data from '../database.json';
import distribute from './distribute'

const months = [
    "Janeiro", 
    "Fevereiro", 
    "Março", 
    "Abril", 
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
]

const GetTransactions = () => {
    return data.default.slice(0,1000)
  }


describe("Distribute Process", () => {
    
    it("Should apply all years in object", () => {
        const distributed = distribute(GetTransactions())
        const years = [2017,2018,2019,2020,2021]
        years.forEach(year => expect(distributed[year]).not.toBe(undefined))
    })

    it("Should check if any year have 12 months", () => {
        const distributed = distribute(GetTransactions())
        const years = [2017,2018,2019,2020,2021]
        years.forEach(year => {
            months.forEach(month => {
                expect(distributed[year][month]).toBeTruthy()
            })
        })
    })

    it("Test if Jan 2022 have only one transaction", () => {
        const distributed = distribute(GetTransactions())
        expect(distributed[2022]["Janeiro"]).toHaveLength(1)
        expect(distributed[2022]["Janeiro"][0].description).toEqual("Amazon.Com.Br 10/10")
        expect(distributed[2021]["Agosto"]).toHaveLength(29)
    })

})