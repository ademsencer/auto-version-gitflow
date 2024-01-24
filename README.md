# Auto Version and Tag Script for Node.js

This script automates the process of incrementing the version in your `package.json` file, committing the change, creating a Git tag, and pushing both the commit and tags to your remote repository. It's ideal for Node.js projects where consistent versioning and tagging are crucial.

## Features

- **Automatic Version Increment**: Increments the patch version in `package.json`.
- **Git Commit and Tag**: Commits the updated `package.json` and creates a corresponding Git tag.
- **Push to Remote**: Pushes the commit and tags to the remote Git repository.

## Usage

1. Place the script in your project's root directory.
2. Run the script using Node.js:

   ```bash
   node version-bump.js

