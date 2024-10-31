# Backend Dockerfile
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download the punkt tokenizer data for nltk
RUN python -m nltk.downloader punkt_tab

# Copy the rest of the application code
COPY . .

# Expose the port FastAPI will run on
EXPOSE 80

# Start the FastAPI application with Uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "80"]
