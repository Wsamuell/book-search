const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models')
const { signToken } = require('../utils/auth')



const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')

                return userData
            }
            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { user, token };
        },

        saveBook: async (parent, { content }, context) => {
            if (context.user) {
                const saveBooks = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: content } },
                    { new: true }
                )
                return saveBooks;
            }
            throw new AuthenticationError('Must be logged in to add New book to list');

        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const removeBooks = await User.findOneAndUpdate(
                    // from user
                    { _id: context.user._id },
                    // book id to remove from user
                    { $pull: { saveBooks: { bookId: bookId } } },
                    { new: true }
                )
                return removeBooks;
            }
            throw new AuthenticationError('Must be logged in to remove book');

        }

    }
};

module.exports = resolvers