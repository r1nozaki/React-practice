import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router';

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
        Page doesn`t exist
      </p>
      <Link
        style={{
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
          marginTop: '10px',
        }}
        to='/'
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
