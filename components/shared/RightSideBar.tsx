import React from 'react'

const RightSideBar = () => {
    return (
        <div className='w-1/6 rounded-lg m-5 bg-blackBackground p-3 overflow-hidden h-1/2'>
            <p className='font-semibold text-lg'>Connexion News</p>

            <div className="news-list">
                <ul className='list-disc list-inside space-y-2'>
                    <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, dolorem.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, dolorem.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, dolorem.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, dolorem.</li>
                </ul>
            </div>
        </div>
    )
}

export default RightSideBar