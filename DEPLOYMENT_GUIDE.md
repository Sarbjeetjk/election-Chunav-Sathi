# Deployment Guide: Chunav Saathi

Follow these steps to push your code to GitHub and deploy it on Google Cloud Platform (GCP).

## Phase 1: Push to GitHub

1.  **Create a New Repository**:
    *   Go to [github.com/new](https://github.com/new).
    *   Name it `chunav-saathi`.
    *   Click **Create repository** (do not initialize with README or license).

2.  **Link and Push**:
    Open your terminal in the project folder and run:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/chunav-saathi.git
    git branch -M main
    git push -u origin main
    ```

---

## Phase 2: Deploy on GCP (App Engine)

1.  **Build the Project**:
    Before deploying, you must create a production build:
    ```bash
    npm run build
    ```

2.  **Install Google Cloud CLI**:
    If you haven't already, download and install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install).

3.  **Initialize GCP**:
    ```bash
    gcloud init
    ```

4.  **Deploy**:
    Run the following command from the root of your project (where `app.yaml` is located):
    ```bash
    gcloud app deploy
    ```
    *   Select a region if prompted.
    *   Confirm the deployment.

5.  **View Your Site**:
    Once finished, run:
    ```bash
    gcloud app browse
    ```

---

## Phase 3: Setup AI Environment Variables

After deployment, you need to add your API key to GCP so the AI works:

1.  Go to the [GCP Console](https://console.cloud.google.com/).
2.  Search for **App Engine** > **Settings**.
3.  Add `VITE_OPENAI_API_KEY` to your environment variables (or update `app.yaml`).

---

### Alternative: Firebase Hosting (Recommended for React)
Firebase is owned by Google and is much faster for React apps:
1.  `npm install -g firebase-tools`
2.  `firebase login`
3.  `firebase init` (Select Hosting)
4.  `firebase deploy`
