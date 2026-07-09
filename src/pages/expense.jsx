import React, { useState, useEffect } from "react";
import CardExpense from "../components/Fragments/CardExpense";
import MainLayout from "../components/Layouts/MainLayout"; 
import { expenseService } from "../services/dataService"; 

const ExpensePage = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await expenseService();
        setExpenseData(data);
      } catch (error) {
        console.error("Error fetching expenses data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  return (
    <MainLayout>
      <div className="p-6 bg-gray-50 min-h-screen">   
        <h1 className="text-base font-semibold text-gray-500 mb-6">Expenses Comparison</h1>
        
    
        {loading ? (
          <div className="flex flex-col justify-center items-center min-h-[450px] w-full gap-2">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#299D91]"></div>
            <p className="text-[#299D91] text-xs font-semibold mt-1">Loading Data</p>
          </div>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expenseData.map((item, index) => (
              <CardExpense key={index} data={item} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ExpensePage;