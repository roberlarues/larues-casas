import React, {useEffect, useRef, useState} from 'react';
import './HouseList.css';
import {House} from "../models/House";


export function HouseList({ houseList, openModal }) {

    const [filteredList, setFilteredList] = useState([]);
    const [filter, setFilter] = useState(null);

    useEffect(() => {
        const filtered: House[] = filter ? houseList.filter((house: House) => house.name.toLowerCase().includes(filter.toLowerCase())) : [...houseList];
        const newFilteredList = filtered.sort((a: House, b: House) => a.name.localeCompare(b.name));
        setFilteredList(newFilteredList);
    }, [houseList, filter]);

    const handleOnInput = (input) => {
        setFilter(input.target.value);
    }

    return (
        <div className="HouseList">
            <h4>Lista de casas</h4>
            <input type="text" placeholder="Buscar..." onInput={handleOnInput}/>
            {filteredList.length > 0 ?
                <ul className="house-list">
                    {filteredList.map((house: House) => <HouseListItem house={house} key={house.id} openModal={openModal}/>)}
                </ul>
                : <span className="no-result">No hay resultados</span>
            }
        </div>
    );
}


function HouseListItem({ house, openModal }) {
    const listItemRef = useRef();
    useEffect( () => house.listElement = listItemRef.current, [house]);

    const onHouseClick = () => {
        if (house.clickable) {
            openModal(house);
        }
    }

    return (
        <li ref={listItemRef}
            className="no-highlight"
            title={house.name}
            onClick={onHouseClick}
            onMouseEnter={ () => house.highlightOn() }
            onMouseLeave={ () => house.highlightOff() }>
            {house.name}
        </li>
    );
}
