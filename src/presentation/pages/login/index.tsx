import React, { useEffect, useState } from 'react'
import styles from './styles.scss'
import Context from '@/presentation/contexts/form'
import {
  Footer,
  Input,
  LoginHeader,
  FormStatus
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation.protocol'
import { Authentication, SaveAccessToken } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    const { email, password } = state
    const formData = {
      email, password
    }
    setState({
      ...state,
      emailError: validation.validate('email', formData),
      passwordError: validation.validate('password', formData)
    })
  }, [state.email, state.password])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) return
      setState({
        ...state,
        isLoading: true
      })
      const account = await authentication.execute({
        email: state.email,
        password: state.password
      })
      await saveAccessToken.execute(account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <Input
            placeholder="Digite seu e-mail"
            name="email"
            type="email"
            id="email"
            disabled={state.isLoading}
          />
          <Input
            placeholder="Digite sua senha"
            name="password"
            type="password"
            id="password"
            disabled={state.isLoading}
          />
          <button
            data-testid="submit"
            disabled={!!state.emailError || !!state.passwordError || state.isLoading}
            className={styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <Link to={'/signup'} data-testid="register" className={styles.link}>
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
