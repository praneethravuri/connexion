"use client";
import React, { useState } from 'react';
import { Ellipsis } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Post, { IPostDocument } from '@/models/postModel';
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';

const PostSettings = ({ post }: { post: IPostDocument }) => {
    const { toast } = useToast();
    const [postData, setPostData] = useState<Partial<IPostDocument>>({
        id: post._id,
        title: post.title,
        contentImageURL: post.contentImageURL,
        contentText: post.contentText,
        community: post.community,
        userName: post.userName
    });

    const deletePost = async () => {
        try {
            const response = await fetch(`/api/post-api/delete?postId=${post._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            console.log('Post deleted successfully');
            toast({
                title: "Success!",
                description: "Your post has been deleted permanently."
            });
        } catch (error) {
            console.error('Error deleting post:', error);
            toast({
                title: "Error",
                description: "An error occurred while deleting your post."
            });
        }
    };

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const requestData = {
                postData: postData,
            };

            const response = await fetch(`/api/post-api/edit?postId=${post._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error("Failed to edit post");
            }

            const data = await response.json();

            if (data.message === "Post Updated") {
                toast({
                    title: "Success!",
                    description: "Your post has been updated.",
                });
            } else {
                console.log("Error updating the post");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <section>
            <div className="edit-delete-options hover:bg-neutral-900 p-1 rounded-lg">
                <Popover>
                    <PopoverTrigger>
                        <Ellipsis />
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="p-2 flex flex-col">
                            <div className="edit-button space-y-2 mb-1">
                                <Dialog>
                                    <DialogTrigger className='bg-accent w-full p-1 rounded-lg text-black'>Edit</DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit your post</DialogTitle>
                                            <DialogDescription>
                                                <DialogDescription>
                                                    <form className="pt-5 w-full space-y-5" onSubmit={handleEditSubmit}>
                                                        <div>
                                                            <Input
                                                                className="bg-neutral-950"
                                                                type="text"
                                                                id="title"
                                                                value={postData.title}
                                                                onChange={(e) => setPostData((prevPostData) => ({ ...prevPostData, title: e.target.value }))}
                                                                placeholder="Title"
                                                                name="title"
                                                            />
                                                        </div>
                                                        <div className="image-url-input">
                                                            <Input
                                                                className="bg-neutral-950"
                                                                value={postData.contentImageURL}
                                                                type="text"
                                                                id="imageUrl"
                                                                onChange={(e) => setPostData((prevPostData) => ({ ...prevPostData, contentImageURL: e.target.value }))}
                                                                placeholder="Enter Image URL"
                                                            />
                                                        </div>

                                                        <div className="flex items-center justify-center gap-2">
                                                            <div className="flex-1 h-0.5 bg-zinc-800"></div>
                                                            <p className="px-2 text-zinc-800">Or</p>
                                                            <div className="flex-1 h-0.5 bg-zinc-800"></div>
                                                        </div>
                                                        <div className="text-area-input">
                                                            <Textarea
                                                                className="bg-neutral-950"
                                                                value={postData.contentText}
                                                                rows={10}
                                                                onChange={(e) => setPostData((prevPostData) => ({ ...prevPostData, contentText: e.target.value }))}
                                                                placeholder="Enter Text"
                                                            />
                                                        </div>
                                                        <Button variant="ghost" type="submit">
                                                            Update Post
                                                        </Button>
                                                    </form>
                                                </DialogDescription>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>

                            </div>
                            <div className="delete-button">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive">Delete</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your post.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={deletePost}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </section>
    );
};

export default PostSettings;