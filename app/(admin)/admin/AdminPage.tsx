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
import LoadingPage from "@/components/shared/static/LoadingPage";
import UserEngagement from "./UserEngagement";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import CommunityActivity from "./CommunityActivity";



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
          fetch("/api/post-api/fetch?filter=all"),
          fetch("/api/community-api/fetch"),
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

  const { toast } = useToast();

  const handleDeleteCommunity = async (communityId: string) => {
    try {
      const response = await fetch(`/api/community-api/delete?communityId=${communityId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the community');
      }

      const data = await response.json();

      if (data.message === "Community Deleted Successfully") {
        console.log("Here");
        toast({
          title: "Success!",
          description: ""
        });
      } else {
        toast({
          title: "Internal Server Error",
          description: data.message
        });
      }

      // Remove the community from the local state to update UI immediately
      setCommunities(prevCommunities => prevCommunities.filter(c => c._id !== communityId));
    } catch (error) {
      console.error("Error deleting community:", error);
    }
  };

  const [editCommunityData, setEditCommunityData] = useState<Partial<ICommunityDocument> | null>(null);

  // Function to handle edit form submission
  const handleEditCommunity = async (e: React.FormEvent<HTMLFormElement>, communityId: string) => {
    e.preventDefault();  // Prevent default form submission behavior
    if (!editCommunityData) return;
    console.log("Edit community data: ", editCommunityData);
    try {
      const response = await fetch(`/api/community-api/edit?communityId=${communityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ communityData: editCommunityData }),
      });


      if (!response.ok) {
        throw new Error('Failed to edit community');
      }

      const updatedCommunity = await response.json();
      // Update local state to reflect the changes
      setCommunities(prev => prev.map(c => c._id === communityId ? updatedCommunity : c));
      setEditCommunityData(null);  // Clear the edit state
      console.log('Community updated successfully');
    } catch (error) {
      console.error('Error updating community:', error);
    }
  };



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
    {
      accessorKey: "actions",
      header: "Actions",
      renderCell: (item: ICommunityDocument) => (
        <>
          <div className="space-x-2">
            <Dialog>
              <DialogTrigger>Edit</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Community</DialogTitle>
                </DialogHeader>
                <form className="space-y-4 p-4" onSubmit={(e) => handleEditCommunity(e, item._id)}>
                  <Input
                    value={editCommunityData?.communityName || ''}
                    onChange={(e) => setEditCommunityData({ ...editCommunityData, communityName: e.target.value })}
                    placeholder="Community Name"
                    type="text"
                  />
                  <Textarea
                    value={editCommunityData?.communityBio || ''}
                    onChange={(e) => setEditCommunityData({ ...editCommunityData, communityBio: e.target.value })}
                    placeholder="Bio"
                  />
                  <Button type="submit" variant="ghost">Update Community</Button>
                </form>
              </DialogContent>
            </Dialog>


            <AlertDialog>
              <AlertDialogTrigger className="bg-destructive p-3 rounded-lg">Delete</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the community from the servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDeleteCommunity((item._id))}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>
        </>
      )
    }
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
          <Tabs defaultValue="visualization">
            <TabsList className="w-full flex">
              <TabsTrigger className="w-full" value="visualization">Visualization</TabsTrigger>
              <TabsTrigger className="w-full" value="users">Users</TabsTrigger>
              <TabsTrigger className="w-full" value="posts">Posts</TabsTrigger>
              <TabsTrigger className="w-full" value="communities">Communities</TabsTrigger>
              <TabsTrigger className="w-full" value="userEngagement">User Engagement</TabsTrigger>
              <TabsTrigger className="w-full" value="communityActivity">Community Activity</TabsTrigger>
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
            <TabsContent value="userEngagement">
              <UserEngagement users={users} />
            </TabsContent>
            <TabsContent value="communityActivity">
              <CommunityActivity communities={communities} />
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
