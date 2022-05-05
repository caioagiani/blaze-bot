import { connect } from 'mongoose';

connect(process.env.MONGO || 'mongodb://127.0.0.1:27017/bot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('DATABASE: ON');
});

export default connect;
