
function PopupWithForm(props) {
  return (
    <>
      <div className={`popup popup_type_${props.name} ${ props.isOpen ? "popup_opened" : "" }`}>
        <div className="popup__content">
          <form className={`popup__form popup__form_${props.name}`} name={props.nameFrom}>
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button type="submit" className="popup__buttom popup__buttom_card popup__submit">{props.buttonText}</button>
          </form>
          <button onClick={props.onClose} type="button" className="popup__buttom-close" />
        </div>
      </div>
      </>
  )
}

export default PopupWithForm;
