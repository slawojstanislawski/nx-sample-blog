import {Schema} from 'mongoose';

export const PostSchema: Schema = new Schema(
  {
    title: {type: String, required: true},
    content: {type: String, required: true}
  },
  {timestamps: true}
);

// Ensures the virtual fields are serialised.
PostSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});
