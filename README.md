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
Step 1: npm run build
Step 2: create server.js and package.json file under dist
code:
server.js
'''
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
'''
package.json
'''
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
'''
Step 4: Zip the file using code:
'''
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
'''
Step 5: az login --use-device-code
Step 6: az webapp deploy --name EY-DE-AIE-Agent-Catalog --resource-group AIE_SSDL_MVP --src-path "C:\Users\MQ955SE\OneDrive - EY\Desktop\Download\Download\ey-da-agents\dist\azure-deploy.zip" --clean true
