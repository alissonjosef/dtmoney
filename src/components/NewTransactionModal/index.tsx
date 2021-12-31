
import { FormEvent, useState } from 'react'
import Modal from 'react-modal'
import {  useTransactions } from '../../hooks/useTransactions'

import imgEntrada from '../../assets/entrada.svg'
import imgSaida from '../../assets/saida.svg'
import close from '../../assets/close.svg'

import { Container,RadioBox,TransactionTypeContainer } from './styles'

interface NewTransactionProps {
    isOpen: boolean
    onRequestClose: () => void
}

export function NewTransactionModal ({isOpen, onRequestClose}:NewTransactionProps) {

    const {createTransaction} = useTransactions()

    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [type,setType] = useState('deposit')

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

       await createTransaction({
            title,
            type,
            amount,
            category,
        })

        setTitle('')
        setAmount(0)
        setCategory('')
        setType('')

        onRequestClose()
    }

  return (
    <Modal 
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName='react-modal-overlay'
    className='react-modal-content'
    >
        <button type='button' onClick={onRequestClose} className='react-modal-close'>
            <img src={close} alt="Fechar Modal" />
        </button>
     <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastra transação</h2>
        
        <input type="text" placeholder='Titulo' value={title} onChange={event => setTitle(event.target.value)}/>
        <input type="number" placeholder='Valor' value={amount} onChange={event => setAmount(Number(event.target.value))} />

        <TransactionTypeContainer>
            <RadioBox type='button' activeColor='green' isActive={type === 'deposit'} onClick={() => {setType('deposit')}}>
            <img src={imgEntrada} alt="entrada" />
            <span>Entrada</span>
            </RadioBox>

            <RadioBox type='button' activeColor='red' isActive={type === 'withdraw'} onClick={() => {setType('withdraw')}}> 
            <img src={imgSaida} alt="saida" />
            <span>Saída</span>
            </RadioBox>
        </TransactionTypeContainer>

        <input type="text" placeholder='Categoria' value={category} onChange={event => setCategory(event.target.value)} />
        <button type='submit'>Cadastrar</button>
      </Container>   
    </Modal>
    )
}

