// FRONTEND/src/pages/ModuleContent.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ModuleContent.css"; // 👈 Import the new CSS file

function ModuleContent() {
  const { id } = useParams();
  const [module, setModule] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // NOTE: This route should ideally be secure and use the module's MongoDB ID
    fetch(`http://localhost:5000/api/modules/${id}`)
      .then(res => res.json())
      .then(data => setModule(data));
  }, [id]);

  if (!module) return <h2 className="loading-message">Loading...</h2>;
  
  return (
    <div className="module-content-container"> {/* 👈 MAIN CONTAINER CLASS */}
      
      <h1>{module.title}</h1>
      <p>{module.description}</p>

      <hr />

      <h2>🐍 What is Python?</h2>
      <p>
        Python is a high-level, beginner-friendly programming language used for
        web development, automation, data science, AI, and more.
      </p>
      <pre className="code-snippet">
        {`print("Hello, Python!")`}
      </pre>

      {/* ✅ SECTION 2 — Variables */}
      <h2>🔹 Variables & Data Types</h2>
      <p>Python does *not* require declaring data types. Values determine type:</p>
      <pre className="code-snippet">
        {`x = 10          # Integer
y = 3.14         # Float
name = "Vandita" # String
flag = True      # Boolean

print(type(x))
`}
      </pre>

      {/* ✅ SECTION 3 — Input & Output */}
      <h2>🖥️ Input & Output</h2>
      <p>Use <code>input()</code> to take user input:</p>
      <pre className="code-snippet">
        {`name = input("Enter your name: ")
print("Welcome,", name)`}
      </pre>

      {/* ✅ SECTION 4 — If / Else */}
      <h2>✅ If-Else Statements</h2>
      <pre className="code-snippet">
        {`age = 18

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")`}
      </pre>

      {/* ✅ SECTION 5 — Loops */}
      <h2>🔁 For Loop</h2>
      <pre className="code-snippet">
        {`for i in range(1, 6):
    print(i)`}
      </pre>

      <h2>🔁 While Loop</h2>
      <pre className="code-snippet">
        {`count = 1
while count <= 5:
    print(count)
    count += 1`}
      </pre>

      {/* ✅ SECTION 6 — Lists */}
      <h2>📌 Lists in Python</h2>
      <pre className="code-snippet">
        {`fruits = ["apple", "banana", "cherry"]

print(fruits[0])      # apple
fruits.append("kiwi") 
print(fruits)`}
      </pre>
      <button
        onClick={() => navigate("/quiz")}
        className="quiz-button"
        style={{ marginTop: "20px" }}
      >
        Take Quiz
      </button>
    </div>
  );
}

// Remove the codeStyle constant, as styles are now in CSS
// const codeStyle = { /* ... */ }; 

export default ModuleContent;