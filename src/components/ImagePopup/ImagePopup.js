function ImagePopup(props) {
  return (
    <>
      <div className={`popup popup_image-card ${ props.data.open ? "popup_opened" : "" }`}>
        <div className="popup__content">
        <img src={props.data.dataCard.link} className="popup__image" alt="Изображение в карточке" />
          <h3 className="popup__place">{props.data.dataCard.name}</h3>
          <button onClick={props.onClose} type="button" className="popup__buttom-close"></button>
        </div>
      </div>
    </>
     )
}
export default ImagePopup
