FROM node:11.5
WORKDIR /code

ENV PATH /code/node_modules/.bin:$PATH

RUN npm install
RUN npm install react-scripts -g
EXPOSE 3000
CMD ["npm","start"]