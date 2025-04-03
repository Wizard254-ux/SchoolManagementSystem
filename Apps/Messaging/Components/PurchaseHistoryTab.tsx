// src/components/PurchaseHistoryTab.tsx
import React from 'react';
import { ShoppingCart } from 'lucide-react';

const dummyPurchaseHistory = [
  { id: 1, item: 'Laptop', price: 999.99, date: '2025-02-10', status: 'Delivered' },
  { id: 2, item: 'Headphones', price: 89.99, date: '2025-03-05', status: 'Shipped' },
  { id: 3, item: 'Mouse', price: 29.99, date: '2025-03-28', status: 'Processing' },
];

const PurchaseHistoryTab: React.FC = () => {
  return (
    <div className="mt-2 sm:mt-6 p-3 bg-white">
      <h2 className="text-lg font-semibold text-[14px] text-gray-800 flex items-center gap-2">
        <ShoppingCart className="w-4 h-4  text-[13px]" /> Purchase History
      </h2>
      <div className="overflow-auto w-[21rem] sm:w-full scrollbar-hidden min-h-[30vh] mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2  text-[13px] text-left text-gray-600">Item</th>
              <th className="px-4 py-2  text-[13px] text-left text-gray-600">Price</th>
              <th className="px-4 py-2  text-[13px] text-left text-gray-600">Date</th>
              <th className="px-4 py-2  text-[13px] text-left text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyPurchaseHistory.map((purchase) => (
              <tr key={purchase.id} className="border-t">
                <td className="px-4  text-[13px] py-2">{purchase.item}</td>
                <td className="px-4  text-[13px] py-2">${purchase.price.toFixed(2)}</td>
                <td className="px-4  text-[13px] py-2">{purchase.date}</td>
                <td className="px-4  text-[13px] py-2">
                  <span
                    className={`px-2 py-1 text-ellipsis rounded-full text-sm ${
                      purchase.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : purchase.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {purchase.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseHistoryTab;