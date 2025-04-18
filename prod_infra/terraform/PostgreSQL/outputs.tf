output "terraform_db_endpoint" {
  value       = module.acloudbridge-postgresql.db_instance_address
}

output "terraform_db_username" {
  value = module.acloudbridge-postgresql.db_instance_username
}

output "terraform_db_password" {
  value       = var.db_password
  sensitive   = true
}

output "terraform_db_name" {
  value = module.acloudbridge-postgresql.db_instance_name
}