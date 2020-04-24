import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

import {IUser} from '@blog/shared/users/data-access';
import {ConfigService} from '@blog/shared/config';

export function userSchemaFactory(configService: ConfigService) {
  const UserSchema = new mongoose.Schema<IUser>({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });

  // Ensures the virtual fields are serialised.
  UserSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  });

  UserSchema.pre('save', function(next) {
    const user: any = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(configService.get('BCRYPT_SALT_ROUNDS'), function(
      err,
      salt
    ) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(error, hash) {
        if (error) return next(error);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  });

  return UserSchema;
}
