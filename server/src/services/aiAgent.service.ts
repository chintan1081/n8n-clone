import { GoogleGenAI } from "@google/genai";

export async function aiAgentService() {
    const ai = new GoogleGenAI({});

    const sum = (a: number, b: number) => {
        return a + b;
    }

    const power = (a: number) => {
        return a*a;
    }

    const multiply = (a: number, b: number) => {
        return a * b;
    }

    

    // const response = await ai.models.generateContent({
    //     model: "gemini-2.5-flash",
    //     contents: "Who won the euro 2024?",
    //     config: {
    //         tools: [sum]
    //     },
    // });

}