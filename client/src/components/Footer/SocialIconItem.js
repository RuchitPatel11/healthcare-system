import React from "react";

const SocialIconItem = ({ icon, link }) => {
  return (
    <a href={link}>
      <span class={`${icon} transition hover:scale-150 duration-200`}></span>
    </a>
  );
};

export default SocialIconItem;
