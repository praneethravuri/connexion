import { connectToDB } from "@/lib/connectDB";
import User from "@/models/userModel";

export async function PUT(req: Request) {
    try {
      await connectToDB();
  
      const { name, username, email, password, phoneNumber } = await req.json();
  
      if (!email) {
        return Response.json({ message: 'Email is required' }, { status: 400 });
      }
  
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { name, userName: username, password, phoneNumber },
        { new: true }
      );
  
      if (!updatedUser) {
        return Response.json({ message: 'User not found' }, { status: 404 });
      }
  
      return Response.json({ message: 'User updated successfully' }, { status: 200 });
    } catch (err) {
      console.error(err);
      return Response.json({ message: 'Server error' }, { status: 500 });
    }
  }