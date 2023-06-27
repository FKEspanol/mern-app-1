import mongoose, { Document, Schema, Model } from "mongoose";

// Define the User interface
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    fullName: string;
    bio?: string;
    profilePic?: string;
    posts: Array<Schema.Types.ObjectId | IPost>;
    followers: Array<Schema.Types.ObjectId | IUser>;
    following: Array<Schema.Types.ObjectId | IUser>;
    createdAt: Date;
    refreshToken: String;
}

// Define the Post interface
interface IPost extends Document {
    user: Schema.Types.ObjectId | IUser;
    caption?: string;
    image: string;
    likes: Array<Schema.Types.ObjectId | IUser>;
    comments: Array<IComment>;
    createdAt: Date;
}

// Define the Comment interface
interface IComment {
    user: Schema.Types.ObjectId | IUser;
    text: string;
    createdAt: Date;
}

// Define the User schema
const userSchema: Schema<IUser> = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },

    fullName: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },

    refreshToken: String,
});

// Define the Post schema
const postSchema: Schema<IPost> = new Schema<IPost>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    caption: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            text: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Define the User model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

// Define the Post model
const Post: Model<IPost> = mongoose.model<IPost>("Post", postSchema);

export { User, Post };
