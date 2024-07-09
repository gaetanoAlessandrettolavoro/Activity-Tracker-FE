FROM node:20

WORKDIR /app/Activity-Tracker-FE

# Copia il package.json e il package-lock.json (se esiste) 
#COPY ./Activity-Tracker-FE/package*.json /app
#COPY ./Activity-Tracker-FE/angular.json /app
#COPY ./Activity-Tracker-FE/ts*.json /app

COPY . /app

RUN npm install -g @angular/cli
RUN npm install
RUN npm i


# Espone la porta su cui l'applicazione è in esecuzione 
EXPOSE 4200 

CMD ["ng", "serve", "--host", "0.0.0.0"]

