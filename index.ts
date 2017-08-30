import * as express from 'express';
import * as path from "path";
import {Request, Response} from 'express';

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
