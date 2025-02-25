import {useState} from 'react';
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from '@mui/material/Button';

function RegisterPage() {
  const register = useAuthStore((state) => state.register);
  const isAuth = useAuthStore((state) => state.isAuth);
  const getProfile = useAuthStore((state) => state.getProfile);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const userName = ( e.currentTarget.elements[0] as HTMLInputElement).value;
    const firstName =  ( e.currentTarget.elements[1] as HTMLInputElement).value;
    const lastName =  ( e.currentTarget.elements[2] as HTMLInputElement).value;
    const email =  ( e.currentTarget.elements[3] as HTMLInputElement).value;
    const address =  ( e.currentTarget.elements[4] as HTMLInputElement).value;
    const passwordConfirm =  ( e.currentTarget.elements[5] as HTMLInputElement).value;
    const password =  ( e.currentTarget.elements[6] as HTMLInputElement).value;

    await register({ userName,firstName, lastName, address, email, password, passwordConfirm });
    await getProfile(email);
  };

  useEffect(() => {
    if (isAuth) navigate("/dashboard");
  }, [isAuth]);

  return (
<div className="container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
      <div className="input-group">
          <label>UserName</label>
          <input
            type="text"
            placeholder="Tu username"
            required
          />
        </div>
        <div className="input-group">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Tu nombre"
            required
          />
        </div>
        <div className="input-group">
          <label>Apellido</label>
          <input
            type="text"
            placeholder="Tu apellido"
            required
          />
        </div>
        <div className="input-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            required
          />
        </div>
        <div className="input-group">
          <label>Dirección</label>
          <input
            type="text"
            placeholder="Calle 65"
            required
          />
        </div>
        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="********"
            required
          />
        </div>
        <div className="input-group">
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            placeholder="********"
            required
          />
        </div>
        <Button
            color="success"
            type="submit" 
          loading={loading}
          variant="outlined"
          loadingPosition="end"
        >
          Registrarse
        </Button>
      </form>
      <a href="/login" className="link">¿Ya tienes cuenta? Inicia sesión</a>
    </div>
  );
}

export default RegisterPage;