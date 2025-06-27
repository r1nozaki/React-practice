import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner />;
    case 'loading':
      return newItemLoading ? <Component /> : <Spinner />;
    case 'confirmed':
      return <Component />;
    case 'error':
      return <ErrorMessage />;
    default:
      throw new Error('Unexpected process state');
  }
};

const CharList = props => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const { getAllCharacters, process, setProcess } = useMarvelService();

  const itemRefs = useRef([]);

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null && itemRefs.current[selectedIndex]) {
      focusOnItem(selectedIndex);
    }
  }, [selectedIndex]);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess('confirmed'));
  };

  const onCharListLoaded = newCharList => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList(charList => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset(offset => offset + 9);
    setCharEnded(ended);
  };

  const focusOnItem = index => {
    itemRefs.current.forEach(
      item => item && item.classList.remove('char__item_selected')
    );
    if (itemRefs.current[index]) {
      itemRefs.current[index].classList.add('char__item_selected');
      itemRefs.current[index].focus();
    }
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: 'cover' };
      if (
        item.thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        imgStyle = { objectFit: 'unset' };
      }

      return (
        <li
          className='char__item'
          tabIndex={0}
          ref={el => (itemRefs.current[i] = el)}
          key={item.id}
          onClick={() => {
            props.onCharSelected(item.id);
            setSelectedIndex(i);
          }}
          onKeyPress={e => {
            if (e.key === ' ' || e.key === 'Enter') {
              props.onCharSelected(item.id);
              setSelectedIndex(i);
            }
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className='char__name'>{item.name}</div>
        </li>
      );
    });

    return <ul className='char__grid'>{items}</ul>;
  }

  return (
    <div className='char__list'>
      {setContent(process, () => renderItems(charList), newItemLoading)}

      <button
        className='button button__main button__long'
        disabled={newItemLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset)}
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
