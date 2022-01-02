import React, {Fragment} from "react";
import {Legend} from "./Legend";
import {HouseList} from "./HouseList";

export function SideMenu({displaySideMenu, enabledHouseList, onCloseSideMenu, onEnableHouseType, onOpenHouseModal, onOpenHelpModal}) {

    return <Fragment>
        { displaySideMenu ? <div className="offCanvasOverlay" onClick={onCloseSideMenu}/> : '' }
        <div className={displaySideMenu ? 'menu-lateral offCanvasOpen' : 'menu-lateral'}>
            <div className="button-line">
                <button className="button-line-close" onClick={onCloseSideMenu}>
                    <i className="fas fa-times"/>
                </button>
                <button className="button-line-help" onClick={onOpenHelpModal}>
                    <i className="fas fa-question-circle"/>
                </button>
            </div>
            <Legend onEnableHouseType={onEnableHouseType}/>
            <HouseList houseList={enabledHouseList} openModal={onOpenHouseModal}/>
        </div>
    </Fragment>
}
