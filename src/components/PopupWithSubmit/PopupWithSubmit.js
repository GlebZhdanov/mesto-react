import React from 'react';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";


function PopupWithSubmit(props) {
  const currentUser = React.useContext(CurrentUserContext);


  function handleSubmit (e) {
    e.preventDefault();
    props.data.map((data) => {
      if(data.owner._id === currentUser._id) {
        props.handleDeleteClick(data)
      }
    })
  }



  return(
    <div className={`popup popup_delete-card ${ props.isOpen ? "popup_opened" : "" }`}>
      <form className="popup__form popup__form-card" name="form" onSubmit={handleSubmit}>
        <h2 className="popup__title">Вы уверены?</h2>
        <button type="button" className="popup__buttom-close" onClick={props.onClose}></button>
        <button type="submit" className="popup__buttom">Да</button>
      </form>
    </div>
  )
}

export default PopupWithSubmit;
