import React from 'react'
import "./TabChange.scss"

const TabChange = ({
    tabList, setStep, step
}) => {
    return (
        <div className='tablist'>
            {tabList && tabList.map((data, key) => (
                <div className='tablist-tab'>
                    <button
                    className={step == data.step ? "active" : "inactive"}
                     onClick={() => setStep(data.step)}
                     >{data.name}</button>
                </div>
            ))
            }
        </div>
    )
}

export default TabChange