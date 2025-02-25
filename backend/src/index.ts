import express, { urlencoded, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan";

// Route Imports

dotenv.config()

const app = express();

app.use(express.json({}));
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use(morgan('common'));

app.use(urlencoded({ extended: false }));
app.use(cors());





app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})