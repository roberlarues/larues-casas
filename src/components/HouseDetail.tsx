import React from 'react';
import './HouseDetail.css';


export function HouseDetail({ house, closeModal }) {
    return (
        <div className="HouseDetail">
            <div className="house-detail-item">
                <img src={process.env.PUBLIC_URL + '/images/' + house.images[0]} alt="Sin imagen" width="100%"/>
            </div>
            <div className="house-detail-item">
                <h1>{house.name}</h1>
                <p>{house.description}</p>
            </div>

            <button className="close-button" onClick={closeModal}>
                Cerrar
            </button>
        </div>
    );
}
