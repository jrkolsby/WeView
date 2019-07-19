.PHONY : clean
clean: 
	docker image prune -f
	docker container prune -f
	docker-compose -f compose.prod.yml down --remove-orphans --rmi 'all'
	docker-compose -f compose.dev.yml down --remove-orphans --rmi 'all'

.PHONY : dev
dev:
	docker-compose -f compose.dev.yml up -d --build

.PHONY : prod
prod: 
	docker-compose -f compose.prod.yml up -d --build

.PHONY : sql
sql:
	slite3 ./ch-server/data/data.db

