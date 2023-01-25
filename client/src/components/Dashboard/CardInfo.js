import React from "react";

const CardInfo = ({ label, value }) => {
  return (
    <div className="flex gap-2 my-2 text-secondary">
      <p className="font-medium">{label}</p>
      <p className="text-slate-700">{value}</p>
    </div>
  );
};

export default CardInfo;
