import mongoose from 'mongoose';
import UserSchema from '../schema/user.schema';

const staticFunc = {
  findById: function (_id)  {
    return this.findOne({ _id: _id }).exec();
  },

  strictFindById: function (_id) {
    return this.findOne({ _id: _id }).exec()
      .then((existingUser) => {
        if (existingUser) {
          return existingUser;
        }

        throw new Error(userCallback.ERR_USER_NOT_FOUND);
      });
  },

  findByEmail: function (email) {
    return this.findOne({ email: email }).exec();
  },

  strictFindByEmail: function (email) {
    return this.findOne({ email: email }).exec()
      .then((existingUser) => {
        if (existingUser) {
          return existingUser;
        }

        throw new Error(userCallback.ERR_USER_NOT_FOUND);
      });
  },

  updateById: function (_id, options) {
    return this.update({ _id: _id }, {
      $set: options,
    }).exec();
  },
};

//set up mockup data
//UserModel.remove().then(() => {
//  const users = [];
//  for (let i = 0; i < 100000; i++) {
//    User.create(new User({
//      name: `UserType22${i}`,
//      password: `secretrererer`,
//      email: `lyw22${i}@naver.com`,
//      phone: '+821062348149',
//      point: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 180],
//      createdAt: new Date(),
//      friends: users.map((i) => i._id),
//    })).catch((err)=> {
//      console.log(err);
//    });
//
//  }
//
//});

UserSchema.statics = staticFunc;

export default  mongoose.model('User', UserSchema);
