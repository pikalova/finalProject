import React from 'react'
import './index.css'

export const DopInfo = () => {
    return (
        <div>
            <div className='infoText'>
               <h2> Здесь указаны ссылки на полезные ресурсы, которые помогали в создании проекта</h2>
            </div>
            <div className='infoA'>
            <a href='https://ru.reactjs.org/' target='_blank'> REACT.JavaScript-библиотека для создания пользовательских интерфейсов</a> <br />
            <br/>
            <a href='https://www.flaticon.com/ru/' target='_blank'> Векторные иконки и стили</a><br />
            <br/>
            <a href='https://mui.com/' target='_blank'> MUI. Библиотека компонентов</a><br />
            <br/>
            <a href='https://sberbank-school.ru' target='_blank'> СберУниверситет — платформа дистанционного обучения</a><br />
            <br/>
            <a href='http://htmlbook.ru/help' target='_blank'> Самоучитель и справочник по HTML и CSS</a><br />
            <br/>
            <a href='https://temofeev.ru/info/articles/polnoe-rukovodstvo-po-useeffect/' target='_blank'> Полное руководство по useEffect</a><br />
            </div>
        </div>
    )
}
