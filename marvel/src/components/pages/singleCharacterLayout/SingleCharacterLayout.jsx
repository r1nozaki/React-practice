import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';
import './singleCharacterLayout.scss';

const SingleCharacterLayout = ({ data }) => {
  const { name, description, thumbnail } = data;
  const location = useLocation();

  return (
    <div className='single-comic'>
      <Helmet key={location.pathname}>
        <meta name='description' content={`${name} character`} />
        <title>{name}</title>
      </Helmet>
      <img src={thumbnail} alt={name} className='single-comic__char-img' />
      <div className='single-comic__info'>
        <h2 className='single-comic__name'>{name}</h2>
        <p className='single-comic__descr'>{description}</p>
      </div>
    </div>
  );
};

export default SingleCharacterLayout;
