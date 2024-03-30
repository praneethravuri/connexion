## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


# Functionalities
### CRUD Operations

Basic CRUD Operations for Each Collection
Users Collection

    View: Retrieve and display a list of all users, or a specific user's details.

    Insert: Add a new user to the collection, including details like name, email, and a list of communities they belong to.

    Update: Modify details of an existing user, such as updating their email address or the communities they're part of.

    Delete: Remove a user from the database.

Posts Collection

    View: Display posts, with options to filter by user or community.

    Insert: Allow users to create a new post, including title, content, associated community, and author.

    Update: Enable editing of post content or its associated community.

    Delete: Provide the ability to delete a post.

Communities Collection

    View: Show a list of all communities or detailed view of a selected community, including a list of members and posts.

    Insert: Add a new community with details like name, description, and members.

    Update: Update community details or membership.
    
    Delete: Remove a community from the database.