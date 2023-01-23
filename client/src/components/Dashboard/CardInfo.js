import React from "react";

const CardInfo = ({ label, value }) => {
  return (
    <div className="flex gap-2">
      <p className="font-medium">{label}</p>
      <p>{value}</p>
    </div>
  );
};

export default CardInfo;
