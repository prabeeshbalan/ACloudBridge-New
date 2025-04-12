# vpc 
resource "aws_vpc" "acloudbridge-vpc" {

  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "acloudbridge-vpc"
  }

  enable_dns_support   = true
  enable_dns_hostnames = true

}