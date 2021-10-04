import React, {useRef} from 'react';
import './HouseList.css';


export function HouseListItem({ house }) {
    const listItemRef = useRef();
    house.listElement = listItemRef.current;

    const onHouseClick = () => {
        // TODO openHouseModal
    }

    return (
        <li ref={listItemRef}
            onClick={onHouseClick}
            onMouseEnter={ () => house.highlightOn() }
            onMouseLeave={ () => house.highlightOff() }>
            {house.name}
        </li>
    );
}
