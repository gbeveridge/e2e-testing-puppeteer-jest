import React from 'react';

const Login = ({ submit, onChange }) => {
  return (
    <form onSubmit={submit}>
      <input type="email" data-testid="email" placeholder="Email" onChange={onChange}/>
      <input type="password" data-testid="password" placeholder="Password" />
      <button data-testid="submit">Login</button>
    </form>
  );
};

export default Login;