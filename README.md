# Real Estate Manager

A full-stack real estate management application that allows users to view, save, and manage property listings. Built using **Node.js, Express, React, and MongoDB**.

## Features
- User authentication (Login/Register)
- Property Post Management (Create, Read, Update, Delete)
- User Profile Management (Update user profile, reset password via email with link)
- Save and unsave properties
- Contact property agents (via email)
- Responsive UI applied to the view
- Secure API with JWT authentication (Create, Update, and Delete of Property Posts and Save / Unsave posts)

## Project Management by JIRA
- The Link to Jira Scrum board for Real Estate Manager App : https://connect-team-nsm96osm.atlassian.net/jira/software/projects/REMS/summary 

## Tech Stack
### Frontend:
- React.js
- React Router
- Tailwind CSS
- Axios (for API requests)

### Backend:
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT) for authentication
- nodemailer (email generation)

## Installation
### Prerequisites:
- **Node.js** (v22)
- **MongoDB** (Local or Atlas Cloud)

### Development Side Steps:
```sh
# Clone the repository
git clone https://github.com/your-username/real-estate-manager.git
cd real-estate-manager
git remote remove origin #unlink with my origin remote repository
git remote add origin "your git repository url" 

# Install dependencies for both frontend and backend
cd frontend && npm install   # Install frontend dependencies
cd ../backend && npm install # Install backend dependencies

# Set up environment variables
# Create a .env file in the backend directory and configure:
echo "MONGO_URI=[your_mongo_connection_string]" >> backend/.env
echo "JWT_SECRET=[your_jwt_secret]" >> backend/.env
echo "ADMIN_EMAIL=[your gmail address after 2 steps authentication setting enabled]" >> backend/.env
echo "ADMIN_EMAIL_PASS=[your gmail app password credentials]" >> backend/.env
echo "PORT"=["port of your choice, default: 5001"] >> backend/.env

# concurrently start both frontend and backend
cd .. npm run dev

```

### CI/CD Pipeline Details

### Continuous Deployment (CI/CD)
This project uses **GitHub Actions** to automate testing and deployment to an **AWS EC2 instance**.  
Whenever code is pushed to the `master` branch: 
- The project is tested & built. 
- The latest code is pulled, dependencies are installed, and the server is restarted automatically.

- **Steps in the pipeline**:
  1. **Pull the latest branch** – The latest code is pulled.
  2. **Install dependencies** – Run `npm install` for both frontend and backend.
  3. **Run tests** – Execute unit tests the backend Property Controller API.
  4. **Build the application** – Generate production-ready frontend/backend files.

#### **EC2 Server Setup**
- OS: **Ubuntu 22.04**
- Reverse Proxy: **Nginx**  
- Process Manager: **PM2** (for running Node.js app)  
- Frontend: Served via **Nginx** (`/www`)  

### Deployment Steps (Automated)
1. Push changes to `master` on GitHub.  
2. GitHub Actions triggers the **deploy workflow**.  
3. The workflow logs into **AWS EC2 via SSH**.  
4. It pulls the latest code and installs dependencies (`yarn install`).  
5. The frontend is built (`yarn run build --prefix frontend`).  
6. The backend is restarted using **PM2** (`pm2 restart all`). 


### GitHub Actions Workflow File
This is the **`.github/workflows/ci.yml`** file that defines our CI/CD pipeline:

```yaml
name: Backend CI

on:
  push:
    branches:
      - master  
      # Trigger CI on pushes to the master branch


jobs:
  test:
    name: Run Tests
    runs-on: self-hosted

    strategy:
      matrix:
        node-version: [22] # Test on multiple Node.js versions


    environment: MONGO_URI

    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    # Set up Node.js
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Print Env Secret

      env:
        MONGO_URI: ${{ secrets.MONGO_URI }}
        JWT_SECRET: ${{ secrets.JWT_SECRET }}
        PORT: ${{ secrets.PORT }}
        ADMIN_EMAIL: ${{ secrets.ADMIN_EMAIL }}
        ADMIN_EMAIL_PASS: ${{ secrets.ADMIN_EMAIL_PASS }}
      run: | 
        echo "Secret 1 is: $MONGO_URI"
        echo "Secret 2 is: $JWT_SECRET"
        echo "Secret 3 is: $PORT"
        echo "Secret 4 is: $ADMIN_EMAIL"
        echo "Secret 5 is: $ADMIN_EMAIL_PASS"
      
    - run: pm2 stop all

    # Install dependencies for backend
    - name: Install Backend Dependencies
      working-directory: ./backend
      run: | 
       npm install --global yarn
       yarn --version
       yarn install
      
    # Install dependencies for frontend
    - name: Install Frontend Dependencies
      working-directory: ./frontend
      run: |
        df -h
        sudo rm -rf ./build
        yarn install
        yarn run build


    # Run backend tests
    - name: Run Backend Tests
      env:
        MONGO_URI: ${{ secrets.MONGO_URI }}
        JWT_SECRET: ${{ secrets.JWT_SECRET }}
        PORT: ${{ secrets.PORT }}
        ADMIN_EMAIL: ${{ secrets.ADMIN_EMAIL }}
        ADMIN_EMAIL_PASS: ${{ secrets.ADMIN_EMAIL_PASS }}
      working-directory: ./backend
      run: npm test


    - run: npm ci
    - run: | 
        cd ./backend
        touch .env
        echo "${{ secrets.PROD }}" > .env

    - run: pm2 start all

    - run: pm2 restart all
```

### Steps:

Open the application in your browser at `http://3.27.92.143/:3000`

## API Endpoints
### Authentication
```plaintext
POST   /api/auth/register   # User Registration
POST   /api/auth/login      # User Login
GET    /api/auth/profile    # Get User Profile Detail
GET    /api/auth/detail/:id # Get Agent Detail
PUT    /api/auth/profile    # Update User Profile
PUT    /api/auth/save-post  # Update User's Saved Post
POST   /api/auth/forgot-password  # Generate email with reset password link and send to user mail
POST   /api/auth/reset-password   # Reset User Password

```

### Properties
```plaintext
GET    /api/view-all-property     # Get all properties
POST   /api/create-property       # Create a property (Agent)
PUT    /api/update-property/:id   # Update property (Agent)
DELETE /api/delete-property/:id   # Delete property (Agent)
```

## Folder Structure
```plaintext
real-estate-manager/
├── frontend/      # Frontend React App
│   ├── public/    # images / logo
│   ├── src/
│       ├── components  # reusable components
│       ├── context     # context api storage
│       ├── hooks       # custom React hooks
│       ├── pages       # page components
│       ├── utils       # utility functions
│       ├── index.js    # frontend root
├── backend/      # Backend Express API
│   ├── models/  # Mongoose models
│   ├── routes/  # API routes
│   ├── controllers/  # Business logic
│   ├── middleware/  # Authentication middleware
│   ├── config/  # Database and server configurations
│   ├── test/  # API unit test code
│   ├── index.js  # Server entry point
```

## Contact
- GitHub: [https://github.com/alexYooDev/](https://github.com/alexYooDev/)

