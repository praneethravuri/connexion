import mongoose, { Document, Model } from 'mongoose';

export interface ICommunity {
    communityName: string;
    communityImage: string;
    communityBio: string;
    communityMembers?: number;
}

export interface ICommunityDocument extends ICommunity, Document {
    createdAt: Date;
    updatedAt: Date;
}

const communitySchema = new mongoose.Schema<ICommunityDocument>({
    communityName: {
        type: String,
        required: true
    },
    communityImage: {
        type: String,
        required: true
    },
    communityBio : {
        type:String,
        required:true
    },
    communityMembers : {
        type: Number,
    }
},{
    timestamps: true
})

const Community: Model<ICommunityDocument> = mongoose.models?.Community || mongoose.model("Community", communitySchema)

export default Community