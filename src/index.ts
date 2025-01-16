import express from 'express';
import bodyParser from 'body-parser';
import jobRoutes from './routes/jobRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/jobs', jobRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
