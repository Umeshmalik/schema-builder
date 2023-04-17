import { useRef, useState } from 'react';
import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import './App.css';
import { SchemaBuilderRef } from "./components/types";
import SchemaBuilder from "./components/SchemaBuilder";

function App() {
  const schemaRef = useRef<SchemaBuilderRef>();
  const [schema, setSchema] = useState<object>();

  const getSchema = () => {
    setSchema(schemaRef.current?.getSchema());
  }

  const props = {store: [], ref: schemaRef}

  return (
    <Card title="File name and type" className='card' extra={<Button onClick={() => schemaRef.current?.addField()}><PlusOutlined /></Button>}>
      <SchemaBuilder {...props}/>
      <Button onClick={getSchema}>Save</Button>
      <pre className='schema'>{JSON.stringify(schema, null, 2)}</pre>
    </Card>
  )
}

export default App
