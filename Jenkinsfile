// Declarative Jenkins pipeline for building the OAG frontend, creating a Docker image, and optionally pushing to a registry.
// Usage notes:
// - Set `VITE_API_URL` as an environment variable in Jenkins (for build-time injection into the Vite build).
// - If you want to push to Docker Hub, configure `DOCKER_REGISTRY` and provide credentials via `DOCKERHUB_CREDENTIALS` (username/password) in Jenkins Credentials.
// - This pipeline assumes a Linux agent with Docker installed. Adjust `agent` or steps if your Jenkins setup differs.

pipeline {
  agent any
  environment {
    // Example values; override in Jenkins job config or as pipeline parameters
    IMAGE_NAME = "oag-frontend"
    IMAGE_TAG = "${env.BUILD_NUMBER ?: 'latest'}"
    DOCKER_REGISTRY = "docker.io" // change if you push to another registry
    // Vite build-time env (set in Jenkins configuration or build parameters)
    // VITE_API_URL = "https://api.example.com"
  }
  options {
    timestamps()
    ansiColor('xterm')
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Build') {
      steps {
        // Ensure VITE_* variables are set in the environment or in Jenkins job parameters.
        sh 'npm run build'
      }
      post {
        success {
          archiveArtifacts artifacts: 'dist/**', fingerprint: true
        }
      }
    }
    stage('Build Docker Image') {
      steps {
        script {
          def fullImage = "${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
          sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
          // optionally tag for registry
          sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${fullImage}"
        }
      }
    }
    stage('Push Image (optional)') {
      when {
        expression { return env.PUSH_TO_REGISTRY == 'true' }
      }
      steps {
        withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_CREDENTIALS', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin ${DOCKER_REGISTRY}"
          sh "docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
        }
      }
    }
  }
  post {
    always {
      sh 'docker images | grep ${IMAGE_NAME} || true'
    }
    success {
      echo "Pipeline finished: Image ${IMAGE_NAME}:${IMAGE_TAG} built."
    }
  }
}
