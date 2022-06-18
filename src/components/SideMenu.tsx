import React, {Fragment, useState} from "react";
import {Legend} from "./Legend";
import {HouseList} from "./HouseList";

export function SideMenu({displaySideMenu, enabledHouseList, onCloseSideMenu, onEnableHouseType, onOpenHouseModal, onOpenHelpModal}) {

    const [displayLegend, setDisplayLegend] = useState(false);

    function toggleLegend() {
        setDisplayLegend(!displayLegend);
    }

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
                <button className={ displayLegend ? "button-line-tags-selected" : "button-line-tags"} onClick={toggleLegend}>
                    <i className="fas fa-tags"/>
                </button>
            </div>
            { displayLegend ? <Legend onEnableHouseType={onEnableHouseType}/> : '' }
            <HouseList houseList={enabledHouseList} openModal={onOpenHouseModal}/>
        </div>
    </Fragment>
}
