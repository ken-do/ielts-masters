pipeline {
  agent any
 
  tools {
    nodejs "node"
  }

  environment {
    BUILD_TAG = Calendar.getInstance().getTime().format("ddMMYYYYhhmmss",TimeZone.getTimeZone("CST"))
  }
  
  stages {
    stage("Prepare") {
      steps {
        sh "yarn install --mutex network"
      }
    }

    stage("Unit Tests") {
      parallel {
        stage("Logic") {
          steps {
            sh "yarn test"
          }
        }

        stage("Syntax") {
          steps {
            sh "yarn lint"
          }
        }

        stage("Type check") {
          steps {
            sh "yarn type-check"
          }
        }
      }
    }

    stage("Build") {
      steps {
        sh "yarn ci build -t ${BUILD_TAG}"
      }
    }

    stage("Test") {
      steps {
        sh "yarn ci test -t ${BUILD_TAG}"
      }
    }


    stage("Upload") {
      when {
        expression {
          BRANCH_NAME == 'dev' || BRANCH_NAME == 'main'
        }
      }
      steps {
        sh "yarn ci upload -t ${BUILD_TAG} -i ${AWS_ACCOUNT_ID}"
      }
    }

    stage("Deploy") {
      when {
        expression {
          BRANCH_NAME == 'dev' || BRANCH_NAME == 'main'
        }
      }
      steps {
        sh "yarn ci deploy -t ${BUILD_TAG}"
      }
    }
  }
  
  post {
    always {
      script {
        sh "rm -rf ./.next"
        sh "rm -rf node_modules"
      }
    }
  }
}
