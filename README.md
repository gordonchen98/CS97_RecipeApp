
## Recipe App for COM SCI 97 Final Project

This is a full stack MERN project.  
The frontend was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and [Material-UI](https://github.com/mui-org/material-ui).  
The backend is created with [Node.js](https://github.com/nodejs/node) and [MongoDB](https://github.com/mongodb/mongo).  
  
Before running the backend, we need to update the config file in the backend.  
It is located in /api/config/config.env.  
Please make according changes to the file to connect your own database and google_oauth20 client_id/secret:  

    MONGO_URI = xxxxxx
    GOOGLE_CLIENT_ID = xxxxxxx
    GOOGLE_CLIENT_SECRET = xxxxxxxx

To run api (backend of the project):  

    cd api  
    npm i  
    npm run dev  

To run client (frontend of the project):  
  
    cd client  
    npm i  
    npm run start  

The project should be located at [localhost](http://localhost:3000/).

## Things of Note

- feel free to fork and adjust to your needs/wants

(3/2/2021 by Zhenrong Sun): update a detail page and Like/Dislike feature for the detail page, later will working on merageing our database and frontend app.

(2/19/2021 by Zhenrong Sun): Search component using React, right now since we still working on our own database, all the fetched data will be used on the example database "Edaman" API. After we deploy our own database, test it later. 

