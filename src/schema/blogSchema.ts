import { Schema, model } from 'mongoose';

interface IBLog {
    // id: Types.ObjectId,
    title: string;
    content: string;
    image?: string;
}

const blogSchema = new Schema<IBLog>({
    title: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
    image: {
        required: false,
        type: String
    }
}, {
    timestamps: true
})


const Blog = model<IBLog>("blog", blogSchema);

export default Blog;