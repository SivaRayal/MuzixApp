pipeline {
    agent any
    stages{
        stage('Build MUZIX APP'){
            steps{
                checkout scmGit(branches: [[name: '*/docker']], extensions: [], userRemoteConfigs: [[credentialsId: 'b0c2c3b1-2ac3-4ed1-9057-ff49ff3bb16e', url: 'https://gitlab.stackroute.in/Gobinathan.Viswanathan/muzix-app-frontend']])
            }
        }
        stage('Deploy MUZIX Docker Compose'){
            steps{
                script{
                    // bat 'docker info'
                    // bat 'docker compose -f muzix-app/docker-compose.yml down'
                    // bat 'docker compose -f muzix-app/docker-compose.yml up -d --no-color --wait'
                    // // bat 'docker-compose -f muzix-app/docker-compose.yml up --scale muzix-userprofile-v1=2'
                    sh 'docker info'
                    sh 'docker compose -f muzix-app/docker-compose.yml down'
                    sh 'docker compose -f muzix-app/docker-compose.yml up -d --no-color --wait'
                    // bat 'docker-compose -f muzix-app/docker-compose.yml up --scale muzix-userprofile-v1=2'
                }
                sleep time: 30, unit: 'SECONDS'
                // bat 'docker compose -f muzix-app/docker-compose.yml ps'
                sh 'docker compose -f muzix-app/docker-compose.yml ps'
            }
        }
    }
}
