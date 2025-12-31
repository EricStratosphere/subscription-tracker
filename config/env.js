//config from dotenv

import {config} from 'dotenv'; 


//the config method takes the .env file path as an arguemnt, parses it and sets environment vars defined in that file in process.env.

//Environment variables are variables that define the configuration of the environment of your application or codebase or even operating system.

//process.env is the object storing the environment variables inside your applications process itself. It currently starts off having no access to the variables in your environment variable and has to be added manually or via config function.

//Note that your environment variables are gitignored so other developers won't be able to access them if they get access to your repo.

// a workaround for this is to store that information into your process.env, that way, other trusted developers can access process.env without being able to directly access the .env file itself.

//config file first checks if process.env.NODE_ENV has already been declared in your local variable.

//if it hasn't, then the config function adds those keys into the global process.env object.
config({path : `.env.${process.env.NODE_ENV || 'development'}.local`});
//the config function is what sets the configurations for the process.env object.

//process.env is a global javascript object in node js that holds user defined environment variables

//The process.env property is where environment variables reside. It’s a JavaScript object with key-value pairs for example:

//const apiKey = process.env.API_KEY;


//for more details about what a .env file is: Look here

//https://www.reddit.com/r/node/comments/6cz4jw/having_trouble_understanding_the_benefits_and

//and https://stackoverflow.com/questions/65848714/what-does-requiredotenv-config-do
export const { PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN, ARCJET_ENV, ARCJET_KEY } = process.env; 