# Video Streaming Application

## Overview

This project is a video streaming application that allows users to upload, view, and manage videos. The application includes features such as user authentication, video playback, view count tracking, and more.

## Features

- **User Authentication**: Login and registration system.
- **Video Upload**: Users can upload videos with thumbnails.
- **Video Playback**: Stream videos with a custom player.
- **View Count**: Automatically increment view count when a video starts playing.
- **Private and Public Videos**: Set video visibility to public or private.
## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, [Plyr.js](https://plyr.io/), [FilePond](https://pqina.nl/filepond/)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Others**: Node-Cron, Vite
  
- ## Prerequisites

1. **MongoDB**:
   - Download and install MongoDB from the [official website](https://www.mongodb.com/try/download/community).
   - Follow the installation instructions for your operating system.

2. **MongoDB Compass**:
   - Download and install MongoDB Compass from the [official website](https://www.mongodb.com/try/download/compass).
   - MongoDB Compass is a graphical user interface for MongoDB, which makes it easier to manage your databases.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Khemu1/Code-Clause-Internship-Video-Streaming-Application
    cd video-streaming-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```
    
3. **Start the development server**:
    ```bash
    npm run dev
    ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:5173`.

## Usage

- **Upload Videos**: Navigate to the upload page and fill in the required details.
- **View Videos**: Browse the home page to see public videos. Private videos are only accessible to the uploader.
- **Increment View Count**: The view count increases automatically when a video starts playing.

## Clean Up Temporary Files

The application includes a cron job to clean up temporary files every hour. The function `cleanUpTempFiles` in `utils.js` handles this task.

## Deployment

To deploy the application, make sure to set up your environment variables and choose a suitable hosting platform. You can use platforms like Heroku, Vercel, or AWS.

## Contributions

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/video-streaming-app/issues) to contribute.

## Acknowledgements

- [Plyr.js](https://plyr.io/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
