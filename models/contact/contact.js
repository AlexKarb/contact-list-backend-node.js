const { model, Schema } = require('mongoose');

const contactSchema = Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 20,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false },
);

const Contact = model('contact', contactSchema);

module.exports = Contact;
