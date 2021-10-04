import React from 'react';
import './LaruesMap.css';
import {House} from "../models/House";


export function LaruesMap({ createHouseList }) {

    const onSvgLoaded = () => {
        const houseLayerMap = document.getElementById('houses-svg');
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
                    configureHouse(house);
                }
            }

            createHouseList(houseList);
        } else {
            console.error('not house layer found')
        }
    }

    return (
        <div className="LaruesMap">
            <img src={process.env.PUBLIC_URL + '/casas.png'} className="bg-layer" width="100%" height="100%"
                 alt="Fondo del mapa con las casas"/>
            <object  id="houses-svg" data={process.env.PUBLIC_URL + '/prueba_mapa_casas_larues.svg'} onLoad={onSvgLoaded}
                     className="house-layer" width="100%" height="100%">Casas</object>
        </div >
    );
}

function configureHouse(house: House): void {

    const onHouseEnter = (house: House) => {
        house.highlightOn();
        // TODO highlight house name in list
    }

    const onHouseExit = (house: House) => {
        house.highlightOff();
        // TODO remove highlight house name in list
    }

    const onHouseClick = (house: House) => {
        // TODO openHouseModal
    }

    house.mapElement.addEventListener('mouseover', () => onHouseEnter(house));
    house.mapElement.addEventListener('mouseout', () => onHouseExit(house));
    house.mapElement.addEventListener('click', () => onHouseClick(house));
}
