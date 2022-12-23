# Note App

This is a web-based note taking app with features including authentication, the ability to create and manage boards, sections, and tasks, the ability to mark tasks as favorites, and the ability to drag and drop tasks between sections and boards.

<img width="1440" alt="Screen Shot 2022-12-23 at 9 29 43 PM" src="https://user-images.githubusercontent.com/58856636/209352051-5659baca-952a-4c17-8f17-3790598e27f1.png">


## Prerequisites

- Node.js

## Installation

1. Clone the repository and navigate to the project directory:

```
git clone https://github.com/lecongly/note-app.git
cd note-app
```


2. Navigate to the `client` directory:

```
cd client
```

3. Install the dependencies:

```
npm install
```

4. Start the client:

```
npm start
```

The client should now be running on [http://localhost:3000](http://localhost:3000/).

To run the server, follow these steps:

1. Navigate to the `server` directory:

```
cd server
```

2. Install the dependencies:

```
npm install
```

3. Start the server:

```
npm start
```

The server should now be running on [http://localhost:5000](http://localhost:5000/).



Note: You will need to set up a separate `.env` file for the server and client.

## Usage

- To create a new board, click on the "Create Board" button in the left sidebar of the dashboard.
- To create a new section or task, click on the "Add Section" buttons or "Add Task" buttons on Section in a board detail page.
- To mark a board as a favorite, click on the star icon in the board detail page.
- To move a task to a different section , click and hold on the task, then drag it to the desired location.

## Contributing

If you want to contribute to the project, please follow these guidelines:

- Use the `develop` branch for ongoing work.
- Create a new branch for each feature or bug fix.
- Follow the project's coding style and conventions.
- Test your code thoroughly before submitting a pull request.

## Author

[Le Cong Ly](https://github.com/lecongly)

