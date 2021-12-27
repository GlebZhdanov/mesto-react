import React from 'react';
import {api}  from '../../utils/Api';
import Card from '../Card/Card';

function Main(props) {

  const[profileName, SetProfileName] = React.useState('');
  const[profileAbout, SetprofileAbout] = React.useState('');
  const[profileAvatar, SetprofileAvatar] = React.useState('')
  const[cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getUserInfo()
    .then(res => {
      SetProfileName(res.name)
      SetprofileAbout(res.about)
      SetprofileAvatar(res.avatar)
    })
    .catch((err) => {
      console.log(`Ошибка получения данных: ${err}`)
    })
  },[])

  React.useEffect(() => {
    api.getAllCards()
    .then(res => {
      setCards(res)
    })
    .catch((err) => {
      console.log(`Ошибка получения данных: ${err}`)
    })
  },[])

  return (
    <main>
      <section className="profile">
        <div className="profile__image" style={{backgroundImage: `url(${profileAvatar})`}}>
          <button onClick={props.handleEditAvatarClick} type="button" className="profile__edit-avatar"></button>
        </div>
        <div className="profile__info" >
          <div className="profile__info-blocks">
            <h1 className="profile__title">
            {profileName}
            </h1>
            <button onClick={props.handleEditProfileClick} type="button" className="profile__edit-button" />
          </div>
          <p className="profile__subtitle">
          {profileAbout}
          </p>
        </div>
        <button onClick={props.handleAddPlaceClick} type="button" className="profile__button" />
      </section>
      <section className="elements">
      {cards.map((res,_id) =>(
        <Card key={_id} data={res} handlePopupImage={props.handlePopupImage}></Card>
      ))}
      </section>
    </main>
  )
}

export default Main;
