"use client"

import React, {useEffect, useState} from 'react'


const DashboardPage =async  () => {
  const [data, setData] = useState(null)
 
  // useEffect(() => 
  // {
  // fetch('http://localhost:9090/api')
  //   .then(response => response.json())
  //           .then(data => setData(data))
  //           .catch(error => console.error('Error fetching data:', error));
  // }, [])
  return (
    <div>
            {/* <h1>API Data</h1>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )} */}

            
        </div>
  )
}

export default DashboardPage
