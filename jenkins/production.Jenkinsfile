pipeline {
    agent any

    environment {
        DOTENV = credentials('dotenv-front-ihold')
    }

    stages {
        stage('Environments') {
            steps {
                sh "rm -f .env"
                sh 'cp $DOTENV .env'
            }
        }
        stage('Stop Services') {
            steps {
                sh "docker stop ihold_front_web_nginx || true"
                sh "docker stop ihold_front_web || true"
            }
        }
        stage('Build and start') {
            steps {
                sh "docker-compose -f docker-compose.production.yaml up -d --build"
            }
        }
    }
}