import React, {Fragment} from 'react';
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import SwiperCore, {
    Pagination,
    Navigation
} from 'swiper';

import './HouseDetail.css';


import 'swiper/swiper-bundle.min.css';
import 'swiper/modules/pagination/pagination.min.css';

SwiperCore.use([Pagination, Navigation]);


export function HouseDetail({ house, closeModal }) {
    return (
        <Fragment>
            <div className="modal-header">
                <button className="modal-close-button" onClick={closeModal}>
                    <i className="fas fa-times"/>
                </button>
            </div>
            <div className="HouseDetail">
                <div className={ 'house-detail-content' + (house.description !== null ? '' : ' house-detail-content-no-description')}>
                    { house.images && house.images.length === 1 ?
                        <div className="house-detail-item img-container">
                            <img src={process.env.PUBLIC_URL + '/images/' + house.images[0]} alt={house.images[0]}/>
                        </div>
                        :
                        <Swiper className="house-detail-item img-container img-container-swiper"
                                spaceBetween={20} navigation={true} pagination={true}>
                            {
                                house.images.map(img => <SwiperSlide><img src={process.env.PUBLIC_URL + '/images/' + img} alt={img}/></SwiperSlide>)
                            }
                        </Swiper>
                    }
                    <div className="house-detail-item desc-container">
                        <h1>{house.name}</h1>
                        { house.description && <div className="house-detail-description" dangerouslySetInnerHTML={{ __html: house.description + '<br/>' }}/> }
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
