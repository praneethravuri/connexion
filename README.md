# INFS 740 PROJECT

Name: Sanjana Vatsavai

G-Number: G01371785

Email: svatsava@gmu.edu

### Project Installation

1. [Install Node (v20.11.1)](https://nodejs.org/en/download)
2. Install Dependencies - `npm install`
3. Create a ```.env.local``` file and add the following environment variables:

    ```
    MONGODB_URI = MongoDB URI String
    SESSION_SECRET = Create a random session secret
    NODE_ENV = development
    ```
4. Run the code in **http://localhost:3000/** - `npm run dev`

### Tech Stack

1. Frontend: React
2. Backend: Next.js 14
3. Database: MongoDB
4. Development Dependencies: Tailwind CSS, Radix UI, Shad-cn, TypeScript

### Collections

1. Users
2. Posts
3. Communities

### Basic Queries (CRUD Operations)

1. Users:

    - **View**: Retrieve and display a list of all users (in admin page), or a specific user's details (when user logs in).

    - **Insert**: Add a new user to the collection, including details like name, email, username, phone number, and password. Users can be added in the admin page or users can sign up with their details.

    - **Update**: Modify details of an existing user, such as updating their email address or the communities they're part of.

    - **Delete**: Remove a user from the database.

2. Posts:

    - **View**: Display posts, with options to filter by user or community.

    - **Insert**: Allow users to create a new post, including title, content, associated community, and image.

    - **Update**: Enable editing of post content or its associated community.

    - **Delete**: Delete the user's post from the database

3. Communities:

    - **View**: Show a list of all communities or detailed view of a selected community, including a list of members and posts.

    - **Insert**: Add a new community with details like name, description, and community image.

    - **Update**: Update community details like name, bio, and community image.

    - **Delete**: Remove a community from the database.

### Search Queries

1.  Display all users, posts they made, and community details of the posts

    In the admin page, under the user engagement tab, the admin has the ability to view a list of all users of the website. On clicking a user, all the posts made by that user are shown. Along with the posts, the details of the communities of which the posts are a part, are also shown.

    This search query utilizes the posts, users, and the communities collections. First, all users are retrieved and shown in the form of a table. On clicking a particular user, all the posts made by that user are shown in the middle table. For each post, its community of which it is a part is added to a set. From this, we get a list of all communities the user is a part of, and the details of all those communities are shown in the last table.

    <p align="center">
    <img src="./documentation-images/search_query_1.png" />
    </p>

2. Display all the posts made by a user with the communities the posts are a part of

    In the profile page of the user, under user activity, all the posts made by the user and the communities the posts are a part of are shown. This search query utilizes all three collections: posts, users, and communities. First, the user's details are retrieved, and using the posts collection and communities collection, all of the user's contributions are shown in the user activity section.

    <p align="center">
    <img src="./documentation-images/search_query_2.png" />
    </p>

### Visualization

There are 3 visualizations for 3 communities. Each visualization shows the number of entries made to each collection in the past 30 days.

For the users collection, the visualization shows the number of users that signed up to the website in the last 30 days

<p align="center">
<img src="./documentation-images/v_users.png" />
</p>

For the posts collection, the visualization shows the total number of posts made in the last 30 days

<p align="center">
<img src="./documentation-images/v_posts.png" />
</p>

For the communities collection, the visualization shows the number of communities created in the last 30 days

<p align="center">
<img src="./documentation-images/v_comm.png" />
</p>

### UI Screenshots

<p align="center">
<img src="./documentation-images/Screenshot (61).png" />
</p>
<p align="center">
<img src="./documentation-images/Screenshot (62).png" />
</p>
<p align="center">
<img src="./documentation-images/Screenshot (63).png" />
</p>
<p align="center">
<img src="./documentation-images/Screenshot (64).png" />
</p>
<p align="center">
<img src="./documentation-images/Screenshot (66).png" />
</p>
<p align="center">
<img src="./documentation-images/Screenshot (65).png" />
</p>