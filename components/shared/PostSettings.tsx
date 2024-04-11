import React from 'react';
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

const PostSettings = ({ postId }: { postId: string }) => {
    const { toast } = useToast();
    const deletePost = async () => {
        try {
            const response = await fetch(`/api/delete-post?postId=${postId}`, {
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

    return (
        <section>
            <div className="edit-delete-options hover:bg-neutral-900 p-1 rounded-lg">
                <Popover>
                    <PopoverTrigger>
                        <Ellipsis />
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="p-2 flex flex-col">
                            <div className="edit-button">
                                <Button
                                    className='w-full'
                                    variant="ghost"
                                    onClick={() => console.log(`Editing post ${postId}`)}
                                >
                                    Edit
                                </Button>
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