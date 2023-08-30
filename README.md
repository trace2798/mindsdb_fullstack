## MindsDB Next.js App Router Integration.

### What motivated me to select this project for submission?

Prior to participating in the hackathon, I had no experience with MindDB. However, by developing this application, I was able to gain valuable knowledge in creating and managing databases and models using the cloud console, as well as integrating MindsDB with a framework using the “mindsdb-js-sdk”. This project provided me with an opportunity to expand my skill set and explore new technologies.

### This repo is for my submission for the MindsDB HackerMinds AI App Challenge which took place from July 1 - August 31, 2023

## Getting Started

### Either fork the repo or directly clone it

### Prerequisites

**Node version 16.8 or later  
**macOS, Windows (including WSL), and Linux are supported.
\*\*Accounts to get the .env values as mentioned below and in the .env.example

### To directly clone the repo

```shell
git clone https://github.com/trace2798/mindsdb_fullstack.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```ts
MINDSDB_EMAIL=''
MINDSDB_PASSWORD=''

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
# I have used Planetscale for DB
DATABASE_URL=
```

<b>Disclamer:</b> Recently, when I named my env file as .env.local I ran into some problems with prisma so if you face similar problem just name is as .env and do not forget to add it to your .gitignore. After adding .env to your gitignore and if the .env file is getting pushed with your commit then check this [link out](https://stackoverflow.com/questions/74340379/gitignore-not-working-my-environment-variables-are-being-pushed-to-my-repo-whe)

## For this application to work in your local environment, you will need the following:

- MindsDB account
- A database URL, for my application I am using PlanetScale
- Clerk key for authentication.

You can check the .env.example for all the values required.

## After setting up the accounts and keys you will need to create Model and Projects in MindsDB's console.

Here is an explanation of how to create a model and project to make the generate image route in the application work.

- After creating the MindsDB account, go to their cloud console and run the following command:

```
CREATE DATABASE images_generation;
```

After the query has been successfully queried you will see the database on the right side of the screen.

![image](https://github.com/trace2798/mindsdb_fullstack/assets/113078518/8b78eb5d-8fd0-460c-aa55-35c469b2e7c4)

- Now we will need to create the Model, in your console type the following and hit run:

```
//here "image_generation" is the name of the database we created above and "dalle_real_natural" is the name of the model. This model uses Dalle-E from openai
 CREATE MODEL images_generation.dalle_real_natural
 PREDICT img_url
 USING
    engine = 'openai',
    mode = 'image',
    prompt_template = '{{text}}, 8K | ultra realistic image |  natural lighting | natural colors with a bit of saturation';
```

### Verification that our model has been successfully created:

On the right side of our, if you click on the database you created, you should see the model inside "models".

![image](https://github.com/trace2798/mindsdb_fullstack/assets/113078518/c3d7a5c4-efa5-4b8c-8371-e9fe6b4e8460)

## Connecting it with frontend

- For my submission, I am using Next.js 13.4.13 with app directory.
- For the application to communicate with MindsDB, we will be using the "mindsdb-js-sdk"
- If you cloned the repo, you will now need to add the value for the following in your .env file

```
MINDSDB_EMAIL='YOUR_MINDSB_ACCOUNT_EMAIL'
MINDSDB_PASSWORD='YOUR_MINDSB_ACCOUNT_PASSWORD'
```

### Understanding the code for the API to generate images

- In this code first we check if the user is authenticated, then connect with MindsbDB with "await connect()" after successful connection we make the request to the model we created.
- The model I created is "dalle_real_natural" and the database is called "images_generation". If you used different names you have to use those name for the code to work.

```
import { NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";
import connect from "@/lib/connect-mind";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

interface ResponseData {
  img_url: string;
  text: string;
}

export async function POST(
  req: Request,
  { params }: { params: { clientId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { text } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.clientId) {
      return new NextResponse("User id is required", { status: 400 });
    }
    await connect();
    const model = await MindsDB.Models.getModel(
      "dalle_real_natural",
      "images_generation"
    );
    const queryOptions = {
      where: [`text = "${text}"`],
    };
    const response = await model?.query(queryOptions);
    const data = response?.data as ResponseData;

    await prismadb.image.create({
      data: { clientId: params.clientId, text: text, image_url: data.img_url },
    });
    return NextResponse.json(response?.data);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

```

- From the frontend, after a user submit's his or her or their request for image, the above API is called and an image is generated
- Here is the code for await connect() which can be found inside lib --> connect-mind.ts

```
import MindsDB from "mindsdb-js-sdk";

const connect = async () => {
  try {
    await MindsDB.connect({
      user: process.env.MINDSDB_EMAIL!,
      password: process.env.MINDSDB_PASSWORD!,
    });

    return // console.log("Connected to MindsDB");
  } catch (error: any) {
    return error;
  }
};

export default connect;
```

I have followed a similar pattern to create DATABASE and Models as explained above for the other routes in the application.

Once you have all the values for .env you can start the app and continue experimenting.

I have added a notes.md file in the root of the project where I have mentioned about some other commands and prompts I have used to create other models.

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
| `build` | To build your application                |
| `start` | Starts a production instance of the app  |

"postinstall": "prisma generate" is required if you want to deploy your site.

### Current Deployed Link: [MindsDB Next.js Integration](https://mindsdb-nextjs-integration.up.railway.app/)

I am on the trial plan for Railway so this link might get not work later but during submission it is working. Since the link might not work I have added a youtube demo link below.

### Youtube Demo Link: [MindsDB Next.js Integration](https://youtu.be/eBdy57ul2oQ)

### Limits:

To prevent the abuse of MindsDB’s free tier, limits have been imposed on the number of generations a user can have. Each user is initially given 1000 tokens, and the number of tokens used is counted based on their usage. For instance, generating an image costs 4 tokens, so after generating one image, a user will have (1000-4) tokens remaining. You can find more information about this in the "api-limit.tsx" file located in the lib folder.

### Additional command that can be used in MindsDB cloud console

#### To drop a Database
```
DROP DATABASE DATABASE_NAME
```

#### To drop a Project
```
DROP MODEL MODEL_NAME
```