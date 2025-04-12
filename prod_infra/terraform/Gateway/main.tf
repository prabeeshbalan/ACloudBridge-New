# Internet gateway for internet access from public subnet
resource "aws_internet_gateway" "acloudbridge-igw" {
  vpc_id = var.acloudbridge-vpc_id

  tags = {
    Name = "acloudbridge-igw"
  }
}