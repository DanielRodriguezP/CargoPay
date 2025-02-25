import react, { useState } from 'react';
import { loginRequest, profileRequest } from "../api/auth";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function LoginPage() {
  const setToken = useAuthStore((state) => state.setToken);
  const setProfile = useAuthStore((state) => state.setProfile);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = ( e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = ( e.currentTarget.elements[1] as HTMLInputElement).value;

    setLoading(true);

    const resLogin = await loginRequest(email, password);
    setToken(resLogin.data.token);
    const resProfile = await profileRequest(email);
    setProfile(resProfile.data);
    console.log(resProfile.data)
    navigate("/dashboard");
  };

  return (
  <div className="container"> 
    <h2>Iniciar Sesión</h2> 
        <form onSubmit={handleSubmit}> 
            <div className="input-group"> 
                <label>Correo Electrónico</label> 
                <input type="email" placeholder="correo@ejemplo.com" name="email" required /> 
            </div> 
            <div className="input-group"> 
                    <label>Contraseña</label> 
                    <input type="password" placeholder="********" name="password" required /> 
            </div>
            <Button
            color="success"
            type="submit" 
          loading={loading}
          variant="outlined"
          loadingPosition="end"
        >
          Ingresar
        </Button>
        </form>
        <a href="/register" className="link">¿No tienes cuenta? Regístrate</a> 
  </div>
  );
}

export default LoginPage;