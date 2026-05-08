import { ai, MODELS } from "../lib/gemini";
import { Task, Project } from "../types";

export const GeminiService = {
  async suggestTasks(project: Project, existingTasks: Task[]) {
    if (!ai) return [];
    
    const prompt = `
      You are an elite project manager and startup architect.
      Project: ${project.name}
      Description: ${project.description}
      Existing Tasks: ${existingTasks.map(t => t.title).join(", ")}

      Suggest 5 next high-impact tasks for this project that follow a modern startup workflow.
      Return a JSON array of objects with: "title", "description", "priority" (low, medium, high, urgent), and "labels" (array).
    `;

    try {
      const response = await ai.models.generateContent({
        model: MODELS.FLASH,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });
      
      const text = response.text;
      if (!text) return [];
      return JSON.parse(text);
    } catch (error) {
      console.error("AI Task Suggestion Failed:", error);
      return [];
    }
  },

  async analyzeSprintHealth(tasks: Task[]) {
    if (!ai) return { score: 0, insight: "AI Engine offline" };

    const prompt = `
      Analyze these tasks for sprint health:
      Tasks: ${JSON.stringify(tasks.map(t => ({ title: t.title, status: t.status, priority: t.priority })))}
      
      Return a JSON object with:
      "score": percentage (0-100),
      "status": "healthy" | "moderate" | "at_risk",
      "insight": a single power-sentence summarizing the state.
    `;

    try {
       const response = await ai.models.generateContent({
        model: MODELS.FLASH,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });
      return JSON.parse(response.text || "{}");
    } catch (error) {
       return { score: 50, insight: "Analysis limited." };
    }
  }
};
