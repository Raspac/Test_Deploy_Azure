import os
import torch 
import torchvision 
from torchvision.io import read_image 
from torch import nn
from torch.utils.data import Dataset, DataLoader, Subset
import pandas as pd

class neuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(117612, 128), 
            nn.ReLU(),
            nn.Linear(128, 128), 
            nn.ReLU(),
            nn.Linear(128, 2)
        )
    
    def forward(self, x):
        return self.linear_relu_stack(x)