import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RpcStatus.css';
import Header1 from './Header';

function RpcStatus(props) {

  const headers = [
    { key: "moniker", label: "MONIKER", dataKey: "moniker" },
    { key: "validator", label: "VALIDATOR", dataKey: "validator" },
    { key: "blocks_proposed", label: "BLOCKS PROPOSED", dataKey: "blocks_proposed" },
    { key: "blocks_signed", label: "BLOCKS SIGNED", dataKey: "blocks_signed" },
  ];

  const [rpcDetails, setRpcDetails] = useState([]);
  const [order, setOrder] = useState('ASC');
  const [copiedUrl, setCopiedUrl] = useState(null);

  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleSort = (key) => {
    let sortedData = [...rpcDetails];
    if (order === 'ASC') {
      sortedData.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      setOrder('DESC');
    } else {
      sortedData.sort((a, b) => (a[key] < b[key] ? 1 : -1));
      setOrder('ASC');
    }
    setRpcDetails(sortedData);
  };

  useEffect(() => {
    axios.get('https://namada.brightlystake.com/api/namada/validator/stats')
      .then(res => {
        setRpcDetails(res.data.data);
      })
      .catch(err => {
        console.error("Error fetching RPC details:", err);
      });
  }, []);

  return (
    <div className="table-container">
      <table id='validators'>
        <thead>
          <tr className='header'>
            {headers.map((header) => {
              return <td key={header.key} onClick={() => handleSort(header.dataKey)}>{header.label}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {rpcDetails.map((val, index) => {
            return (
              <tr key={index}>
                <td className='bold'>{val.validator}</td>
                <td className="tooltip" onClick={() => handleCopyClick(val.validator)}>
                  {val.validator}
                  <span className={`tooltiptext ${copiedUrl === val.validator ? 'copied' : ''}`}>
                    {copiedUrl === val.validator ? 'Copied!' : 'Click to copy'}
                  </span>
                </td>
                <td className={val.blocks_proposed !== 0 ? "Active" : "InActive"}>{val.blocks_proposed}</td>
                <td className={val.blocks_signed !== 0 ? "Active" : "InActive"}>{val.blocks_signed}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RpcStatus
