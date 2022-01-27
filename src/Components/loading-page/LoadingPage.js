import React, { useState, useEffect } from 'react'
import BlockLoading from 'react-loadingg/lib/BlockLoading';
import './loading.css'
const commonStyle = {
    margin: 'auto',
    position: 'relative',
    left: 0,
    right: 0,
    top: '50px',
    bottom: 0
};
export const LoadingPage = () => {

    return (
        <div >
            <div className='loading'>                
                <BlockLoading size={"large"} color={"#f57224"} style={commonStyle} />
            </div>
            
        </div>

    )
}
