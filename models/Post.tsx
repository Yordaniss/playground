import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: {
        /* The main title from post */

    type: String,
    required: [true, 'Please provide a title for the post.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  text: {
    /* The main text from post */

    type: String,
  },
  main_category: {
    /* The main category for game */

    type: Number,
  },
  age_category: {
    /* The age category */

    type: Number,
  },
  components: {
    /* The components for game */

    type: Array
  },
  fileId: {
    /* The id from related file */

    type: Number
  }
})

export default mongoose.models.Post || mongoose.model("Post", PostSchema, "posts")