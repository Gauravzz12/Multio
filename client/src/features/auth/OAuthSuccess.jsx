
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { logIn } from './authSlice';
import { toast } from 'react-toastify';

const OAuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const user = searchParams.get('user');
    const avatar= searchParams.get('avatar');
    if (token && user) {
      dispatch(logIn({ accessToken: token, user,avatar }));
      toast.success("Login successful");
      navigate('/Home');
    } else {
      navigate('/Login');
    }
  }, []);

  return <div>Processing login...</div>;
};

export default OAuthSuccess;