import React from 'react';


function Card(props) {

  function handleClick() {
    props.handlePopupImage(props.data);
   }

  return (
    <>
      <div className="elements__group">
        <div className="elements__image" style={{backgroundImage: `url(${props.data.link})`}} onClick={props.one} onClick={handleClick}></div>
        <button type="button" className="elements__button-delete"></button>
        <div className="elements__group-text">
          <h2 className="elements__title">{props.data.name}</h2>
          <div>
            <button type="button" className="elements__vector"></button>
            <div className="elements__count-likes">{props.data.likes.length}</div>
          </div>
        </div>
      </div>
     </>
     )
}
export default Card
