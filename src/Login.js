import React from 'react';

const Login = ({ submit }) => {
  return (
    <form onSubmit={submit}>
      <input type="email" data-testid="email" placeholder="Email" />
      <input type="password" data-testid="password" placeholder="Password" />
      <button data-testid="submit">Login</button>
    </form>
  );
};

export default Login;