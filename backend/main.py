from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import json
import os
from datetime import datetime
from mangum import Mangum  # ✅ NEW: for serverless

app = FastAPI(
    title="Resume Editor API",
    description="Backend for Resume Editor Application"
)

# ✅ CORS: good for local dev, but production uses same domain so no CORS issues
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for resumes
resume_storage = {}

# -----------------------------
# Models
# -----------------------------

class AIEnhanceRequest(BaseModel):
    section: str
    content: str

class AIEnhanceResponse(BaseModel):
    enhanced_content: str

class SaveResumeRequest(BaseModel):
    resume_data: Dict[str, Any]
    resume_id: str = None

class SaveResumeResponse(BaseModel):
    message: str
    resume_id: str

# -----------------------------
# Mock AI data
# -----------------------------

AI_ENHANCEMENTS = {
    "summary": {
        "prefixes": [
            "Dynamic and results-driven",
            "Innovative and detail-oriented",
            "Highly motivated and experienced",
            "Strategic and analytical",
            "Creative and solution-focused"
        ],
        "improvements": [
            "with a proven track record of delivering exceptional results",
            "demonstrating exceptional leadership and problem-solving capabilities",
            "with expertise in driving organizational growth and efficiency",
            "specializing in innovative solutions and strategic implementation",
            "with a passion for excellence and continuous improvement"
        ]
    },
    "experience": {
        "action_words": [
            "Spearheaded", "Orchestrated", "Pioneered", "Optimized", "Streamlined",
            "Collaborated", "Implemented", "Developed", "Managed", "Led"
        ],
        "metrics": [
            "resulting in 25% increased efficiency",
            "leading to $50K+ cost savings annually",
            "improving team productivity by 30%",
            "reducing processing time by 40%",
            "achieving 95% client satisfaction rate"
        ]
    },
    "skills": {
        "categories": {
            "Technical": ["Advanced proficiency in", "Expert-level knowledge of", "Specialized expertise in"],
            "Leadership": ["Proven leadership in", "Demonstrated excellence in", "Strategic management of"],
            "Communication": ["Exceptional communication skills in", "Professional proficiency in", "Advanced capabilities in"]
        }
    },
    "education": {
        "enhancements": [
            "with academic excellence and leadership recognition",
            "including relevant coursework in advanced topics",
            "with honors and distinguished academic performance",
            "complemented by practical project experience",
            "with focus on industry-relevant applications"
        ]
    }
}

# -----------------------------
# API endpoints
# -----------------------------

@app.get("/api")
async def root():
    return {"message": "Resume Editor API is running"}

@app.post("/api/ai-enhance", response_model=AIEnhanceResponse)
async def ai_enhance(request: AIEnhanceRequest):
    try:
        section = request.section.lower()
        content = request.content.strip()

        if not content:
            raise HTTPException(status_code=400, detail="Content cannot be empty")

        enhanced_content = content

        if section == "summary":
            enhancements = AI_ENHANCEMENTS["summary"]
            if not any(prefix.lower() in content.lower() for prefix in enhancements["prefixes"]):
                prefix = enhancements["prefixes"][hash(content) % len(enhancements["prefixes"])]
                enhanced_content = f"{prefix} {content.lower()}"
            improvement = enhancements["improvements"][hash(content) % len(enhancements["improvements"])]
            enhanced_content += f" {improvement}."

        elif section == "experience":
            lines = content.split('\n')
            enhanced_lines = []
            for line in lines:
                if line.strip():
                    action_words = AI_ENHANCEMENTS["experience"]["action_words"]
                    metrics = AI_ENHANCEMENTS["experience"]["metrics"]
                    enhanced_line = line
                    if not any(word in line for word in action_words):
                        action_word = action_words[hash(line) % len(action_words)]
                        enhanced_line = f"{action_word} {line.lower()}"
                    if not any(char.isdigit() for char in line):
                        metric = metrics[hash(line) % len(metrics)]
                        enhanced_line += f", {metric}"
                    enhanced_lines.append(enhanced_line)
                else:
                    enhanced_lines.append(line)
            enhanced_content = '\n'.join(enhanced_lines)

        elif section == "skills":
            skills_list = [skill.strip() for skill in content.replace('\n', ',').split(',') if skill.strip()]
            categories = AI_ENHANCEMENTS["skills"]["categories"]
            enhanced_skills = []
            for i, skill in enumerate(skills_list):
                category_keys = list(categories.keys())
                category = category_keys[i % len(category_keys)]
                prefixes = categories[category]
                prefix = prefixes[hash(skill) % len(prefixes)]
                enhanced_skills.append(f"{prefix} {skill}")
            enhanced_content = '\n'.join(enhanced_skills)

        elif section == "education":
            lines = content.split('\n')
            enhanced_lines = []
            for line in lines:
                if line.strip():
                    enhancements = AI_ENHANCEMENTS["education"]["enhancements"]
                    enhancement = enhancements[hash(line) % len(enhancements)]
                    enhanced_lines.append(f"{line} {enhancement}")
                else:
                    enhanced_lines.append(line)
            enhanced_content = '\n'.join(enhanced_lines)

        return AIEnhanceResponse(enhanced_content=enhanced_content)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Enhancement failed: {str(e)}")

@app.post("/api/save-resume", response_model=SaveResumeResponse)
async def save_resume(request: SaveResumeRequest):
    try:
        resume_id = request.resume_id or f"resume_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        resume_data = {
            **request.resume_data,
            "id": resume_id,
            "last_updated": datetime.now().isoformat(),
            "version": "1.0"
        }
        resume_storage[resume_id] = resume_data

        os.makedirs("saved_resumes", exist_ok=True)
        with open(f"saved_resumes/{resume_id}.json", "w") as f:
            json.dump(resume_data, f, indent=2)

        return SaveResumeResponse(message="Resume saved successfully", resume_id=resume_id)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Save failed: {str(e)}")

@app.get("/api/resume/{resume_id}")
async def get_resume(resume_id: str):
    try:
        if resume_id in resume_storage:
            return resume_storage[resume_id]

        file_path = f"saved_resumes/{resume_id}.json"
        if os.path.exists(file_path):
            with open(file_path, "r") as f:
                resume_data = json.load(f)
                resume_storage[resume_id] = resume_data
                return resume_data

        raise HTTPException(status_code=404, detail="Resume not found")

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Retrieval failed: {str(e)}")

@app.get("/api/resumes")
async def list_resumes():
    try:
        resume_list = []
        if os.path.exists("saved_resumes"):
            for filename in os.listdir("saved_resumes"):
                if filename.endswith(".json"):
                    with open(f"saved_resumes/{filename}", "r") as f:
                        resume_data = json.load(f)
                        resume_list.append({
                            "id": resume_data.get("id"),
                            "name": resume_data.get("personalInfo", {}).get("fullName", "Unknown"),
                            "last_updated": resume_data.get("last_updated"),
                            "version": resume_data.get("version", "1.0")
                        })
        return {"resumes": resume_list}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"List failed: {str(e)}")

# ✅ NEW: Wrap the ASGI app for serverless!
handler = Mangum(app)

# Local dev only
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
