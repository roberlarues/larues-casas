import React from "react";

export function Help() {
    return <div className='help'>
        <h3>Ayuda</h3>
        <h4>Uso básico</h4>
        <p className='only-pc'>Mueve el cursor sobre las casas y zonas para ver su nombre. Haz click para ver imágenes e información adicional</p>
        <p className='only-mobile'>Toca las casas y zonas para ver el nombre, imágenes e información adicional.</p>

        <div className="help-side-menu">
            <h4>Menú lateral</h4>
            <p>Toca el botón <i className="fas fa-bars"/> para abrir el botón lateral. Toca el botón <i className="fas fa-times"/> para cerrarlo.</p>
        </div>

        <h4>Zoom</h4>
        <p className='only-pc'>Puedes girar la ruleta del ratón para agrandar el mapa. Pulsa la misma ruleta para desplazarte sobre el mapa.</p>
        <p className='only-mobile'>Puedes realizar el gesto de ampliar con 2 dedos para agrandar el mapa. Puedes moverte por el mapa desplazando 2 dedos sobre él.</p>

        <h4>Leyenda</h4>
        <p>Puedes activar o desactivar los elementos del mapa desde la leyenda del menú lateral.</p>
        <p>Para mostrar/ocultar la leyenda pulsa el icono &nbsp;<i className="fas fa-tags"/></p>

        <h4>Lista de casas</h4>
        <p>Puedes buscar una casa o zona mediante el cuadro de búsqueda.</p>
        <p>Puedes pulsar sobre el nombre de una casa para ver información adicional.</p>

        <h3>Licencia</h3>
        <p>
            En <strong>pueblodelarues.es</strong> nos gusta compartir nuestro contenido, por lo que todas las imágenes e información
            que se muestran en este visor de casas son libres de copyright.
        </p>
        <p>
            Del mismo modo, el código fuente de este visor también esta disponible con licencia MIT en este repositorio:
            <a href="https://github.com/roberlarues/larues-casas" target="_blank"> https://github.com/roberlarues/larues-casas</a>
        </p>
    </div>
}
