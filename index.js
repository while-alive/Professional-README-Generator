// TODO : // TRY NOT TO PASS THE WHOLE RESPONSE 

// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateReadme = require('./utils/generateMarkdown.js');

// Figure out how to allow the user to select pictures 
// from the asset/images folder and use them as a preview
const prompts = [
    {
        type: "input",
        name: "title",
        message: "Enter the title of your project: ",
        default: '',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('You need to enter a project name!');
                return false;
            }
        }
    },
    {
        type: "input",
        name: "description",
        message: "Describe your project: ",
        default: '',
    },
    {
        type: "input",
        name: "installation",
        message: "What are the steps required to install your project: ",
        default: '',
    },
    {
        type: "input",
        name: "usage",
        message: "Provide instructions and examples for use. ADD LINK TO SCREENSHOT?", // add a screenshot
        default: '',
    },
    {
        type: "input",
        name: "contributing",
        message: "List your collaborators, if any, with links to their GitHub profiles.",
        default: '',
    },
    {
        type: "input",
        name: "tests",
        message: "Link test files.", //Go the extra mile and write tests for your application. Then provide examples on how to run them.
        default: '',
    },
    {
        type: "confirm",
        name: "license",
        message: "Does your GitHub apppliation have a license? *ReadMe Generator will find it", // Wanted as a badge at the top "
        default: false,
        // does it work like that???
        // choices: ['MIT', 'ISC', 'Apache'],
    },
    // {
    //     type: "input",
    //     name: "badges",
    //     message: "",
    //     default: "",
    //     // choices: "",
    //     // validate: "",
    //     // when: ""
    // },
    // {
    //     type: "input",
    //     name: "features",
    //     message: "",
    //     default: "",
    //     // choices: "",
    //     // validate: "",
    //     // when: ""
    // },
    // {
    //     type: "input",
    //     name: "contributors",
    //     message: "",
    //     default: "",
    //     // choices: "",
    //     // validate: "",
    //     // when: ""
    // },
    {
        type: "input",
        name: "github",
        message: "Enter your GitHub username: ",
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('You need to enter your GitHub username!');
                return false;
            }
        }
    },
    {
        type: "input",
        name: "repo",
        message: "Enter your GitHub repo name: ",
        default: '',
        validate: repoInput => {
            if (repoInput) {
                return true;
            } else {
                console.log('You need to enter your GitHub repo name!');
                return false;
            }
        }
    },
    {
        type: "input",
        name: "email",
        message: "Enter your email: ",
        default: '',
    },
]
const promptUser = async () => {
    let dataObject = {};
    for (let i = 0; i < prompts.length; i++) {
        await inquirer.prompt(
            prompts[i]
        ).then(data => {
            if (data[prompts[i].name]) { // if the prompt was answered
                dataObject[prompts[i].name] = data[prompts[i].name];
            }
        })
    }
    return dataObject;
};

// include a ToC if (sections > 2) or something 
// TODO: Create a function to write README file
const writeToFile = data => {
    let markdown = generateReadme(data);
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/readme.md', markdown, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
}

// TODO: Create a function to initialize app
const init = () => {
    return promptUser();
}

const failureCallback = (err) => {
    console.log(`Error : ${err}`);
}

// Function call to initialize app
init()
    .then(data => { writeToFile(data) }, failureCallback)

// https://github.com/coding-boot-camp/potential-enigma/blob/main/readme-guide.md

// TODO:
// Because this application won’t be deployed, 
// you’ll also need to provide a link to a walkthrough 
// video that demonstrates its functionality. 
// Revisit 2.2.4: Screencastify Tutorial in Module 2 
// of the prework as a refresher on how to record video 
// from your computer. You’ll need to submit a link to 
// the video and add it to the README of your project.