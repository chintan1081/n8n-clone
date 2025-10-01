import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { tool } from "@langchain/core/tools";

import { z } from "zod";
import { AppDataSource } from "../database/appDataSource";
import { Credentials } from "../entities/credentials.entity";

const sum = tool(
    async (input: any) => {
        console.log("sum tool called");
        return input.a + input.b;
    },
    {
        name: "sum",
        description: "Call to sum two numbers.",
        schema: z.object({
            a: z.number().describe("The first number to add."),
            b: z.number().describe("The second number to add."),
        }),
    }
);


const multiply = tool(
    async (input: any) => {
        console.log("multiply tool called");
        return input.a * input.b;
    },
    {
        name: "multiply",
        description: "Call to multiply two numbers.",
        schema: z.object({
            a: z.number().describe("The first number to multiply."),
            b: z.number().describe("The second number to multiply."),
        }),
    }
);

const exponent = tool(
    async (input: any) => {
        console.log("exponent tool called");
        return input.a ** input.b;
    },
    {
        name: "exponent",
        description: "Finds power of a number to a given number.",
        schema: z.object({
            a: z.number().describe("The number to find the power of."),
            b: z.number().describe("The power to raise the number to."),
        }),
    }
);


const credentialsRepo = AppDataSource.getRepository(Credentials);
export async function aiAgentService(result: string) {
    const geminiCredential: any = await credentialsRepo.findOne({ where: { platform: 'aiAgent' } });
    const apiKey = geminiCredential.data.apiKey;
    const prompt = geminiCredential.data.prompt;
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey
    });

    const agent = createReactAgent({
        llm: model,
        tools: [],
    });

    const response: any = await agent.invoke({
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    const message = response.messages[1].content;
    return message;
}

