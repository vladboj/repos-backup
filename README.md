## About ##

This is a script for backing up your GitHub repositories to a specified folder.

## Prerequisites ##

- **Node.js**: Install from [nodejs.org](https://nodejs.org/).
- **GitHub Personal Access Token**: Generate a token with the **`repo`** scope to access private and public repositories. 

## Usage ##

1. **Clone repo**:
    ```bash
    git clone https://github.com/vladboj/repos-backup.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd repos-backup
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Set up environment variables**:
    - Create a `.env` file using `.env.example` as a template and fill in the required values.

5. **Run the script**:
    - **Option 1**: Using Node.js:
      ```bash
      node backupRepos.js
      ```
    - **Option 2**: Double-click the `backup_repos.bat` file.

6. *(Optional)* **Create a shortcut for easy access**:
    - You can create a shortcut to the `backup_repos.bat` file and place it in an indexed folder.
    - This allows you to quickly run the script by searching for the shortcut name in Windows Search.
