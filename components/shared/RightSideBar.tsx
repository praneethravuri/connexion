import React from 'react'

const RightSideBar = () => {
    return (
        <div className='xl:w-1/6 rounded-lg m-5  p-3 overflow-y-auto hidden xl:block'>
            <div className="news-list border border-zinc-800 p-3 rounded-lg">
                <p className='font-semibold text-lg'>Connexion News</p>
                <ul className='list-disc list-inside space-y-2'>
                    <li>Connexion introduces new feature to schedule posts in advance</li>
                    <li>The battle for AI talent blows up</li>
                    <li>McKinsey ramps up promotion stress</li>
                    <li>Connexion updates privacy settings for better user control</li>
                </ul>
            </div>
        </div>
    )
}

export default RightSideBar