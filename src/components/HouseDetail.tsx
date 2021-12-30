import React from 'react';
import './HouseDetail.css';


export function HouseDetail({ house, closeModal }) {
    return (
        <div className="HouseDetail">
            <div className="modal-header">
                <button className="modal-close-button" onClick={closeModal}>
                    <i className="fas fa-times"/>
                </button>
            </div>

            <div className={ 'house-detail-content' + (house.description !== null ? '' : ' house-detail-content-no-description')}>
                <div className="house-detail-item img-container">
                    <img src={process.env.PUBLIC_URL + '/images/' + house.images[0]} alt="Sin imagen"/>
                </div>
                <div className="house-detail-item desc-container">
                    <h1>{house.name}</h1>
                    {house.description &&
                        <p className="house-detail-description">{house.description}</p>
                    }
                </div>
            </div>
        </div>
    );
}
