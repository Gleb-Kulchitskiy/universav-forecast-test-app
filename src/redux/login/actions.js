const actions = {
  GET_USER: 'GET_USER',
  USER: 'USER',
  loginUser: () => ()=> window.location.href='http://localhost:3000/auth/google',
  user: (user) => ({type:actions.USER,payload:user})
};
export default actions;