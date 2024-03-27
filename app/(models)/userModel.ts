import mongoose, { Document, Model } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    userName: string;
}

export interface IUserDocument extends IUser, Document {
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    userName : {
        type: String,
        required: true,
        unique: true
    }
},
    {
        timestamps: true
    })


const User: Model<IUserDocument> = mongoose.models?.User || mongoose.model("User", userSchema)

export default User