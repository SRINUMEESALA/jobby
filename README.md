# Jobby App 
[https://srinujoby.app.tech/](https://srinujoby.ccbp.tech/)

![Home page](https://res.cloudinary.com/dzivm8ve4/image/upload/v1678964876/Screenshot_2023-03-16_163629_ntbi3t.png?raw=true)

#### ● Implemented Jobby App where users can log in and can see a list of jobs with search by Job title, filters based on Salary range and Employment type, etc
#### ● Authenticating by taking username, password and doing login post HTTP API Call.
#### ● Persisted user login state by keeping jwt token in client storage, Sending it in headers of further API calls to authorize the user.

![jobs](https://res.cloudinary.com/dzivm8ve4/image/upload/v1678964877/Screenshot_2023-03-16_163649_nss8dn.png?raw=true)
#### ● Implemented different routes for Login, Home, Jobs, Job item details pages by using React Router components Route, Switch, Link.

![job Details](https://res.cloudinary.com/dzivm8ve4/image/upload/v1678964877/Screenshot_2023-03-16_163721_q2aqzd.png?raw=true)
#### ●  Implemented filters and search text by sending them as query parameters to jobs API calls.
#### ● Redirecting to the login page if the user tries to open Home, Jobs, Job item details routes which need authentication by implementing protected Route.

