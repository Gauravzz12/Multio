
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { logIn } from './authSlice';

const OAuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const user = searchParams.get('user');
    if (token && user) {
      dispatch(logIn({ accessToken: token, user }));
      navigate('/Home');
    } else {
      navigate('/Login');
    }
  }, []);

  return <div>Processing login...</div>;
};

export default OAuthSuccess;