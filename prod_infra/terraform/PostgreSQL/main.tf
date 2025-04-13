module "acloudbridge-postgresql" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 6.11.0"

  identifier = "acloudbridge-postgresql-db"

  engine          = "postgres"
  engine_version  = "17.2" # Or specify a supported version
  instance_class  = "db.t4g.micro"
  allocated_storage = 5
  storage_encrypted = false # Turn off encryption

  db_name             = var.db_name
  username            = var.db_username
  password            = var.db_password #  Fetch from environment variable
  port                = 5432 # Postgres default port
  
  # Ensure password authentication
  iam_database_authentication_enabled = false

  vpc_security_group_ids = [var.acloudbridge-public-sg_id] #  Security group
  subnet_ids             = [
      var.acloudbridge-subnet-public-us-east-1a_id,
      var.acloudbridge-subnet-public-us-east-1b_id,
      var.acloudbridge-subnet-private-us-east-1a_id,
      var.acloudbridge-subnet-private-us-east-1b_id
  ]
  create_db_subnet_group = true

  backup_retention_period = 0 # Turn off backups
  
  tags = {
    Owner       = "acloudbridgeuser"
    Environment = "dev"
  }

  family = "postgres17" # Or the correct family for the engine_version

  publicly_accessible = true #  publicly accessible

  deletion_protection = false #  deletion protection
  skip_final_snapshot = true
}

# Example of how to fetch password from an environment variable (outside the module)
# data "aws_secretsmanager_secret_version" "postgres_password" {
#   secret_id = "your-secret-name" #  Replace with your secret name
# }
#
#  module "acloudbridge-postgresql" {
#    password = data.aws_secretsmanager_secret_version.postgres_password.value
#  }

