import React from "react";
import { Container } from "./styles";
import imgEntrada from '../../assets/entrada.svg'
import imgSaida from '../../assets/saida.svg'
import imgTotal from '../../assets/total.svg'
import { useTransactions } from "../../hooks/useTransactions";


export function Summary () {
    const {transactions} = useTransactions()

    const summary = transactions.reduce((acc, transaction) =>{
        if( transaction.type === 'deposit'){
            acc.deposits += transaction.amount
            acc.total += transaction.amount
        }else{
            acc.withdraws += transaction.amount
            acc.total -= transaction.amount
        }

        return acc
    }, {
        deposits:0,
        withdraws: 0,
        total: 0
    })
    
  return (
      <Container>
          <div>
              <header>
              <p>Entrada</p>
              <img src={imgEntrada} alt="Entradas" />
              </header>
              <strong>{new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                         currency: 'BRL'
                        }).format(summary.deposits)}</strong>
          </div>

          <div>
              <header>
              <p>Saídas</p>
              <img src={imgSaida} alt="Entradas" />
              </header>
              <strong>{new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                         currency: 'BRL'
                        }).format(summary.withdraws)}</strong>
          </div>

          <div className="total">
              <header>
              <p>Total</p>
              <img src={imgTotal} alt="Entradas" />
              </header>
              <strong>{new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                         currency: 'BRL'
                        }).format(summary.total)}</strong>
          </div>
          
      </Container>
  );
}