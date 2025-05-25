# JavaScript Projects Collection - Project Setup Guide

This document provides information on how to set up and run the projects in this repository.

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code, Sublime Text, Atom, etc.)
- Basic knowledge of HTML, CSS, and JavaScript

## Running Projects Locally

There are several ways to run these projects locally:

### 1. Using Live Server (Recommended)

If you have VS Code:

1. Install the Live Server extension
2. Right-click on any project's `index.html` file
3. Select "Open with Live Server"

### 2. Using the file:// Protocol

1. Navigate to the project folder
2. Double-click the `index.html` file to open it in your default browser

### 3. Using a Local Server

If you have Node.js installed:

1. Install a simple HTTP server: `npm install -g http-server`
2. Navigate to the repository root folder
3. Run `http-server`
4. Open your browser and navigate to `http://localhost:8080`

## Development Setup

For those who want to contribute or modify projects:

1. Fork and clone this repository
2. Use the included `.editorconfig` for consistent coding style
3. Use ESLint to maintain code quality: `npx eslint yourFile.js`
4. Format code with Prettier: `npx prettier --write yourFile.js`

## VS Code Setup

A workspace file (`javascript-projects.code-workspace`) is included with recommended settings and extensions.

To use it:

1. Open VS Code
2. Click on "File" > "Open Workspace from File..."
3. Select the `javascript-projects.code-workspace` file

This will set up your environment with the recommended extensions and settings.

## Questions?

If you have any questions or issues, please refer to the CONTRIBUTING.md file or open an issue in the repository.
