import React , {useState} from 'react'
import { ImgLogin } from "../utils/Data";
import { Link , useNavigate} from 'react-router-dom';
import axiosClient from "../axios-client.js";



function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const navigate = useNavigate();


  const handleSignUp = async () => {
    try {
      if (password === passwordC) {
        const payload = {
          "firstName": firstName,
          "lastName": lastName,
          "phone": phone,
          "email": email,
          "password": password
        }
        console.log(payload)
        axiosClient.post('/signup', payload)
        .then(({data}) => {
          console.log(data);
          navigate('/login');
        })
        .catch((err) => {
          const response = err.response;
          console.log(response);
          setMessage(response.data.message);
        });
        
      } else {
        setMessage("password not matge!!!");
        console.log(message);
      }
    } catch (error) {
      console.error(error);
      const response = error.response;
      console.log(response);
        
    }
  };
  return (
    <section className="contact spad ">
      <div className="container flex justify-center items-center">
        <div className="rounded-[20px] truncate   h-[60vh] w-[800px]  flex justify-center items-center gap-[5%]">
          <div className="h-full bg-center bg-cover	 bg-no-repeat	min-w-[45%] max-sm:hidden sm:block"
          style={{ backgroundImage: `url('${ImgLogin}')` }}>
          </div>
          <div className="contact__form min-w-[50%] pr-[10px]">
            <h5>Sign Up</h5>
            <p className="mb-[10px] bg-[red]">
                {message}
            </p>
            <form action="#" className="grid">
              <input type="text" placeholder="First Name" value={firstName} onChange={(e)=> setFirstName(e.target.value)} />
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=> setLastName(e.target.value)} />
              <input type="phone" placeholder="Phone" value={phone} onChange={(e)=> setPhone(e.target.value)}/>
              <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
              <input type="password" placeholder="Configre Password" value={passwordC} onChange={(e)=> setPasswordC(e.target.value)}/>
              <p className="mb-[10px]">
                  I have Account ? <Link to='/login'>Login</Link>
                </p>
              <button onClick={handleSignUp} className="block site-btn bg-[#ca1515] w-[50%]">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp
