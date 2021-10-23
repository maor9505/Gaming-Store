import React, { useState, useEffect } from 'react'
import BlockLoading from 'react-loadingg/lib/BlockLoading';

export const LoadingPage = () => {
    return (
        <div>
            <div>                
                <BlockLoading size={"large"} color={"#f57224"}/>
            </div>
            
        </div>

    )
}
