-include .env

env:
	cp ./.env.example .env

image:
	docker build -t ${DOCKER_IMAGE} .

install:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		${DOCKER_IMAGE} \
		npm i $(filter-out $@,$(MAKECMDGOALS))

update:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		${DOCKER_IMAGE} \
		npm update $(filter-out $@,$(MAKECMDGOALS))

remove:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		${DOCKER_IMAGE} \
		npm uninstall $(filter-out $@,$(MAKECMDGOALS))

dev-server:
	docker run \
		--rm \
		--name ${APP_NAME} \
		-v ${PWD}:/usr/src/app \
		-p ${DEV_SERVER_PORT}:${DEV_SERVER_PORT} \
		${DOCKER_IMAGE}

open-browser:
	open http://localhost:${DEV_SERVER_PORT}

production-build:
	docker run \
		--rm \
		-v ${PWD}:/usr/src/app \
		${DOCKER_IMAGE} \
		node scripts/production-build.js
