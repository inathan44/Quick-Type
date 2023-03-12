import React from 'react';
import keyboardIcon from '../assets/icons8-keyboard-64.png';
import barChartIcon from '../assets/bar-chart-icon.svg';
import accountIcon from '../assets/account-icon.svg';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';

const NavBar = () => {
  return (
    <div className="text-white">
      <nav className="px-6 py-3 flex justify-between">
        <Link to={'/'}>
          <div className="flex items-center gap-4">
            <img src={keyboardIcon} alt="Keyboard icon" />
            <h1 className="text-4xl text-white font-bold tracking-wide">
              QuickType<span className="text-sm text-gray-400">(beta)</span>
            </h1>
          </div>
        </Link>
        <div className="flex gap-4">
          <NavLink
            linkName="leaderboards"
            imgUrl={barChartIcon}
            altText="Bar chart icon"
            link="/Leaderboards"
          />
          <NavLink
            linkName="Account"
            imgUrl={accountIcon}
            altText="Account user icon"
            link="/account"
          />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
