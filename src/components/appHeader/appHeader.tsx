import React from 'react';
import headerStyles from './appHeader.module.css';
import { Logo } from '../logo/logo';
import { BurgerIcon } from '../icons/burger-icon';
import { ListIcon } from '../icons/list-icon';
import { ProfileIcon } from '../icons/profile-icon';

export default function AppHeader() {
  return (
    <header className={`${headerStyles.header} pt-4 pb-4`}>
      <div className={headerStyles.content}>
        <nav>
          <ul className={headerStyles.nav__list}>
            <li className={`${headerStyles.nav__item} pl-5 pr-5 pt-4 pb-4`}>
              <a href="#" className={`${headerStyles.link} ${headerStyles.isActive}`}>
                <BurgerIcon type="primary" />
                <p className="ml-2 text text_type_main-default">Конструктор</p>
              </a>
            </li>
            <li className={`${headerStyles.nav__item} pl-5 pr-5 pt-4 pb-4`}>
              <a href="#" className={headerStyles.link}>
                <ListIcon type="secondary" />
                <p className="ml-2 text text_type_main-default">Лента заказов</p>
              </a>
            </li>
          </ul>
        </nav>
        <Logo />
        <nav>
          <ul className={headerStyles.nav__list}>
            <li className={`${headerStyles.nav__item} pl-5 pr-5 pt-4 pb-4`}>
              <a href="#" className={headerStyles.link}>
                <ProfileIcon type="secondary" />
                <p className="ml-2 text text_type_main-default">Личный кабинет</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}