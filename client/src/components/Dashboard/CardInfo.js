import React from "react";

const CardInfo = ({ label, value }) => {
  return (
    <div className="flex gap-2 my-2 whitespace-pre text-secondary">
      <p className="font-medium">{label}</p>
      <p className="overflow-hidden text-slate-700 text-ellipsis" title={value}>
        {value}
      </p>
    </div>
  );
};

export default CardInfo;
