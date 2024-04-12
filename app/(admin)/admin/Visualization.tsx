import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { IUserDocument } from "@/models/userModel";
import { IPostDocument } from "@/models/postModel";
import { ICommunityDocument } from "@/models/communityModel";

interface VisualizationProps {
    users: IUserDocument[];
    posts: IPostDocument[];
    communities: ICommunityDocument[];
}

const Visualization: React.FC<VisualizationProps> = ({ users, posts, communities }) => {
    // Generalized data processing function for users, posts, and communities
    const processCreationData = (data: IUserDocument[] | IPostDocument[] | ICommunityDocument[]) => {
        const countsByDate = new Map();
        const now = new Date();
        const last30Days = new Date(now.setDate(now.getDate() - 30));

        data.forEach(item => {
            const createdAt = new Date(item.createdAt);
            if (createdAt >= last30Days) {
                const dateStr = createdAt.toISOString().split('T')[0];
                countsByDate.set(dateStr, (countsByDate.get(dateStr) || 0) + 1);
            }
        });

        return Array.from(countsByDate, ([date, count]) => ({ date, count }));
    };

    const userDataForChart = processCreationData(users);
    const postDataForChart = processCreationData(posts);
    const communityDataForChart = processCreationData(communities);

    return (
        <section className="flex flex-col items-center justify-center p-3 space-y-5">
            <BarChart width={730} height={250} data={userDataForChart} className="border p-1 rounded-lg border-zinc-800">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: '#0B0D0E', color: 'white', border: 'white', borderRadius: '5px' }} />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Users" />
            </BarChart>
            <BarChart width={730} height={250} data={postDataForChart} className="border p-1 rounded-lg border-zinc-800">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: '#0B0D0E', color: 'white', border: 'white', borderRadius: '5px' }} />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" name="Posts" />
            </BarChart>
            <BarChart width={730} height={250} data={communityDataForChart} className="border p-1 rounded-lg border-zinc-800">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: '#0B0D0E', color: 'white', border: 'white', borderRadius: '5px' }} />
                <Legend />
                <Bar dataKey="count" fill="#ffc658" name="Communities" />
            </BarChart>
        </section>
    );
};

export default Visualization;
