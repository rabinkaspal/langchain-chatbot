# LangChain ChatBot

Meet your Langchain virtual learning assistant! Our intelligent chatbot is here 24/7 to help you explore courses, answer questions, guide you through enrollment, and provide support whenever you need it. Whether you're a beginner or an experienced learner, the chatbot ensures you get quick, personalized help at every step.

#

Given a [text document](/public/data/faqs.txt) with a list of frequently asked questions, the document is split into chunks and converted to vector and saved into a supabase vector database.
![Document Splitting flow](public/document_split.png)
Prompt Templates and promts were generated to retrieve standalone questions for user input and answers.

```javascript
const standAlonePromptTemplate = `
Given some conversation history (if any) and a question, convert the question to a standalone question.
conversation history: {conv_history},
question: {question},
standalone question:`;
const standAlonePrompt = PromptTemplate.fromTemplate(standAlonePromptTemplate);
```

Vectorised user input and found matches and generated answer from those matches using OpenAI.

## App Flow Diagram

![Chatbot App Flow](/public/image.png)

# Chat Message Prompts for FAQ Retrieval

These are natural-language chat queries that users might enter to retrieve answers from the FAQ system.

## 🧠 General Course Information

-   What types of IT courses do you offer?
-   Do you have beginner-friendly courses?
-   Are your courses self-paced or scheduled?
-   How long does it take to complete a course?
-   Can I enroll in more than one course at a time?
-   Do your courses include practical projects?
-   How are your courses structured?
-   Can I see the syllabus before I enroll?
-   Are your courses up to date with industry standards?
-   Are there any prerequisites for your courses?

## 📈 Skill Levels and Specializations

-   Do you have intermediate or advanced courses?
-   What are your best courses for career changers?
-   Do you offer programming courses?
-   Are there courses for data science and analytics?
-   Do you teach web development from scratch?
-   What tools will I learn in DevOps courses?
-   Do you offer cloud computing courses?
-   Are cybersecurity topics covered?
-   Do you have courses for AI or machine learning?
-   Are soft skills included in your IT training?

## 💼 Career Support and Certification

-   Do your courses provide certificates?
-   Are your certificates accredited?
-   How do I get my certificate after completing a course?
-   Will your certificate help me get a job?
-   Do you offer job placement services?
-   Can I get a letter of recommendation?
-   Are your courses aligned with industry certifications?
-   Do you offer mock interviews or resume reviews?
-   Can I earn continuing education credits?
-   Do you offer internship opportunities?
