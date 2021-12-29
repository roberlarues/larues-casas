import {HouseData} from "./HouseData";

export class House extends HouseData {
    key: string;
    name: string;
    mapElement: SVGPathElement;
    listElement: HTMLElement;
    enabled = true;


    constructor(key: string, mapElement: SVGPathElement, houseData: HouseData) {
        super();
        this.key = key;
        this.mapElement = mapElement;
        Object.assign(this, houseData);
    }

    highlightOn(): void {
        if (this.mapElement) {
            this.mapElement.style.fillOpacity = '0.5';
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
            this.mapElement.style.fillOpacity = '0.15';
        }

        if (this.listElement) {
            this.listElement.className = 'no-highlight';
        }
    }

    setEnabled(enabled: boolean) {
        this.enabled = enabled;
        if (this.mapElement) {
            this.mapElement.style.display = enabled ? 'block' : 'none';
        }
    }
}
