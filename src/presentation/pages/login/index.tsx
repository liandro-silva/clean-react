import React from "react";
import styles from "./styles.scss";

import {
  Footer,
  Input,
  LoginHeader,
  FormStatus,
} from "@/presentation/components";

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <LoginHeader />

      <form className={styles.form}>
        <h2>Login</h2>
        <Input
          placeholder="Digite seu e-mail"
          name="email"
          type="email"
          id="email"
        />
        <Input
          placeholder="Digite sua senha"
          name="password"
          type="password"
          id="password"
        />
        <button className={styles.submit} type="submit">
          Entrar
        </button>
        <span className={styles.link}>Criar conta</span>
        <FormStatus message="Erro" />
      </form>
      <Footer />
    </div>
  );
};

export default Login;