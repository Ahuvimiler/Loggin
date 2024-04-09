
// /* global FormData */
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


// const LogDisplay = () => {
//     const [logObjects, setLogObjects] = useState([]);
//     const [selectedType, setSelectedType] = useState('');

//     useEffect(() => {
//         const fetchLogData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/', {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 });
//                 setLogObjects(response.data);

//             } catch (error) {
//                 alert('Error fetching log data:', error);
//             }
//         };

//         fetchLogData(); // Call fetchLogData function on component mount

//     }, []); // Empty array is a dependency array, and here it means the useEffect will run only once upon component mount

//     const handleChange = (event) => {
//         setSelectedType(event.target.value);

//     };


//     return (
// //         <div>
            
// //             <select value={selectedType} onChange={handleChange}>
// //                 <option value="">select type</option>
// //                 {/* Here you can map over unique log types and create option elements */}
// //                 {/* For example: */}
// //                 {Array.from(new Set(logObjects.map(log => log.logType))).map((type, index) => (
// //                     <option key={index} value={type}>{type}</option>
// //                 ))}
// //             </select>
// //             <div>
// //                 <h2>Log Objects:</h2>
               
// //                     {logObjects.map((log, index) => (
                       
// //                          <Accordion style={{ width: '20%', marginLeft: '30%',marginBottom: '13px',borderRadius:'5px' }}>
// //                                 <AccordionSummary
// //                                     aria-controls="panel1-content"
// //                                     id="panel1-header"
                                   
// //                                 >
// //                                     <Typography>{log.message}</Typography>
// //                                 </AccordionSummary>
// //                                 <AccordionDetails>
// //                                     <Typography>
// //                                         <p>Timestamp: {log.timestamp}</p>
// //                                         <p>Logger Name: {log.loggerName}</p>
// //                                         <p>Log Type: {log.logType}</p>
// //                                     </Typography>
// //                                 </AccordionDetails>
// //                             </Accordion>
                        
// //                     ))}
              
// //             </div>



// //         </div>
// //     );
// // };

// <div>
// <h2>Log Objects:</h2>
// <select value={selectedType} onChange={handleChange}>
//     <option value="">All Types</option>
//     {/* Here you can map over unique log types and create option elements */}
//     {/* For example: */}
//     {Array.from(new Set(logObjects.map(log => log.logType))).map((type, index) => (
//         <option key={index} value={type}>{type}</option>
//     ))}
// </select>
// <div>
//     {logObjects
//         .filter(log => selectedType === '' || log.logType === selectedType)
//         .map((log, index) => (
//             <Accordion key={index} style={{ width: '20%', marginLeft: '30%', marginBottom: '13px', borderRadius: '5px' }}>
//                 <AccordionSummary
//                     aria-controls="panel1-content"
//                     id="panel1-header"
//                 >
//                     <Typography>{log.message}</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <Typography>
//                         <p>Timestamp: {log.timestamp}</p>
//                         <p>Logger Name: {log.loggerName}</p>
//                         <p>Log Type: {log.logType}</p>
//                     </Typography>
//                 </AccordionDetails>
//             </Accordion>
//         ))}
// </div>
// </div>
// );
// };
// export default LogDisplay;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const LogDisplay = () => {
    const [logObjects, setLogObjects] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [selectedName, setSelectedName] = useState('all');
    const [selectedType, setSelectedType] = useState('all');

    useEffect(() => {
        const fetchLogData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/', {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setLogObjects(response.data);
                alert(response.data)
                setFilteredLogs(response.data);
            } catch (error) {
                alert('Error fetching log data:', error);
            }
        };

        fetchLogData();

    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = logObjects;

            if (selectedName !== 'all') {
                filtered = filtered.filter(log => log.name === selectedName);
            }

            if (selectedType !== 'all') {
                filtered = filtered.filter(log => log.type === selectedType);
            }

            setFilteredLogs(filtered);
        };

        applyFilters();

    }, [selectedName, selectedType, logObjects]);

    const handleNameChange = (e) => {
        setSelectedName(e.target.value);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    return (
        <div>
            <div>
                <h2>Log Objects:</h2>
                <select  onChange={handleNameChange}>
                    <option value="all">LoggerNames</option>
                    {Array.from(new Set(logObjects.map(log => log.name))).map((name, index) => (
                        <option key={index} value={name}>{name}</option>
                    ))}
                     
                </select>
                <select onChange={handleTypeChange}>
                    <option value="all">LoggerTypes</option>
                    {Array.from(new Set(logObjects.map(log => log.type))).map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
                <ul>
                    {filteredLogs.map((log, index) => (
                        <li key={index}>
                            <Accordion key={index} style={{ width: '20%', marginLeft: '30%', marginBottom: '13px', borderRadius: '5px' }}>
                                <AccordionSummary
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography>{log.message}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <p>Timestamp: {log.timestamp}</p>
                                        <p>Logger Name: {log.loggerName}</p>
                                        <p>Log Type: {log.logType}</p>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LogDisplay;