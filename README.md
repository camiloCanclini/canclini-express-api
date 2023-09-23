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

## Postman Documentation

[Postman Documentation](https://warped-satellite-722241.postman.co/workspace/My-Workspace~3f4cf9bb-70a9-415c-8d23-c04017c5e8d9/api/b3af2e90-7c7d-4037-8602-909b36553313?action=share&creator=25083767&active-environment=25083767-5292cd01-7760-4e4f-a6c1-ea635f000679)

[Postman Collection Documentation](https://warped-satellite-722241.postman.co/workspace/3f4cf9bb-70a9-415c-8d23-c04017c5e8d9/api/b3af2e90-7c7d-4037-8602-909b36553313/documentation/25083767-40ba9200-3009-4905-99a3-e87d35708e69?branch=main)