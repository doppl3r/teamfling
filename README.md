# TeamFling
Quickly build your team for your next hackathon

#### What it does
TeamFling allows hackers to quickly form teams based on common interests or needs. Learning a new skill has never been easier!

#### Installation
- Download MongoDB [link](https://www.mongodb.org/downloads#production) - Recommended 2008R2Pluss SSL (64 bit)
- Install MongoDB
- Create a mongo database directory somewhere, ex: `C:\mongo-data\db`
- Download node.js [link](https://nodejs.org/en/download/) - Recommend LTS Installer
- Install node.js
- Open cmd and enter `npm install` from github directory that you clone.
- **For windows users**: *Add to Environment Variables* - Go to Control Panel > System & Security > System > Advanced System Settings > Environment Variables > navigate to the Path variable hit Edit and add ;C:\mongodb to the Path (or whatever the directory name is where MongoDB is located (the semi-colon delimits each directory)

#### Getting Started
- Open cmd and set the directory to MongoDB install path. ex: `cd C:\Program Files\MongoDB\Server\3.2\bin`
- In the `bin` directory, enter on cmd line `mongod --dbpath=C:\mongo-data\db` <use your own path>
- Keep your current cmd open and open a new cmd
- Set your directory to the working project directory. ex: `E:\Personal\Programming\HackArizona\teamfling`
- Enter `npm start` - (press `ctrl + c` to end)
- In your browser, open `https://localhost:3000`
