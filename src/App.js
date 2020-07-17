import React, { useState } from 'react';
import Datasets from './components/Datasets';
import DynamicTable from './components/Table';
import Container from '@material-ui/core/Container';

export default function App() {
  const [data, setData] = useState([]);
  const [tableName, setTableName] = useState("");

  const dataResultsCallBack = (result) => {
     setData(result.data); 
     setTableName(result.name);
  }

  return (
    <Container maxWidth="md">
      <h2>Dynamic Table</h2>
      <Datasets receiveDataResults={dataResultsCallBack} />
      <DynamicTable tableData={data} tableName={tableName} />
    </Container>
  );
}