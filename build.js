import path from "path";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import {env, cwd} from "process";
import fs from "fs";

config()

bcrypt.hash(env.ADMINUSERNAME + env.ADMINPASS, 2, function(err, hash) {

  if (err) {
    console.error("There was an error trying to encrypt the email and password of the administrator");
    return;
  }

  const jsonFile = {
    [env.ADMINUSERNAME]: {
      apiKey: hash,
      pass: env.ADMINPASS
    }
  }

  fs.access(path.resolve(path.join(cwd(), env.APIKEYFILENAME)), fs.constants.F_OK, (err) => {
    
    if (err) {
      console.warn("The file doesn't exists, creating it...")
      return;
    }

    // El archivo existe, intenta eliminarlo
    fs.unlink(path.resolve(path.join(cwd(), env.APIKEYFILENAME)), (unlinkErr) => {

      if (unlinkErr) {
        console.error('Error trying to delete the existing api key file', unlinkErr);
        return;
      }
      console.info("Removing existing api key file...")
      
    })
  })

  // eslint-disable-next-line no-undef
  fs.writeFile(
    path.resolve(path.join(cwd(), env.APIKEYFILENAME)),
    JSON.stringify(jsonFile),
    'utf8',
    (writeErr) => {
      if (writeErr) {
        console.error("Error Trying to registering the admin")
      }
      console.log("Api key file created successfully")
      console.log("App seted up correctly!")
    });
});