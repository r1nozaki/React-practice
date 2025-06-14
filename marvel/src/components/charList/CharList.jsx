import { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  };

  marvelService = new MarvelService();

  itemRefs = [];

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset = this.state.offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onCharListLoaded = (newCharList) => {
    const ended = newCharList.length < 9;
    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  setRef = (ref, i) => {
    this.itemRefs[i] = ref;
  };

  focusOnItem = (id) => {
    this.itemRefs.forEach((item) => item?.classList.remove('char__item_selected'));
    if (this.itemRefs[id]) {
      this.itemRefs[id].classList.add('char__item_selected');
      this.itemRefs[id].focus();
    }
  };

  renderItems(arr) {
    const items = arr.map((item, i) => {
      const isImageNotAvailable =
        item.thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

      const imgStyle = isImageNotAvailable
        ? { objectFit: 'unset' }
        : { objectFit: 'cover' };

      return (
        <li
          className='char__item'
          tabIndex={0}
          ref={(el) => this.setRef(el, i)}
          key={item.id}
          onClick={() => {
            this.props.onCharSelected(item.id);
            this.focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              this.props.onCharSelected(item.id);
              this.focusOnItem(i);
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

  render() {
    const { charList, loading, error, offset, newItemLoading, charEnded } = this.state;

    const items = this.renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className='char__list'>
        {errorMessage}
        {spinner}
        {content}
        <button
          className='button button__main button__long'
          disabled={newItemLoading}
          style={{ display: charEnded ? 'none' : 'block' }}
          onClick={() => this.onRequest(offset)}
        >
          <div className='inner'>load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
