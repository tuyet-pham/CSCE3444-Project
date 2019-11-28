FROM python:3.8-alpine
WORKDIR /code
COPY requirements.txt requirements.txt
RUN apk --no-cache add --virtual build-dependencies \
        gcc \
        musl-dev \
        linux-headers \
        build-base \
        py-mysqldb \
        libc-dev \
        libffi-dev \
        mariadb-dev \
        && pip install -qq -r requirements.txt \
        && rm -rf .cache/pip \
        && apk del build-dependencies

RUN apk -q --no-cache add py-mysqldb
