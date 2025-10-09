import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { tool } from "@langchain/core/tools";

import { string, z } from "zod";
import { AppDataSource } from "../database/appDataSource";
import { Credentials } from "../entities/credentials.entity";

const sum = tool(
    async (input: any) => {
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

const toolsFunction: any = {
    multiply,
    sum
}

const credentialsRepo = AppDataSource.getRepository(Credentials);
export async function aiAgentService(userId: string, llmNode: any, tools: any) {
    const finalTools = tools.map((tool: any) => toolsFunction[tool])
    const geminiCredential: any = await credentialsRepo.findOne({ where: { platform: 'aiAgent', user: { id: userId } } });
    if (!geminiCredential) {
        throw new Error("Provide Gemini Credentials")
    }
    const apiKey = geminiCredential.data.apiKey;
    const prompt = geminiCredential.data.prompt;
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey
    });

    const agent = createReactAgent({
        llm: model,
        tools: finalTools,
    });



    const response: any = await agent.invoke({
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    let message;
    const tool_calls = response.messages[1].tool_calls.length;
    if(tool_calls > 0){
        message = response.messages[3].content
    }else{
        message = response.messages[1].content
    }

    return message;
}

