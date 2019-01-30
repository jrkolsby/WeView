FROM python:3.7
COPY ./requirements.txt requirements.txt 
RUN pip install -r requirements.txt 
COPY ./app /app
EXPOSE 5000
WORKDIR /app
# GUNICORN MUST HAVE ONLY ONE WORKER FOR SOCKETS TO WORK!
ENTRYPOINT [ "gunicorn", "-b", "0.0.0.0:5000", "--worker-class", "eventlet", "-w", "1", "--access-logfile", "-", "--log-level", "debug", "server:app"]
