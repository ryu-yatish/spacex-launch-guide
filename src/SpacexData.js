import React from 'react'
import { useState, useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid';

const SpacexData = () => {
    const [Items, setItems] = useState([])

    useEffect(() => {
        fetch("https://api.spaceXdata.com/v3/launches?limit=100")
        .then((response) => response.json())
        .then((items) =>setItems(items))
        .catch((error) => console.log("Error >",error));
    });

    

    return (
        <div>
            <h1>this is SpacexData </h1>
        </div>
    )
}

export default SpacexData
