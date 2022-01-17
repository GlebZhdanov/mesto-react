import React, {useEffect} from 'react';
import {api}  from '../../utils/Api';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ImagePopup from '../ImagePopup/ImagePopup';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import PopupWithSubmit from "../PopupWithSubmit/PopupWithSubmit";

function App() {
  const[isEditProfilePopupOpen, switchIsEditProfilePopupOpen] = React.useState(false);
  const[isAddPlacePopupOpen, switchIsAddPlacePopupOpen] = React.useState(false);
  const[isEditAvatarPopupOpen, switchIsEditAvatarPopupOpen] = React.useState(false);
  const[isPopupWithSubmit, switchIsPopupWithSubmit] = React.useState(false);
  const[selectedCard, switchSelectCard] = React.useState({open: false, dataCard: {}});
  const[currentUser, setCurrentUser] = React.useState({});
  const[cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getAllData()
      .then(([dataInfoUser, dataInfoCard]) => {
        setCurrentUser(dataInfoUser);
        setCards(dataInfoCard);
      })
      .catch((err) => console.log("ошибка получения данных: " + err))
  }, []);

  function handlePatchUserInfo(data) {
    api.patchUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData)
        closePopup()
      })
      .catch((err) => console.log("ошибка данных пользователя: " + err))
  }

  function switchImagePopup(data){
    switchSelectCard({open: true, dataCard: data});
  }

  function handleCardLike(data) {
    const isLiked = data.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(data._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((card) => (card._id === data._id ? newCard : card))
        );
      })
  }

  function handleCardDelete(data) {
    api.deleteCard(data._id)
      .then(setCards((cards) => cards.filter((c) => c._id !== data._id && c),
      closePopup()))
      .catch((err) => console.log("ошибка удаленения карточки: " + err))
  }


  function handleUpdateAvatar(data) {
    api.uploadAvatar(data)
      .then((newData) => {
        setCurrentUser(newData)
        closePopup()
      })
      .catch((err) => console.log("ошибка аватара: " + err))
  }

  function handleAddCard(data) {
    api.postNewCard(data)
      .then((newData) => {
        setCards([newData, ...cards]);
        closePopup()
      })
      .catch((err) => console.log("ошибка карточки: " + err))
  }

  function switchProfilePopup () {
    switchIsEditProfilePopupOpen(true)
  }

  function switchPlacePopup () {
    switchIsAddPlacePopupOpen(true)
  }

  function switchAvatarPopup () {
    switchIsEditAvatarPopupOpen(true)
  }

  function switchPopupWithSubmit () {
    switchIsPopupWithSubmit(true)
  }

  const closePopup = () => {
    switchIsEditProfilePopupOpen(false)
    switchIsAddPlacePopupOpen(false)
    switchIsEditAvatarPopupOpen(false)
    switchIsPopupWithSubmit(false)
    switchSelectCard({open: false, dataCard: {}});
  }


  React.useEffect(() => {
    function closePopupEsp(e) {
      if(e.keyCode === 27) {
        closePopup()
      }
    }
      window.addEventListener('keydown', closePopupEsp)
    return() => {
      window.removeEventListener('keydown', closePopupEsp)
    }
  })

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className="page">
          <Header />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closePopup}
            onUpdateUser={handlePatchUserInfo}
          >
          </EditProfilePopup>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closePopup}
            onUpdateAvatar={handleUpdateAvatar}>
          </EditAvatarPopup>
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closePopup}
            handleAddCard={handleAddCard}>
          </AddPlacePopup>
          <ImagePopup data={selectedCard} onClose={closePopup}/>
          <PopupWithSubmit
            isOpen={isPopupWithSubmit}
            onClose={closePopup}
            handleDeleteClick={handleCardDelete}
            data={cards}
          >
          </PopupWithSubmit>
          <Main
            handleEditProfileClick={switchProfilePopup}
            handleEditAvatarClick={switchAvatarPopup}
            handleAddPlaceClick={switchPlacePopup}
            handlePopupImage={switchImagePopup}
            handlePopupWithSubmit={switchPopupWithSubmit}
            cards={cards}
            onCardClick={handleCardLike}
            handleDeleteClick={handleCardDelete}>
          </Main>
          <Footer />
        </div>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
