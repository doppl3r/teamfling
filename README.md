# TeamFling
Quickly build your team for your next hackathon

#### What it does
TeamFling allows hackers to quickly form teams based on common interests or needs. Learning a new skill has never been easier!

#### Installation
- Download MongoDB [link](https://www.mongodb.org/downloads#production) - Recommended 2008R2Pluss SSL (64 bit)
- Install MongoDB
- Create a new folder for later - this is where your database will live ex: `C:\mongo-data\db`
- Download node.js [link](https://nodejs.org/en/download/) - Recommend LTS Installer
- Install node.js after downloading
- Create a new project folder and clone TeamFling using `Git Bash`. ex: `git clone -b mongoose-dev https://github.com/doppl3r/teamfling.git`
- Open cmd and and set the current directory to the newly cloned root-folder & enter `npm install`
- **For windows users with issues**: *Add to Environment Variables* - Go to Control Panel > System & Security > System > Advanced System Settings > Environment Variables > navigate to the Path variable hit Edit and add ;C:\mongodb to the Path (or whatever the directory name is where MongoDB is located (the semi-colon delimits each directory)

#### Getting a Server Started
- Open cmd and set the directory to MongoDB install path. ex: `cd C:\Program Files\MongoDB\Server\3.2\bin`
- In the `bin` directory, enter on cmd line `mongod --dbpath=C:\mongo-data\db` (use your database directory after the `=` symbol)
- Keep your current cmd open and launch a new cmd
- Set your directory to the project directory. ex: `E:\Personal\Programming\HackArizona\teamfling`
- Enter `npm start` - (press `ctrl + c` to end)
- In your browser, open `https://localhost:3000`
