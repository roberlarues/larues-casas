import {HouseData} from "./HouseData";

export class House extends HouseData {
    key: string;
    name: string;
    mapElement: SVGPathElement;
    listElement: HTMLElement;


    constructor(key: string, mapElement: SVGPathElement, houseData: HouseData) {
        super();
        this.key = key;
        this.mapElement = mapElement;
        Object.assign(this, houseData);
    }

    highlightOn(): void {
        if (this.mapElement) {
            this.mapElement.style.opacity = '1';
            this.mapElement.style.cursor = 'pointer'
        }

        if (this.listElement) {
            this.listElement.className = 'highlight';
        } else {
            console.log('no element ;(')
        }
    }

    highlightOff(): void {
        if (this.mapElement) {
            this.mapElement.style.opacity = '0.5';
        }

        if (this.listElement) {
            this.listElement.className = 'no-highlight';
        }
    }
}
