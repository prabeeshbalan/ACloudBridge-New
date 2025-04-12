variable "acloudbridge-subnet-public-us-east-1a_id" {
  description = "acloudbridge-subnet-public-us-east-1a_id"
}
variable "acloudbridge-subnet-public-us-east-1b_id" {
  description = "acloudbridge-subnet-public-us-east-1b_id"
}
variable "acloudbridge-subnet-private-us-east-1a_id" {
  description = "acloudbridge-subnet-private-us-east-1a_id"
}
variable "acloudbridge-subnet-private-us-east-1b_id" {
  description = "acloudbridge-subnet-private-us-east-1b_id"
}
variable "acloudbridge-public-sg_id" {
  description = "aws_security_group.acloudbridge-public-sg_id.id"
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