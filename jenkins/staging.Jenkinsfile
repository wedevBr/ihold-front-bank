pipeline {
    agent any

    environment {
        DOTENV = credentials('dotenv-front-ihold')
    }

    stages {
        stage('Environments') {
            steps {
                sh "rm -f .env.local"
                sh 'cp $DOTENV .env.local'
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
                sh "docker-compose -f docker-compose.staging.yaml up -d --build"
            }
        }
    }
}