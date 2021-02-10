Steps to run this project:

To run on local:
1. Run `yarn` command
2. Setup database settings inside `.env` file
3. Run `yarn build` command
4. Run `yarn start` command
5. Go to http://localhost:8000

Create new migration
``typeorm migration:create -n ``

Run migration ``typeorm migration:run``

Revert migration ``typeorm migration:revert``

Deploy `kubectl apply -f deploy.yaml --record`


