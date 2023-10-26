from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from backend.transformations import *
from fastapi.responses import JSONResponse
from pathlib import Path
import torch 
from torchvision.io import read_image 
from torchvision import transforms

# uvicorn backend.main:app --reload
# npm start
# python3 -m pip install psycopg2-binary

device = ("cuda" if torch.cuda.is_available() else "cpu")
importModel = neuralNetwork().to(device)
importModel.load_state_dict(torch.load('backend/model.pth', map_location=torch.device(device)))

preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

app = FastAPI()

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    uploads_path = Path("fastAPI")
    uploads_path.mkdir(parents=True, exist_ok=True)
    file_path = uploads_path / file.filename
    with file_path.open("wb") as buffer:
        buffer.write(await file.read())
    return JSONResponse(content={"file_path": str(file_path)})

@app.post("/predict/{file_path:path}")
async def predict(file_path: str):
    try:
        print(f"Received prediction request for image at path: {file_path}")
        prediction = torch.softmax(importModel(centerGreyScale(read_image(file_path).to(device))).view(1,-1), dim=1)
        prediction_list = prediction.tolist()
        prediction_list = prediction_list[0][0]

        return {"result": "success", "prediction": prediction_list}
    except Exception as e:
        return {"result": "error", "message": str(e)}

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
