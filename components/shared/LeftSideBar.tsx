import React from 'react';
import { Megaphone, HandHelping, Rss, Wrench, MicVocal, BookOpen, Scale, ScrollText } from 'lucide-react';

const LeftSideBar = () => {

    const resourceItems = [
        { icon: Megaphone, label: "Advertise" },
        { icon: HandHelping, label: "Help" },
        { icon: Rss, label: "Blog" },
        { icon: Wrench, label: "Careers" },
        { icon: MicVocal, label: "Press" },
    ]

    const legalItems = [
        { icon: BookOpen, label: "Content Policy" },
        { icon: Scale, label: "Privacy Policy" },
        { icon: ScrollText, label: "User Agreement" },
    ]

    return (
        <section className='hidden xl:block overflow-y-auto h-screen w-1/6 border-r-2 border-zinc-900 px-4 py-8'>
            <div className="main m-3">
                {/* Main content stuff */}
            </div>

            <div className="resources  pl-4 border-t-2 border-zinc-800 m-3">
                <div className='space-y-2 mt-3'>
                    {resourceItems.map(({ icon: Icon, label }) => (
                        <div key={label} className="rounded-lg p-3 flex items-center gap-xs min-w-0 shrink space-x-2 text-white hover:bg-zinc-800 cursor-pointer">
                            <Icon className='h-5 w-5 leading-7 mb-1' />
                            <span className='text-lg mb-1'>{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="legal  pl-4 border-t-2 border-zinc-800 m-3">
                <div className='space-y-2 mt-3'>
                    {legalItems.map(({ icon: Icon, label }) => (
                        <div key={label} className="rounded-lg p-3 flex items-center gap-xs min-w-0 shrink space-x-2 text-white hover:bg-zinc-800 cursor-pointer">
                        <Icon className='h-5 w-5 leading-7 mb-1' />
                        <span className='text-lg mb-1'>{label}</span>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default LeftSideBar;
