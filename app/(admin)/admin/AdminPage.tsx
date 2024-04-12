"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, StickyNote, Handshake, HeartPulse } from "lucide-react";
import TableInfo from "./TableInfo";
import { ICommunityDocument } from "@/models/communityModel";
import { IPostDocument } from "@/models/postModel";
import { IUserDocument } from "@/models/userModel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InsertData from "./InsertData";
import Visualization from "./Visualization";
import LogOutForm from "@/components/shared/LogOutForm";
import LoadingPage from "@/components/shared/LoadingPage";

const AdminPage: React.FC = () => {
  const [posts, setPosts] = useState<IPostDocument[]>([]);
  const [users, setUsers] = useState<IUserDocument[]>([]);
  const [communities, setCommunities] = useState<ICommunityDocument[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [postsResponse, communitiesResponse, usersResponse] = await Promise.all([
          fetch("/api/fetch-posts?filter=all"),
          fetch("/api/communityApi/fetch-communities"),
          fetch("/api/fetch-users"),
        ]);

        if (!postsResponse.ok || !communitiesResponse.ok || !usersResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const postsData = await postsResponse.json() as IPostDocument[];
        const communitiesData = await communitiesResponse.json() as ICommunityDocument[];
        const usersData = await usersResponse.json() as IUserDocument[];

        setPosts(postsData);
        setCommunities(communitiesData);
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
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

  const communitiesColumn = [
    { accessorKey: "_id", header: "Community Id" },
    { accessorKey: "communityName", header: "Community Name" },
    { accessorKey: "communityMembers", header: "Members" },
    { accessorKey: "createdAt", header: "Date Created" },
  ];

  const postsColumn = [
    { accessorKey: "title", header: "Post Title" },
    { accessorKey: "community", header: "Community" },
    { accessorKey: "userName", header: "User" },
    { accessorKey: "createdAt", header: "Date Created" },
  ];

  const userColumns = [
    { accessorKey: "userName", header: "Username" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "createdAt", header: "Date Created" },
  ];

  return (
    isLoading ? (
      <LoadingPage />
    ) : (
      <section className="mx-auto m-4 p-4">
        <div className="title m-4 p-4 flex justify-between">
          <p className="text-4xl font-semibold">Dashboard</p>
          <LogOutForm />
        </div>

        <div className="display-cards flex space-x-4 w-full p-4">
          {collectionMetrics.map(({ label, value, icon: Icon }) => (
            <Card key={label} className="w-72">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">{value}</CardTitle>
                <Icon size={24} color="#fff" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="data-table-tabs p-4">
          <Tabs defaultValue="users">
            <TabsList className="w-1/2 flex">
              <TabsTrigger className="w-full" value="visualization">Visualization</TabsTrigger>
              <TabsTrigger className="w-full" value="users">Users</TabsTrigger>
              <TabsTrigger className="w-full" value="posts">Posts</TabsTrigger>
              <TabsTrigger className="w-full" value="communities">Communities</TabsTrigger>
              <TabsTrigger className="w-full" value="insertData">Insert Data</TabsTrigger>
            </TabsList>
            <TabsContent value="visualization">
              <Visualization users={users} posts={posts} communities={communities} />
            </TabsContent>
            <TabsContent value="users">
              <TableInfo data={users} columns={userColumns} title="User" />
            </TabsContent>
            <TabsContent value="posts">
              <TableInfo data={posts} columns={postsColumn} title="Posts" />
            </TabsContent>
            <TabsContent value="communities">
              <TableInfo data={communities} columns={communitiesColumn} title="Communities" />
            </TabsContent>
            <TabsContent value="insertData">
              <InsertData />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    )
  );
};

export default AdminPage;
