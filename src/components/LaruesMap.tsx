import React, {useRef, Fragment} from 'react';
import {House} from "../models/House";

const fetchOptions = {
    headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'pragma': 'no-cache',
        'cache-control': 'no-cache'
    }
};

const viewboxW = 199.23126;
const viewboxH = 199.23126;

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
        const svgContent = (houseLayerMap as HTMLObjectElement).getSVGDocument();
        if (!svgContent) {
            console.error('Any houses svg found')
            return;
        }

        const svgZoomHandler = new CustomZoomSvgHandler();
        svgZoomHandler.setSvgDocument(svgContent);

        const houseLayer = svgContent.getElementById('houses-svg-layer');
        if (houseLayer) {
            const numHouses = houseLayer.children.length;
            const houseList = [];
            for (let i = 0; i < numHouses; i++) {
                const houseElement = houseLayer.children.item(i) as SVGPathElement;
                if (houseElement) {
                    const houseKey = houseElement.getAttribute('inkscape:label');
                    const house = new House(houseKey, houseElement, housesData[houseKey]);
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
            <object ref={mapRef} data={process.env.PUBLIC_URL + '/images/casas.svg'} onLoad={onSvgLoaded}
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
        house.mapElement.style.fillOpacity = '0.15';
        house.mapElement.style.stroke = color;
        house.mapElement.style.strokeWidth ='0.5px';
        house.mapElement.style.strokeLinecap = 'butt';
        house.mapElement.style.strokeLinejoin = 'miter';
        house.mapElement.style.strokeOpacity = '0.7';
        // house.mapElement.style.filter = `drop-shadow(0px 0px 3px ${color})`;

        house.mapElement.addEventListener('mouseover', () => house.highlightOn());
        house.mapElement.addEventListener('mouseout', () => house.highlightOff());
        house.mapElement.addEventListener('click', () => openModal(house));
    }
}

const calcTouchZoomValue = function(event) {
    const x1 = event.touches[0].clientX;
    const y1 = event.touches[0].clientY;
    const x2 = event.touches[1].clientX;
    const y2 = event.touches[1].clientY;
    return Math.hypot(x2-x1, y2-y1);
}

class CustomZoomSvgHandler {

    private element;
    private scrollValue = 0;
    private originalTouchDistance = 0;
    private originalScrollValue = 0;
    private lastCenterX = 0;
    private lastCenterY = 0;
    private drag = false;

    setSvgDocument(svgContent: Document) {
        this.element = (svgContent.documentElement as SVGElement|any);
        svgContent.addEventListener('wheel', this.handleWheelEvent.bind(this), { passive: false });
        svgContent.addEventListener('touchstart', this.handleTouchStartEvent.bind(this), { passive: false });
        svgContent.addEventListener('touchmove', this.handleTouchMoveEvent.bind(this), { passive: false });
        svgContent.addEventListener('mousedown', this.handleMouseDownEvent.bind(this));
        document.addEventListener('mouseup', this.handleMouseUpEvent.bind(this));
        svgContent.addEventListener('mouseup', this.handleMouseUpEvent.bind(this));
        svgContent.addEventListener('mousemove', this.handleMouseMoveEvent.bind(this));
    }

    private handleZoom(zoom, x, y) {
        const maxZoomValue = 199.23126;
        const zoomBase = 199.23126;

        this.scrollValue = zoom < 0 ? 0 : (zoom > maxZoomValue ? maxZoomValue : zoom);
        const vw = (zoomBase - Math.sqrt(this.scrollValue)*10);
        const vh = (zoomBase - Math.sqrt(this.scrollValue)*10);

        const vbbvalues = this.element.getAttribute('viewBox').split(' ');
        const currentX = +vbbvalues[0];
        const currentY = +vbbvalues[1];
        const currentW = +vbbvalues[2];
        const currentH = +vbbvalues[3];

        const newX = (currentX + x * currentW) - x * vw;
        const newY = (currentY + y * currentH) - y * vh;
        const vx = newX < 0 ? 0 : (newX > viewboxW - vw ? viewboxW - vw : newX);
        const vy = newY < 0 ? 0 : (newY > viewboxH - vh ? viewboxH - vh : newY);
        this.element.setAttribute('viewBox', `${vx} ${vy} ${vw} ${vh}`);
    }

    private handleDisplacement(deltaX: number, deltaY: number) {
        const vbbvalues = this.element.getAttribute('viewBox').split(' ');
        const currentX = +vbbvalues[0];
        const currentY = +vbbvalues[1];
        const currentW = +vbbvalues[2];
        const currentH = +vbbvalues[3];
        const newX = (currentX - deltaX * currentW);
        const newY = (currentY - deltaY * currentH);
        const vx = newX < 0 ? 0 : (newX > viewboxW - currentW ? viewboxW - currentW : newX);
        const vy = newY < 0 ? 0 : (newY > viewboxH - currentH ? viewboxH - currentH : newY);
        this.element.setAttribute('viewBox', `${vx} ${vy} ${currentW} ${currentH}`);
    }

    private handleWheelEvent(event) {
        event.preventDefault();
        const normX = event.x / this.element.clientWidth;
        const normY = event.y / this.element.clientHeight;
        this.handleZoom(this.scrollValue + event.deltaY * -0.1, normX, normY);
    };

    private handleMouseDownEvent(event) {
        if (event.which === 2) {
            event.preventDefault();
            this.element.style.cursor = 'all-scroll';
            this.drag = true;
            this.lastCenterX = event.x / this.element.clientWidth;
            this.lastCenterY = event.y / this.element.clientHeight;
        }
    }

    private handleMouseUpEvent(event) {
        if (event.which === 2) {
            event.preventDefault();
            this.element.style.cursor = '';
            this.drag = false;
        }
    }

    private handleMouseMoveEvent(event) {
        if (this.drag) {
            const normX = event.x / this.element.clientWidth;
            const normY = event.y / this.element.clientHeight;
            const deltaX = normX - this.lastCenterX;
            const deltaY = normY - this.lastCenterY;
            this.handleDisplacement(deltaX, deltaY);
            this.lastCenterX = normX;
            this.lastCenterY = normY;
        }
    }

    private handleTouchStartEvent(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
            this.originalTouchDistance = calcTouchZoomValue(event);
            const normX = (event.touches[0].clientX + event.touches[1].clientX) / (2 * this.element.clientWidth);
            const normY = (event.touches[0].clientY + event.touches[1].clientY) / (2 * this.element.clientHeight);
            this.originalScrollValue = this.scrollValue;
            this.handleZoom(this.scrollValue, normX, normY);

            this.lastCenterX = normX;
            this.lastCenterY = normY;
        }
    };

    private handleTouchMoveEvent(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
            const dist = calcTouchZoomValue(event);
            const normX = (event.touches[0].clientX + event.touches[1].clientX) / (2 * this.element.clientWidth);
            const normY = (event.touches[0].clientY + event.touches[1].clientY) / (2 * this.element.clientHeight);
            const deltaDist = dist - this.originalTouchDistance;
            this.handleZoom(this.originalScrollValue + deltaDist * 0.5, normX, normY);

            const deltaX = normX - this.lastCenterX;
            const deltaY = normY - this.lastCenterY;
            this.handleDisplacement(deltaX, deltaY);
            this.lastCenterX = normX;
            this.lastCenterY = normY;
        }
    };

}
