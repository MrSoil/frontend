import React, { useState } from 'react';
import './medication_table.css';
const initialData = [
  {
    name: 'Amoklavin-BID',
    dosage: '1000 mg',
    category: 'Antibiyotik',
    time: 'Öğle İlaçları',
    days: ['Pzt', 'Sal', 'Çar'],
    prepared: false,
  },
  {
    name: 'Amoklavin-BID',
    dosage: '1000 mg',
    category: 'Antibiyotik',
    time: 'Akşam İlaçları',
    days: ['Per', 'Cum'],
    prepared: false,
  },
  {
    name: 'B İlacı',
    dosage: '200 mg',
    category: 'Şeker İlacı',
    time: 'Öğle İlaçları',
    days: ['Pzt', 'Sal', 'Paz'],
    prepared: false,
  },
];

const MedicationTable = () => {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState(null);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    setData((prevData) => {
      return [...prevData].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    });
  };

  return (
    <div className="medication-table-container">
      <div className="medication-table">
      <h2>Haftalık İlaç Hazırlama</h2>
      <div className="divider" />
      <div>
        <h3>Tüm İlaçlar</h3>

      </div>
      <table>
        <thead>
          <tr>
            <th>
              <button onClick={() => requestSort('name')} className="sort-button">
                İlaç Adı
              </button>
            </th>
            <th>
              <button onClick={() => requestSort('dosage')} className="sort-button">
                Dozaj (miligram)
              </button>
            </th>
            <th>
              <button onClick={() => requestSort('category')} className="sort-button">
                İlaç Kategorisi
              </button>
            </th>
            <th>
              <button onClick={() => requestSort('time')} className="sort-button">
                İlaç Zamanı
              </button>
            </th>
            <th>Günler</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.dosage}</td>
              <td>{entry.category}</td>
              <td>{entry.time}</td>
              <td>
                {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz'].map((day) => (
                  <span key={day} className={entry.days.includes(day) ? 'active-day' : 'inactive-day'}>
                    {day}
                  </span>
                ))}
              </td>
              <td>
                İlaç Hazırlandı
                <input type="checkbox" checked={entry.prepared} readOnly />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

  );
};
export default MedicationTable;