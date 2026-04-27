# 🇮🇳 Chunav Saathi (चुनाव साथी)
### Your Premium Multilingual Indian Election Assistant

**Chunav Saathi** is a state-of-the-art, multilingual digital companion designed to empower Indian citizens during the democratic process. Built with a focus on accessibility and modern aesthetics, it provides real-time AI-powered assistance, voter education, and essential election services in multiple Indian languages.

---

## ✨ Key Features

- 🤖 **Smart AI Assistant**: A hybrid AI engine (powered by Google Gemini/OpenAI) that answers election-related queries and general questions in real-time.
- 🌍 **Multilingual Support**: Fully localized experience in English, Hindi, Tamil, Bengali, Telugu, and Marathi.
- 🗳️ **Interactive EVM Demo**: A step-by-step digital simulation of the Electronic Voting Machine (EVM) and VVPAT process.
- 📅 **Election Timeline**: Visual countdown and key dates for the upcoming general elections.
- 📝 **Voter Services Hub**: Quick access to EPIC download, constituency checking, and registration status.
- 🎮 **Voter Awareness Quiz**: Engaging gamified learning to increase electoral literacy.
- 🌓 **Premium UI/UX**: High-end glassmorphic design with a seamless Dark/Light mode toggle.

---

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Vanilla CSS with Premium Design Tokens (Glassmorphism & Micro-animations)
- **Icons**: Lucide React
- **AI**: Google Gemini 1.5 Flash / OpenAI GPT-3.5
- **Deployment**: Configured for GCP App Engine & GitHub

---

## 🛠️ Setup & Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Sarbjeetjk/election-Chunav-Sathi.git
    cd chunav-saathi
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Configuration**:
    Create a `.env` file in the root directory and add your Gemini or OpenAI API key:
    ```env
    VITE_OPENAI_API_KEY=your_api_key_here
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

---

## 📦 Deployment

This project is pre-configured for deployment on **Google Cloud Platform (GCP)**.

1.  Build the production bundle:
    ```bash
    npm run build
    ```
2.  Deploy using the provided `app.yaml`:
    ```bash
    gcloud app deploy
    ```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Developed with ❤️ for the Indian Democracy.
