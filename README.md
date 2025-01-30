# Lyraquist-Web

Lyraquist is the one-stop WEBSITE to learn language through the universal language of music. Using their Spotify Premium credentials, users can look up songs and read the lyrics in released language and native language translations while playing the song straight from the website. The user can also save words from song lyrics into personal workbooks for all their language-learning desires. To learn more about the site, [click here](https://github.com/SCCapstone/Lyraquist/wiki/Project-Description).

## External Requirements

To build this project you first have to install:

## Same as Lyraquist-App

### Node.js and npm

You will need to install Node.js and npm on your computer and you can check to see if
it is installed with the following command (and the version number should
appear): `node -v npm -v`

- [Node.js](https://nodejs.org/en/)
- npm - type the following command into the terminal: `npm install -g npm`

### Firebase Realtime Database

This will serve as our database. Click [here](https://firebase.google.com/) to get started, all you need is your Gmail account. In the case of this project, all collaborators were added to a database project.
When making an account via the app, your password must be more than 6+ digits long.

### Gradle

Gradle automates Android Builds and is required for Android Emulator. You can use Chocolatey (for Windows) or Homebrew (for Mac) to install Gradle quickly. Follow this [link](https://dzone.com/articles/getting-started-with-gradle-on-macos-a-step-by-ste) for installing homebrew and gradle or use this [link](https://chocolatey.org/install#individual) to install Chocolatey on Windows. Following the installation of Chocolatey, you can run `choco install gradle`.

## New in Lyraquist-Web

### Vite
Vite is a framework for ReactJS (just as Expo is for React Native). Think of it as a container for running this project. There is no need to download anything; vite is already in the project!

#### Environment Variables
Vite uses its own environment variable system. Variables are defined in an .env file and each variable is prefixed with "VITE_" so that the software can read the variables properly. Elsewhere in the project, these values can be referenced by:
`import.meta.env.VITE_YOUR_VAR_NAME_HERE`
Message @vivianfromsouza for the .env file

### Supabase
Supabase is our new database. We are still using Firebase for authentication (it's just easier), but using Supabase for everything else. Unlike Firebase, Supabase is SQL and relational, which makes more sense for our site's data. 
Check out the "ReaderWriter" files in /services for sample Supabase queries. 

Message @vivianfromsouza to get an invite to the database (if needed). 


## Setup

First, clone this repo locally using the following command: <br>
`https://github.com/vivianfromsouza/lyraquist-web.git`

This app uses the npm package manager to handle React dependencies. To install the required dependencies, use the following command:
`npm install`

Install the latest EAS CLI. You will need this for app deployment. <br>
`npm install -g eas-cli`

## To Run
`npm run dev`
Should run on localhost:5173

# Deployment

TBA

# Testing

TBA

## Testing Technology

TBA

## Running Tests

TBA

# Authors

Siri Avula savula@email.sc.edu
Vivian D'Souza vdsouza@email.sc.edu
Ashley Bickham bickhaml@email.sc.edu
Mahi Patel mahi@email.sc.edu
Tanvi Singh ts28@email.sc.edu
