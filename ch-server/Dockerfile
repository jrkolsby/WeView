FROM tiangolo/meinheld-gunicorn-flask:python3.7
COPY ./requirements.txt requirements.txt 
RUN pip install -r requirements.txt 
EXPOSE 5000
COPY ./app /app
