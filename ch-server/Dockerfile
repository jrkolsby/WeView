FROM ubuntu:16.04
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev
WORKDIR /app
COPY ./req.txt req.txt
RUN pip install --upgrade pip
RUN pip install -r req.txt
COPY . /app
ENV FLASK_APP server.py
EXPOSE 5000
ENTRYPOINT [ "python", "server.py" ]
