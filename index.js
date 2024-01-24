const fs = require('fs');
const semver = require('semver');
const { execSync } = require('child_process');

// Retrieve the path to package.json from command line arguments
const packageJsonPath = process.argv[2];

if (!packageJsonPath) {
    console.error('Please specify the path to the package.json file.');
    process.exit(1);
}

// Update the project (pull changes from the remote repository)
try {
    execSync('git pull');
    console.log('Project successfully updated.');
} catch (error) {
    console.error('Error occurred while updating the project:', error);
    process.exit(1); // Exit the script in case of an error
}

// Read the package.json file
let packageJson;
try {
    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
} catch (error) {
    console.error(`Error reading package.json file: ${error.message}`);
    process.exit(1);
}

// Increment the current version (patch)
const newVersion = semver.inc(packageJson.version, 'patch');

// Write the new version to the package.json file
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// Commit the changes
try {
    execSync(`git add ${packageJsonPath}`);
    execSync(`git commit -m "Version incremented to: ${newVersion}"`);
    console.log(`Commit for version ${newVersion} created successfully.`);
} catch (error) {
    console.error('Error occurred while creating the commit:', error);
    process.exit(1); // Exit the script in case of an error
}

// Create a Git tag
try {
    execSync(`git tag v${newVersion}`);
    console.log(`Git tag v${newVersion} created successfully.`);
} catch (error) {
    console.error('Error occurred while creating the Git tag:', error);
    process.exit(1); // Exit the script in case of an error
}

// Push the changes and tags to the remote repository
try {
    execSync('git push');
    execSync('git push --tags');
    console.log('Changes and Git tags pushed successfully.');
} catch (error) {
    console.error('Error occurred during the push operation:', error);
    process.exit(1); // Exit the script in case of an error
}
