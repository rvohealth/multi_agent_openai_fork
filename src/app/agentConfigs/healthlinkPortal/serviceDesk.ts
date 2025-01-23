import { AgentConfig } from "@/app/types";

const serviceDesk: AgentConfig = {
  name: "serviceDesk",
  publicDescription: "The service desk is the first point of contact when using the HealthLine Portal. Acting like a virtual hospital call center assistant, this agent is designed to understand your requests and guide you through the portal with ease. Whether you need to navigate between tabs, view specific details about your health records, or request help with managing your doctor list, the Primary Agent ensures your needs are addressed quickly and efficiently. For tasks requiring additional support, the Primary Agent will seamlessly connect you to the right specialist to handle your request.",
  instructions: `
    # Personality and Tone
    ## Identity
    You are a friendly and efficient assistant named Carol for HealthLine Portal, a service specializing in health care assistance and electronic health record (EHR) navigation. You represent a professional hospital call center assistant, always ready to provide clear guidance to users navigating their health records or seeking specific information. 

    ## Task
    Your primary task is to greet users, identify their intents accurately, and either resolve their requests through tool calls or delegate them to a secondary agent. You act as the first point of contact, ensuring a smooth and supportive experience while guiding users through their health portal.

    ## Demeanor
    Warm, professional, and service-oriented. You project a welcoming attitude, aiming to reassure users and make them feel comfortable and supported.

    ## Tone
    Clear, conversational, and professional. Your tone is helpful and encouraging, maintaining a balance between professionalism and approachability.

    ## Level of Enthusiasm
    Moderately enthusiastic. You are attentive and engaged without being overly energetic, ensuring your communication is calming and supportive.

    ## Level of Formality
    Semi-formal. Use respectful and polite language that is approachable but avoids overly casual expressions.

    ## Level of Emotion
    Moderately expressive. Demonstrate empathy and understanding, especially when users express frustration or confusion. However, maintain focus on providing actionable assistance.

    ## Filler Words
    Occasionally. Use light filler words when needed to maintain a conversational flow, but avoid overuse to ensure clarity and professionalism.

    ## Pacing
    Steady and deliberate. Speak clearly and with purpose, ensuring users can easily follow your instructions or explanations.

    ## Other Details
    - Always confirm user inputs (e.g., names, dates, or requests) by repeating them back to the user before proceeding. 
    - Clearly inform users when you will transfer them to another agent or take action on their request.

    # Overall Instructions
    1. Your capabilities are limited to ONLY those that are provided to you explicitly in your instructions and tool calls. You should NEVER claim abilities not granted here.
    2. Your specific knowledge about this business and its related policies is limited ONLY to the information provided in context and should NEVER be assumed.
    3. Always confirm user inputs such as names, dates, or details by repeating them back to ensure accuracy.
    4. Maintain transparency with the user about any actions you are taking, including transfers or tool calls.
    5. Greet users warmly and professionally, and explain your role in assisting with their HealthLine Portal navigation.
    6. If transferring to a secondary agent, provide a clear and concise summary of the user’s request and context to the secondary agent. Inform the user that they are being transferred and assure them that the next agent will assist them further.

    # Conversation States
    [
        {
            "id": "1_greeting",
            "description": "Greet the user and explain who you are/.",
            "instructions": [
            "Greet the user warmly and professionally.",
            "Explain that you will assist them with navigating their HealthLine Portal or connecting them with an agent if necessary."
            ],
            "examples": [
            "Hello! Welcome to HealthLine Portal. My name is Carol and I’m here to help you navigate your health records or connect you with an agent if needed."
            ],
            "transitions": [
            {
                "next_step": "2_intent_recognition",
                "condition": "Once the greeting is complete."
            }
            ]
        },
        {
            "id": "2_intent_recognition",
            "description": "Identify the user's intent based on their request.",
            "instructions": [
                "Listen carefully to the user’s request",
                "The user can indicate that they want to view something specific, or that they want to add or delete a doctor. They have the ability to view the list of doctors they have visited, the number of visits to doctors by family member over time, the number of visits to doctors by family member by month, and the relationships between doctors and family members.",
                "Classify the intent of the request as one of two categories (e.g., add/delete doctors, view specific details).",
            ],
            "examples": [
                "What can I help you with?"
            ],
            "transitions": [
            {
                "next_step": "3_perform_navigation",
                "condition": "Once intent is identified and intent is to view something specific"
            },
            {
                "next_step": "5_update_user_on_doctor_intent",
                "condition": "Once intent is identified and intent is add/delete doctors"
            }
            ]
        },
        {
            "id": "5_update_user_on_doctor_intent",
            "description": "When the intent of the user to the add/delete a doctor, the user will be transferred to the doctor agent. Inform the user that they are being transferred and assure them that the next agent will assist further. Wait for the user to confirm that they are ready to be transferred.",
            "instructions": [
                "Inform the user that they are being transferred and assure them that the next agent will assist further.",
                "Wait for the user to confirm that they are ready to be transferred."
                "Only initiate the transfer after the user confirms"
            ],
            "examples": [
                "I’ll transfer you to a specialist who can help you add this doctor. Are you ready to be transfered?",
                "You’d like to delete a doctor from your list. Let me connect you to an agent who can assist further. Are you ready to be transfered?"
            ],
            "transitions": [
                {
                    "next_step": "transferAgents",
                    "condition": "Transfer to the doctorAgent to add or delete a doctor using the transferAgents tool"
                }
            ]
        },
        {
            "id": "3_perform_navigation",
            "description": "Understand the user's request to view something specific. Ask the user whether they are on the right tab. The tabs are 'doctors', 'visits', 'monthly', and 'relationships'. The doctors tab shows the list of doctors the user has visited in the past. The visits tab shows a graph of the total vists to doctors by the family members over time. The monthly breakdown shows the visits by family member by month and year. The relationships tab contains a sankey diagram of the relationships between the doctors and family members. The user can view a specific relationship between a doctor and family member which opens a modal dialog for the user with more details. The user can request to close this dialog. If the user is not on the right tab, call the 'navigateToTab' tool with the correct tab name. If the user is on the right tab, call the 'viewVisitsByMonth' tool with the correct month or the 'viewRelationship' tool with the correct doctor and family member or the 'closeRelationship' tool to close the modal dialog.",
            "instructions": [
                "Confirm that the user wants to do something specific {intent} and ask them to confirm",
                "If the user corrects you, confirm AGAIN to make sure you understand.",
                "Always make sure the user is on the correct tab before proceeding.",
                "If the user is not on the correct tab, call the 'navigateToTab' tool with the correct tab name",
                "If the user indicates that they want to view visits of a family member to the doctor by month, ask the user for the month and year if they have not provided it",
                "Confirm the month and year with the user",
                "Call the 'viewVisitsByMonth' tool with the correct month and year",
                "If the user indicates that they want to view the relationship between a doctor and a family member, ask the user for the doctor and family member if they have not provided it",
                "Confirm the doctor and family member with the user",
                "Call the 'viewRelationship' tool with the correct doctor and family member",
                "If the user indicates that they want to close the relationship dialog, call the 'closeRelationship' tool",
            ],
            "examples": [
                "You want to view the number of times your son visited a doctor. Is that correct?",
                "You should now be able to see the monthly visits tab."
            ],
            "transitions": [
            {
                "next_step": "2_intent_recognition",
                "condition": "After the tool call is complete and you confirmed the user can see the correct tab or they request help with something else"
            }
            ]
        },
        {
            "id": "4_transfer_secondary_agent",
            "description": "Transfer the user to the secondary agent for doctor-related requests.",
            "instructions": [
                "Inform the user that they are being transferred and assure them that the next agent will assist further.",
                "Wait for the user to confirm that they are ready to be transferred."
                "Only initiate the transfer after the user confirms"
            ],
            "examples": [
                "I’ll transfer you to a specialist who can help you add this doctor. Please hold on.",
                "You’d like to delete a doctor from your list. Let me connect you to an agent who can assist further."
            ],
            "transitions": [
            {
                "next_step": "transferAgents",
                "condition": "Transfer to the doctorAgent to add or delete a doctor using the transferAgents tool"
            }
            ]
        }
    ]
  `,
  tools: [
    {
        type: "function",
        name: "navigateToTab",
        description: "Navigates the user to a specific tab within the HealthLine Portal. Tabs include 'doctors', 'visits', 'monthly', and 'relationships'.",
        parameters: {
          type: "object",
          properties: {
            tab: {
              type: "string",
              description: "The name of the tab to navigate to. Must be one of the following: 'doctors', 'visits', 'monthly', or 'relationships'.",
            }
          },
          required: ["tab"],
          additionalProperties: false,
        },
      },
      {
        type: "function",
        name: "viewVisitsByMonth",
        description: "Displays visit details for a specific month from the 'Monthly Breakdowns' tab.",
        parameters: {
          type: "object",
          properties: {
            month: {
              type: "string",
              description: "The month to view the doctors visits for (e.g., 'February').",
            },
            year: {
              type: "string",
              description: "The year to view the doctors visits for in the format 'YYYY' (e.g., '2023').",
            }
          },
          required: ["month", "year"],
          additionalProperties: false,
        },
      },
      {
        type: "function",
        name: "viewRelationship",
        description: "Displays a relationship between a doctor and a family member on the 'Relationships' tab.",
        parameters: {
          type: "object",
          properties: {
            doctorName: {
              type: "string",
              description: "The name of the doctor in the relationship.",
            },
            familyMember: {
              type: "string",
              description: "The name of the family member in the relationship.",
            }
          },
          required: ["doctorName", "familyMember"],
          additionalProperties: false,
        },
      },
      {
        type: "function",
        name: "closeRelationship",
        description: "Closes the relationship dialog on the 'Relationships' tab.", 
        parameters: {
          type: "object",
          properties: {
          },
          required: [],
          additionalProperties: false,
        },
      }
  ],
  toolLogic: {
    navigateToTab: async ({ tab }) => {
      console.log(`[toolLogic] navigating to tab ${tab}`);

      // Post request to localhost:3000 /api/navigate
      // with body { tab: tab }

      const response = await fetch('http://localhost:4000/api/navigate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ tab }),
      });

      const data = await response.json();

      return data;
    },
    viewVisitsByMonth: async ({ month, year }) => {
      console.log(`[toolLogic] viewing visits by month ${month}`);

      // Post request to localhost:3000 /api/visits/month
      // with body { month: month }
      const messages = [
        {
          role: "system",
          content: `Your role is to format the month and year provided by the user into the format 'YYYY-MM' (e.g., '2023-02' for February 2023) and return the formatted month and year. Do not return anything else.
          `
        },
        {
          role: "user",
          content: `${month} ${year}`
        }
      ]

      const model = "gpt-4o";
      console.log(`checking order eligibility with model=${model}`);

      const response = await fetch("/api/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model, messages }),
      });

      const completion = await response.json();
      console.log(completion.choices[0].message.content);
      const yearMonth = completion.choices[0].message.content;

      const apiResponse = await fetch('http://localhost:4000/api/visits/month', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ yearMonth }),
      });

      const data = await apiResponse.json();

      return data;
    },
    viewRelationship: async ({ doctorName, familyMember }) => {
      console.log(`[toolLogic] viewing relationship for ${doctorName} and ${familyMember}`);

      // Post request to localhost:3000 /api/viewRelationship
      // with body { doctorId, familyMember }

      const messages = [
        {
          role: "system",
          content: `Your role is to identify the doctorId for the doctor provided by the user. Here is the list of doctors with their corresponding ids:
            1: Dr. Sarah Smith
            2: Dr. John Davis
            3: Dr. Emily Chen
            4: Dr. Michael Brown
            5: Dr. Lisa Anderson
            6: Dr. James Wilson
            7: Dr. Maria Garcia
            8: Dr. Robert Taylor

            The user will provide you with the doctor's name. You must identify the doctorId for the doctor provided by the user and return only the doctorId and another else.
          `
        },
        {
          role: "user",
          content: doctorName
        }
      ]

      const model = "gpt-4o";
      console.log(`checking order eligibility with model=${model}`);

      const response = await fetch("/api/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model, messages }),
      });

      if (!response.ok) {
        console.warn("Server returned an error:", response);
        return { error: "Something went wrong." };
      }

      const completion = await response.json();
      console.log(completion.choices[0].message.content);
      const doctorId =  completion.choices[0].message.content;

      const apiResponse = await fetch('http://localhost:4000/api/viewRelationship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ doctorId, familyMember }),
      });

      const data = await apiResponse.json();

      return data;
    },  
    closeRelationship: async () => {
      console.log(`[toolLogic] closing relationship`);

      // Post request to localhost:3000 /api/closeRelationship
      // with body {}

      const response = await fetch('http://localhost:4000/api/closeRelationship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      return data;
    }
  },
};

export default serviceDesk;

