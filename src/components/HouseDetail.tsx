import React from 'react';
import './HouseDetail.css';


export function HouseDetail({ house, closeModal }) {
    return (
        <div className="HouseDetail">

            <button className="close-button" onClick={closeModal}>
                Cerrar
            </button>

            <div className={ 'house-detail-content' + (house.description !== null ? '' : ' house-detail-content-no-description')}>
                <div className="house-detail-item">
                    <img src={process.env.PUBLIC_URL + '/images/' + house.images[0]} alt="Sin imagen"/>
                </div>
                <div className="house-detail-item">
                    <h1>{house.name}</h1>
                    {house.description &&
                        <p className="house-detail-description">{house.description}</p>
                    }
                </div>
            </div>
        </div>
    );
}
