import React from "react";
import Card from "../Elements/Card";
import Icon from "../Elements/Icon";
import CircularProgress from '@mui/material/CircularProgress';

function CardUpcomingBill(props) {
  const { data, isLoading } = props;

  const billsList = Array.isArray(data) ? data : (data?.data || []);

  const renderIcon = (name) => {
    if (!name) return null;
    if (name.toLowerCase().includes("figma")) return <Icon.Figma />;
    if (name.toLowerCase().includes("adobe")) return <Icon.Adobe />;
    return null;
  };

  return (
    <>
      <Card
        title="Upcoming Bill"
        link="/bill"
        desc={
          isLoading ? (
            <div className="flex flex-col justify-center items-center h-full text-primary min-h-[170px]">
              <CircularProgress color="inherit" size={50} enableTrackSlot />
              <span className="mt-2 text-sm font-semibold text-gray-500">Loading Data</span>
            </div>
          ) : (
            <div className="flex flex-col justify-around h-full">
              {billsList.map((item) => (
                <div key={item.id || item._id} className="flex justify-between items-center py-3">
                  
                  <div className="flex items-center">
                    {/* 1. Kotak Tanggal Kiri */}
                    <div className="bg-special-bg p-4 rounded-xl flex flex-col items-center justify-center w-[60px] h-[60px]">
                      <span className="text-xs text-gray-02 capitalize font-medium">{item.month}</span>
                      <span className="text-xl font-bold text-gray-900 leading-none mt-1">{item.date}</span>
                    </div>
                    
                    {/* 2. Detail Informasi */}
                    <div className="ms-5 flex flex-col justify-center">
                      
                      {/* Baris 1: Logo Saja (DIPAKSA BESAR DENGAN SCALE) */}
                      <div className="mb-2 transform scale-200 origin-left flex items-center justify-start h-6">
                        {renderIcon(item.name)}
                      </div>
                      
                      {/* Baris 2: Judul Plan */}
                      <span className="font-bold text-gray-900 text-sm">
                        {item.name}
                      </span>
                      
                      {/* Baris 3: Tanggal Last Charge */}
                      <span className="text-xs text-gray-02 mt-0.5">
                        Last Charge - {item.lastCharge}
                      </span>
                      
                    </div>
                  </div>

                  {/* 3. Nominal Tagihan Kanan */}
                  <div className="flex items-center">
                    <span className="py-2 px-4 border border-gray-05 rounded-lg font-bold text-sm text-gray-900">
                      ${item.amount}
                    </span>
                  </div>
                  
                </div>
              ))}
            </div>
          )
        }
      />
    </>
  );
}

export default CardUpcomingBill;