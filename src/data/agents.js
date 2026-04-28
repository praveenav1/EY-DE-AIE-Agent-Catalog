export const PHASES = [
  "All Phases","Data Ingestion","Data Storage","Data Modelling","Data Discovery","Data Quality","Testing","Deployment","Monitoring", "Transformation"
];

export const AGENTS = [
  {
    id: "pipeline-monitoring",
    phase: "Monitoring",
    name: "Data Pipeline Monitoring & Self Healing",
    demoVideoUrl: "https://eyindia-my.sharepoint.com/:v:/r/personal/shounak_mukherjee_in_ey_com/Documents/PipePulse/AI%20Pipeline%20Monitoring-%20Deployment%20Demo-20260109_160924-Meeting%20Recording.mp4?csf=1&web=1&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=hdeGds",
    short: "Monitor the Data pipelines in real time and self healing pipelines in case of failure.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop", // placeholder
    capabilities: [
      "Real time monitoring",
      "Root cause analysis",
      "Share next steps to resolve errors",
      "Self healing on standard solutioning",
      "Azure Data Factory Pipelines Monitoring",
    ],
    skills: [
      "Applies heuristic evaluations to assess and enhance accessibility compliance of design elements based on WCAG 2.1 AA and ARIA guidelines."
    ],
    examples: [
      "Generating accessibility compliance reports for UI screens"
    ],
    tech: {
      technologies: ["GPT-4.1 (Multi)", "Auto-Gen Framework", "Agent/Agent Protocol"],
      integrations: ["Figma MCP Server"],
      platform: "Inline"
    },
    metrics: [
      { group: "Performance", items: ["Lines of Code","Response Max Delay","Execution Time","Total Token"] },
      { group: "Accuracy", items: ["Tool Call Accuracy","Words Match Correctness","Important Words Recall","Overall Text Match"] },
      { group: "Cost and Observability", items: ["Input Tokens","Output Tokens","Total Cost","Observability"] }
    ],
    skillDetails: {
      fields: [
        ["Skill Name", "Monitoring Pipelines"],
        ["Short Description", "This agent will monitor the logs analytics logs and then analyze the error and give root cause analysis and next steps."],
        ["Import Steps", `1. Create an "agents" folder in your VS Code workspace.
2. Inside the "agents" folder, create a folder named "skills".
3. Extract the downloaded ZIP and copy the extracted folder into the skills folder created in the previous step.
4. Attach the input file via your Copilot chat window and enter the prompt: "business-requirement-synthesizer Extract requirements".`],
        ["Recommended Model", "GPT‑4.1, Claude 3.5, Composer"],
        ["Supported IDEs", "Cursor, VS Code"],
        ["Version", "v1.2.0"]
      ],
      downloadUrl: "#"
    }
  },

  {
    id: "data-discovery",
    phase: ["Data Discovery"],
    name: "Data Discovery & Modelling",
    demoVideoUrl: "https://eyindia-my.sharepoint.com/:v:/r/personal/shounak_mukherjee_in_ey_com/Documents/PipePulse/AI%20Pipeline%20Monitoring-%20Deployment%20Demo-20260109_160924-Meeting%20Recording.mp4?csf=1&web=1&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=hdeGds",
    short: "Discover your source data and analyze modelling and understand dataset.",
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop", // placeholder
    capabilities: [
      "Connect to multiple data sources",
      "Check and Understand Data Classification",
      "Share idea on the data modelling",
      "Understand your data schema",
      "Create ER and Data Flow Diagram",
    ],
    skills: [
      "Enable the power of AI and Data Discovery"
    ],
    examples: [
      "Understand your data source"
    ],
    tech: {
      technologies: ["GPT-4.1 (Multi)", "Auto-Gen Framework", "Agent/Agent Protocol"],
      integrations: ["Figma MCP Server"],
      platform: "Inline"
    },
    metrics: [
      { group: "Performance", items: ["Lines of Code","Response Max Delay","Execution Time","Total Token"] },
      { group: "Accuracy", items: ["Tool Call Accuracy","Words Match Correctness","Important Words Recall","Overall Text Match"] },
      { group: "Cost and Observability", items: ["Input Tokens","Output Tokens","Total Cost","Observability"] }
    ],
    skillDetails: {
      fields: [
        ["Skill Name", "Data Discovery and Modelling"],
        ["Short Description", "This agent will will help you in anlyzing the data source and understanf the schema and create standard data modelling ER and data flow diagram."],
        ["Import Steps", `1. Create an "agents" folder in your VS Code workspace.
2. Inside the "agents" folder, create a folder named "skills".
3. Extract the downloaded ZIP and copy the extracted folder into the skills folder created in the previous step.
4. Attach the input file via your Copilot chat window and enter the prompt: "business-requirement-synthesizer Extract requirements".`],
        ["Recommended Model", "GPT‑4.1, Claude 3.5, Composer"],
        ["Supported IDEs", "Cursor, VS Code"],
        ["Version", "v1.2.0"]
      ],
      downloadUrl: "#"
    }
  }
  // You can add more agents here…
];

export function fakeDemoRun(promptText) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        summary: "Accessibility evaluation completed.",
        details: [
          "Contrast issues found on 3 components (WCAG 1.4.3).",
          "Missing alt text on 2 images (WCAG 1.1.1).",
          "Keyboard focus order inconsistent in navigation (WCAG 2.4.3)."
        ],
        score: 0.86
      });
    }, 1300);
  });
}