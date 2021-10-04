import React from 'react';
import './LaruesMap.css';


export function LaruesMap() {

    const onSvgLoaded = () => {
        const houseLayerMap = document.getElementById('houses-svg');
        const svgContent = (houseLayerMap as HTMLObjectElement).contentDocument;
        if (!svgContent) {
            console.error('Any houses svg found')
            return;
        }

        const houseLayer = svgContent.getElementById('houses-svg-layer'); // TODO no funciona
        if (houseLayer) {
            const numHouses = houseLayer.children.length;
            for (let i = 0; i < numHouses; i++) {
                const houseItem = houseLayer.children.item(i) as SVGPathElement;
                if (houseItem) {
                    configureHouse(houseItem);
                }
            }
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

function setDefaultHouseState(houseElement: SVGPathElement): void {
    houseElement.style.opacity = '0.5';
}

function setHighlightedHouseState(houseElement: SVGPathElement): void {
    houseElement.style.opacity = '1';
}

function configureHouse(houseElement: SVGPathElement): void {

    const onHouseEnter = (houseId: string, houseElement: SVGPathElement) => {
        setHighlightedHouseState(houseElement);
        // TODO highlight house name in list
    }

    const onHouseExit = (houseId: string, houseElement: SVGPathElement) => {
        setDefaultHouseState(houseElement);
        // TODO remove highlight house name in list
    }

    const onHouseClick = (houseId: string, houseElement: SVGPathElement) => {
        // TODO openHouseModal
    }

    const houseName = houseElement.getAttribute('inkscape:label');
    houseElement.addEventListener('mouseover', () => onHouseEnter(houseName ? houseName : '', houseElement));
    houseElement.addEventListener('mouseout', () => onHouseExit(houseName ? houseName : '', houseElement));
    houseElement.addEventListener('click', () => onHouseClick(houseName ? houseName : '', houseElement));
    setDefaultHouseState(houseElement);
}
