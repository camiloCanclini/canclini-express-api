# CANCLINI EXPRESS API

## How to start

First of all, we need to set up the app.

1. Download the repository
2. Once you have downloaded it, decompress it, and enter with a console command on the project directory created.
3. Once you are in the project directory `.../canclini-express-api` run the following command:
   ```git
   npm run install 
   ```
   This will install all the dependencies needed
4. Then you need to set up the `.env` file, so create it on the project directory and configure it. In the project directory you can see `enviroment.vars.template.env` file, it has the environment variables that we need to configure to start the application. Pay special attention on the `adminusername` and `adminpassword` variables, because this will be added and used to generate the admin api key.
5. Once you configured the environment variables, run the following command:
    ```git
    npm run build
    ```
    It will create the api key file where we will be storing the users info
6. If everything went well, you only need to run the application
   ```git
   npm run start
   ```
   or
   ```git
   npm run dev
   ```
   The last one will run the app with `nodemon`

## Postman Documentation (Requests)

[Postman Documentation](https://documenter.getpostman.com/view/25083767/2s9YJXYjdD)