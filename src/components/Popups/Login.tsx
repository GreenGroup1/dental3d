import { auth } from "misc"
import { Alert, Button, Snackbar, TextField, Typography, InputAdornment, IconButton } from "@material-ui/core"
import { Visibility, VisibilityOff } from  '@material-ui/icons'
import { useEffect, useState } from "react"
import { ReactComponent as Google } from 'assets/icons/google_icon.svg'
import { ReactComponent as Facebook } from "assets/icons/facebook_icon.svg"
import { useHistory } from 'react-router-dom'

export function LogIn(){
  const [credentials, setCredentials] = useState({email:'', password:''})
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [error, setError] = useState<any>()
  const  history = useHistory()

  useEffect(()=>{error&&console.log(error)},[error])

  return (
    <div style={{ color:'black', position:'absolute', top:0, bottom:0, left:0, right:0, backgroundColor:'#373740', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ backgroundColor:'white', width: 420, borderRadius:'0.2rem', boxShadow:'-2px 2px 2px rgba(0,0,0,0.2)', boxSizing:'border-box' }}>
        <div style={{display:'flex', padding:'1.5rem 2rem', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="h6" >
            Login
          </Typography>
          <Typography onClick={()=>history.push('/signup')} variant="subtitle2" component='a' style={{textDecoration: 'underline', cursor:'pointer'}}>
            Do not have an account
          </Typography>
        </div>
        <hr style={{border:'none', margin:'0', padding:'0', borderBottom:'solid 0.5px rgba(0,0,0,0.2)' }}/>
        <div style={{padding:'2rem'}}>
          <Typography variant="subtitle2" >
            Email  Address*
          </Typography>
          <TextField 
            required 
            value={credentials.email} 
            onChange={(e)=>setCredentials({...credentials, email:e.target.value})} 
            id="email" 
            label="Email" 
            variant="filled" 
            style={{width:'100%', marginTop:'1rem'}} 
          />
          <Typography variant="subtitle2" style={{marginTop:'1rem'}}>
            Password*
          </Typography>
          <TextField 
            required 
            value={credentials.password} 
            onChange={(e)=>setCredentials({...credentials, password:e.target.value})} 
            id="password" 
            label="Password" 
            variant="filled" 
            type="password" 
            style={{width: '100%', marginTop: '1rem', border:'none'}} 
            InputProps={{
              style:{border:'none', width:'100%'},
              endAdornment: 
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={()=>setPasswordVisible(!passwordVisible)}
                    onMouseDown={(e:any)=>e.preventDefault()}
                    edge="end"
                    component='div'
                  >
                    <>{passwordVisible ? <Visibility /> : <VisibilityOff />}</>
                  </IconButton>
                </InputAdornment>,
            }} 
          />
          <div style={{width:'100%'}}>
            <Button 
              onClick={()=>auth.login(credentials).catch((err)=>setError(err))}
              style={{width:'100%', height:'3.2rem', marginTop:'1rem', color:'white', backgroundColor: '#23abd5'}}>
              Login
            </Button>
            {/* <Button 
              onClick={()=>auth.register(credentials).catch((err)=>setError(err))} 
              style={{marginLeft:'0.5rem', width:'7rem', color:'black', boxShadow:'-2px 2px black'}}>
              Register
            </Button> */ }
            <Typography onClick={()=>history.push('/forgot-password')} variant="subtitle2"  style={{cursor:'pointer', textDecoration: 'underline', textAlign: 'center', marginTop: '1rem'}}>
              Forgot  your password
            </Typography>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'1rem'}}>
              <hr style={{border:'none', flex:'1 1 auto', margin:'0', padding:'0', borderBottom:'solid 0.5px rgba(0,0,0,0.2)' }}/>
              <Typography variant="subtitle2" style={{textAlign: 'center', margin:'0 1rem'}}>
                Or login with
              </Typography>
              <hr style={{border:'none', flex:'1 1 auto', margin:'0', padding:'0', borderBottom:'solid 0.5px rgba(0,0,0,0.2)' }}/>
            </div>
            <Button 
              onClick={()=>auth.login({ provider: 'facebook' })} 
              style={{width:'100%', height:'3.2rem', marginTop:'1rem', color:'white', backgroundColor: '#4267b2'}}>
              <Facebook style={{color:'black'}}/>
              <Typography variant='body2' style={{marginLeft:'0rem'}}>
                Login with Facebook
              </Typography>
            </Button>
            <Button 
              onClick={()=>auth.login({ provider: 'google' })} 
              variant='outlined'
              style={{width:'100%', height:'3.2rem', marginTop:'1rem', color:'black', backgroundColor: '#fff'}}>
              <Google />
              <Typography variant='body2' style={{marginLeft:'0.5rem'}}>
                Login with Google
              </Typography>
            </Button>
          </div>
        </div>
      </div>
      <Snackbar open={error} autoHideDuration={6000} onClose={()=>setError(undefined)}>
        <Alert onClose={()=>setError(undefined)} severity="error" sx={{ width: '100%' }}>
          {error?.message||JSON.stringify(error)}
        </Alert>
      </Snackbar>
    </div>
  )
}
