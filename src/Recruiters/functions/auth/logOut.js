export default function LogOut() {
  localStorage.removeItem('authToken')
 return(
  window.location.href ='/auth/recruiter/signin'
 )
}

