function PopupWithForm(props) {
  return (
    <>
      <div className={`popup popup_type_${props.name} ${ props.isOpen ? "popup_opened" : "" }`}>
        <div className="popup__content">
          <h2 className="popup__title">{props.title}</h2>
          <form className={`popup__form popup__form_${props.name}`} name="form" noValidate>
            {props.children}
          </form>
          <button onClick={props.onClose} type="button" className="popup__buttom-close" />
        </div>
      </div>
      </>
  )
}

export default PopupWithForm;
