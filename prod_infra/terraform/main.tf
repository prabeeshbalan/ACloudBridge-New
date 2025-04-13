terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.92.0"
    }
  }

  backend "local" {
    path = "state/terraform.tfstate"
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
}

module "acloudbridge-vpc" {
  source = "./vpc"
}

module "acloudbridge-igw" {
  source  = "./Gateway"
  acloudbridge-vpc_id = module.acloudbridge-vpc.acloudbridge-vpc_id
  }

module "acloudbridge-nacl" {
  source                           = "./NACL"
  acloudbridge-vpc_id             = module.acloudbridge-vpc.acloudbridge-vpc_id
  acloudbridge-subnet-public-us-east-1a_id  = module.acloudbridge-subnet.acloudbridge-subnet-public-us-east-1a_id
  acloudbridge-subnet-public-us-east-1b_id  = module.acloudbridge-subnet.acloudbridge-subnet-public-us-east-1b_id
  acloudbridge-subnet-private-us-east-1a_id = module.acloudbridge-subnet.acloudbridge-subnet-private-us-east-1a_id
  acloudbridge-subnet-private-us-east-1b_id = module.acloudbridge-subnet.acloudbridge-subnet-private-us-east-1b_id
}

module "acloudbridge-subnet" {
  source               = "./Subnet"
  acloudbridge-vpc_id = module.acloudbridge-vpc.acloudbridge-vpc_id
}

module "acloudbridge-rtb" {
  source                           = "./RouteTable"
  acloudbridge-vpc_id             = module.acloudbridge-vpc.acloudbridge-vpc_id
  acloudbridge-subnet-public-us-east-1a_id  = module.acloudbridge-subnet.acloudbridge-subnet-public-us-east-1a_id
  acloudbridge-subnet-public-us-east-1b_id  = module.acloudbridge-subnet.acloudbridge-subnet-public-us-east-1b_id
  acloudbridge-subnet-private-us-east-1a_id = module.acloudbridge-subnet.acloudbridge-subnet-private-us-east-1a_id
  acloudbridge-subnet-private-us-east-1b_id = module.acloudbridge-subnet.acloudbridge-subnet-private-us-east-1b_id
  acloudbridge-igw_id             = module.acloudbridge-igw.acloudbridge-igw_id
}

module "acloudbridge-sg" {
  source               = "./SecurityGroup"
  acloudbridge-vpc_id             = module.acloudbridge-vpc.acloudbridge-vpc_id
}

module "acloudbridge-ec2" {
  source                          = "./ec2"
  acloudbridge-public-sg_id                = module.acloudbridge-sg.acloudbridge-public-sg_id
  acloudbridge-subnet-public-us-east-1a_id  = module.acloudbridge-subnet.acloudbridge-subnet-public-us-east-1a_id
}

variable "db_password" {
  description = "The master password for the RDS instance"
  type        = string
  sensitive   = true
}
variable "db_username" {
  description = "The master user for the RDS instance"
  type        = string
  sensitive   = true
}
variable "db_name" {
  description = "The master user for the RDS instance"
  type        = string
  sensitive   = true
}

module "acloudbridge-postgresql" {
  source  = "./PostgreSQL"
  db_password = var.db_password
  db_username = var.db_username
  db_name = var.db_name
  acloudbridge-public-sg_id = module.acloudbridge-sg.acloudbridge-public-sg_id
  acloudbridge-subnet-public-us-east-1a_id  = module.acloudbridge-subnet.acloudbridge-subnet-public-us-east-1a_id
  acloudbridge-subnet-public-us-east-1b_id  = module.acloudbridge-subnet.acloudbridge-subnet-public-us-east-1b_id
  acloudbridge-subnet-private-us-east-1a_id = module.acloudbridge-subnet.acloudbridge-subnet-private-us-east-1a_id
  acloudbridge-subnet-private-us-east-1b_id = module.acloudbridge-subnet.acloudbridge-subnet-private-us-east-1b_id
}

output "terraform_db_password" {
  description = "DB Password"
  value       = var.db_password
  sensitive   = true
}
output "terraform_db_username" {
  description = "DB username"
  value       = var.db_username
  sensitive   = true
}
output "terraform_db_name" {
  description = "DB name"
  value       = var.db_name
  sensitive   = true
}