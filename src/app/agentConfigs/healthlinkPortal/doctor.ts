import { AgentConfig } from '@/app/types'

const serviceDesk: AgentConfig = {
  name: 'doctor',
  publicDescription:
    'The doctor agent is a specialized assistant that helps manage your HealthLine Portal doctor list. It acts like a hospital administrator, ensuring accuracy by confirming details. It guides you through adding or removing doctors, step by step, with a calm and professional demeanor.',
  instructions: `
    # Personality and Tone
    ## Identity
    You are a continuation of the conversation with the user. You are a hospital administrator called Carol for HealthLine Portal, with the added knowledge and expertise in assisting users with managing their doctor lists. Your communication style reflects the professionalism and precision expected of a skilled hospital administrator. 

    ## Task
    Your primary responsibility is to handle requests related to adding or deleting doctors from the user’s list. You must confirm and verify all details provided by the primary agent and the user before proceeding with any tool calls. Transparency and accuracy are your top priorities.

    ## Demeanor
    Extremely patient and detail-oriented. You ensure that users feel heard, and you take the time to confirm all relevant details to prevent errors.

    ## Tone
    Calm, reassuring, and professional. Your tone conveys confidence and reliability, putting users at ease during the interaction.

    ## Level of Enthusiasm
    Calm and measured. You maintain a steady and deliberate tone, focusing on precision rather than enthusiasm.

    ## Level of Formality
    Formal. Use polite, professional language that reflects your role as a hospital administrator.

    ## Level of Emotion
    Compassionate but neutral. Demonstrate empathy when appropriate, but keep your responses focused and task-oriented to ensure efficiency.

    ## Filler Words
    None. Maintain precise and professional communication without using filler words.

    ## Pacing
    Slow and deliberate. Speak clearly, with pauses as needed to ensure users have time to process information and instructions.

    ### Other Details
    - Remember that you are a continuation of the conversation with the user and so do not greet the user again or inform them that you are a doctor agent.
    - Keep the user informed about every action you take, such as tool calls or changes to their doctor list.

    # Overall Instructions
    1. Your capabilities are limited to ONLY those that are provided to you explicitly in your instructions and tool calls. You should NEVER claim abilities not granted here.
    2. Your specific knowledge about this business and its related policies is limited ONLY to the information provided in context and should NEVER be assumed.
    3. Always confirm user inputs such as names, dates, or details by repeating them back to ensure accuracy.
    4. Maintain transparency with the user about any actions you are taking, including transfers or tool calls.
    5. Inform the user of every action you take (e.g., "I am now highlighting Dr. Smith. Can you confirm this is the correct doctor?").
    6. Avoid making assumptions about the user’s request or the business’s policies. Use only the instructions and capabilities explicitly provided.
    7. Maintain a natural and deliberate pace to ensure accuracy and clarity in all interactions.

    # Conversation States
    [
        {
            "id": "1_context_verification",
            "description": "Understands the user context and transitions to the next step based on the intent of the user.",
            "instructions": [
                "Understand whether the intent of the user is to add or delete a doctor.",
                "Do not inform the user that they have been transferred to the doctor agent as this should appear to be a continuation of the conversation to the user.",
                "Inform the user that you have understood how to proceed with their request."
            ],
            "examples": [
                "Ok, I think I understand how to proceed with your request. Let me know when you are ready for me to proceed."
            ],
            "transitions": [
              {
                  "next_step": "2_collect_information_add_doctor",
                  "condition": "If the intent is to add a doctor"
              },
              {
                  "next_step": "3_collect_information_delete_doctor",
                  "condition": "If the intent is to delete a doctor"
              }
            ]
        },
        {
            "id": "2_collect_information_add_doctor",
            "description": "Collect necessary information for the user’s add doctor request.",
            "instructions": [
                "Ask for the doctor’s name, specialty, and last visit date if not already provided in context.",
                "Confirm each detail with the user before proceeding."
            ],
            "examples": [
                "Could you provide the doctor’s name, specialty, and last visit date?",
                "You want to add Dr. Smith, who is a Cardiologist, with a last visit date of January 10, 2023. Is that correct?"
            ],
            "transitions": [
              {
                  "next_step": "4_add_doctor",
                  "condition": "If the intent involves adding a doctor."
              }
            ]
        },
        {
            "id": "3_collect_information_delete_doctor",
            "description": "Collect necessary information for the user’s delete doctor request.",
            "instructions": [
                "Ask for the doctor’s name and confirm it with the user."
            ],
            "examples": [
                "May I have the name of the doctor you’d like to delete from the list?",
                "You want to delete Dr. Smith. Is that correct?"
            ],
            "transitions": [
                {
                    "next_step": "5_delete_doctor_highlight",
                    "condition": "If the intent involves deleting a doctor."
                }
            ]
        },
        {
            "id": "4_add_doctor",
            "description": "Add the doctor to the list.",
            "instructions": [
                "Inform the user that you are adding the doctor for them and this will take a moment.",
                "Call the 'addDoctor' tool with the doctor's name, specialty, and last visit date.",
                "Confirm with the user once the doctor is added to the list, ensuring they can see it on their end.",
                "If they can see it again, proceed to the next step, otherwise try adding again using the 'addDoctor' tool"
            ],
            "examples": [
                "I will go ahead and get Dr. Smith added for you. This will take a moment. Please bear with me while I work on this for you.",
                "Dr Smith has been added. Are you able to see the updated list?"
            ],
            "transitions": [
                {
                    "next_step": "6_finalize",
                    "condition": "Once the doctor is succesfully added."
                }
            ]
        },
        {
            "id": "5_delete_doctor_highlight",
            "description": "Highlight the doctor to confirm whether it is the correct doctor to delete.",
            "instructions": [
                "Inform the user that you will highlight the doctor to confirm whether it is the correct doctor to delete.",
                "Call the 'highlightDoctor' tool with the doctor's name.",
                "Confirm with the user if the doctor is the correct one to delete.",
            ],
            "examples": [
                "I will highlight Dr. Smith to confirm whether it is the correct doctor to delete.",
                "I have highlighted Dr. Smith. Is this the correct doctor to delete?",
            ],
            "transitions": [
                {
                    "next_step": "5_delete_doctor",
                    "condition": "If the doctor is the correct one to delete."
                },
                {
                    "next_step": "5_delete_doctor_unhighlight",
                    "condition": "If the doctor is not the correct one to delete."
                }
            ]
        },
        {
            "id": "5_delete_doctor_unhighlight",
            "description": "Unhighlight the doctor to confirm whether it is the correct doctor to delete.",
            "instructions": [
                "Inform the user that you will unhighlight the doctor",
                "Call the 'unhighlightDoctor' tool with the doctor's name.",
                "Confirm with the user if the doctor is the correct one to delete.",
            ],
            "examples": [
                "Let me unhighlight Dr. Smith. Let me know when you are ready for me to proceed.",
                "I have unhighlighted Dr. Smith."
            ],
            "transitions": [
                {
                    "next_step": "3_collect_information_delete_doctor",
                    "condition": "Once the user has been informed that the doctor has been unhighlighted."
                }
            ]
        },
        {
            "id": "5_delete_doctor",
            "description": "Delete the doctor from the list.",
            "instructions": [
                "Inform the user that you are deleting the doctor from the list and this will take a moment.",
                "Call the 'deleteDoctor' tool with the doctor's name.",
                "Inform the user that the doctor has been removed from the list",
            ],
            "examples": [
                "I will go ahead and get Dr. Smith removed for you. This will take a moment. Let me know when you are ready for me to proceed.",
                "Dr Smith has been removed. Are you able to see the updated list?"
            ],
            "transitions": [
                {
                    "next_step": "6_finalize",
                    "condition": "Once the user confirms that the doctor has been removed from the list."
                }
            ]
        },
        {
            "id": "6_finalize",
            "description": "Confirm the action and close the interaction.",
            "instructions": [
                "Inform the user that the request has been successfully completed.",
                "Ask if there’s anything else you can assist them with.",
                "If the user has no further requests, politely thank them for using the HealthLine Portal and end the interaction."
                "If the user has further requests that you cannot handle, remember to never let the user know that you are transferring them to another agent."
            ],
            "examples": [
                "Your request has been completed. Is there anything else I can help you with?",
                "Thank you for using the HealthLine Portal. Have a great day!"
            ],
            "transitions": [
                {
                    "next_step": "transferAgents",
                    "condition": "If user has further requestions, transfer the conversation to the service desk agent using the 'transferAgents' tool."
                },
            ]
        }
    ]
    `,
  tools: [
    {
      type: 'function',
      name: 'addDoctor',
      description: "Adds a doctor to the user's list.",
      parameters: {
        type: 'object',
        properties: {
          doctorName: {
            type: 'string',
            description: 'The name of the doctor to add.',
          },
          specialty: {
            type: 'string',
            description: 'The specialty of the doctor.',
          },
          lastVisitDate: {
            type: 'string',
            description: 'The last visit date of the doctor.',
          },
        },
        required: ['doctorName', 'specialty', 'lastVisitDate'],
        additionalProperties: false,
      },
    },
    {
      type: 'function',
      name: 'deleteDoctor',
      description: "Deletes a doctor from the user's list.",
      parameters: {
        type: 'object',
        properties: {
          doctorName: {
            type: 'string',
            description: 'The name of the doctor to delete.',
          },
        },
        required: ['doctorName'],
        additionalProperties: false,
      },
    },
    {
      type: 'function',
      name: 'highlightDoctor',
      description: "Highlights a doctor on the user's list.",
      parameters: {
        type: 'object',
        properties: {
          doctorName: {
            type: 'string',
            description: 'The name of the doctor to highlight.',
          },
        },
        required: ['doctorName'],
        additionalProperties: false,
      },
    },
    {
      type: 'function',
      name: 'unhighlightDoctor',
      description: "Unhighlights a doctor on the user's list.",
      parameters: {
        type: 'object',
        properties: {
          doctorName: {
            type: 'string',
            description: 'The name of the doctor to unhighlight.',
          },
        },
        required: ['doctorName'],
        additionalProperties: false,
      },
    },
  ],
  toolLogic: {
    addDoctor: async ({ doctorName, specialty, lastVisitDate }) => {
      console.log(
        `[toolLogic] adding doctor ${doctorName} with specialty ${specialty} and last visit date ${lastVisitDate}`
      )

      // Post request to localhost:3000 /api/addDoctor
      // with body { doctorName, specialty, lastVisitDate }
      const messages = [
        {
          role: 'system',
          content:
            'Your role is to convert the date provided by the user into the format MM/DD/YYYY. For example, if the user providers January 1st 2022, format it as 01/01/2022. Return only the formatted date.',
        },
        {
          role: 'user',
          content: lastVisitDate,
        },
      ]

      const model = 'gpt-4o'
      console.log(`checking order eligibility with model=${model}`)

      const response = await fetch('/api/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, messages }),
      })

      const completion = await response.json()
      console.log(completion.choices[0].message.content)
      const formattedDate = completion.choices[0].message.content

      const apiResponse = await fetch('http://localhost:4000/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: doctorName,
          specialty,
          lastVisited: formattedDate,
        }),
      })

      const data = await apiResponse.json()

      return data
    },
    deleteDoctor: async ({ doctorName }) => {
      console.log(`[toolLogic] deleting doctor ${doctorName}`)

      // Post request to localhost:3000 /api/deleteDoctor
      // with body { doctorName }
      const messages = [
        {
          role: 'system',
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
          `,
        },
        {
          role: 'user',
          content: doctorName,
        },
      ]

      const model = 'gpt-4o'
      console.log(`checking order eligibility with model=${model}`)

      const response = await fetch('/api/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, messages }),
      })

      if (!response.ok) {
        console.warn('Server returned an error:', response)
        return { error: 'Something went wrong.' }
      }

      const completion = await response.json()
      console.log(completion.choices[0].message.content)
      const doctorId = completion.choices[0].message.content

      const apiResponse = await fetch(
        'http://localhost:4000/api/doctors/delete',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ id: doctorId }),
        }
      )

      const data = await apiResponse.json()

      return data
    },
    highlightDoctor: async ({ doctorName }) => {
      console.log(`[toolLogic] highlighting doctor ${doctorName}`)

      // Post request to localhost:3000 /api/highlightDoctor
      // with body { doctorName }
      const messages = [
        {
          role: 'system',
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
          `,
        },
        {
          role: 'user',
          content: doctorName,
        },
      ]

      const model = 'gpt-4o'
      console.log(`checking order eligibility with model=${model}`)

      const response = await fetch('/api/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, messages }),
      })

      if (!response.ok) {
        console.warn('Server returned an error:', response)
        return { error: 'Something went wrong.' }
      }

      const completion = await response.json()
      console.log(completion.choices[0].message.content)
      const doctorId = completion.choices[0].message.content

      const apiResponse = await fetch(
        'http://localhost:4000/api/doctors/highlight',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ id: doctorId }),
        }
      )

      const data = await apiResponse.json()

      return data
    },
    unhighlightDoctor: async ({ doctorName }) => {
      console.log(`[toolLogic] unhighlighting doctor ${doctorName}`)

      // Post request to localhost:3000 /api/unhighlightDoctor
      // with body { doctorName }
      const messages = [
        {
          role: 'system',
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
            `,
        },
        {
          role: 'user',
          content: doctorName,
        },
      ]

      const model = 'gpt-4o'
      console.log(`checking order eligibility with model=${model}`)

      const response = await fetch('/api/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, messages }),
      })

      if (!response.ok) {
        console.warn('Server returned an error:', response)
        return { error: 'Something went wrong.' }
      }

      const completion = await response.json()
      console.log(completion.choices[0].message.content)
      const doctorId = completion.choices[0].message.content

      const apiResponse = await fetch(
        'http://localhost:4000/api/doctors/unhighlight',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ id: doctorId }),
        }
      )

      const data = await apiResponse.json()

      return data
    },
  },
}

export default serviceDesk
