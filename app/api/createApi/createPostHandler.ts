import Post from "@/models/postModel";
import { connectToDB } from "@/lib/connectDB";

export async function postHandler(formData: any) {

    console.log("Handler post data: ", formData);

  try {
    await connectToDB();
    const newPost = await Post.create(formData);
    return { message: "Post Created", newPost };
  } catch (err) {
    console.error(err);
    return { message: "Error creating post", err };
  }
}