aws ecr get-login-password --region ap-southeast-1 --profile redbeat-cli | docker login --username AWS --password-stdin 411505671193.dkr.ecr.ap-southeast-1.amazonaws.com
docker build -t redbeat:1.0 .
docker tag redbeat:1.0 411505671193.dkr.ecr.ap-southeast-1.amazonaws.com/redbeat:1.0
docker push 411505671193.dkr.ecr.ap-southeast-1.amazonaws.com/redbeat:1.0
