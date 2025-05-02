# LangChain ChatBot

Given a [text document](/data/faqs.txt) with a list of frequently asked questions, the document is split into chunks and converted to vector and saved into a supabase vector database.
![Document Splitting flow](/document_split.png)
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

![Chatbot App Flow](/image.png)

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

## 💬 Learning Support and Mentorship

-   Do you offer live classes or bootcamps?
-   What is the difference between bootcamps and regular courses?
-   Can I ask questions to the instructor?
-   Is one-on-one mentoring available?
-   Do you offer Q&A sessions or live support?
-   What support is available if I get stuck?
-   Are there communities or forums for learners?
-   How can I join the student community?
-   Do you provide progress tracking tools?
-   Can I access my learning history?

## 👨‍🏫 Instructors and Quality

-   Who creates your course content?
-   Are your instructors experienced professionals?
-   How are instructors selected?
-   Are instructor profiles available?
-   Can instructors answer my questions after a course ends?

## 📚 Course Content and Assignments

-   Are the quizzes and assignments graded?
-   Do I need to complete assignments to get a certificate?
-   Can I retake quizzes or tests?
-   Can I propose my own final project?
-   Are projects graded manually or automatically?

## 🔒 Platform Policies and Access

-   How long will I have access to a course after enrollment?
-   Can I download video lessons for offline use?
-   Can I switch to another course after enrolling?
-   What is your refund policy?
-   Can I share my account with someone else?
-   What happens if I forget my password?
-   How do I recover access to my account?
-   Is your platform secure for online payments?
-   Do you have a mobile app?
-   Are there any mobile-only features?

## 🌍 Accessibility and Inclusivity

-   Are your courses accessible to people with disabilities?
-   Do your videos have subtitles or captions?
-   Can I use a screen reader with your platform?
-   Do your courses support keyboard navigation?
-   Are your course materials available in languages other than English?

## 🧾 Payments, Pricing, and Discounts

-   How much do your courses cost?
-   Do you offer free trials or sample lessons?
-   Are there any hidden charges?
-   Do you offer financial aid?
-   Are student discounts available?
-   Can companies get group discounts?
-   What payment methods do you accept?
-   Can I pay in installments?
-   Are there promotional offers currently available?
-   Do I need to pay separately for a certificate?

## 🔧 Technical Setup and Requirements

-   What are the system requirements for your coding courses?
-   What programming languages do you support in your browser IDE?
-   What software tools will I need?
-   Do you support code execution in the browser?
-   Is there a preferred code editor?

## 🤝 Policies and Academic Integrity

-   Do you monitor for plagiarism?
-   Are projects checked for originality?
-   Can I reuse course content for teaching?
-   What are the terms of service for course use?
-   Can I use the content for corporate training?

## 📦 Course Updates and Expansion

-   How often are new courses added?
-   Can I suggest a topic for a future course?
-   How often do you update existing courses?
-   Are courses removed or retired?
-   What happens if a course I enrolled in is no longer available?

## 📋 Badges, Progress, and Gamification

-   Do you offer badges for course completion?
-   Can I earn badges for specific skills?
-   Can I share my badges on LinkedIn?
-   Are badges different from certificates?
-   How do badges appear on my profile?

## 📑 Account and Dashboard

-   How do I track my progress?
-   Can I view a transcript of completed courses?
-   Can I download my learning history?
-   Is my progress synced across devices?
-   How can I contact support if I have questions?
