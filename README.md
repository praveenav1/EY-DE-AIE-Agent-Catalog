# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# EY-DE-AIE-Agent-Catalog

# HOW to Build and deploy to Azure
# Azure Web App Deployment Guide

This guide explains how to build the project, prepare the `dist` folder for deployment, create a ZIP package, and deploy it to Azure Web App.

## Step 1: Build the project

Run the following command to generate the production build:

```bash
npm run build
```

---

## Step 2: Create `server.js` and `package.json` inside the `dist` folder

After the build is complete, create the following files under the `dist` folder.

### `server.js`

```js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### `package.json`

```json
{
  "name": "skill-sync-static",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "express": "^4.18.2"
  },
  "scripts": {
    "start": "node server.js"
  }
}
```

---

## Step 3: Zip the `dist` folder

Use the following Python script to create a deployment ZIP file from the `dist` folder:

```python
import zipfile
import os

dist_dir = r"C:\Users\MQ955SE\OneDrive - EY\Desktop\Download\Download\ey-da-agents\dist"
zip_path = r"C:\Users\MQ955SE\OneDrive - EY\Desktop\Download\Download\ey-da-agents\dist\azure-deploy.zip"

if os.path.exists(zip_path):
    os.remove(zip_path)

z = zipfile.ZipFile(zip_path, 'w')
for root, _, files in os.walk(dist_dir):
    for f in files:
        full_path = os.path.join(root, f)
        arcname = os.path.relpath(full_path, dist_dir).replace('\\', '/')
        z.write(full_path, arcname)
z.close()

print("Created zip with", z.namelist())
```

---

## Step 4: Log in to Azure

Run the following command to log in using device code:

```bash
az login --use-device-code
```

---

## Step 5: Deploy the ZIP file to Azure Web App

Run the following command to deploy the ZIP package:

```bash
az webapp deploy \
  --name EY-DE-AIE-Agent-Catalog \
  --resource-group AIE_SSDL_MVP \
  --src-path "C:\Users\MQ955SE\OneDrive - EY\Desktop\Download\Download\ey-da-agents\dist\azure-deploy.zip" \
  --clean true
```

---

## Notes

- Make sure the `dist` folder contains:
  - `index.html`
  - `server.js`
  - `package.json`
  - all generated static assets
- The ZIP file should contain the contents of `dist`, not the `dist` folder itself as the root folder.
- Azure will use the `start` script from `package.json` to run the app.

``