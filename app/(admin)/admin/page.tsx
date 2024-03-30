"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Community, { ICommunityDocument } from "@/models/communityModel";
import Post, { IPostDocument } from "@/models/postModel";
import User, { IUserDocument } from "@/models/userModel";
import { Users, StickyNote, Handshake, HeartPulse } from "lucide-react";
import DataTable from "@/components/shared/DataTable";

const AdminPage = () => {
  const [posts, setPosts] = useState<IPostDocument[]>([]);
  const [users, setUsers] = useState<IUserDocument[]>([]);
  const [communities, setCommunities] = useState<ICommunityDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state to true before fetching data
        const [postsResponse, communitiesResponse, usersResponse] = await Promise.all([
          fetch("/api/fetch-posts?filter=all"),
          fetch("/api/fetch-communities"),
          fetch("/api/fetch-users")
        ]);

        if (!postsResponse.ok || !communitiesResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const postsData: IPostDocument[] = await postsResponse.json();
        const communitiesData: ICommunityDocument[] = await communitiesResponse.json();
        const usersData: IUserDocument[] = await usersResponse.json();

        setPosts(postsData);
        setCommunities(communitiesData);
        setUsers(usersData);
        setIsLoading(false); // Set loading state to false after fetching data
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setIsLoading(false); // Set loading state to false in case of an error
      }
    };

    fetchData();
  }, []);

  const collectionMetrics = [
    { label: "Users", value: users.length, icon: Users },
    { label: "Posts", value: posts.length, icon: StickyNote },
    { label: "Communities", value: communities.length, icon: Handshake },
    { label: "Active Users", value: Math.floor(Math.random() * users.length) + 1, icon: HeartPulse },
  ];

  const userColumns = [
    {
      accessorKey: "userName",
      header: "Username",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
  ];

  console.log("Metrics: ", collectionMetrics);

  return (
    <section>
      <main className="flex justify-center mx-auto m-4 p-4">
        <div>
          <div className="display-cards flex space-x-4 m-4 w-full p-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              collectionMetrics.map(({ label, value, icon: Icon }) => (
                <Card key={label} className="w-72">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold">
                      {value}
                    </CardTitle>
                    <Icon color="#fff" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{label}</div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          <div className="users-data-table">
            <DataTable columns={userColumns} data={users} />
          </div>
        </div>
      </main>
    </section>
  );
};

export default AdminPage;