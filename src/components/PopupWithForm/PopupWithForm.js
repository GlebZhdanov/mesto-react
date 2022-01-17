
function PopupWithForm(props) {

  return (
    <>
      <div className={`popup popup_type_${props.name} ${ props.isOpen ? "popup_opened" : "" }`} onClick={props.onClose} >
        <div className="popup__content" onClick={(e) => {e.stopPropagation()}}>
          <form className={`popup__form popup__form_${props.name}`} name={props.nameFrom} onSubmit={props.onSubmit}>
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button type="submit" className="popup__buttom popup__buttom_card popup__submit" >{props.buttonText}</button>
          </form>
          <button onClick={props.onClose} type="button" className="popup__buttom-close" />
        </div>
      </div>
      </>
  )
}

export default PopupWithForm;
