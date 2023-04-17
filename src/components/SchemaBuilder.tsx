import { forwardRef, useImperativeHandle, useReducer, useRef, useMemo } from 'react';
import { Button, Select, Input, Space, Switch } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import { SchemaBuilderRef } from "./types";
import reducer from './reducer';
import "./style.css";

const TYPES = ["OBJECT", "STRING", "NUMBER", "BOOLEAN"];

const SchemaBuilder = forwardRef((props: {store: any}, ref) => {
    const [schemas, dispatch] = useReducer(reducer, props?.store);
    const schemaRef = useRef<any>({});

    useImperativeHandle(ref, () => ({
        addField: () => dispatch({ type: "new_field" }),
        getSchema: () => schemas.map((item) =>  item.type === "OBJECT" ? {...item, value: schemaRef.current[item.key]?.getSchema()} : item)
    }))

    const color_gen = useMemo(() => Math.floor(Math.random() * 16777215).toString(16),[]);

    return (
        <div className="app p-2 pt-0 ml-2 mb-0 mt-0 pb-0 menu bg-default text-content-700" style={{ borderLeftColor: `#${color_gen}`, borderLeftWidth: 2 }}>
            {schemas.map((schema, idx) => {
                const {key, type, edit, required, value} = schema;
                const isObject = type === "OBJECT";
                const data = (isObject && schemaRef.current) ? { schema: schemaRef.current[key]?.getSchema() } : {};
                return (<div key={idx} className='items top-layer'>
                    <div className='sep'>
                        <span className='items'>
                            {edit ?? false ? <Space.Compact> <Input defaultValue={key} onBlur={(e) => dispatch({ type: "disable_editing", payload: { name: key, value: e.target.value, ...data} })} /> </Space.Compact> : <label onClick={() => dispatch({ type: "enable_editing", payload: { name: key, edit: true } })}>{key}</label>}
                            <Select value={type} onChange={(value) => dispatch({ type: "change_field_type", payload: { name: key, type: value } })}>
                                {TYPES.map((option, i) => <Select.Option key={i} value={option}>{option}</Select.Option>)}
                            </Select>
                        </span>
                        <span className='items'>
                            <label>
                                <span className='required'>Required</span>
                                <Switch checked={required} onChange={(e) => dispatch({ type: "is_required", payload: { name: key, value: e } })} />
                            </label>
                            {isObject ? <Button onClick={() => schemaRef.current && schemaRef.current[key]?.addField()}><PlusOutlined /></Button> : null}
                            <Button type='primary' danger onClick={() => dispatch({ type: "remove_field", payload: { name: key } })}><DeleteOutlined /></Button>
                        </span>
                    </div>
                    {isObject ? <SchemaBuilder store={value || []} ref= {(ele: SchemaBuilderRef) => schemaRef.current[key] = ele} /> : null}
                </div>)
            })}
        </div>
    )
})

export default SchemaBuilder;