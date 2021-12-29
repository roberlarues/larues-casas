import React, {useEffect, useState} from "react";
import './Legend.css';

const fetchOptions = {
    headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'pragma': 'no-cache',
        'cache-control': 'no-cache'
    }
};

export function Legend({ onEnableHouseType }) {

    const getConfigData= async () => {
        const configData = await fetch('data/config.json', fetchOptions);
        return configData.json();
    }

    const [houseTypes, setHouseTypes] = useState([]);
    useEffect(() => {
        getConfigData().then( config => {
            setHouseTypes(config["house-type"]);
        });
    }, []);

    const handleInputChange = function (key, value) {
        const checked = value.target.checked;
        houseTypes[key].enabled = checked;
        const newHouseTypes = Object.assign({}, houseTypes);
        setHouseTypes(newHouseTypes);
        onEnableHouseType(key, checked);
    }

    return (
        <div className="legend-box">
            {Object.keys(houseTypes).map((t: string) =>
            <div style={{backgroundColor: houseTypes[t].lightcolor}} className="inputItem" key={'legend-' + t}>
                <input id={'legend-' + t} type="checkbox" defaultChecked={houseTypes[t].enabled}
                       style={{color: houseTypes[t].color}}
                       onInput={value => handleInputChange(t, value)}/>
                <label htmlFor={'legend-' + t} >{houseTypes[t].label}</label>
                <br/>
            </div>)}
        </div>
    );
}
