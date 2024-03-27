import React from 'react'

const RightSideBar = () => {
    return (
        <div className='xl:w-1/6 rounded-lg m-5 bg-neutral-900 p-3 overflow-y-auto h-1/2 hidden xl:block'>
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