cd src/backend || exit
./gradlew build
cd ../../ || exit


cd src/frontend || exit

npm install

npm start &

cd ../../ || exit

docker compose up -d --build
echo "Doing very heavy work..."
sleep 90
docker compose up -d
