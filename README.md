## **KANHA** – **Kustomized Assessment & NLP-based Hyperpersonalized Audit**

### **Project Overview**

## **KANHA** is an innovative, AI-powered platform that delivers personalized programming assessments to users. The frontend of KANHA allows users to interact with the backend to receive customized question sets, submit their answers, and view detailed feedback based on their performance. The platform uses Natural Language Processing (NLP) and AI to generate personalized assessments, providing a unique experience for every user.

### **Core Features**

1. **User-Driven Customization**

   - **Inputs:**
     - **Level of Difficulty**: Users can choose from Easy, Medium, or High difficulty levels for their assessments.
     - **Programming Language**: The platform supports various programming languages such as Python, Java, C++, etc.
     - **Topics**: Users can select specific topics or opt for "All" to receive a comprehensive assessment.

2. **Question Generation**

   - The frontend fetches a customized question set from the backend based on user inputs:
     - **Easy Level**: 20 multiple-choice questions (MCQs).
     - **Medium Level**: 12 MCQs + 8 programming questions.
     - **High Level**: 20 programming questions.

3. **Answer Submission**

   - Users can submit their answers for evaluation:
     - For programming questions, users can input their code into the provided editor.
     - MCQs are answered by selecting the correct options.

4. **Answer Evaluation**

   - After submission, the frontend receives evaluation results from the backend. For programming questions, feedback is provided based on correctness, efficiency, and best practices. For MCQs, answers are marked as correct or incorrect, with feedback for improvement.

5. **Streamlined Two-Step Process**
   - **Step 1**: The user specifies the assessment parameters (difficulty, topics, language).
   - **Step 2**: The user submits answers, and the frontend presents evaluation results, including feedback and suggestions for improvement.

---

### **Frontend Technology Stack**

1. **Frontend Framework**

   - **React JS**: React is used to build the user interface. It allows for the creation of dynamic and interactive components, making the frontend highly responsive.

2. **UI Libraries**

   - **Bootstrap**: The application uses Bootstrap to implement responsive design components, ensuring the platform works seamlessly across all devices (desktop, tablet, mobile).

3. **State Management**

   - **No State Management**: Currently, no external state management library (like Redux) is used. The application uses React’s built-in hooks such as `useState` and `useEffect` to manage the state.

4. **API Integration**

   - **Axios**: Axios is used to make API requests to the backend. It is responsible for fetching the personalized question sets and submitting the user's answers to the backend for evaluation.

5. **Authentication**

   - **No Authentication**: At present, there is no authentication mechanism in place for user login or user-specific access. All users have access to the same features.

6. **Build and Deployment**
   - **Netlify** will be used as the **staging server**, providing a platform for testing and review before production deployment.
   - **AWS Amplify** will be used as the **production server**, offering robust hosting, continuous integration, and automatic scaling for a seamless live experience.

---

### **System Workflow**

1. **User Journey**

   - The user visits the platform and selects the assessment parameters (difficulty level, topics, and programming language).
   - The frontend makes an API request to fetch the personalized question set based on the user’s inputs.
   - The question set is displayed to the user.
   - The user then submits answers, either by selecting options for MCQs or by writing code for programming questions.
   - After submission, the frontend requests evaluation results from the backend, which are displayed to the user with feedback and suggestions.

2. **Frontend Components**
   - **Questionnaire Component**: This component is responsible for displaying the list of questions to the user based on their selected parameters (difficulty, programming language, and topics).
   - **Answer Submission Component**: This allows users to input their answers for programming challenges or select answers for MCQs.
   - **Evaluation Results Component**: Once the user submits their answers, this component shows the evaluation results, feedback, scores, and suggestions for further improvement.
   - **Header and Footer**: The navigation components that provide easy access to the main features and ensure smooth navigation across the platform.

---

### **Scalability and Performance**

1. **Efficient Data Handling**

   - The frontend ensures efficient data handling by only fetching the required data when necessary, reducing redundant API calls and improving overall performance.

2. **Responsive Design**

   - The application uses **Bootstrap** for building responsive UIs, ensuring that users have a consistent experience across various devices such as desktops, tablets, and smartphones.

3. **Caching and Optimizations**
   - Although caching has not been implemented yet, future improvements will optimize performance through lazy loading, deferred data loading, and caching strategies for repeated data.

---

### **Security and Privacy**

1. **Data Encryption**

   - All communications with the backend are secured using **HTTPS**, ensuring the protection of user data in transit.

2. **User Privacy**

   - Currently, there is no user authentication in place, but the platform ensures user privacy by following best practices and will be GDPR-compliant in future releases when authentication is implemented.

3. **Access Control**
   - The platform currently does not implement role-based access control (RBAC). Future releases will incorporate this feature to restrict access to sensitive information.

---

### **Future Enhancements**

1. **Dynamic Difficulty Adjustment**

   - The frontend will be enhanced to adjust the difficulty of the questions dynamically based on user performance, offering progressively more challenging questions.

2. **Multi-Language Support**

   - The platform plans to support additional programming languages, giving users the ability to select different languages for their coding challenges.

3. **Plagiarism Detection**

   - Future updates will include features for detecting plagiarism in code submissions by comparing them against a database of known solutions.

4. **Gamification Features**
   - The platform will introduce gamification elements such as leaderboards, achievements, and badges to boost user engagement and motivation.

---

### **Conclusion**

The **KANHA** frontend is designed to offer users an intuitive and interactive experience when taking personalized programming assessments. Built with **React JS** and **Bootstrap**, the platform ensures responsiveness and ease of use across various devices. By integrating with the backend via **Axios**, the frontend seamlessly fetches question sets, submits answers, and displays detailed evaluation feedback. The platform is hosted on **Netlify** and **AWS Amplify**, ensuring reliable deployment and scalability. Future enhancements will improve the user experience by adding dynamic difficulty adjustment, authentication, and gamification features.
