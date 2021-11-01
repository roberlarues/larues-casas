import React, {useRef, Fragment} from 'react';
import {House} from "../models/House";

const fetchOptions = {
    headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

export function LaruesMap({ createHouseList, openModal }) {

    const getHousesData= async () => {
        const housesData = await fetch('data/houses.json', fetchOptions)
        return housesData.json();
    }

    const getConfigData= async () => {
        const configData = await fetch('data/config.json', fetchOptions);
        return configData.json();
    }

    const mapRef = useRef();

    const onSvgLoaded = async () => {
        const configData = await getConfigData();
        const housesData = await getHousesData();

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
                    const house = new House(houseName, houseElement, housesData[houseName]);
                    configureHouse(house, configData, openModal);
                    houseList.push(house)
                }
            }

            createHouseList(houseList);
        } else {
            console.error('not house layer found')
        }
    }

    return (
        <Fragment>
            <object ref={mapRef} data={process.env.PUBLIC_URL + '/images/prueba_mapa_casas_larues.svg'} onLoad={onSvgLoaded}
                    width="100%" height="100%">Mapa de casas</object>
        </Fragment >
    );
}

function configureHouse(house: House, configData: any, openModal: (house: House) => void): void {

    house.images = house.images && house.images.length > 0 ?
        house.images.map(image => `${configData['house-image-folder']}/${image}`) :
        [ configData['default-image'] ]

    house.highlightOff();

    if (house.mapElement) {
        const color = house.color ? house.color : configData['house-color'][house.type];
        house.mapElement.style.fill = color;
        house.mapElement.style.fillOpacity = '0.301075';
        house.mapElement.style.stroke = color;
        house.mapElement.style.strokeWidth ='0.264583px';
        house.mapElement.style.strokeLinecap = 'butt';
        house.mapElement.style.strokeLinejoin = 'miter';
        house.mapElement.style.strokeOpacity = '1';
        house.mapElement.style.filter = `drop-shadow(0px 0px 3px ${color})`;

        house.mapElement.addEventListener('mouseover', () => house.highlightOn());
        house.mapElement.addEventListener('mouseout', () => house.highlightOff());
        house.mapElement.addEventListener('click', () => openModal(house));
    }

}
