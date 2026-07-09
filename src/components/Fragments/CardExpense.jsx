import React from "react";
import Icon from "../Elements/Icon";

const CardExpense = ({ data }) => {
  if (!data) return null;

  const detailsList = data.detail || data.details || data.items || [];

  const renderIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "housing":
        return <Icon.House size={18} />;
      case "food":
        return <Icon.Food size={18} />;
      case "transportation":
        return <Icon.Transport size={18} />;
      case "entertainment":
        return <Icon.Gamepad size={18} />;
      case "shopping":
        return <Icon.Shopping size={18} />;
      default:
        return <Icon.Other size={18} />;
    }
  };

  const isUpValue = data.trend === "up";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center text-gray-900">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg border border-gray-200 flex items-center justify-center w-10 h-10 shrink-0 shadow-sm text-gray-02">
            {renderIcon(data.category)}
          </div>
          <div>
            <span className="text-gray-02 text-xs font-medium block capitalize">
              {data.category}
            </span>
            <span className="font-bold text-gray-900 text-xl block mt-0.5">
              ${data.amount}
            </span>
          </div>
        </div>
        
        <div className="text-right flex flex-col items-end justify-center">
          <div className={`text-xs font-bold flex items-center gap-1 ${isUpValue ? 'text-special-red' : 'text-special-green'}`}>
            <span>{data.percentage}%</span> 
            {isUpValue ? (
              <Icon.ArrowUp size={16} />
            ) : (
              <Icon.ArrowDown size={16} />
            )}
          </div>
          <span className="text-[10px] text-gray-400 block mt-1">
            Compare to the last month
          </span>
        </div>
      </div>

      <div className="p-4 bg-white flex flex-col justify-between flex-grow">
        {detailsList.map((detail, index) => (
          <div key={index} className="w-full">
            {index > 0 && <hr className="border-gray-100 my-3" />}
            
            <div className="flex justify-between items-start w-full py-0.5">
              <span className="text-sm font-semibold text-gray-700 pt-0.5">
                {detail.name || detail.title || detail.item || "Nama Item"}
              </span>
              
              <div className="text-right flex flex-col items-end">
                <span className="text-sm font-bold text-gray-900">
                  ${detail.amount || detail.price || 0}
                </span>
                <span className="text-[11px] text-gray-400 font-medium mt-0.5">
                  {detail.date || detail.tanggal || "17 May 2023"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardExpense;