import React from 'react';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import PopupWithSubmit from "../PopupWithSubmit/PopupWithSubmit";


function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.data.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `elements__button-delete ${!isOwn ? 'elements__button-delete_none' : 'elements__button-delete_hidden'}`
  );

  const isLiked = props.data.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`elements__vector ${isLiked ? 'elements__vector-active' : 'elements__vector-active_none'}`);

  function handleClick() {
    props.handlePopupImage(props.data);
  }
  function handleLikeClick() {
    props.onCardClick(props.data);
  }

  function openSubmitPopup() {
    props.handlePopupWithSubmit();
  }
  return (
    <>
      <div className="elements__group">
        <div className="elements__image" style={{backgroundImage: `url(${props.data.link})`}} onClick={handleClick}></div>
        <button type="button" className={cardDeleteButtonClassName} onClick={openSubmitPopup}></button>
        <div className="elements__group-text">
          <h2 className="elements__title">{props.data.name}</h2>
          <div>
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <div className="elements__count-likes">{props.data.likes.length}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
