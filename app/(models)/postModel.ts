import mongoose, { Document, Model } from 'mongoose';

export interface IPost {
    title: string;
    content: string;
    community: string;
    userName: string;
    contentType: string;
    contentText?:string;
    contentImageURL?:string;
}

export interface IPostDocument extends IPost, Document {
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new mongoose.Schema<IPostDocument>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    community: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    contentType : {
        type: String,
        required: true
    },
    contentText : {
        type:String
    },
    contentImageURL:{
        type:String
    }
},
    {
        timestamps: true
    })

const Post: Model<IPostDocument> = mongoose.models?.Post || mongoose.model("Post", postSchema);

export default Post