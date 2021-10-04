
export class House {
    name: string;
    mapElement: SVGPathElement;
    listElement: HTMLElement;


    constructor(name: string, mapElement: SVGPathElement) {
        this.name = name;
        this.mapElement = mapElement;

        this.highlightOff();
    }

    highlightOn(): void {
        if (this.mapElement) {
            this.mapElement.style.opacity = '1';
            this.mapElement.style.cursor = 'pointer'
        }

        if (this.listElement) {
            this.listElement.className = 'highlight';
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
