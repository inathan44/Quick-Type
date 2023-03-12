import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  linkName: string;
  imgUrl: string;
  altText: string;
  link: string;
}

const NavLink = (props: NavLinkProps) => {
  return (
    <Link to={props.link}>
      <div className="flex items-center">
        <img className="w-8" src={props.imgUrl} alt={props.altText} />
        <h2 className="text-xl">{props.linkName}</h2>
      </div>
    </Link>
  );
};

export default NavLink;
