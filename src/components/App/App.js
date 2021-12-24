import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';

function App() {
  const[isEditProfilePopupOpen, switchIsEditProfilePopupOpen] = React.useState(false);
  const[isAddPlacePopupOpen, switchIsAddPlacePopupOpen] = React.useState(false);
  const[isEditAvatarPopupOpen, switchIsEditAvatarPopupOpen] = React.useState(false);
  const[selectedCard, switchSelectCard] = React.useState({dataCard: {}, open: false});

  function switchProfilePopup () {
    switchIsEditProfilePopupOpen(true)
  }

  function switchPlacePopup () {
    switchIsAddPlacePopupOpen(true)
  }

  function switchAvatarPopup () {
    switchIsEditAvatarPopupOpen(true)
  }

  const closePopup = () => {
    switchIsEditProfilePopupOpen(false)
    switchIsAddPlacePopupOpen(false)
    switchIsEditAvatarPopupOpen(false)
    switchSelectCard({dataCard: {}, open: false});
  }

  function switchImagePopup(data){
    switchSelectCard({dataCard: data, open: true});
   }

  return (
    <>
      <div className="page">
        <Header />
        <PopupWithForm name='profile' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closePopup}>
          <input id="name" className="popup__item popup__item_title_active" type="text" name="name" minLength={2} maxLength={40} required />
          <span id="name-error" className="popup__text-error" />
          <input id="about" className="popup__item popup__item_subtitle_active" type="text" name="about" minLength={2} maxLength={200} required />
          <span id="about-error" className="popup__text-error" />
          <button type="submit" className="popup__buttom popup__buttom_card popup__submit">Сохранить</button>
        </PopupWithForm>
        <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={closePopup}>
          <input name="avatar" id="url-avatar" className="popup__item popup__item_url_avatar" type="url" placeholder="Ссылка на аватар" required />
          <span id="url-avatar-error" className="popup__text-error" />
          <button type="submit" className="popup__buttom popup__buttom_card popup__submit">Сохранить</button>
        </PopupWithForm>
        <PopupWithForm name='card' title='Новое место' isOpen={isAddPlacePopupOpen} onClose={closePopup}>
          <input id="name-card" name="name" className="popup__item popup__item_title_card"  type="text" placeholder="Название" minLength={2} maxLength={30} required />
          <span id="name-card-error" className="popup__text-error" />
          <input name="link" id="url-card" className="popup__item popup__item_url_card" type="url" placeholder="Ссылка на картинку" required />
          <span id="url-card-error" className="popup__text-error" />
          <button type="submit" className="popup__buttom popup__buttom_card">Cоздать</button>
        </PopupWithForm>
        <ImagePopup data={selectedCard} onClose={closePopup}/>
        <Main
          handleEditProfileClick={switchProfilePopup}
          handleEditAvatarClick={switchAvatarPopup}
          handleAddPlaceClick={switchPlacePopup}
          handlePopupImage={switchImagePopup}
          >
        </Main>
        <Footer />
    </div>
    </>);
}

export default App;
