import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from'body-parser';
import UserRoutes from './routes/user.route'
import CatRoutes from './routes/cat.route'
import ColonyRoutes from './routes/colony.route'
import FormRoutes from './routes/form.route'
import ObjectRoutes from './routes/object.route'
import PostRoutes from './routes/post.route'
import RequestRoutes from './routes/request.route'
import TaskRoutes from './routes/task.route'
import helmet from "helmet";


var app= express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser.json());


app.use('/users', UserRoutes);
app.use('/cats', CatRoutes);
app.use('/colonies', ColonyRoutes);
app.use('/forms', FormRoutes);
app.use('/objects', ObjectRoutes);
app.use('/posts', PostRoutes);
app.use('/requests', RequestRoutes);
app.use('/tasks', TaskRoutes);




export default app;