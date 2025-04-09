# AudioPlayer

External library `audioplayer5` is used.

## Demo

### Live Link
[website](https://musicplayer-13c80acff928.herokuapp.com/)
The App is currently hosted on Heroku

### Overview

The app comes with a few songs, and to make changes, you need admin access. For testing, every user is automatically an admin. To add music, go to the user profile and click on the dashboard; you can add songs here.

![mainPage](./mainPage.png)

![addingSong](./addingSong.png)


## Tech stacks

1. Using React with Tailwind for the CSS
2. Created Firebase account for storage of songs
3. Used Node.js and Express.js for the links API
4. MongoDB is used for storing the data
5. Using Framer Motion for CSS animation


## Process to run

### Prerequisites

- Node.js installed
- MongoDB instance running
- Firebase account and service account key

### Steps

1. **Clone the repository:**

    ```sh
    git clone https://github.com/harpreet1o/AudioPlayer.git
    cd AudioPlayer
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Set up the environment variables:**

    - Create a `.env` file in the root directory of the project.
    - Add the following environment variables to the `.env` file:

    ```env
    MONGODB_PASSWORD=your_mongodb_password
    SERVICE_ACCOUNT_KEY={"type": "service_account", "project_id": "your_project_id", "private_key_id": "your_private_key_id", "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n", "client_email": "your_client_email", "client_id": "your_client_id", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your_client_email"}
    ```

4. **Run the server:**

    ```sh
    cd server
    npm run dev
    ```

5. **Run the React application:**

    ```sh
    cd client
    npm run dev
    ```

Now, your application should be running with the necessary environment variables set up.
