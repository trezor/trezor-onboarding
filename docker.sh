set -x

echo "start"
docker ps --filter "name=onboarding" | grep -q . && docker stop onboarding && docker rm -fv onboarding

docker build -t onboarding .
echo "build finished"

docker run -p 8082:8081 -p 8083:8088 --name onboarding onboarding:latest

docker stop onboarding
docker rm onboarding
