import { connectToDB } from '@/lib/connectDB';
import User from '@/models/userModel';

export async function PUT(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();
    console.log('Request Body:', body);

    const { name, username, email, password, phoneNumber } = body;

    if (!email || !username) {
      return Response.json({ message: 'Email and username are required' }, { status: 400 });
    }

    const updateResult = await User.updateOne(
      { email },
      { $set: { name, userName: username, password, phoneNumber } }
    );

    console.log('Email:', email);
    console.log('Update Result:', updateResult);

    if (updateResult.modifiedCount === 0) {
      return Response.json({ message: 'User not found' }, { status: 404 });
    }

    return Response.json({ message: 'User updated successfully' }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}