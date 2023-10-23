from fastapi import FastAPI, Request, File, UploadFile
from typing import Optional
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from backend.transformations import *
from fastapi.responses import JSONResponse
from pathlib import Path

# http://127.0.0.1:8000/docs
# http://127.0.0.1:8000/redoc
# uvicorn backend.main:app --reload
# lsof -i :3000
# npm start
# python3 -m pip install psycopg2-binary

device = ("cuda" if torch.cuda.is_available() else "cpu")
importModel = neuralNetwork().to(device)
importModel.load_state_dict(torch.load('backend/model.pth', map_location=torch.device(device)))

app = FastAPI()

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    uploads_path = Path("fastAPI")
    uploads_path.mkdir(parents=True, exist_ok=True)
    file_path = uploads_path / file.filename
    with file_path.open("wb") as buffer:
        buffer.write(await file.read())
    return JSONResponse(content={"file_path": str(file_path)})

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    try:
        # Lisez les données de l'image
        image_data = await image.read()

        # Effectuez vos opérations sur l'image ici

        # Exemple de retour JSON
        return {"result": "success"}

    except Exception as e:
        return {"result": "error", "message": str(e)}

"""
class request_body(BaseModel):
    sentence : str

@app.post("/predict")
def predict(request: Request, data: request_body):
    new_data = [[
        data.sepal_length,
        data.sepal_width,
        data.petal_length,
        data.petal_width
    ]]
    class_idx = loaded_model.predict(new_data)[0]
    prediction = {'class': iris.target_names[class_idx]}

    return prediction
"""

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
