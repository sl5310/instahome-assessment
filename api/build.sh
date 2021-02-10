yarn build
aws ecr get-login-password --region ap-southeast-1 --profile redbeat-cli | docker login --username AWS --password-stdin 411505671193.dkr.ecr.ap-southeast-1.amazonaws.com
docker build -t instahome:1.1 .
docker tag instahome:1.1 411505671193.dkr.ecr.ap-southeast-1.amazonaws.com/instahome:1.1
docker push 411505671193.dkr.ecr.ap-southeast-1.amazonaws.com/instahome:1.1
