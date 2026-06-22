from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import math

app = FastAPI()


class CurveRequest(BaseModel):
    drug: str
    ec50: float
    hill: float
    concentrations: List[float]


class CurveResponse(BaseModel):
    effects: List[float]
    therapeutic_window: dict
    toxic_threshold: float


@app.post("/api/py/curve", response_model=CurveResponse)
def compute_curve(req: CurveRequest):
    effects = []
    for c in req.concentrations:
        if c <= 0:
            effects.append(0.0)
        else:
            e = 100 * (c ** req.hill) / (req.ec50 ** req.hill + c ** req.hill)
            effects.append(round(e, 2))

    tw_min = req.ec50 * 0.5
    tw_max = req.ec50 * 2.0
    toxic = req.ec50 * 3.5

    return CurveResponse(
        effects=effects,
        therapeutic_window={"min": tw_min, "max": tw_max},
        toxic_threshold=toxic
    )


@app.get("/api/py/health")
def health():
    return {"status": "ok"}
