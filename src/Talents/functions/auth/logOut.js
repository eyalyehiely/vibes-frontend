export default function LogOut() {
  localStorage.removeItem('authTokens')
 return(
  window.location.href ='/auth/signin'
 )
}

