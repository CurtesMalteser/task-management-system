import express from 'express';
import cors from 'cors';
import routes from './routes/tasks';

const app = express();
const port = 5001; // default port to listen, setting to 5001 to avoid conflict with 3000 default React and 5000 already used by the Mac OS

app.use(cors());

app.use(express.json());

app.use('/api', routes)

// Start the server
app.listen(port, () => {
    console.log(`Server starter listening at http://localhost:${port}`)
});