import Skeleton from '../components/skeleton/Skeleton';
import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

const setContent = (process, Component, data) => {
  switch (process) {
    case 'waiting':
      return <Skeleton />;
      break;
    case 'loading':
      return <Spinner />;
    case 'confirmed':
      return <Component data={data} />;
      break;
    case 'error':
      return <ErrorMessage />;
      break;
    default:
      throw new Error('Unexpected process state');
  }
};

export default setContent;
