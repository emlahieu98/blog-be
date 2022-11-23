const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PostSchema = new mongoose.Schema(
    {
        title: { type: String, default: '' },
        slug: { type: String, default: '' },
        content: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            default:
                'https://cdn2.iconfinder.com/data/icons/files-lineal/64/file-blank-empty-default-512.png',
        },
        viewCount: { type: Number, default: 0 },
        user_name: { type: String, default: 'emlahieu' },
    },
    {
        timestamps: true,
    }
)

PostSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('posts', PostSchema)
