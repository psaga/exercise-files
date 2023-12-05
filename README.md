### API
Inside api folder
- Install dependencies (make sure you have installed node)
	`npm install`

- Set environment variables in .env.local

	Run test
	`npm run test`

	Start api app
	`npm run start`



### Front
Inside front folder
- Install dependencies (make sure you have installed node)
	`npm install`

- Set environment variables in .env

	Run test
	`npm run test`

	Start react app
	`npm run start`


### Run api + front using Docker
- Make sure you have installed Docker compose
- Set environment dependencies for both services as explained previously
> You may consider using the same ports bound at docker-compose.yml

Execute:
`docker-compose up -d` 
