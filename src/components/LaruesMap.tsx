import React, {useRef, Fragment} from 'react';
import {House} from "../models/House";


export function LaruesMap({ createHouseList, openModal }) {

    const mapRef = useRef();

    const onSvgLoaded = () => {
        const houseLayerMap = mapRef.current;
        const svgContent = (houseLayerMap as HTMLObjectElement).contentDocument;
        if (!svgContent) {
            console.error('Any houses svg found')
            return;
        }

        const houseLayer = svgContent.getElementById('houses-svg-layer');
        if (houseLayer) {
            const numHouses = houseLayer.children.length;
            const houseList = [];
            for (let i = 0; i < numHouses; i++) {
                const houseElement = houseLayer.children.item(i) as SVGPathElement;
                if (houseElement) {
                    const houseName = houseElement.getAttribute('inkscape:label');
                    const house = new House(houseName, houseElement);
                    houseList.push(house)
                    configureHouse(house, openModal);
                }
            }

            createHouseList(houseList);
        } else {
            console.error('not house layer found')
        }
    }

    return (
        <Fragment>
            <object ref={mapRef} data={process.env.PUBLIC_URL + '/prueba_mapa_casas_larues.svg'} onLoad={onSvgLoaded}
                    width="100%" height="100%">Mapa de casas</object>
        </Fragment >
    );
}

function configureHouse(house: House, openModal: (house: House) => void): void {

    const onHouseEnter = (house: House) => {
        house.highlightOn();
    }

    const onHouseExit = (house: House) => {
        house.highlightOff();
    }

    const onHouseClick = (house: House) => {
        openModal(house);
    }

    house.mapElement.addEventListener('mouseover', () => onHouseEnter(house));
    house.mapElement.addEventListener('mouseout', () => onHouseExit(house));
    house.mapElement.addEventListener('click', () => onHouseClick(house));
}
