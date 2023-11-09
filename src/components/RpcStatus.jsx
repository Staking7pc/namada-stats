import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RpcStatus.css';
import Header1 from './Header';

function RpcStatus(props) {

  const headers = [
    { key: "moniker", label: "MONIKER" },
    { key: "validator", label: "VALIDATOR" },
    { key: "blocks_proposed", label: "BLOCKS PROPOSED" },
    { key: "blocks_signed", label: "BLOCKS SIGNED" },
  ];

  const [rpcDetails, setRpcDetails] = useState([]);
  const [order, setOrder] = useState('ASC');
  const [time1, setTime] = useState(); // CamelCased
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [sortedColumn, setSortedColumn] = useState(null);
  let networks = [...new Set(rpcDetails.map(detail => detail.network))];

  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };


  useEffect(() => {
    axios.get('https://namada.brightlystake.com/api/namada/validator/stats')
      .then(res => {
        setRpcDetails(res.data.data);
        console.log(res.data)
      })
      .catch(err => {
        console.error("Error fetching RPC details:", err);
        // Optionally, you can set some error state to show an error to the user
      });
  }, []);

  return (
    <div className="table-container">

      <div >
        <Header1 />
        <h4 className='header1'> *** WIP *** Block signing and proposal details from block 119000 to 119500</h4>
        <table id='validators'>

          <thead>
            <tr className='header'>
              {headers.map((row) => {
                return <td>{row.label}</td>
              })}
            </tr>
          </thead>
          <tbody>
            {
              rpcDetails
                .map(val => {
                  return (
                    <tr>
                      <td className='bold'>{val.validator}</td>
                      <td className="tooltip" onClick={() => handleCopyClick(val.validator)}>
                        {val.validator}
                        <span className={`tooltiptext ${copiedUrl === val.validator ? 'copied' : ''}`}>
                          {copiedUrl === val.validator ? 'Copied!' : 'Click to copy'}
                        </span>
                      </td>
                      <td className={val.blocks_proposed != 0 ? "Active" : "InActive"}>{val.blocks_proposed}</td>
                      <td className={val.blocks_signed != 0 ? "Active" : "InActive"}>{val.blocks_signed}</td>
                    </tr>
                  )
                })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RpcStatus

