import React from "react";
import HeaderLinkItem from "./HeaderLinkItem";
const HeaderLinks = () => {
  return (
    <div className="flex gap-6">
      <HeaderLinkItem name={"Home"} link={"/"} />
      <HeaderLinkItem name={"About Us"} link={"/about-us"} />
      <HeaderLinkItem name={"Contact Us"} link={"/contact-us"} />
      <HeaderLinkItem name={"CreatePassword"} link={"/set-password"} />
      <HeaderLinkItem name={"ResetPassword"} link={"/reset-password"} />
    </div>
  );
};

export default HeaderLinks;
